/**
 * Trust Layer Demo — shared data.
 * Cast, organisations, glossary, credential fixtures and canonical links.
 * Crypto is SIMULATED throughout — proofValue strings are placeholders.
 * Source of truth: "PLANET Trust Layer Demo — Spec".
 */

export type CredentialType = 'VMC' | 'VRC' | 'VEC' | 'VIC';

/** Canonical plain-English glossary (spelled out on first use via GlossaryAside). */
export const GLOSSARY: Record<string, { full: string; plain: string }> = {
  DID: {
    full: 'Decentralised Identifier',
    plain:
      'A unique address on the internet that you control — like an email address, but no company owns it.',
  },
  VMC: {
    full: 'Verifiable Membership Credential',
    plain:
      "A verified proof that you're a member of a community, issued and cryptographically signed by that community.",
  },
  VRC: {
    full: 'Verifiable Relationship Credential',
    plain:
      'A verified record that two people know and trust each other, signed by both parties.',
  },
  VEC: {
    full: 'Verifiable Endorsement Credential',
    plain:
      "A verified statement about someone's skills or qualities, signed by the person or organisation making it.",
  },
  VIC: {
    full: 'Verifiable Invitation Credential',
    plain: 'A verified invitation to join a community, issued by a member or admin.',
  },
  VTC: {
    full: 'Verifiable Trust Community',
    plain:
      'A community that issues and verifies credentials on the network — has its own DID and governance rules.',
  },
  VTN: {
    full: 'Verifiable Trust Network',
    plain:
      "A network of Verifiable Trust Communities that recognise each other's credentials.",
  },
  PHC: {
    full: 'Personhood Credential',
    plain:
      'A credential that verifies you are a real human being — the defence against bots and unwanted AI agents.',
  },
  'C-DID': {
    full: 'Community DID',
    plain:
      "A community's unique decentralised identifier — controlled by that community's own governance.",
  },
  'M-DID': {
    full: 'Member DID',
    plain:
      "An individual member's unique decentralised identifier — controlled only by that person.",
  },
  DTG: {
    full: 'Decentralised Trust Graph',
    plain:
      'The underlying data structure of the network — a graph of verified relationships between people and communities.',
  },
  KYC: {
    full: 'Know Your Customer',
    plain:
      "Identity checks organisations run to confirm who they're dealing with — typically slow, expensive and privacy-invasive.",
  },
} as const;

/** Canonical outbound links used across the demo (resolved from the spec). */
export const LINKS = {
  firstPersonProject: 'https://www.firstperson.network/',
  openCoop: 'https://open.coop/',
  ayra: 'https://ayra.forum/',
  w3cDids: 'https://www.w3.org/TR/did-1.0/',
  w3cVc: 'https://www.w3.org/TR/vc-data-model-2.0/',
  trustOverIp: 'https://trustoverip.org/',
  toipDtgSpec: 'https://github.com/trustoverip/dtgwg-cred-spec',
  myTerms: 'https://myterms.info/',
  myTermsSdBase: 'https://myterms.info/ieee7012-standards/',
  openPolicyAgent: 'https://www.openpolicyagent.org/',
  // Closing CTAs
  ctaPilot: 'https://open.coop/contact/',
  ctaBuild: 'https://github.com/OpenVTC',
  ctaJoin: 'https://collab.open.coop/',
} as const;

export const CRYPTO_SIMULATED_NOTE =
  'Cryptographic signatures simulated in this demo. Real implementation uses W3C Data Integrity Proofs.';

export interface DemoCredential {
  id: string;
  type: CredentialType;
  /** Card headline — the counterparty (person or org). */
  title: string;
  /** One-line context under the headline. */
  subtitle: string;
  /** e.g. "Member since Jan 2023", or the endorsement quote. */
  detail: string;
  signedBy: string;
  active?: boolean;
  /** Simulated W3C VC 2.0 credential (data model 2.0 + ToIP DTG). */
  rawJson: Record<string, unknown>;
}

