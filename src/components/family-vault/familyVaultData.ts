/**
 * Family Vault demo — all sample data in one place.
 *
 * The Rivera family is moving from Denver to Seattle. Alice (16) and Ethan (10)
 * are the two learners from the Global Memory Workshop report (Stanford HAI /
 * Gates Foundation / Mozilla / AWS, March 2026) — her portable math learner
 * profile and his portable vaccination profile — here as one family, because
 * the report's own health story begins "when Ethan's family moves to a new state".
 *
 * Field names in the learner and vaccination profiles are taken verbatim from
 * that report so the audience sees their own schema rendered as a product.
 *
 * Everything here is fictional sample data. No organisation named is a partner.
 */

export type PersonId = 'maria' | 'daniel' | 'alice' | 'ethan' | 'rosa' | 'okafor';

export interface Person {
  id: PersonId;
  name: string;
  age?: number;
  /** Plain-English role, shown on the card. */
  role: string;
  /** What this person can do, in plain English. */
  access: string;
  initials: string;
  color: string;
  verified: boolean;
  /** Trusted circle members sit outside the household. */
  circle: 'household' | 'trusted';
}

export const FAMILY: Person[] = [
  {
    id: 'maria',
    name: 'Maria Rivera',
    role: 'Parent',
    access: 'Holds the vault, guardian for Alice and Ethan',
    initials: 'MR',
    color: '#0066CC',
    verified: true,
    circle: 'household',
  },
  {
    id: 'daniel',
    name: 'Daniel Rivera',
    role: 'Parent',
    access: 'Joint guardian — same rights as Maria',
    initials: 'DR',
    color: '#7C3AED',
    verified: true,
    circle: 'household',
  },
  {
    id: 'alice',
    name: 'Alice Rivera',
    age: 16,
    role: 'Teen',
    access: 'Approves shares about her alongside a parent',
    initials: 'AR',
    color: '#0F766E',
    verified: true,
    circle: 'household',
  },
  {
    id: 'ethan',
    name: 'Ethan Rivera',
    age: 10,
    role: 'Child',
    access: 'Parents act for him until 16',
    initials: 'ER',
    color: '#C2410C',
    verified: true,
    circle: 'household',
  },
  {
    id: 'rosa',
    name: 'Rosa Rivera',
    role: 'Grandmother',
    access: 'Can view — nothing else',
    initials: 'RR',
    color: '#BE185D',
    verified: true,
    circle: 'trusted',
  },
  {
    id: 'okafor',
    name: 'Ms. Okafor',
    role: 'Math tutor',
    access: "Alice's learning plan only, until June",
    initials: 'MO',
    color: '#475569',
    verified: true,
    circle: 'trusted',
  },
];

/* ── Records ─────────────────────────────────────────────────────── */

export type RecordCategory = 'Learning' | 'Health' | 'Certificates';

export interface VaultRecord {
  id: string;
  /** Headline shown on the card. */
  title: string;
  about: PersonId;
  category: RecordCategory;
  issuer: string;
  issuedOn: string;
  /** Plain-English summary line. */
  summary: string;
  /** Shown in the "check this record" panel. */
  check: {
    signed: boolean;
    revoked: boolean;
    /** Where the signature chain leads, in plain English. */
    chain: string;
  };
  /**
   * What the issuer says the holder may do with it. This is the credential's
   * own termsOfUse — the other direction from MyTerms, which governs what
   * happens when the family shares something out.
   */
  termsOfUse?: string;
  /** Field/value rows — the report's own schema where one exists. */
  fields?: { label: string; value: string }[];
  /** Records that land in Alerts rather than already being in the vault. */
  incoming?: boolean;
}

