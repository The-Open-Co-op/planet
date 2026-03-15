/**
 * useVRCs — single source of truth for Verifiable Relationship Credentials.
 *
 * Combines vouch data from `mocks/vrcs.ts` with acceptance status
 * from the notification service (runtime state) so that every consumer
 * sees a consistent view of which credentials are accepted, pending, or rejected.
 *
 * In the future monorepo this will live in `packages/hooks` and be backed
 * by Zustand + the protocol SDK.
 */

import { useState, useMemo, useCallback, useEffect } from 'react';
import { mockVouches } from '@/mocks/vrcs';
import { notificationService } from '@/services/notificationService';
import type { Vouch, Notification } from '@/types/notification';

const CURRENT_USER_ID = 'current-user';

export interface UseVRCsReturn {
  /** All vouches (regardless of status) */
  vouches: Vouch[];

  /** Only accepted vouches */
  acceptedVouches: Vouch[];

  /** Look up a single vouch by ID */
  getVouchById: (id: string) => Vouch | undefined;
  /** Get acceptance status for a vouch */
  getVouchStatus: (id: string) => 'accepted' | 'rejected' | 'pending';

  /** Accepted vouches FROM a specific contact */
  getAcceptedVouchesFromContact: (contactId: string) => Vouch[];
  /** Accepted vouches involving a contact (sent or received) */
  getAcceptedVouchesByContact: (contactId: string) => Vouch[];

  /** Accepted vouches received by the current user (for Trust Profile settings) */
  myAcceptedVouches: Vouch[];

  /** Get the Trust Profile IDs a vouch is assigned to */
  getVouchProfileIds: (vouchId: string) => string[];
  /** Accepted vouches assigned to a specific Trust Profile */
  getAcceptedVouchesForProfile: (profileId: string) => Vouch[];

  /** Force refresh (call after accepting/rejecting a vouch) */
  refresh: () => void;
}

export const useVRCs = (): UseVRCsReturn => {
  const [refreshKey, setRefreshKey] = useState(0);
  const [notifications, setNotifications] = useState<Notification[]>([]);

  // Load notifications from the runtime service (picks up acceptances)
  useEffect(() => {
    const load = async () => {
      const all = await notificationService.getNotifications(CURRENT_USER_ID);
      setNotifications(all);
    };
    load();
  }, [refreshKey]);

  const refresh = useCallback(() => {
    setRefreshKey(k => k + 1);
  }, []);

  const getStatusFromNotifications = useCallback(
    (credentialId: string): 'accepted' | 'rejected' | 'pending' => {
      const notification = notifications.find(
        n => n.type === 'vouch' && n.metadata?.vouchId === credentialId
      );
      return (notification?.status as 'accepted' | 'rejected' | 'pending') || 'pending';
    },
    [notifications]
  );

  const vouches = useMemo(() => mockVouches, []);

  const acceptedVouches = useMemo(
    () => vouches.filter(v => getStatusFromNotifications(v.id) === 'accepted'),
    [vouches, getStatusFromNotifications]
  );

  const getVouchById = useCallback(
    (id: string) => vouches.find(v => v.id === id),
    [vouches]
  );

  const getVouchStatus = useCallback(
    (id: string) => getStatusFromNotifications(id),
    [getStatusFromNotifications]
  );

  const getAcceptedVouchesFromContact = useCallback(
    (contactId: string) =>
      acceptedVouches.filter(v => v.fromUserId === contactId),
    [acceptedVouches]
  );

  const getAcceptedVouchesByContact = useCallback(
    (contactId: string) =>
      acceptedVouches.filter(v => v.fromUserId === contactId || v.toUserId === contactId),
    [acceptedVouches]
  );

  const myAcceptedVouches = useMemo(
    () => acceptedVouches.filter(v => v.toUserId === CURRENT_USER_ID),
    [acceptedVouches]
  );

  const getVouchProfileIds = useCallback(
    (vouchId: string): string[] => {
      const notification = notifications.find(
        n => n.type === 'vouch' && n.metadata?.vouchId === vouchId
      );
      return notification?.metadata?.rCardIds || [];
    },
    [notifications]
  );

  const getAcceptedVouchesForProfile = useCallback(
    (profileId: string): Vouch[] =>
      myAcceptedVouches.filter(v => {
        const assignedIds = getVouchProfileIds(v.id);
        return assignedIds.includes(profileId);
      }),
    [myAcceptedVouches, getVouchProfileIds]
  );

  return {
    vouches,
    acceptedVouches,
    getVouchById,
    getVouchStatus,
    getAcceptedVouchesFromContact,
    getAcceptedVouchesByContact,
    myAcceptedVouches,
    getVouchProfileIds,
    getAcceptedVouchesForProfile,
    refresh,
  };
};