/** Sarah's vault — the six founding credentials from §1 of the spec. */
export const SARAH_VAULT: DemoCredential[] = [
  {
    id: 'vmc-bristol',
    type: 'VMC',
    title: 'Bristol Tech Co-op',
    subtitle: 'Verifiable Membership Credential',
    detail: 'Member since Jan 2023',
    signedBy: 'Bristol Tech Co-op',
    active: true,
    rawJson: {
      '@context': [
        'https://www.w3.org/ns/credentials/v2',
        'https://firstperson.network/credentials/dtg/v1',
      ],
      id: 'urn:uuid:a1b2c3d4-...',
      type: ['VerifiableCredential', 'MembershipCredential'],
      issuer: {
        id: 'did:web:bristoltechcoop.coop',
        name: 'Bristol Tech Co-op',
        memberOf: 'did:web:thecooperativenetwork.org',
      },
      validFrom: '2023-01-15T00:00:00Z',
      validUntil: '2027-01-15T00:00:00Z',
      credentialSubject: {
        id: 'did:key:z6MkSarah...',
        membershipType: 'full',
        communityName: 'Bristol Tech Co-op',
        memberSince: '2023-01-15',
      },
      proof: {
        type: 'DataIntegrityProof',
        cryptosuite: 'eddsa-rdfc-2022',
        verificationMethod: 'did:web:bristoltechcoop.coop#key-1',
        proofValue: 'z3FXQjecSb...',
      },
    },
  },
  {
    id: 'vrc-priya',
    type: 'VRC',
    title: 'Priya Kumar',
    subtitle: 'Verifiable Relationship Credential',
    detail: 'Mutual relationship · Bristol Tech Co-op',
    signedBy: 'Priya',
    active: true,
    rawJson: {
      '@context': [
        'https://www.w3.org/ns/credentials/v2',
        'https://firstperson.network/credentials/dtg/v1',
      ],
      id: 'urn:uuid:b2c3d4e5-...',
      type: ['VerifiableCredential', 'RelationshipCredential'],
      issuer: { id: 'did:key:z6MkPriya...', name: 'Priya Kumar' },
      validFrom: '2023-03-10T00:00:00Z',
      credentialSubject: {
        id: 'did:key:z6MkSarah...',
        relationshipType: 'mutual',
        context: 'Bristol Tech Co-op',
        statement: 'We have worked together and I vouch for this person',
      },
      proof: {
        type: 'DataIntegrityProof',
        cryptosuite: 'eddsa-rdfc-2022',
        verificationMethod: 'did:key:z6MkPriya...#key-1',
        proofValue: 'z4GYRkdTa...',
      },
    },
  },
  {
    id: 'vrc-jamie',
    type: 'VRC',
    title: 'Jamie Walsh',
    subtitle: 'Verifiable Relationship Credential',
    detail: 'Mutual relationship · Bristol Tech Co-op',
    signedBy: 'Jamie',
    active: true,
    rawJson: {
      '@context': [
        'https://www.w3.org/ns/credentials/v2',
        'https://firstperson.network/credentials/dtg/v1',
      ],
      id: 'urn:uuid:c3d4e5f6-...',
      type: ['VerifiableCredential', 'RelationshipCredential'],
      issuer: { id: 'did:key:z6MkJamie...', name: 'Jamie Walsh' },
      validFrom: '2023-05-02T00:00:00Z',
      credentialSubject: {
        id: 'did:key:z6MkSarah...',
        relationshipType: 'mutual',
        context: 'Bristol Tech Co-op',
        statement: 'We have worked together and I vouch for this person',
      },
      proof: {
        type: 'DataIntegrityProof',
        cryptosuite: 'eddsa-rdfc-2022',
        verificationMethod: 'did:key:z6MkJamie...#key-1',
        proofValue: 'z5HZSleUb...',
      },
    },
  },
  {
    id: 'vrc-daniel',
    type: 'VRC',
    title: 'Daniel Osei',
    subtitle: 'Verifiable Relationship Credential',
    detail: 'Mutual relationship · Avon Community Energy Co-op',
    signedBy: 'Daniel',
    active: true,
    rawJson: {
      '@context': [
        'https://www.w3.org/ns/credentials/v2',
        'https://firstperson.network/credentials/dtg/v1',
      ],
      id: 'urn:uuid:d4e5f6a7-...',
      type: ['VerifiableCredential', 'RelationshipCredential'],
      issuer: { id: 'did:key:z6MkDaniel...', name: 'Daniel Osei' },
      validFrom: '2023-09-18T00:00:00Z',
      credentialSubject: {
        id: 'did:key:z6MkSarah...',
        relationshipType: 'mutual',
        context: 'Avon Community Energy Co-op',
        statement: 'We have worked together and I vouch for this person',
      },
      proof: {
        type: 'DataIntegrityProof',
        cryptosuite: 'eddsa-rdfc-2022',
        verificationMethod: 'did:key:z6MkDaniel...#key-1',
        proofValue: 'z6JAToVfc...',
      },
    },
  },
  {
    id: 'vec-bristol',
    type: 'VEC',
    title: 'Bristol Tech Co-op',
    subtitle: 'Verifiable Endorsement Credential',
    detail: '“Delivered our website redesign on time and under budget”',
    signedBy: 'Bristol Tech Co-op',
    active: true,
    rawJson: {
      '@context': [
        'https://www.w3.org/ns/credentials/v2',
        'https://firstperson.network/credentials/dtg/v1',
      ],
      id: 'urn:uuid:c3d4e5f6-...',
      type: ['VerifiableCredential', 'EndorsementCredential'],
      issuer: { id: 'did:web:bristoltechcoop.coop', name: 'Bristol Tech Co-op' },
      validFrom: '2024-06-01T00:00:00Z',
      credentialSubject: {
        id: 'did:key:z6MkSarah...',
        endorsement: 'Delivered our website redesign on time and under budget',
        context: 'Client project, 2024',
      },
      proof: {
        type: 'DataIntegrityProof',
        cryptosuite: 'eddsa-rdfc-2022',
        verificationMethod: 'did:web:bristoltechcoop.coop#key-1',
        proofValue: 'z5HZSleUb...',
      },
    },
  },
  {
    id: 'vec-avon',
    type: 'VEC',
    title: 'Avon Community Energy Co-op',
    subtitle: 'Verifiable Endorsement Credential',
    detail: '“Thoughtful collaborator, strong on governance questions”',
    signedBy: 'Avon Community Energy Co-op',
    active: true,
    rawJson: {
      '@context': [
        'https://www.w3.org/ns/credentials/v2',
        'https://firstperson.network/credentials/dtg/v1',
      ],
      id: 'urn:uuid:e5f6a7b8-...',
      type: ['VerifiableCredential', 'EndorsementCredential'],
      issuer: {
        id: 'did:web:avoncommunityenergy.coop',
        name: 'Avon Community Energy Co-op',
      },
      validFrom: '2024-11-12T00:00:00Z',
      credentialSubject: {
        id: 'did:key:z6MkSarah...',
        endorsement: 'Thoughtful collaborator, strong on governance questions',
        context: 'Governance working group, 2024',
      },
      proof: {
        type: 'DataIntegrityProof',
        cryptosuite: 'eddsa-rdfc-2022',
        verificationMethod: 'did:web:avoncommunityenergy.coop#key-1',
        proofValue: 'z7KBUpWgd...',
      },
    },
  },
];

/** Accent colours for credential type badges (kept distinct from UX/Backend annotation colours). */
export const CREDENTIAL_ACCENT: Record<CredentialType, string> = {
  VMC: '#0F7B6C', // teal — membership
  VRC: '#8B5CF6', // violet — relationship
  VEC: '#C2410C', // amber-brown — endorsement
  VIC: '#0369A1', // blue — invitation
};