export const RECORDS: VaultRecord[] = [
  {
    id: 'rec-transcript',
    title: 'School transcript, grades 9–10',
    about: 'alice',
    category: 'Learning',
    issuer: 'Mesa Valley Schools, Denver',
    issuedOn: '2 Feb 2026',
    summary: 'Full transcript including math, English, science and attendance.',
    check: { signed: true, revoked: false, chain: 'Mesa Valley Schools — a verified school district' },
    termsOfUse:
      'Alice holds this record and may share it with anyone. Mesa Valley can mark it withdrawn if it is corrected, but cannot take it back.',
    fields: [
      { label: 'Grades covered', value: 'Grade 9 (2024–25) and Grade 10 (2025–26)' },
      { label: 'Math', value: 'Algebra II A−; Geometry B+; Precalculus in progress' },
      { label: 'English', value: 'English 9 B+; English 10 A−' },
      { label: 'Science', value: 'Biology A−; Chemistry B' },
      { label: 'Attendance', value: '96% across both years' },
      { label: 'Provenance / Recency', value: 'Issued 2026-02-02 by the district registrar; status: final' },
    ],
    incoming: true,
  },
  {
    id: 'rec-learner',
    title: 'Portable math learner profile',
    about: 'alice',
    category: 'Learning',
    issuer: 'Mesa Valley Schools, Denver',
    issuedOn: '2 Feb 2026',
    summary: 'What Alice has mastered, where she gets stuck, and how she learns best.',
    check: { signed: true, revoked: false, chain: 'Mesa Valley Schools — a verified school district' },
    termsOfUse:
      'Alice holds this profile and may share any part of it. Mesa Valley keeps no copy of what she does with it.',
    fields: [
      { label: 'Goal / Timeline', value: 'Placement exam in 8 weeks' },
      { label: 'Current Level', value: 'Precalculus; starting functions + trig review' },
      {
        label: 'Mastery Snapshot',
        value: 'Linear eq. 0.92; Factoring 0.78; Rational expr. 0.55; Word problems 0.48; Domain/range 0.60',
      },
      { label: 'Error Patterns', value: 'Negative-sign distribution; inverse vs reciprocal; unit mismatch in setup' },
      { label: 'Learning Preferences', value: 'Worked examples first; graphs help; progressive hints' },
      { label: 'Pacing / Constraints', value: '25–30 min weekdays; 60 min weekends; short videos + exercises' },
      { label: 'Accessibility', value: 'Large text / high contrast' },
      { label: 'Provenance / Recency', value: 'Last assessed 2026-02-02; confidence: high (mastery), medium (errors)' },
    ],
    incoming: true,
  },
  {
    id: 'rec-immunization',
    title: 'Immunization record',
    about: 'ethan',
    category: 'Health',
    issuer: 'Denver Pediatrics',
    issuedOn: '2 Feb 2026',
    summary: 'Up to date through age 10. Next Tdap due in 6 months.',
    check: { signed: true, revoked: false, chain: 'Denver Pediatrics — a licensed clinic' },
    termsOfUse:
      'Ethan’s parents hold this record. Denver Pediatrics may update it, and may mark it withdrawn if it is corrected.',
    fields: [
      { label: 'Care Goal / Requirement', value: 'Meet state school immunization requirements' },
      { label: 'Current Status', value: 'Up to date through age 10; next Tdap due in 6 months' },
      { label: 'Vaccination Snapshot', value: 'MMR ✓; DTaP ✓; Varicella ✓; Hep B ✓; Flu (last dose 2026-10-12)' },
      { label: 'Pending / Upcoming', value: 'Tdap booster due 2026-08; HPV series not yet started' },
      {
        label: 'Consent Scope',
        value: 'Immunization verification with schools; full record with licensed providers only',
      },
      { label: 'Provenance / Recency', value: 'Last updated 2026-02-02; from licensed clinic EHR; status: confirmed' },
    ],
  },
  {
    id: 'rec-swim',
    title: 'Swim level 4 certificate',
    about: 'ethan',
    category: 'Certificates',
    issuer: 'Denver Parks & Rec',
    issuedOn: '14 Nov 2025',
    summary: 'Completed level 4, including 25m front crawl.',
    check: { signed: true, revoked: false, chain: 'Denver Parks & Rec — a verified program' },
    termsOfUse:
      'Ethan holds this certificate and may share it with anyone. It does not expire.',
  },
  {
    id: 'rec-robotics',
    title: 'Robotics club, 2 years',
    about: 'alice',
    category: 'Certificates',
    issuer: 'Mesa Valley Schools, Denver',
    issuedOn: '20 Jun 2025',
    summary: 'Two years in the robotics club, including regional finals.',
    check: { signed: true, revoked: false, chain: 'Mesa Valley Schools — a verified school district' },
    termsOfUse:
      'Alice holds this certificate and may share it with anyone. It does not expire.',
  },
];

