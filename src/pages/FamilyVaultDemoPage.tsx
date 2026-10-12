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
        'DENVER · THE RIVERA FAMILY',
        'Maria and Daniel Rivera are moving to Seattle with Alice, 16, and Ethan, 10. Everything either child has done so far — school, clinic, swim club — sits in records held by the institutions they are about to leave.\n\nFamily Vault turns that around: the records are issued to the family and kept by the family. Each person has their own keys, and a parent acts for a child by holding a credential that says so, rather than by owning the child’s account.',
      ),
      ui({
        side: 'left',
        top: 45,
        title: 'Everyone is a real, verified person',
        description:
          'Not an account someone opened — a person who has been vetted and vouched for, with their own agent and their own keys. The blue tick is the proof.',
      }),
      ui({
        side: 'left',
        top: 78,
        title: 'The circle matters as much as the vault',
        description:
          'Each person’s line says what they can do, not just that they are here — a grandmother who can view, a tutor with one record for one term.',
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
        'DENVER · BEFORE THE MOVE',
        'Alice’s old school sends her transcript and her learner profile. Normally those pass from school to school, and the family never sees what was sent.\n\nHere they arrive in the family’s Alerts instead. Whoever opens one can see who issued it and whether it has been altered, and nothing is kept until someone accepts it. Either parent can; so can Alice, now she is 16.',
      ),
      ui({
        side: 'left',
        top: 45,
        title: 'Tap to check, then accept or decline',
        description:
          'Declining is a real option: the record simply isn’t held, and nothing goes back to the issuer but the decision. Records share this list with vouches, connections and data requests, each marked by kind.',
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
        'Alice’s transcript shows her grades. It says nothing about how she actually learns: that she needs a worked example before she can start, that she does better in short sessions after school, that she reads large text. Her old teachers knew all of that. Her new ones will have to work it out again.\n\nSo the vault keeps that as well, as memory rather than as a record. Each entry says where it came from, when, and whether a person said it or software worked it out. A parent can change any of it, and so can Alice.',
      ),
      ui({
        side: 'left',
        top: 45,
        title: 'Every entry shows its working',
        description:
          'Where it came from, when, and how sure. Two entries that disagree are surfaced rather than silently merged — the family decides which is right.',
      }),
      ui({
        side: 'left',
        top: 80,
        title: 'Anything can be corrected',
        description:
          'Memory rots if nobody can fix it. Correcting an entry replaces it and records who changed it; marking one no longer true retires it without rewriting the past.',
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
        'Term starts in three weeks, and Cedar Park High needs to place Alice in the right classes. This is the point where a parent would normally be emailing the old district and waiting.\n\nInstead the school asks the family directly, and the family answers item by item: her learning and support needs, but not her health records, for this school year only. Maria approves it, and because it is about Alice, so does she.',
      ),
      ui({
        side: 'left',
        top: 45,
        title: 'The request arrives in Alerts',
        description:
          'Like records do. The family then chooses item by item — e.g. Alice’s learning and support needs, but not her health records.',
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
          'Records about Alice need Alice’s approval as well as a parent’s — a delegation credential that narrows as she gets older.',
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
        'Ethan’s new clinic needs to know he meets the state’s entry requirements. The usual way is to email or fax the record across — and copies of it then sit on mail servers, in outboxes and in backups for years.\n\nThe vault answers the question instead of sending the file: yes, he meets them. The answer holds for 30 days, and there is nothing for the clinic to file away.',
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
          'The clinic keeps nothing when it lapses, because it was never given anything to keep — only an answer it was allowed to ask for.',
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
    subtitle: 'Her profile moves, her progress flows with her',
    screen: <VaultRouter initial="app" />,
    annotations: [
      story(
        'SEATTLE · FIRST WEEK OF TERM',
        'Alice has been using Math Kingdom for months. Her new school uses Fantasy Academy, which normally means starting at lesson one and proving herself all over again.\n\nThis time the new app asks her for what it needs, and she grants a slice of her profile: what she has mastered, the mistakes she tends to make, and how she learns best. No name attached. As she works, Fantasy Academy writes her progress back to that profile, so it stays hers when she moves on.',
      ),
      ui({
        side: 'left',
        top: 45,
        title: 'A slice, not the profile',
        description:
          'Mastery scores, the mistakes she tends to make, how she likes to learn, and what she needs to read comfortably — the four things an app needs to teach her well.',
      }),
      ui({
        side: 'left',
        top: 80,
        title: 'Progress flows with her',
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
        'The family has now shared with a school, a clinic and a learning app. This is usually the point where nobody could tell you who holds what.\n\nHere it is one list: who has access, what they can see, and when it runs out. Mesa Valley’s access ended by itself when Alice left the district, and anything still running can be stopped in a tap.',
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
        'A family is rarely just the household. Rosa wants to see how her grandchildren are getting on; Ms. Okafor needs Alice’s learning plan for one term.\n\nEach of them joins as a verified person with a single role. The role says what they can see, carries an end date, and can be withdrawn at any time — the same as any other share the family makes.',
      ),
      ui({
        side: 'left',
        top: 45,
        title: 'A role is a grant',
        description:
          'View only, view and add, or guardian — chosen with an end date, and recorded in Shared alongside every other grant the family has made.',
      }),
      ui({
        side: 'left',
        top: 80,
        title: 'Removing someone is clean',
        description:
          'Their access stops the moment they are removed. There is no account to close and nothing of the family’s left on their side — they were only ever reading what the vault allowed.',
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
        'Maria wants a summary of where Alice is for the new school. Any assistant could write one. The questions are whose assistant it is, what it was allowed to read, and whether she can see where each line came from.\n\nThis one runs inside the family’s own vault. It shows the record behind every line, flags the one thing it worked out for itself so she can correct it, and sends nothing until she has said who to, for how long, and on what terms.',
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
          'The geometry suggestion is the assistant’s own reading of her mastery scores, not something anyone said — so it is marked, and a parent or Alice can overrule it.',
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
        'The same vault, from Alice’s phone. She can see everything shared about her and who approved it, and she can end any of it herself.\n\nAt 18 it becomes hers by default — not when a parent decides, and with nothing to move. And because families are not always safe, a record can be sealed from a named family member, visible only to Alice and an advocate, with its own log.',
      ),
      ui({
        side: 'left',
        top: 45,
        title: 'She can see every grant',
        description:
          'Each one shows who has it and that she approved it — and she can end any of them herself, without asking a parent to do it.',
      }),
      ui({
        side: 'left',
        top: 80,
        title: 'Families are not always safe',
        description:
          'A record can be sealed from a named family member, visible to the young person and an advocate, with its own access log.',
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
        storyColor="#660000"
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
