/**
 * Mock Verifiable Relationship Credentials (VRCs).
 *
 * Single source of truth for all vouch data.
 * Based on W3C Verifiable Credential / VouchCredential schema.
 *
 * In the future monorepo this will be replaced by the protocol SDK
 * hydrating the TrustStore via `packages/hooks`.
 */

import type { Vouch } from '@/types/notification';

const CURRENT_USER = 'did:example:currentuser';

/**
 * All vouch VRCs.
 * The notification layer determines acceptance status.
 * IDs here MUST match the vouchId in notification metadata.
 */
export const mockVouches: Vouch[] = [
  // Accepted: notification '3'
  {
    id: 'vouch-2',
    issuer: 'contact:1',       // Sarah Mitchell
    subject: CURRENT_USER,
    trustArea: 'TypeScript',
    confidenceScore: 0.95,
    comment: 'One of the best TypeScript developers I have worked with.',
    issuanceDate: '2026-03-11T09:15:00Z',
  },
  // Accepted: notification '7'
  {
    id: 'vouch-4',
    issuer: 'contact:1',       // Sarah Mitchell
    subject: CURRENT_USER,
    trustArea: 'Project Management',
    confidenceScore: 0.88,
    comment: 'Led our biggest project delivery successfully.',
    issuanceDate: '2026-03-02T14:30:00Z',
  },
  // Pending: notification 'vouch-amanda'
  {
    id: 'vouch-amanda-1',
    issuer: 'contact:7',       // Amanda Foster
    subject: CURRENT_USER,
    trustArea: 'Machine Learning',
    confidenceScore: 0.92,
    comment: 'Collaborated on several AI research projects. Exceptional knowledge and teaching ability.',
    issuanceDate: '2026-03-16T07:30:00Z',
  },
  // Pending: notification '1'
  {
    id: 'vouch-1',
    issuer: 'contact:1',       // Sarah Mitchell
    subject: CURRENT_USER,
    trustArea: 'React Development',
    confidenceScore: 0.90,
    comment: 'Consistently delivered high-quality React solutions across multiple projects.',
    issuanceDate: '2026-03-16T06:45:00Z',
  },
  // Rejected: notification '5'
  {
    id: 'vouch-3',
    issuer: 'contact:7',       // Amanda Foster
    subject: CURRENT_USER,
    trustArea: 'Node.js',
    confidenceScore: 0.72,
    comment: 'Worked together on a server-side project.',
    issuanceDate: '2026-03-13T11:20:00Z',
  },
  // Accepted: notification 'notif-vouch-5'
  {
    id: 'vouch-5',
    issuer: 'contact:2',       // Ariana Bahrami
    subject: CURRENT_USER,
    trustArea: 'API Design',
    confidenceScore: 0.85,
    comment: 'Designed several high-traffic APIs together. Always prioritises clean contracts.',
    issuanceDate: '2026-03-12T16:00:00Z',
  },
  // Pending: notification 'notif-vouch-6'
  {
    id: 'vouch-6',
    issuer: 'contact:3',       // Marcus Thompson
    subject: CURRENT_USER,
    trustArea: 'Cloud Architecture',
    confidenceScore: 0.96,
    comment: 'Architected our entire cloud migration. Exceptional systems thinking.',
    issuanceDate: '2026-03-16T05:50:00Z',
  },
  // Pending: notification 'notif-vouch-7'
  {
    id: 'vouch-7',
    issuer: 'contact:5',       // Elena Rodriguez
    subject: CURRENT_USER,
    trustArea: 'UI/UX Design',
    confidenceScore: 0.82,
    comment: 'Collaborated on several product redesigns with outstanding results.',
    issuanceDate: '2026-03-16T03:45:00Z',
  },
  // Accepted: notification 'notif-vouch-8'
  {
    id: 'vouch-8',
    issuer: 'contact:2',       // Ariana Bahrami
    subject: CURRENT_USER,
    trustArea: 'Team Leadership',
    confidenceScore: 0.94,
    comment: 'One of the most effective team leaders I have ever worked with.',
    issuanceDate: '2026-03-06T10:15:00Z',
  },
];