/* ── Memory ──────────────────────────────────────────────────────── */

export type MemoryCategory = 'Goals' | 'Preferences' | 'Constraints' | 'Accessibility' | 'Facts';

/** One colour per kind of memory, used on the filters and the entries. */
export const MEMORY_COLOR: Record<MemoryCategory, string> = {
  Goals: '#0F766E',
  Preferences: '#7C3AED',
  Constraints: '#B45309',
  Accessibility: '#0066CC',
  Facts: '#BE185D',
};

export interface MemoryEntry {
  id: string;
  about: PersonId;
  category: MemoryCategory;
  /** The entry itself, in the family's own words where declared. */
  text: string;
  /** true = the family said it; false = the assistant worked it out. */
  declared: boolean;
  /** Where it came from, in plain English. */
  source: string;
  on: string;
  /** Only shown for inferred entries. */
  confidence?: 'low' | 'medium' | 'high';
  /** Who currently has access to this entry. */
  sharedWith?: string[];
  /** Id of an entry this one disagrees with. */
  contradicts?: string;
  /** Shown on a teen's entry in a parent's view. */
  teenVisible?: boolean;
}

export const MEMORY: MemoryEntry[] = [
  {
    id: 'mem-goal',
    about: 'alice',
    category: 'Goals',
    text: 'Placement exam in 8 weeks',
    declared: true,
    source: 'Said by Alice',
    on: '14 Jan 2026',
    sharedWith: ['Ms. Okafor'],
  },
  {
    id: 'mem-college',
    about: 'alice',
    category: 'Goals',
    text: 'Wants to study engineering',
    declared: true,
    source: 'Said by Alice',
    on: '3 Dec 2025',
  },
  {
    id: 'mem-examples',
    about: 'alice',
    category: 'Preferences',
    text: 'Worked examples first; graphs help; progressive hints',
    declared: false,
    source: 'From Math Kingdom',
    on: '2 Feb 2026',
    confidence: 'high',
    sharedWith: ['Ms. Okafor'],
  },
  {
    id: 'mem-anxious',
    about: 'alice',
    category: 'Facts',
    text: 'Gets anxious before timed tests',
    declared: false,
    source: 'Inferred from tutoring sessions',
    on: '28 Jan 2026',
    confidence: 'medium',
    teenVisible: true,
  },
  {
    id: 'mem-pacing',
    about: 'alice',
    category: 'Constraints',
    text: '25–30 min on weekdays; 60 min at weekends',
    declared: true,
    source: 'Said by Maria',
    on: '14 Jan 2026',
  },
  {
    id: 'mem-pacing-old',
    about: 'alice',
    category: 'Constraints',
    text: 'Up to 90 min on weekdays',
    declared: false,
    source: 'From Math Kingdom',
    on: '6 Sep 2025',
    confidence: 'low',
    contradicts: 'mem-pacing',
  },
  {
    id: 'mem-text',
    about: 'alice',
    category: 'Accessibility',
    text: 'Large text and high contrast',
    declared: true,
    source: 'Said by Alice',
    on: '6 Sep 2025',
    sharedWith: ['Ms. Okafor'],
  },
  {
    id: 'mem-peanut',
    about: 'ethan',
    category: 'Facts',
    text: 'Peanut allergy — carries an EpiPen',
    declared: true,
    source: 'Said by Maria',
    on: '11 Aug 2025',
    sharedWith: ['Northgate Family Clinic'],
  },
  {
    id: 'mem-reading',
    about: 'ethan',
    category: 'Preferences',
    text: 'Reads better aloud than silently',
    declared: false,
    source: 'Inferred from reading app sessions',
    on: '20 Jan 2026',
    confidence: 'medium',
  },
];

