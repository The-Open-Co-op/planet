import { useState } from 'react';
import { Box, Button } from '@mui/material';
import { Layers } from '@mui/icons-material';
import { useParams } from 'react-router-dom';
import { DemoPageShell } from '@/components/demo/DemoPageShell';
import type { DemoStep, AnnotationWithCategory } from '@/components/demo/DemoPageShell';
import { FamilyVaultProvider } from '@/components/family-vault/FamilyVaultState';
import { TrustLayerDrawer } from '@/components/family-vault/TrustLayerDrawer';
import { VaultRouter } from '@/components/family-vault/VaultRouter';
import { FV_BLUE } from '@/components/family-vault/familyVaultKit';

/**
 * Family Vault — a clickable demo for funders.
 *
 * Plain English on the screens and in the UI annotations; every protocol term
 * lives behind "Show the trust layer", along with an honest build status for
 * each capability. Sample data only: nothing here talks to OpenVTC.
 */

const ui = (a: Omit<AnnotationWithCategory, 'category'>): AnnotationWithCategory => ({
  ...a,
  category: 'ui',
});
/** Narrative setup, top-left of each step — what is happening to this family. */
const story = (title: string, description: string): AnnotationWithCategory => ({
  side: 'left',
  top: 50,
  title,
  description,
  variant: 'story',
  category: 'ui',
});
const protocol = (a: Omit<AnnotationWithCategory, 'category'>): AnnotationWithCategory => ({
  ...a,
  category: 'protocol',
});

