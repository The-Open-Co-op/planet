import { Box, Typography, Button } from '@mui/material';
import { Check, Add, VerifiedUser } from '@mui/icons-material';
import { Section } from '@/components/trust-demo/SectionTracker';
import { PhoneFrame } from '@/components/demo/PhoneFrame';
import { FlankedPhone } from '@/components/trust-demo/FlankedPhone';
import { DesktopCard } from '@/components/trust-demo/DesktopCard';
import { SelectiveDisclosurePanel } from '@/components/trust-demo/SelectiveDisclosurePanel';
import { AnnotationPair } from '@/components/trust-demo/InlineAnnotation';
import { GlossaryAside } from '@/components/trust-demo/GlossaryAside';
import {
  SectionHeading,
  OrgValueLine,
  OC_BLUE,
} from '@/components/trust-demo/sectionKit';
import { MobileWebScreen } from '@/components/trust-demo/MobileWebScreen';
import { DemoTabBar } from '@/components/onboarding/DemoTabBar';

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

const secondaryBtnSx = {
  textTransform: 'none',
  fontWeight: 700,
} as const;

const Row = ({ label, value }: { label: string; value: string }) => (
  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
    <Typography variant="body2" color="text.secondary">
      {label}
    </Typography>
    <Typography variant="body2" sx={{ fontWeight: 700 }}>
      {value}
    </Typography>
  </Box>
);