/* ── The new school's request ────────────────────────────────────── */

export interface RequestItem {
  id: string;
  label: string;
  /** Grouped so "math but not English" is one tap. */
  group: string;
  /** Selected when the request first opens. */
  defaultOn: boolean;
}

export const SCHOOL_REQUEST = {
  org: 'Cedar Park High School, Seattle',
  about: 'alice' as PersonId,
  purpose: 'To place Alice in the right math and English classes before term starts.',
  durations: ['This school year', '30 days', 'Until I revoke it'],
  defaultDuration: 'This school year',
  items: [
    { id: 'req-math', label: 'Math grades and mastery', group: 'Learning', defaultOn: true },
    { id: 'req-english', label: 'English grades', group: 'Learning', defaultOn: true },
    { id: 'req-attendance', label: 'Attendance record', group: 'Learning', defaultOn: true },
    { id: 'req-prefs', label: 'How Alice learns best', group: 'Learning', defaultOn: true },
    { id: 'req-access', label: 'Accessibility needs', group: 'Support', defaultOn: true },
    { id: 'req-health', label: 'Full health record', group: 'Health', defaultOn: false },
  ] as RequestItem[],
};

/* ── Trust layer ─────────────────────────────────────────────────── */

export type BuildStatus = 'Built' | 'Partly built' | 'Not built' | 'Not started';

export interface TrustLayerRow {
  /** Step slug this row belongs to. */
  step: string;
  /** What the family sees. */
  surface: string;
  /** What it rests on. */
  capability: string;
  status: BuildStatus;
  /** Honest qualifier, straight from the OpenVTC build report. */
  note?: string;
}

/**
 * Statuses are taken from the Week 41 OpenVTC build report as quoted in the
 * Family Vault proposal — not softened for the demo.
 */
export const TRUST_LAYER: TrustLayerRow[] = [
  {
    step: 'home',
    surface: 'Everyone in the circle is a verified person',
    capability: 'Personal agents holding keys, running in a secure enclave',
    status: 'Built',
  },
  {
    step: 'home',
    surface: 'Grandmother and tutor are verified, with defined roles',
    capability: 'Verified membership, vouching and hidden vetting (community app 0.5.0)',
    status: 'Built',
  },
  {
    step: 'home',
    surface: 'A parent acts for a child',
    capability: 'Guardianship / delegation credentials for children',
    status: 'Not built',
  },
  {
    step: 'records',
    surface: 'Records arrive signed, and can be checked',
    capability: 'Reading credentials from government wallets (EU, Swiss swiyu), revocation checks',
    status: 'Partly built',
    note: 'End-to-end exchange not yet run',
  },
  {
    step: 'records',
    surface: 'Encrypted records held for the family',
    capability: 'Encrypted shared files (data rooms)',
    status: 'Built',
  },
  {
    step: 'memory',
    surface: 'What the vault remembers, and correcting it',
    capability: 'Family memory store, context router and private assistant',
    status: 'Not built',
  },
  {
    step: 'school',
    surface: 'Share this much, for this long',
    capability: 'Passwordless sign-in with scoped, time-bound grants; member portal',
    status: 'Built',
    note: 'Built Oct 2026',
  },
  {
    step: 'school',
    surface: 'Approve on your phone',
    capability: 'Phone approver app',
    status: 'Partly built',
    note: 'Only KeyCloak today; a full app is needed for families',
  },
  {
    step: 'school',
    surface: 'Alice approves alongside a parent',
    capability: 'Guardianship / delegation credentials for children',
    status: 'Not built',
  },
  {
    step: 'clinic',
    surface: 'Share the answer, not the record',
    capability: 'Context router with minimization at the time of use',
    status: 'Not built',
  },
  {
    step: 'app',
    surface: 'A learner profile that moves between apps',
    capability: 'Family memory store, context router and portable schema',
    status: 'Not built',
  },
  {
    step: 'log',
    surface: 'Who saw what, and ending a grant',
    capability: 'Grants and access log; identity logs',
    status: 'Partly built',
    note: 'Logging built; family-facing revocation not yet',
  },
  {
    step: 'circle',
    surface: 'Grandparents and tutors as verified people',
    capability: 'Verified membership, vouching and hidden vetting (community app 0.5.0)',
    status: 'Built',
  },
  {
    step: 'assistant',
    surface: 'An assistant that answers to the family',
    capability: 'Family memory store, context router and private assistant',
    status: 'Not built',
  },
  {
    step: 'alice',
    surface: 'Co-approval at 16, hand-over at 18, sealed records',
    capability: 'Guardianship / delegation credentials for children',
    status: 'Not built',
  },
  {
    step: 'all',
    surface: 'Terms recorded on every share',
    capability: 'MyTerms SD-BASE (IEEE 7012-2025) — both sides hold a machine-readable agreement',
    status: 'Not built',
    note: 'Standard published; not yet wired into the vault',
  },
  {
    step: 'all',
    surface: 'The Family Vault app itself',
    capability: "Can build on The Open Co-op's PLANET network manager, now a demo",
    status: 'Not built',
  },
  {
    step: 'all',
    surface: 'Private vetting proofs',
    capability: 'Independent review of the proof library behind private vetting',
    status: 'Not started',
  },
];

