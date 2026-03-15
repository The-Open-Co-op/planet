/**
 * Mock Verifiable Relationship Credentials (VRCs).
 *
 * Single source of truth for all vouch data.
 * Only ACCEPTED credentials belong here — pending/rejected are
 * tracked in the notification layer until the user acts on them.
 *
 * In the future monorepo this will be replaced by the protocol SDK
 * hydrating the TrustStore via `packages/hooks`.
 */

import type { Vouch } from '@/types/notification';

/**
 * All vouch VRCs — both accepted and pending/rejected.
 * The notification layer determines which are accepted.
 * IDs here MUST match the vouchId in notification metadata.
 */
export const mockVouches: Vouch[] = [
  // Accepted: notification '3' (status: accepted)
  {
    id: 'vouch-2',
    fromUserId: 'contact:1',
    fromUserName: 'Sarah Mitchell',
    fromUserAvatar: undefined,
    toUserId: 'current-user',
    skill: 'TypeScript',
    description: 'Strong type safety practices and excellent knowledge of advanced TypeScript features.',
    level: 'expert',
    endorsementText: 'One of the best TypeScript developers I have worked with.',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5),
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5),
  },
  // Accepted: notification '7' (status: accepted)
  {
    id: 'vouch-4',
    fromUserId: 'contact:1',
    fromUserName: 'Sarah Mitchell',
    fromUserAvatar: undefined,
    toUserId: 'current-user',
    skill: 'Project Management',
    description: 'Outstanding project management and team leadership skills.',
    level: 'advanced',
    endorsementText: 'Led our biggest project delivery successfully.',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 14),
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 14),
  },
  // Pending: notification 'vouch-amanda' (status: pending)
  {
    id: 'vouch-amanda-1',
    fromUserId: 'contact:7',
    fromUserName: 'Amanda Foster',
    fromUserAvatar: undefined,
    toUserId: 'current-user',
    skill: 'Machine Learning',
    description: 'Deep understanding of ML algorithms and practical implementation. Great at explaining complex concepts.',
    level: 'expert',
    endorsementText: 'Collaborated on several AI research projects. Exceptional knowledge and teaching ability.',
    createdAt: new Date(Date.now() - 1000 * 60 * 30),
    updatedAt: new Date(Date.now() - 1000 * 60 * 30),
  },
  // Pending: notification '1' (status: pending)
  {
    id: 'vouch-1',
    fromUserId: 'contact:1',
    fromUserName: 'Sarah Mitchell',
    fromUserAvatar: undefined,
    toUserId: 'current-user',
    skill: 'React Development',
    description: 'Excellent component architecture and state management. Always writes clean, maintainable code.',
    level: 'advanced',
    endorsementText: 'I worked with this person on multiple React projects and they consistently delivered high-quality solutions.',
    createdAt: new Date(Date.now() - 1000 * 60 * 60),
    updatedAt: new Date(Date.now() - 1000 * 60 * 60),
  },
  // Rejected: notification '5' (status: rejected)
  {
    id: 'vouch-3',
    fromUserId: 'contact:7',
    fromUserName: 'Amanda Foster',
    fromUserAvatar: undefined,
    toUserId: 'current-user',
    skill: 'Node.js',
    description: 'Solid backend development skills with Node.js and Express.',
    level: 'intermediate',
    endorsementText: 'Worked together on a server-side project.',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3),
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3),
  },
  // Accepted: notification 'notif-vouch-5' (status: accepted)
  {
    id: 'vouch-5',
    fromUserId: 'contact:2',
    fromUserName: 'Ariana Bahrami',
    fromUserAvatar: undefined,
    toUserId: 'current-user',
    skill: 'API Design',
    description: 'Excellent API design patterns and RESTful architecture knowledge.',
    level: 'advanced',
    endorsementText: 'Designed several high-traffic APIs together. Always prioritizes clean contracts.',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 4),
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 4),
  },
  // Pending: notification 'notif-vouch-6' (status: pending)
  {
    id: 'vouch-6',
    fromUserId: 'contact:3',
    fromUserName: 'Marcus Thompson',
    fromUserAvatar: undefined,
    toUserId: 'current-user',
    skill: 'Cloud Architecture',
    description: 'Deep expertise in cloud infrastructure and distributed systems.',
    level: 'expert',
    endorsementText: 'Architected our entire cloud migration. Exceptional systems thinking.',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2),
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 2),
  },
  // Pending: notification 'notif-vouch-7' (status: pending)
  {
    id: 'vouch-7',
    fromUserId: 'contact:5',
    fromUserName: 'Elena Rodriguez',
    fromUserAvatar: undefined,
    toUserId: 'current-user',
    skill: 'UI/UX Design',
    description: 'Strong eye for design and user experience. Creates intuitive interfaces.',
    level: 'advanced',
    endorsementText: 'Collaborated on several product redesigns with outstanding results.',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 4),
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 4),
  },
  // Accepted: notification 'notif-vouch-8' (status: accepted)
  {
    id: 'vouch-8',
    fromUserId: 'contact:2',
    fromUserName: 'Ariana Bahrami',
    fromUserAvatar: undefined,
    toUserId: 'current-user',
    skill: 'Team Leadership',
    description: 'Inspires and motivates teams to deliver their best work.',
    level: 'expert',
    endorsementText: 'One of the most effective team leaders I have ever worked with.',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 10),
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 10),
  },
];