export default function JourneyGreens() {
  return (
    <Section slug="journey-greens" title="Journey 1 · Greens Grocery" bg="default">
      <SectionHeading>Joining a Community</SectionHeading>

      <Typography variant="body1" sx={{ color: 'text.secondary' }}>
        Sarah wants to join Greens Grocery Co-op, a member-owned grocery in Bristol — membership
        gets her a vote on what they stock and member pricing. Greens Grocery is open to anyone, but
        members of other cooperative organisations get fast-tracked past the waiting list.
      </Typography>

      {/* STEP 1 */}
      <Typography variant="overline" sx={stepLabelSx}>
        Step 1 — Greens Grocery's join page
      </Typography>

      <FlankedPhone
        ux={
          <>
            Greens Grocery offers two paths — fast-track for existing co-op members, standard for
            everyone else.
          </>
        }
        backend={
          <>
            Greens Grocery is a <GlossaryAside term="VTC" /> with its own <GlossaryAside term="DID" />{' '}
            and encoded governance rules — including the fast-track rule for applicants who hold a
            valid <GlossaryAside term="VMC" /> from other recognised cooperatives.
          </>
        }
      >
        <PhoneFrame>
          <MobileWebScreen url="greensgrocery.coop/join" siteName="Greens Grocery Co-op" accent="#2E7D32">
            <Typography variant="h6" sx={{ fontWeight: 800, mb: 0.5 }}>
              Join us
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.primary' }}>
              Join Green's Grocery Co-op to have your say on what we stock and access member
              pricing — big discounts for bulk orders. Membership is open to all. Members of other
              cooperative organisations get fast-track approval.
            </Typography>
            <Button variant="contained" fullWidth startIcon={<Check />} sx={primaryBtnSx}>
              Join with my co-op membership
            </Button>
            <Button variant="outlined" fullWidth startIcon={<Add />} sx={secondaryBtnSx}>
              Apply as a new member
            </Button>
          </MobileWebScreen>
        </PhoneFrame>
      </FlankedPhone>

      {/* STEP 2 */}
      <Typography variant="overline" sx={stepLabelSx}>
        Step 2 — Sarah presents her credential
      </Typography>

      <Typography variant="body1" color="text.secondary" sx={{ mb: 1 }}>
        Sarah taps “Join with my co-op membership.” Her vault opens and offers her existing
        Bristol Tech Co-op membership — the one credential that satisfies Greens Grocery's
        fast-track rule — and she chooses to present it.
      </Typography>

      <FlankedPhone
        ux={
          <>
            Sarah controls exactly what's shared — only what Greens Grocery needs to verify her
            membership. Nothing more.
          </>
        }
        backend={
          <>
            A selective-disclosure proof is derived from Sarah's VMC. Greens Grocery receives only
            the specific claims needed, not the full credential. Her <GlossaryAside term="M-DID" />{' '}
            signs the presentation, proving she holds the credential without revealing anything else.
            The exchange is governed by MyTerms SD-BASE (IEEE 7012-2025) — both sides hold a record;
            no surveillance, no opaque tracking.
          </>
        }
      >
        <PhoneFrame>
          <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            <Box sx={{ px: 2, py: 1, borderBottom: '1px solid', borderColor: 'divider' }}>
              <Typography sx={{ fontWeight: 800 }}>Vault</Typography>
            </Box>
            <Box sx={{ flex: 1, minHeight: 0 }}>
              <SelectiveDisclosurePanel
                org="Greens Grocery Co-op"
                ask="You hold a valid membership credential from a recognised cooperative organisation."
                willShare={['Your name', 'Member of Bristol Tech Co-op', 'Valid since Jan 2023']}
                wontShare={[
                  'Your contact details',
                  'Your other credentials',
                  'Your relationships',
                  'Any other personal data',
                ]}
                cta="Present credential"
              />
            </Box>
            <DemoTabBar active="vault" />
          </Box>
        </PhoneFrame>
      </FlankedPhone>

      {/* STEP 3 */}
      <Typography variant="overline" sx={stepLabelSx}>
        Step 3 — Approved
      </Typography>

      <Typography variant="body1" color="text.secondary" sx={{ mb: 1 }}>
        Now we switch to Greens Grocery's side. On their laptop, a co-op admin sees the
        result of Sarah's presentation — a new member verified in seconds, with none of her
        personal data stored.
      </Typography>

      <DesktopCard org="Greens Grocery Co-op" accent="#2E7D32">
        <Box sx={{ p: 2.5, display: 'flex', flexDirection: 'column', gap: 1.5 }}>
          <Typography variant="subtitle1" sx={{ fontWeight: 800, color: 'success.dark', letterSpacing: '0.03em' }}>
            ✓ NEW MEMBER VERIFIED
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            <Row label="Name" value="Sarah" />
            <Row label="Existing co-op membership" value="Bristol Tech Co-op — Active" />
            <Row label="Member since" value="January 2023" />
          </Box>
          <Typography variant="body2" sx={{ color: 'text.primary', mt: 0.5 }}>
            Sarah has been approved as a fast-track member.
          </Typography>

          <Box
            sx={{
              mt: 1,
              p: 1.5,
              display: 'flex',
              alignItems: 'flex-start',
              gap: 1,
              borderRadius: 1.5,
              border: '1px solid',
              borderColor: `${OC_BLUE}33`,
              bgcolor: `${OC_BLUE}0A`,
            }}
          >
            <VerifiedUser sx={{ color: OC_BLUE, fontSize: 20, mt: 0.25 }} />
            <Box>
              <Typography variant="caption" sx={{ fontWeight: 800, color: OC_BLUE, letterSpacing: '0.04em', display: 'block' }}>
                SARAH'S VAULT, UPDATED
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.primary' }}>
                New VMC: Greens Grocery Co-op · Member · Active · Just issued
              </Typography>
            </Box>
          </Box>
        </Box>
      </DesktopCard>

      <AnnotationPair
        ux={
          <>
            Moments later, the new membership card lands in Sarah's vault — issued, signed, and hers.
          </>
        }
        backend={
          <>
            Greens Grocery issues Sarah a new VMC signed with their <GlossaryAside term="C-DID" />. It
            appears in her vault immediately. Verification required NO personal data to be stored by
            Greens Grocery — only the outcome: member approved.
          </>
        }
      />

      <OrgValueLine>
        Greens Grocery gains verified members in seconds, with zero admin overhead and no excess
        personal data stored. It also sidesteps the cost of <GlossaryAside term="KYC" />: those
        identity checks are slow, expensive and create data liabilities — a mid-sized co-op can
        spend thousands of pounds a year on manual verification, onboarding forms and
        reference-chasing. Verifiable credentials do away with all of it — the work has already
        been done by the issuing community, cryptographically signed and instantly checkable.
        No forms, no manual review, no personal data stored.
      </OrgValueLine>
    </Section>
  );
}