export const SAMPLE_DATA_NOTE =
  'Demo with sample data. Families and organisations here are fictional, and no partnership is implied.';

/** How long a share can last — offered wherever something leaves the vault. */
export const SHARE_DURATIONS = ['Once', '30 days', 'This school year', 'Until I end it'];

/* ── The clinic's request (step 5) ───────────────────────────────── */

export const CLINIC_REQUEST = {
  org: 'Northgate Family Clinic, Seattle',
  about: 'ethan' as PersonId,
  purpose: "To confirm Ethan meets Washington's school entry requirements before he enrolls.",
  /** The whole record, or the single answer the clinic actually needs. */
  options: [
    {
      id: 'answer',
      label: 'Share the answer',
      detail: 'Meets school entry requirements: Yes',
      reveals: ['That Ethan meets the requirements'],
      hides: ['Which vaccines, and when', 'Which clinic gave them', 'Everything else in his record'],
      recommended: true,
    },
    {
      id: 'full',
      label: 'Share the full record',
      detail: 'Every dose, date and provider',
      reveals: ['The complete immunization history', 'Dates, brands and providers'],
      hides: [],
      recommended: false,
    },
  ],
  duration: '30 days',
};

/* ── The learning app (step 6) ───────────────────────────────────── */

export const LEARNING_APP = {
  from: 'Math Kingdom',
  to: 'Fantasy Academy',
  purpose: 'To pick up where Alice left off instead of starting her at zero.',
  /** What Fantasy Academy asks for — a slice, not the profile. */
  items: [
    { id: 'app-mastery', label: 'Math mastery and error patterns', defaultOn: true },
    { id: 'app-prefs', label: 'How she learns best', defaultOn: true },
    { id: 'app-access', label: 'Accessibility needs', defaultOn: true },
    { id: 'app-grades', label: 'Grades in other subjects', defaultOn: false },
    { id: 'app-name', label: 'Her name and contact details', defaultOn: false },
  ],
  /** What the app does with it on day one. */
  dayOne: [
    'Starts at functions and trig review, not at the beginning',
    'Worked example first, then progressive hints',
    'Short sessions: 25 minutes on weeknights',
    'Large text and high contrast already on',
  ],
  /** What her own profile gains as she works. */
  flowsBack: 'Rational expressions 0.55 → 0.71 after three sessions',
};

/* ── Who saw what (step 7) ───────────────────────────────────────── */

