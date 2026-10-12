import { VerifiedUser, PersonAdd, WorkspacePremium, VpnKey, InfoOutlined } from '@mui/icons-material';
import type { ReactNode } from 'react';

/**
 * One place that says what each kind of alert looks like, so every demo and
 * the app itself delineate them the same way: a colour, an icon and a short
 * label. Pass `notificationIcon` into NotificationItem, or let it default.
 */

export interface NotificationStyle {
  color: string;
  label: string;
  icon: ReactNode;
}

const ICON_SX = { fontSize: 16 };

export const NOTIFICATION_STYLE: Record<string, NotificationStyle> = {
  vouch: { color: '#0066CC', label: 'VOUCH', icon: <VerifiedUser sx={ICON_SX} /> },
  connection: { color: '#059669', label: 'CONNECTION', icon: <PersonAdd sx={ICON_SX} /> },
  record: { color: '#7C3AED', label: 'RECORD', icon: <WorkspacePremium sx={ICON_SX} /> },
  request: { color: '#B45309', label: 'REQUEST', icon: <VpnKey sx={ICON_SX} /> },
  system: { color: '#6B7280', label: 'SYSTEM', icon: <InfoOutlined sx={ICON_SX} /> },
};

export const styleFor = (type: string): NotificationStyle =>
  NOTIFICATION_STYLE[type] || NOTIFICATION_STYLE.system;

/** Default icon accessor — matches the old getNotificationIcon signature. */
export const notificationIcon = (type: string): ReactNode => styleFor(type).icon;