const STEPS: DemoStep[] = [
  {
    id: '1',
    slug: 'home',
    title: 'The family vault',
    subtitle: 'Two parents, two children, and a circle around them',
    screen: <VaultRouter initial="home" />,
    annotations: [
      story(
        'DENVER · BEFORE THE MOVE',
        'Maria and Daniel Rivera are moving to Seattle with Alice, 16, and Ethan, 10. Everything either child has done — school, clinic, swim club — sits in records held by institutions they are about to leave.\n\nFamily Vault turns that around. Records are issued to the family and kept by the family; each person holds their own keys, and a parent acts for a child through a guardianship credential rather than by owning their account.',
      ),
      ui({
        side: 'left',
        top: 45,
        title: 'Everyone is a real, verified person',
        description:
          'Each member of the family holds their own keys. A parent acts for a child by holding a guardianship credential — not by owning the child’s account.',
      }),
      ui({
        side: 'left',
        top: 78,
        title: 'The circle matters as much as the vault',
        description:
          'A grandmother can view. A tutor sees one learning plan, until June. Both are verified people, and either can be removed in a tap.',
      }),
      protocol({
        side: 'right',
        top: 30,
        title: 'Personal agents',
        description:
          'Each person has an agent holding their keys in a secure enclave. Guardianship is a delegation credential issued under defined rules, so it can be shared between two parents, limited, or revoked.',
        tag: 'Agents: built · Guardianship: not built',
      }),
      protocol({
        side: 'right',
        top: 70,
        title: 'Records and memory are different things',
        description:
          'Records are signed documents from institutions. Memory is the evolving picture of the learner — goals, preferences, constraints — with provenance on every entry.',
      }),
    ],
  },
  {
    id: '2',
    slug: 'records',
    title: 'Records arrive signed',
    subtitle: 'Tap to check who issued it, then accept',
    screen: <VaultRouter initial="alerts" />,
    annotations: [
      story(
        'DENVER · THE LAST WEEK',
        'Alice’s old school sends her transcript and learner profile. Normally those move school to school, and the family never sees what went.\n\nHere they arrive in the family’s own alerts, signed by the issuer. A parent checks who issued it and whether it has been altered before accepting it into the vault — Maria or Daniel, since both hold guardianship, and at 16 Alice can accept her own.',
      ),
      ui({
        side: 'left',
        top: 45,
        title: 'Tap to check, then accept or decline',
        description:
          'Records arrive in Alerts alongside everything else the family is asked to act on. Tapping one opens it for checking — nothing enters the vault until a parent accepts it. Maria or Daniel can, since both hold guardianship; at 16 Alice can accept her own.',
      }),
      ui({
        side: 'left',
        top: 78,
        title: 'What checking shows',
        description:
          'Who issued it, who it was issued to, whether it has been altered, whether the issuer has withdrawn it, and when — all before accepting.',
      }),
      protocol({
        side: 'right',
        top: 30,
        title: 'Verifiable credentials',
        description:
          'Each record is a signed credential from the issuer, checked against a revocation list at the moment it is read. The family holds it; no platform does.',
        tag: 'Partly built — end-to-end exchange not yet run',
      }),
      protocol({
        side: 'right',
        top: 68,
        title: 'The report’s own schema',
        description:
          'Alice’s learner profile carries the fields from the Global Memory Workshop report, including provenance and confidence, so it is portable rather than product-defined.',
      }),
    ],
  },
  {
    id: '3',
    slug: 'memory',
    title: 'Family Memory',
    subtitle: 'Declared or inferred, and all of it correctable',
    screen: <VaultRouter initial="memory" />,
    annotations: [
      story(
        'DENVER · PACKING UP',
        'A transcript records what Alice did. It doesn’t record how she learns — worked examples first, 25 minutes on a weeknight, large text — and that is the part a move usually destroys.\n\nThe vault keeps that as memory, separate from records. Every entry shows where it came from and when, whether the family said it or an assistant inferred it, and anyone in the family can correct it or mark it no longer true.',
      ),
      ui({
        side: 'left',
        top: 45,
        title: 'Records are documents',
        description:
          'Records come from schools, clinics, employers, programs and councils, and do not change. Memory is what builds up over time — goals, preferences, constraints. What the family said is kept separate from what an assistant worked out, and inferences carry a confidence.',
      }),
      ui({
        side: 'left',
        top: 80,
        title: 'Anything can be corrected',
        description:
          'Correct it, or mark it no longer true. Alice can see and change what is held about her, even where a parent is looking at it.',
      }),
      protocol({
        side: 'right',
        top: 28,
        title: 'Memory store and lifecycle',
        description:
          'Durable entries with timestamp, source, category and confidence; update, deprecate and correct operations; contradictions surfaced rather than silently resolved.',
        tag: 'Not built — this is what the proposal funds',
      }),
      protocol({
        side: 'right',
        top: 66,
        title: 'Export, not lock-in',
        description:
          'Export preserves meaning rather than raw logs, with the access and mutation trail attached — the portability the standards gap calls for.',
      }),
    ],
  },
  {
    id: '4',
    slug: 'school',
    title: 'The school’s request',
    subtitle: 'Item by item, for a set time, approved by Maria and Alice',
    screen: <VaultRouter initial="request" />,
    annotations: [
      story(
        'SEATTLE · THREE WEEKS LATER',
        'Term starts in three weeks and Cedar Park High needs to place Alice in the right classes — the moment a parent would normally be chasing the old district for paperwork.\n\nInstead the school asks the family, and the family answers item by item: Alice’s learning and support needs, but not her health records, for this school year only. Maria approves, and so does Alice.',
      ),
      ui({
        side: 'left',
        top: 45,
        title: 'The request arrives in Alerts',
        description:
          'Like records do. Opening it shows what the school wants and what for; the family then chooses item by item — e.g. Alice’s learning and support needs, but not her health records.',
      }),
      ui({
        side: 'left',
        top: 78,
        title: 'See it before you send it',
        description:
          'A preview of exactly what the school will get, and for how long. It ends on its own; it can be ended sooner.',
      }),
      protocol({
        side: 'right',
        top: 26,
        title: 'Scoped, time-bound grants',
        description:
          'A grant names the items, the purpose and the expiry. The service receives only what the grant allows, for as long as it allows — minimum necessary disclosure at the time of use.',
        tag: 'Built — Oct 2026',
      }),
      protocol({
        side: 'right',
        top: 64,
        title: 'Co-approval at 16',
        description:
          'Records about Alice need Alice’s approval as well as a parent’s. At 18 control passes to her by default, with nothing to migrate.',
        tag: 'Delegation credentials: not built',
      }),
    ],
  },
  {
    id: '5',
    slug: 'clinic',
    title: 'The clinic’s request',
    subtitle: 'The answer, not the file',
    screen: <VaultRouter initial="clinic" />,
    annotations: [
      story(
        'SEATTLE · ENROLLING ETHAN',
        'Ethan’s new clinic needs to confirm he meets the state’s entry requirements. The usual way is to email or fax the record — and copies then sit on mail servers, in outboxes and in backups, for years.\n\nThe vault answers the question instead of handing over the file: meets school entry requirements, yes, for 30 days — nothing else revealed, and nothing for the clinic to keep.',
      ),
      ui({
        side: 'left',
        top: 45,
        title: 'The answer is usually enough',
        description:
          'The clinic asked for the record. What it actually needs is one word: yes. Sharing the answer is offered first; the full record is there if a provider genuinely needs it.',
      }),
      ui({
        side: 'left',
        top: 80,
        title: 'And it still expires',
        description:
          'Shared for 30 days. The clinic keeps nothing, because it was never given anything to keep.',
      }),
      protocol({
        side: 'right',
        top: 28,
        title: 'Minimum necessary disclosure',
        description:
          'The context router returns a derived claim rather than the underlying record, selecting what the purpose needs and redacting the rest at the time of use.',
        tag: 'Grants: built · Context router: not built',
      }),
    ],
  },
  {
    id: '6',
    slug: 'app',
    title: 'A new learning app',
    subtitle: 'Her profile moves, her progress flows back',
    screen: <VaultRouter initial="app" />,
    annotations: [
      story(
        'SEATTLE · FIRST WEEK OF TERM',
        'Alice has used Math Kingdom for months; her new school uses Fantasy Academy. Normally that means starting at lesson one and re-earning everything she has already proved.\n\nFantasy Academy requests her learning data, and because the profile is hers rather than Math Kingdom’s she can grant a slice of it — mastery, error patterns, how she learns — with no name attached. What she does there flows back to her own profile.',
      ),
      ui({
        side: 'left',
        top: 45,
        title: 'A slice, not the profile',
        description:
          'Fantasy Academy gets mastery, error patterns, preferences and accessibility needs. Not her name, not her other grades. It personalises for a learner it never identifies.',
      }),
      ui({
        side: 'left',
        top: 80,
        title: 'Progress flows back',
        description:
          'What she learns there updates her own profile, so the next app — or the next school — starts from the truth rather than from zero.',
      }),
      protocol({
        side: 'right',
        top: 28,
        title: 'Portable learner context',
        description:
          'Read and write under one scoped grant, against a schema both services understand. Neither platform owns the profile, so switching costs nothing.',
        tag: 'Memory store and router: not built',
      }),
    ],
  },
  {
    id: '7',
    slug: 'log',
    title: 'Shared',
    subtitle: 'What’s active, what ended, and ending one now',
    screen: <VaultRouter initial="log" />,
    annotations: [
      story(
        'SEATTLE · A MONTH IN',
        'The family has shared with a school, a clinic and a learning app. In most systems this is the point where nobody can say who holds what any more.\n\nHere it is one list: what each service can see, on what terms, and when it ends. Mesa Valley’s access ended by itself when Alice left the district; anything still active ends with one tap.',
      ),
      ui({
        // Sits level with the ENDED section, which the text names.
        side: 'left',
        top: 80,
        title: 'Active, or ended',
        description:
          'Nothing was granted forever. Mesa Valley Schools dropped into Ended on its own when Alice left the district, and anything still active can be ended with one tap — the service stops being able to read, immediately.',
      }),
      protocol({
        side: 'right',
        top: 28,
        title: 'Audit and provenance',
        description:
          'An append-only log of reads and writes, inspectable by the person it concerns. Revocation propagates to anything relying on that grant.',
        tag: 'Partly built',
      }),
    ],
  },
  {
    id: '8',
    slug: 'circle',
    title: 'The trusted circle',
    subtitle: 'Verified people, with one role each',
    screen: <VaultRouter initial="circle" />,
    annotations: [
      story(
        'SEATTLE · HALF TERM',
        'A family is rarely just the household. Rosa wants to see how the children are doing; Ms. Okafor needs Alice’s learning plan for one term.\n\nEach joins as a verified person with a single role — view only, view and add, or guardian. A role is a grant like any other: scoped, time-boxed, and removed in a tap.',
      ),
      ui({
        side: 'left',
        top: 45,
        title: 'A role is a grant',
        description:
          'Can view. Learning plan only, until June. Joint guardian. Each one says what the person sees and for how long.',
      }),
      ui({
        side: 'left',
        top: 80,
        title: 'And it comes off in a tap',
        description:
          'Removing someone ends their access immediately — no account to delete, nothing left behind.',
      }),
      protocol({
        side: 'right',
        top: 28,
        title: 'Verified people, scoped roles',
        description:
          'Each circle member holds their own agent and is vouched into the network. A role is a credential, so it can be narrowed, time-boxed or revoked by an authorised party.',
        tag: 'Vetting and vouching: built',
      }),
    ],
  },
  {
    id: '9',
    slug: 'assistant',
    title: 'The family assistant',
    subtitle: 'Sourced, labelled, and it asks before sharing',
    screen: <VaultRouter initial="assistant" />,
    annotations: [
      story(
        'SEATTLE · SUNDAY NIGHT',
        'Maria wants a summary for the new school. Any assistant could write one; the question is whose assistant it is, what it read, and whether she can see where each line came from.\n\nThis one runs inside the family’s own vault. It names the record behind each line, marks what it inferred so she can correct it, and sends nothing until she has chosen who, for how long, and on what terms.',
      ),
      ui({
        side: 'left',
        top: 45,
        title: 'Every line is sourced',
        description:
          'Each statement names the record or memory entry behind it, so nothing in the summary is unattributable.',
      }),
      ui({
        side: 'left',
        top: 80,
        title: 'Inference is labelled, and correctable',
        description:
          'The geometry suggestion is marked as inferred. Correcting it removes it from the draft and from the memory it came from.',
      }),
      protocol({
        side: 'right',
        top: 28,
        title: 'Fiduciary AI',
        description:
          'The assistant reads the vault inside the family’s own agent and answers to the family, not to a platform. Its reads are logged like anyone else’s, and nothing leaves without an approval.',
        tag: 'Not built — this is what the proposal funds',
      }),
    ],
  },
  {
    id: '10',
    slug: 'alice',
    title: 'Alice’s vault',
    subtitle: 'What’s shared about her, and what happens at 18',
    screen: <VaultRouter initial="alice" />,
    annotations: [
      story(
        'SEATTLE · A YEAR ON',
        'The same vault, seen by the person it is about. Alice can see what is shared about her, and who approved it.\n\nAt 18 control passes to her by default — not at a parent’s discretion, and with nothing to migrate. And because families are not always safe, a record can be sealed from a named family member, visible to her and an advocate, with its own log.',
      ),
      ui({
        side: 'left',
        top: 45,
        title: 'She already co-approves',
        description:
          'At 16 nothing about her is shared without her. The hand-over at 18 is a change of control, not a change of system.',
      }),
      ui({
        side: 'left',
        top: 80,
        title: 'Families are not always safe',
        description:
          'A record can be sealed from a named family member, visible to the young person and an advocate, with its own access log. Designing for that from the start is the point.',
      }),
      protocol({
        side: 'right',
        top: 28,
        title: 'Guardianship, not ownership',
        description:
          'Guardianship is a credential issued under defined rules: shareable between two parents, limited, sealed against, and expiring by agreement rather than by permission.',
        tag: 'Delegation credentials: not built',
      }),
    ],
  },
];

const DemoBody = () => {
  const { step: stepSlug } = useParams<{ step?: string }>();
  // One switch: the build-status drawer and the protocol annotations go
  // together, so the button label can never disagree with what's on screen.
  const [trustOn, setTrustOn] = useState(false);

  const currentSlug = stepSlug || STEPS[0].slug;

  return (
    <>
      <DemoPageShell
        title="Family Vault"
        subtitle="A clickable demo"
        basePath="/demo/family-vault"
        steps={STEPS}
        accent={FV_BLUE}
        protocolVisible={trustOn}
        bottomBarExtra={
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Button
              size="small"
              startIcon={<Layers sx={{ fontSize: 16 }} />}
              onClick={() => setTrustOn((v) => !v)}
              sx={{ textTransform: 'none', fontWeight: 700 }}
            >
              {trustOn ? 'Hide what’s built' : 'What’s built'}
            </Button>
          </Box>
        }
      />
      <TrustLayerDrawer open={trustOn} onClose={() => setTrustOn(false)} stepSlug={currentSlug} />
    </>
  );
};

const FamilyVaultDemoPage = () => (
  <FamilyVaultProvider>
    <DemoBody />
  </FamilyVaultProvider>
);

export default FamilyVaultDemoPage;
