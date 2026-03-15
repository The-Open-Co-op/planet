import type { Notification } from '@/types/notification';

export interface NotificationItemProps {
  notification: Notification;
  onMarkAsRead: (notificationId: string) => void;
  onAcceptVouch: (notificationId: string, vouchId: string) => void;
  onRejectVouch: (notificationId: string, vouchId: string) => void;
  onAssignToRCard: (notificationId: string, rCardId: string) => void;
}
