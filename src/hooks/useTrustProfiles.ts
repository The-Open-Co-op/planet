/**
 * useTrustProfiles — single source of truth for Trust Profiles (RCards).
 *
 * Every context that needs Trust Profiles (My Profiles, Settings,
 * vouch acceptance dialogs, RCard selection modals) should use this hook.
 *
 * In the future monorepo this will live in `packages/hooks` alongside
 * useVRCs and be backed by the vault/protocol SDK.
 */

import { useState, useCallback, useMemo, useEffect } from 'react';
import { DEFAULT_PROFILE_CARDS, DEFAULT_PRIVACY_SETTINGS } from '@/types/notification';
import type { RCardWithPrivacy } from '@/types/notification';

/** Card-specific default privacy settings */
const CARD_PRIVACY_DEFAULTS: Record<string, typeof DEFAULT_PRIVACY_SETTINGS> = {
  Default: {
    keyRecoveryBuddy: false,
    dataSharing: { location: 'none', articles: 'none', photos: 'none', calendar: 'none', groups: 'none' },
    reSharing: { enabled: false, maxHops: 1 },
  },
  Family: {
    keyRecoveryBuddy: true,
    dataSharing: { location: 'exact', articles: 'all', photos: 'all', calendar: 'full', groups: 'all' },
    reSharing: { enabled: true, maxHops: 6 },
  },
  Friends: {
    keyRecoveryBuddy: false,
    dataSharing: { location: 'city', articles: 'all', photos: 'all', calendar: 'busy_free', groups: 'all' },
    reSharing: { enabled: true, maxHops: 4 },
  },
  Business: {
    keyRecoveryBuddy: false,
    dataSharing: { location: 'none', articles: 'none', photos: 'none', calendar: 'none', groups: 'none' },
    reSharing: { enabled: true, maxHops: 2 },
  },
  Community: {
    keyRecoveryBuddy: false,
    dataSharing: { location: 'region', articles: 'all', photos: 'tagged', calendar: 'none', groups: 'all' },
    reSharing: { enabled: true, maxHops: 5 },
  },
};

/** Build the initial set of Trust Profiles from defaults */
const buildInitialProfiles = (): RCardWithPrivacy[] =>
  DEFAULT_PROFILE_CARDS.map((card, index) => ({
    ...card,
    id: `default-${index}`,
    createdAt: new Date(),
    updatedAt: new Date(),
    privacySettings: CARD_PRIVACY_DEFAULTS[card.name] || DEFAULT_PRIVACY_SETTINGS,
  }));

// Shared singleton state so all hook consumers see the same data.
// In the future this becomes Zustand.
let _profiles: RCardWithPrivacy[] = buildInitialProfiles();
let _listeners: Set<() => void> = new Set();

const notify = () => _listeners.forEach(fn => fn());

export interface UseTrustProfilesReturn {
  /** All Trust Profiles including Default */
  profiles: RCardWithPrivacy[];
  /** All Trust Profiles excluding Default (for user-facing lists) */
  activeProfiles: RCardWithPrivacy[];
  /** Update a profile's settings */
  updateProfile: (updated: RCardWithPrivacy) => void;
  /** Add a new profile, returns the new profile */
  addProfile: (name: string, color: string, icon: string) => RCardWithPrivacy;
  /** Get a profile by ID */
  getProfileById: (id: string) => RCardWithPrivacy | undefined;
  /** Get a profile by name */
  getProfileByName: (name: string) => RCardWithPrivacy | undefined;
}

export const useTrustProfiles = (): UseTrustProfilesReturn => {
  const [, setTick] = useState(0);

  // Subscribe to singleton changes
  useEffect(() => {
    const listener = () => setTick(t => t + 1);
    _listeners.add(listener);
    return () => { _listeners.delete(listener); };
  }, []);

  const profiles = _profiles;

  const activeProfiles = useMemo(
    () => profiles.filter(p => p.name !== 'Default'),
    [profiles]
  );

  const updateProfile = useCallback((updated: RCardWithPrivacy) => {
    _profiles = _profiles.map(p => p.id === updated.id ? updated : p);
    notify();
  }, []);

  const addProfile = useCallback((name: string, color: string, icon: string): RCardWithPrivacy => {
    const newProfile: RCardWithPrivacy = {
      id: `custom-${Date.now()}`,
      name,
      color,
      icon,
      isDefault: false,
      createdAt: new Date(),
      updatedAt: new Date(),
      privacySettings: DEFAULT_PRIVACY_SETTINGS,
    };
    _profiles = [..._profiles, newProfile];
    notify();
    return newProfile;
  }, []);

  const getProfileById = useCallback(
    (id: string) => profiles.find(p => p.id === id),
    [profiles]
  );

  const getProfileByName = useCallback(
    (name: string) => profiles.find(p => p.name === name),
    [profiles]
  );

  return {
    profiles,
    activeProfiles,
    updateProfile,
    addProfile,
    getProfileById,
    getProfileByName,
  };
};
