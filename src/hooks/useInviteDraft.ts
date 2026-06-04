/**
 * useInviteDraft — shared draft state for the Invite Flow demo.
 *
 * The "Invite as" step lets Jonny pick which Trust Profile he's inviting from,
 * and the "Compose & edit" step lets him tweak the message before sending.
 * Both choices need to survive across screens (the share-sheet OG preview,
 * the compose screen, and the delivered message), so they live in a tiny
 * singleton store rather than a single screen's state.
 *
 * Mirrors the singleton pattern used by useTrustProfiles.
 */

import { useState, useEffect } from 'react';

/** The default invite message, prefilled in the compose field. */
export const DEFAULT_INVITE_MESSAGE =
  "Hey Mike, I've joined PLANET — a user-owned decentralised trust network with secure messaging and other trust-based apps that doesn't exploit your data. It's invite-only, so this link is just for you because I trust you. Join me →";

// Default to the Public profile — matches InviteAsScreen's initial selection.
let _selectedProfileName = 'Public';
let _message = DEFAULT_INVITE_MESSAGE;
const _listeners = new Set<() => void>();

const notify = () => _listeners.forEach((fn) => fn());

/** Set the profile Jonny is inviting as (by Trust Profile name). */
export const setInviteProfileName = (name: string) => {
  _selectedProfileName = name;
  notify();
};

/** Set the (possibly edited) invite message. */
export const setInviteMessage = (message: string) => {
  _message = message;
  notify();
};

export interface UseInviteDraftReturn {
  selectedProfileName: string;
  setSelectedProfileName: (name: string) => void;
  message: string;
  setMessage: (message: string) => void;
}

export const useInviteDraft = (): UseInviteDraftReturn => {
  const [, setTick] = useState(0);

  useEffect(() => {
    const listener = () => setTick((t) => t + 1);
    _listeners.add(listener);
    return () => { _listeners.delete(listener); };
  }, []);

  return {
    selectedProfileName: _selectedProfileName,
    setSelectedProfileName: setInviteProfileName,
    message: _message,
    setMessage: setInviteMessage,
  };
};
