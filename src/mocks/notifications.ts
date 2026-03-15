import type { Notification } from '@/types/notification';

// Re-export VRC data from its canonical location
export { mockVouches } from './vrcs';

export const mockNotifications: Notification[] = [
  {
    id: 'vouch-amanda',
    type: 'vouch',
    title: 'New Skill Vouch',
    message: 'Vouched for your Machine Learning skills',
    fromUserId: 'contact:7',
    fromUserName: 'Amanda Foster',
    fromUserAvatar: undefined,
    targetUserId: 'current-user',
    isRead: false,
    isActionable: true,
    status: 'pending',
    metadata: {
      vouchId: 'vouch-amanda-1',
      contactId: 'contact:7',
    },
    createdAt: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
    updatedAt: new Date(Date.now() - 1000 * 60 * 30),
  },
  {
    id: 'conn-1',
    type: 'connection',
    title: 'New Connection Request',
    message: 'Would like to connect',
    fromUserId: 'user-emily',
    fromUserName: 'Emily Watson',
    fromUserAvatar: undefined,
    targetUserId: 'current-user',
    isRead: false,
    isActionable: true,
    status: 'pending',
    metadata: {
      contactId: 'contact-emily',
    },
    createdAt: new Date(Date.now() - 1000 * 60 * 5), // 5 minutes ago
    updatedAt: new Date(Date.now() - 1000 * 60 * 5),
  },
  {
    id: 'conn-2',
    type: 'connection',
    title: 'New Connection Request',
    message: 'Would like to connect',
    fromUserId: 'user-david',
    fromUserName: 'David Park',
    fromUserAvatar: undefined,
    targetUserId: 'current-user',
    isRead: false,
    isActionable: true,
    status: 'pending',
    metadata: {
      contactId: 'contact-david',
    },
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 3), // 3 hours ago
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 3),
  },
  {
    id: '1',
    type: 'vouch',
    title: 'New Skill Vouch',
    message: 'Vouched for your React Development skills',
    fromUserId: 'contact:1',
    fromUserName: 'Sarah Mitchell',
    fromUserAvatar: undefined,
    targetUserId: 'current-user',
    isRead: false,
    isActionable: true,
    status: 'pending',
    metadata: {
      vouchId: 'vouch-1',
      contactId: 'contact:1',
    },
    createdAt: new Date(Date.now() - 1000 * 60 * 60), // 1 hour ago
    updatedAt: new Date(Date.now() - 1000 * 60 * 60),
  },
  {
    id: '3',
    type: 'vouch',
    title: 'Skill Vouch Accepted',
    message: 'Vouched for your TypeScript skills',
    fromUserId: 'contact:1',
    fromUserName: 'Sarah Mitchell',
    fromUserAvatar: undefined,
    targetUserId: 'current-user',
    isRead: true,
    isActionable: false,
    status: 'accepted',
    metadata: {
      vouchId: 'vouch-2',
      rCardIds: ['default-3', 'default-4'],
      contactId: 'contact:1',
    },
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5), // 5 days ago
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 4), // Updated 4 days ago
  },
  // Add some rejected notifications for testing
  {
    id: '5',
    type: 'vouch',
    title: 'Skill Vouch Rejected',
    message: 'Vouched for your Node.js skills',
    fromUserId: 'contact:7',
    fromUserName: 'Amanda Foster',
    fromUserAvatar: undefined,
    targetUserId: 'current-user',
    isRead: true,
    isActionable: false,
    status: 'rejected',
    metadata: {
      vouchId: 'vouch-3',
      contactId: 'contact:7',
    },
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3), // 3 days ago
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2), // Rejected 2 days ago
  },
  {
    id: '7',
    type: 'vouch',
    title: 'Skill Vouch Accepted',
    message: 'Vouched for your Project Management skills',
    fromUserId: 'contact:1',
    fromUserName: 'Sarah Mitchell',
    fromUserAvatar: undefined,
    targetUserId: 'current-user',
    isRead: true,
    isActionable: false,
    status: 'accepted',
    metadata: {
      vouchId: 'vouch-4',
      rCardIds: ['default-3'],
      contactId: 'contact:1',
    },
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 14), // 2 weeks ago
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 13), // Updated 13 days ago
  },
  // New vouch notifications
  {
    id: 'notif-vouch-5',
    type: 'vouch',
    title: 'Skill Vouch Accepted',
    message: 'Vouched for your API Design skills',
    fromUserId: 'contact:2',
    fromUserName: 'Ariana Bahrami',
    fromUserAvatar: undefined,
    targetUserId: 'current-user',
    isRead: true,
    isActionable: false,
    status: 'accepted',
    metadata: {
      vouchId: 'vouch-5',
      rCardIds: ['default-2', 'default-4'],
      contactId: 'contact:2',
    },
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 4), // 4 days ago
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3), // Updated 3 days ago
  },
  {
    id: 'notif-vouch-6',
    type: 'vouch',
    title: 'New Skill Vouch',
    message: 'Vouched for your Cloud Architecture skills',
    fromUserId: 'contact:3',
    fromUserName: 'Marcus Thompson',
    fromUserAvatar: undefined,
    targetUserId: 'current-user',
    isRead: false,
    isActionable: true,
    status: 'pending',
    metadata: {
      vouchId: 'vouch-6',
      contactId: 'contact:3',
    },
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 2),
  },
  {
    id: 'notif-vouch-7',
    type: 'vouch',
    title: 'New Skill Vouch',
    message: 'Vouched for your UI/UX Design skills',
    fromUserId: 'contact:5',
    fromUserName: 'Elena Rodriguez',
    fromUserAvatar: undefined,
    targetUserId: 'current-user',
    isRead: false,
    isActionable: true,
    status: 'pending',
    metadata: {
      vouchId: 'vouch-7',
      contactId: 'contact:5',
    },
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 4), // 4 hours ago
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 4),
  },
  {
    id: 'notif-vouch-8',
    type: 'vouch',
    title: 'Skill Vouch Accepted',
    message: 'Vouched for your Team Leadership skills',
    fromUserId: 'contact:2',
    fromUserName: 'Ariana Bahrami',
    fromUserAvatar: undefined,
    targetUserId: 'current-user',
    isRead: true,
    isActionable: false,
    status: 'accepted',
    metadata: {
      vouchId: 'vouch-8',
      rCardIds: ['default-3'],
      contactId: 'contact:2',
    },
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 10), // 10 days ago
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 9), // Updated 9 days ago
  },
];
