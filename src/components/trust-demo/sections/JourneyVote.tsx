import { Box, Typography, Button } from '@mui/material';
import { ArrowBack, VerifiedUser, Check, Close, HowToVote } from '@mui/icons-material';
import { Section } from '@/components/trust-demo/SectionTracker';
import { PhoneFrame } from '@/components/demo/PhoneFrame';
import { FlankedPhone } from '@/components/trust-demo/FlankedPhone';
import { DesktopCard } from '@/components/trust-demo/DesktopCard';
import { GlossaryAside } from '@/components/trust-demo/GlossaryAside';
import { CryptoSimulatedBadge } from '@/components/trust-demo/CryptoSimulatedBadge';
import { DemoTabBar } from '@/components/onboarding/DemoTabBar';
import { SectionHeading, OrgValueLine, OC_BLUE } from '@/components/trust-demo/sectionKit';
import type { ReactNode } from 'react';

const MOSSLEY_ACCENT = '#0F766E';

const stepLabelSx = {
  color: OC_BLUE,
  fontWeight: 700,
  display: 'block',
  mt: 5,
  mb: 1,
} as const;

const primaryBtnSx = {
  textTransform: 'none',
  fontWeight: 700,
  bgcolor: OC_BLUE,
  '&:hover': { bgcolor: '#0055AA' },
} as const;

/** A white PLANET app screen (header + scrollable body + the PLANET nav). */
const PlanetScreen = ({ title, back, children }: { title: string; back?: boolean; children: ReactNode }) => (
  <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
    <Box sx={{ px: 2, py: 1.25, display: 'flex', alignItems: 'center', gap: 1, borderBottom: '1px solid', borderColor: 'divider' }}>
      {back && <ArrowBack sx={{ fontSize: 18, color: 'text.secondary' }} />}
      <Typography sx={{ fontWeight: 800 }}>{title}</Typography>
    </Box>
    <Box sx={{ flex: 1, overflow: 'auto', p: 2, display: 'flex', flexDirection: 'column', gap: 1.5 }}>
      {children}
    </Box>
    <DemoTabBar />
  </Box>
);

const CANDIDATES = [
  { name: 'Amara Osei', statement: 'Three years on the maintenance rota; wants to fix the solar PV.' },
  { name: 'Dev Patel', statement: 'Joined last year; wants monthly open meetings.' },
];

const CandidateCard = ({ name, statement, selected }: { name: string; statement: string; selected?: boolean }) => (
  <Box
    sx={{
      p: 1.5,
      borderRadius: 1.5,
      border: '1px solid',
      borderColor: selected ? OC_BLUE : 'divider',
      bgcolor: selected ? 'rgba(0,102,204,0.06)' : 'background.paper',
      display: 'flex',
      gap: 1,
      alignItems: 'flex-start',
    }}
  >
    <Box
      sx={{
        mt: '2px',
        width: 16,
        height: 16,
        borderRadius: '50%',
        border: '2px solid',
        borderColor: selected ? OC_BLUE : 'grey.400',
        bgcolor: selected ? OC_BLUE : 'transparent',
        flexShrink: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {selected && <Check sx={{ fontSize: 11, color: '#fff' }} />}
    </Box>
    <Box>
      <Typography variant="body2" sx={{ fontWeight: 700 }}>{name}</Typography>
      <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 0.25 }}>
        {statement}
      </Typography>
    </Box>
  </Box>
);

const BluePanel = ({ title, children }: { title: string; children: ReactNode }) => (
  <Box sx={{ p: 1.5, borderRadius: 1.5, bgcolor: 'rgba(0,102,204,0.06)', border: '1px solid', borderColor: 'rgba(0,102,204,0.25)' }}>
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75, mb: 0.25 }}>
      <VerifiedUser sx={{ fontSize: 18, color: OC_BLUE }} />
      <Typography variant="caption" sx={{ fontWeight: 800, color: OC_BLUE, letterSpacing: '0.03em' }}>
        {title}
      </Typography>
    </Box>
    <Typography variant="caption" color="text.secondary" sx={{ display: 'block' }}>
      {children}
    </Typography>
  </Box>
);