export interface AccessEntry {
  id: string;
  /** Which family member this access concerned. */
  about: PersonId;
  who: string;
  what: string;
  when: string;
  /** 'active' can be revoked; 'expired' ended on its own; 'once' was a single read. */
  state: 'active' | 'expired' | 'once';
  until?: string;
}

export const ACCESS_LOG: AccessEntry[] = [
  {
    id: 'acc-okafor',
    about: 'alice',
    who: 'Ms. Okafor',
    what: "Opened Alice's learning plan",
    when: 'Yesterday, 4:12pm',
    state: 'active',
    until: 'Ends 30 June',
  },
  {
    id: 'acc-app',
    about: 'alice',
    who: 'Fantasy Academy',
    what: 'Reads Alice’s math profile, and writes her progress back',
    when: 'Last used today',
    state: 'active',
    until: 'Until you end it',
  },
  {
    id: 'acc-denver',
    about: 'alice',
    who: 'Mesa Valley Schools',
    what: "Read Alice's enrollment status",
    when: '2 Feb',
    state: 'expired',
    until: 'Ended when she left the district',
  },
  {
    id: 'acc-guardian',
    about: 'maria',
    who: 'Cedar Park High School',
    what: 'Checked that Maria is Alice’s guardian',
    when: 'Today, 9:04am',
    state: 'once',
  },
  {
    id: 'acc-swim',
    about: 'ethan',
    who: 'Denver Parks & Rec',
    what: "Checked Ethan's swim level",
    when: '14 Nov 2025',
    state: 'once',
  },
];

/* ── The trusted circle (step 8) ─────────────────────────────────── */

export const CIRCLE_ROLES = [
  {
    id: 'view',
    label: 'View only',
    /** One line under the card. */
    short: 'Sees what you share',
    detail: 'Sees what you share with them, and nothing else. Changes nothing, shares nothing on.',
  },
  {
    id: 'contribute',
    label: 'View and add',
    short: 'Can add to one area',
    detail: 'Can also add to one area — a tutor adding progress notes, a grandparent adding photos.',
  },
  {
    id: 'guardian',
    label: 'Guardian',
    short: 'Same as a parent',
    detail: 'Approves what is shared and manages the vault, the same as a parent.',
  },
];

/* ── The family's assistant (step 9) ─────────────────────────────── */

export interface AssistantFact {
  text: string;
  /** Which record or memory entry this came from. */
  source: string;
  declared: boolean;
}

export const ASSISTANT = {
  question: 'Help me prepare a summary for Alice’s new school',
  intro: 'Here’s a short summary of where Alice is, drawn from her vault:',
  facts: [
    {
      text: 'Alice is working at precalculus level, with strong algebra and weaker word problems.',
      source: 'Portable math learner profile',
      declared: true,
    },
    {
      text: 'She learns best from worked examples first, with graphs and progressive hints.',
      source: 'Family Memory · Preferences',
      declared: true,
    },
    {
      text: 'She needs large text and high contrast.',
      source: 'Family Memory · Accessibility',
      declared: true,
    },
    {
      text: 'She may benefit from extra support with geometry before the placement exam.',
      source: 'Inferred from mastery scores',
      declared: false,
    },
  ] as AssistantFact[],
  note: 'Runs inside your vault. Nothing leaves without your approval.',
};

/* ── Growing up, and safeguarding (step 10) ──────────────────────── */

export const HANDOVER = [
  { age: 'Now, I’m 16', detail: 'I approve anything shared about me, alongside a parent' },
  { age: 'At 18', detail: 'Control passes to me by default — nothing to migrate' },
  { age: 'After that', detail: 'My parents keep only what I choose to share back' },
];

export const SEALED_RECORD = {
  title: 'Counseling notes',
  issuer: 'Mesa Valley Schools, student services',
  visibleTo: ['me', 'my named advocate'],
  sealedFrom: 'one named family member',
  note: 'Sealing is logged like any other access, and the log itself cannot be edited.',
};