const SeeRow = ({ ok, children }: { ok: boolean; children: ReactNode }) => (
  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
    {ok ? (
      <Check sx={{ fontSize: 14, color: 'success.main' }} />
    ) : (
      <Close sx={{ fontSize: 14, color: 'error.main' }} />
    )}
    <Typography variant="caption" sx={{ color: 'text.primary' }}>{children}</Typography>
  </Box>
);

const TallyRow = ({ name, votes, total, winner }: { name: string; votes: number; total: number; winner?: boolean }) => (
  <Box>
    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', mb: 0.25 }}>
      <Typography variant="body2" sx={{ fontWeight: winner ? 800 : 500 }}>{name}</Typography>
      <Typography variant="body2" sx={{ fontWeight: 800 }}>{votes}</Typography>
    </Box>
    <Box sx={{ height: 6, borderRadius: 3, bgcolor: 'grey.200', overflow: 'hidden' }}>
      <Box sx={{ width: `${(votes / total) * 100}%`, height: '100%', bgcolor: winner ? OC_BLUE : 'grey.400' }} />
    </Box>
  </Box>
);

/** Anonymous ballots exactly as Mossley's admin sees them — nullifier, choice, verified. */
const BALLOTS = [
  { n: '0x2a71…c04d', c: 'Amara Osei' },
  { n: '0x9f3c…e21a', c: 'Amara Osei' },
  { n: '0xb508…7f19', c: 'Dev Patel' },
  { n: '0x41de…93b6', c: 'Amara Osei' },
  { n: '0xe6a2…1c58', c: 'Dev Patel' },
  { n: '0x7c19…a4e0', c: 'Amara Osei' },
];

const Mono = ({ children }: { children: ReactNode }) => (
  <Typography
    component="span"
    variant="caption"
    sx={{ fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace', color: 'text.secondary' }}
  >
    {children}
  </Typography>
);

export default function JourneyVote() {
  return (
    <Section slug="journey-vote" title="Journey 5 · Anonymous Voting" bg="default">
      <SectionHeading>Anonymous Voting</SectionHeading>

      <Typography variant="body1" sx={{ color: 'text.secondary' }}>
        Sarah's been at Mossley Housing Co-op for a year now, and it's AGM season. Members elect a
        Steward every year. Two members are standing: Amara and Dev. The rules are simple: one vote
        per current member, a secret ballot, and a count anyone can check.
      </Typography>
      <Typography variant="body1" sx={{ color: 'text.secondary', mt: 2 }}>
        That's harder than it sounds. A paper ballot in a box means trusting whoever counts it. An
        online poll means the polling platform sees every member's name and every vote. Neither is
        secret and verifiable.
      </Typography>
      <Typography variant="body1" sx={{ color: 'text.secondary', mt: 2 }}>
        A <GlossaryAside term="ZKP">zero-knowledge proof (ZKP)</GlossaryAside> removes that choice.
        It lets Sarah prove a statement is true — “I'm a current Mossley member and this is my only
        vote” — without revealing anything else, not even who she is. Her vault already holds the
        credential that makes the statement true; the proof lets her use it without showing it.
      </Typography>

      {/* STEP 1 */}
      <Typography variant="overline" sx={stepLabelSx}>
        Step 1 — The ballot opens
      </Typography>

      <FlankedPhone
        ux={
          <>
            The ballot arrives in Sarah's alerts. Her vault confirms she's eligible — it holds a
            current Mossley <GlossaryAside term="VMC" /> — before she's shared anything with anyone.
          </>
        }
        backend={
          <>
            Mossley publishes the poll: a poll ID, the candidates, the closing time, and the
            eligibility rule, to all holders of an active Mossley VMC. Each member's vault derives
            a secret only it holds; Mossley publishes the root of the list of commitments to those
            secrets — one-way hashes, never of names. Mossley knows its own members, of course;
            what it can't do is link a member to a ballot.
          </>
        }
      >
        <PhoneFrame>
          <PlanetScreen title="Mossley Housing Co-op" back>
            <Box>
              <Typography variant="body2" sx={{ fontWeight: 700 }}>
                Steward election 2027
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Closes Friday 6pm
              </Typography>
            </Box>
            {CANDIDATES.map((c) => (
              <CandidateCard key={c.name} {...c} />
            ))}
            <BluePanel title="You're eligible — current Mossley member">
              Checked privately in your vault.
            </BluePanel>
            <Button variant="contained" fullWidth startIcon={<HowToVote />} sx={primaryBtnSx}>
              Vote
            </Button>
          </PlanetScreen>
        </PhoneFrame>
      </FlankedPhone>

      {/* STEP 2 */}
      <Typography variant="overline" sx={stepLabelSx}>
        Step 2 — Sarah casts her vote
      </Typography>

      <FlankedPhone
        ux={
          <>
            One tap. The panel tells her exactly what's revealed — that an eligible member voted —
            and what isn't: her name, and her choice.
          </>
        }
        backend={
          <>
            Her agent sends her vote, a nullifier — her secret hashed with the poll ID — and a
            zero-knowledge proof that the secret behind it is one of the published commitments, and
            that the nullifier was derived correctly. Enforcement is the system's job: a nullifier
            already used is rejected. One vote per member holds as long as that nullifier stays
            fixed for the poll — and it does: the commitment list is built from the VMCs Mossley
            has issued, one per member, and closed before voting opens. Neither the proof nor the
            nullifier reveals her commitment or her name.
          </>
        }
      >
        <PhoneFrame>
          <PlanetScreen title="Steward election 2027" back>
            <Typography variant="caption" color="text.secondary">
              Choose one candidate
            </Typography>
            <CandidateCard {...CANDIDATES[0]} selected />
            <CandidateCard {...CANDIDATES[1]} />
            <Box sx={{ p: 1.5, borderRadius: 1.5, border: '1px solid', borderColor: 'divider', bgcolor: 'background.paper' }}>
              <Typography variant="caption" sx={{ fontWeight: 800, letterSpacing: '0.04em', color: 'text.secondary', display: 'block', mb: 0.75 }}>
                WHAT MOSSLEY WILL SEE
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                <SeeRow ok>A valid member voted</SeeRow>
                <SeeRow ok={false}>Who</SeeRow>
                <SeeRow ok={false}>How you voted</SeeRow>
              </Box>
            </Box>
            <Button variant="contained" fullWidth startIcon={<HowToVote />} sx={primaryBtnSx}>
              Cast vote anonymously
            </Button>
            <Typography variant="caption" color="text.secondary" sx={{ display: 'block', textAlign: 'center' }}>
              One vote per member. Your ballot isn't linked to your name.
            </Typography>
          </PlanetScreen>
        </PhoneFrame>
      </FlankedPhone>

      {/* STEP 3 */}
      <Typography variant="overline" sx={stepLabelSx}>
        Step 3 — The result
      </Typography>

      <FlankedPhone
        ux={
          <>
            Sarah can confirm her ballot was counted by finding her nullifier in the public list —
            but nothing on that list says who she is or how she voted. She can't even prove to
            someone else how she voted, which is the point: a vote nobody can prove can't be bought
            or coerced.
          </>
        }
        backend={
          <>
            Every ballot — proof, nullifier, choice — is published, so anyone can re-verify each
            proof and re-run the tally. Completeness is a separate question, checked by voters:
            each finds their own nullifier, so a dropped ballot is spotted by whoever cast it.
            Duplicates are rejected at submission. No one has to be trusted with the count, and the
            platform never needs a name — though submission metadata (IP, timing) needs the same
            care.
          </>
        }
      >
        <PhoneFrame>
          <PlanetScreen title="Steward election 2027" back>
            <Box>
              <Typography variant="body2" sx={{ fontWeight: 700 }}>
                Result
              </Typography>
              <Typography variant="caption" color="text.secondary">
                53 of 61 members voted
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.25 }}>
              <TallyRow name="Amara Osei" votes={31} total={53} winner />
              <TallyRow name="Dev Patel" votes={22} total={53} />
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
              <Check sx={{ fontSize: 16, color: 'success.main' }} />
              <Typography variant="caption" sx={{ fontWeight: 700, color: 'success.dark' }}>
                Every ballot verified
              </Typography>
            </Box>
            <BluePanel title="Your ballot: included">
              <Mono>0x9f3c…e21a</Mono>
              <Box component="span" sx={{ mx: 0.75, color: 'text.disabled' }}>·</Box>
              <Box component="span" sx={{ color: OC_BLUE, fontWeight: 600 }}>Verify the count →</Box>
            </BluePanel>
            <Typography variant="caption" color="text.secondary" sx={{ display: 'block', textAlign: 'center' }}>
              Anyone can re-check the proofs and the count, and find their own nullifier to
              confirm their vote was registered.
            </Typography>
          </PlanetScreen>
        </PhoneFrame>
      </FlankedPhone>

      {/* Mossley's side */}
      <Typography variant="body1" color="text.secondary" sx={{ mt: 4, mb: 1 }}>
        And Mossley's side? This is the whole of it.
      </Typography>

      <DesktopCard org="Mossley Housing Co-op" accent={MOSSLEY_ACCENT}>
        <Typography variant="overline" sx={{ color: 'text.secondary', fontWeight: 700, display: 'block' }}>
          Steward election 2027
        </Typography>
        <Typography variant="h6" sx={{ fontWeight: 800, mb: 2 }}>
          Ballots
        </Typography>

        <Box sx={{ display: 'grid', gridTemplateColumns: 'auto 1fr auto', columnGap: 3, rowGap: 0.75, alignItems: 'center', mb: 1 }}>
          <Typography variant="caption" sx={{ fontWeight: 800, letterSpacing: '0.04em', color: 'text.secondary' }}>
            NULLIFIER
          </Typography>
          <Typography variant="caption" sx={{ fontWeight: 800, letterSpacing: '0.04em', color: 'text.secondary' }}>
            CHOICE
          </Typography>
          <Typography variant="caption" sx={{ fontWeight: 800, letterSpacing: '0.04em', color: 'text.secondary' }}>
            PROOF
          </Typography>
          {BALLOTS.map((b) => (
            <Box key={b.n} sx={{ display: 'contents' }}>
              <Mono>{b.n}</Mono>
              <Typography variant="body2">{b.c}</Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                <Check sx={{ fontSize: 14, color: 'success.main' }} />
                <Typography variant="caption" sx={{ color: 'success.dark', fontWeight: 700 }}>verified</Typography>
              </Box>
            </Box>
          ))}
          <Typography variant="caption" sx={{ color: 'text.disabled', gridColumn: '1 / -1' }}>
            … 47 more
          </Typography>
        </Box>

        <Box sx={{ borderTop: '1px solid', borderColor: 'divider', pt: 1.5, mt: 1.5, display: 'flex', gap: 3, flexWrap: 'wrap' }}>
          <Typography variant="body2"><b>Amara Osei</b> 31</Typography>
          <Typography variant="body2"><b>Dev Patel</b> 22</Typography>
          <Typography variant="body2" color="text.secondary">53 ballots · 0 rejected</Typography>
        </Box>
      </DesktopCard>

      <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 1, textAlign: 'center' }}>
        This is everything Mossley can see. No member names, no way to get them.
      </Typography>

      <Typography variant="body1" sx={{ color: 'text.secondary', mt: 5 }}>
        The same ZKP trick works far beyond voting. Prove you're over 18 without showing your birthday.
        Prove your income is within a band for a housing application without showing a payslip.
        Prove you're a member of <em>some</em> co-op in the network without saying which — which is
        exactly what let Sarah through Harvest's checkout in Journey 2. Wherever a rule needs a
        yes/no answer and the evidence is in your vault, a proof can give the yes without giving
        the evidence.
      </Typography>

      <OrgValueLine>
        For Mossley: a binding secret ballot with no one to trust with the count, no polling platform, no
        membership list handed to an outside platform, and a result every member can independently verify — for
        a Steward election, a rent-setting vote, or a rule change.
      </OrgValueLine>

      <Box sx={{ mt: 3, display: 'flex', justifyContent: 'center' }}>
        <CryptoSimulatedBadge />
      </Box>
    </Section>
  );
}
