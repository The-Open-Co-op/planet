import { Box, Typography, Button } from '@mui/material';
import { Check, Handshake, VerifiedUser } from '@mui/icons-material';
import { Section } from '@/components/trust-demo/SectionTracker';
import { PhoneFrame } from '@/components/demo/PhoneFrame';
import { FlankedPhone } from '@/components/trust-demo/FlankedPhone';
import { DesktopCard } from '@/components/trust-demo/DesktopCard';
import { AnnotationPair } from '@/components/trust-demo/InlineAnnotation';
import { GlossaryAside } from '@/components/trust-demo/GlossaryAside';
import {
  SectionHeading,
  OrgValueLine,
  ScreenHeader,
  OC_BLUE,
  BlueLink,
} from '@/components/trust-demo/sectionKit';
import { LINKS } from '@/components/trust-demo/trustDemoData';
import { MobileWebScreen } from '@/components/trust-demo/MobileWebScreen';

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

const Screen = ({
  strap,
  children,
}: {
  strap: string;
  children: React.ReactNode;
}) => (
  <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
    <ScreenHeader org="Foundry Worker Co-op" strap={strap} />
    <Box
      sx={{
        flex: 1,
        overflow: 'auto',
        p: 2,
        display: 'flex',
        flexDirection: 'column',
        gap: 1.5,
      }}
    >
      {children}
    </Box>
  </Box>
);

const KeyValue = ({ label, value }: { label: string; value: string }) => (
  <Box sx={{ display: 'flex', gap: 1, alignItems: 'baseline' }}>
    <Typography
      variant="caption"
      sx={{ fontWeight: 700, color: 'text.secondary', minWidth: 64 }}
    >
      {label}
    </Typography>
    <Typography variant="body2" sx={{ fontWeight: 600 }}>
      {value}
    </Typography>
  </Box>
);

const VrcRow = ({ text }: { text: string }) => (
  <Box
    sx={{
      display: 'flex',
      alignItems: 'center',
      gap: 1,
      p: 1,
      borderRadius: 1.5,
      border: '1px solid',
      borderColor: 'divider',
      bgcolor: 'background.paper',
    }}
  >
    <Handshake sx={{ fontSize: 18, color: OC_BLUE }} />
    <Typography variant="body2" sx={{ fontWeight: 600 }}>
      {text}
    </Typography>
  </Box>
);

const CheckRow = ({ text }: { text: string }) => (
  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
    <Check sx={{ fontSize: 18, color: 'success.main' }} />
    <Typography variant="body2" sx={{ fontWeight: 600 }}>
      {text}
    </Typography>
  </Box>
);

const ListLabel = ({ children }: { children: React.ReactNode }) => (
  <Typography
    variant="caption"
    sx={{
      fontWeight: 700,
      color: 'text.secondary',
      letterSpacing: '0.04em',
      display: 'block',
      mt: 0.5,
    }}
  >
    {children}
  </Typography>
);

const AuditRow = ({ text }: { text: string }) => (
  <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1 }}>
    <Check sx={{ fontSize: 18, color: 'success.main', mt: 0.25 }} />
    <Typography variant="body2">{text}</Typography>
  </Box>
);

export default function JourneyFoundry() {
  return (
    <Section slug="journey-foundry" title="Journey 3 · Getting Vouched In" bg="default">
      <SectionHeading>Getting Vouched In</SectionHeading>

      <Typography variant="body1" sx={{ color: 'text.secondary' }}>
        When you join a new platform today you start from zero — years of reputation and
        relationships are ignored, and you have to earn trust all over again. PLANET changes
        this: your credentials, and the trust they carry, travel with you. Marcus wants to
        join the Foundry Worker Co-op — and rather than showing up as a stranger, he can
        arrive with evidence of who he already is.
      </Typography>

      {/* STEP 1 */}
      <Typography variant="overline" sx={stepLabelSx}>
        Step 1 — Foundry's join page
      </Typography>

      <FlankedPhone
        ux={
          <>
            Foundry doesn't just want a membership check — it wants to know a new member is
            genuinely trusted by people already inside.
          </>
        }
        backend={
          <>
            Foundry's rule — two <GlossaryAside term="VRC" />s from current members — is
            encoded in their <GlossaryAside term="VTC" /> governance policy as an{' '}
            <BlueLink href={LINKS.openPolicyAgent}>Open Policy Agent</BlueLink> (OPA) rule. It
            isn't held by any admin or subject to individual discretion; the rules are
            transparent and auditable.
          </>
        }
      >
        <PhoneFrame>
          <MobileWebScreen url="foundry.coop/join" siteName="Foundry Worker Co-op" accent="#C2410C">
            <Typography variant="h6" sx={{ fontWeight: 800, mb: 0.5 }}>
              Membership
            </Typography>
            <Typography variant="body2" color="text.secondary">
              We're a small worker-owned co-op and run a tight team. We ask that new members
              are personally vouched for by two existing members.
            </Typography>
            <Box
              sx={{
                p: 1.5,
                borderRadius: 1.5,
                border: '1px solid',
                borderColor: 'divider',
                bgcolor: 'background.paper',
              }}
            >
              <ListLabel>Requirements</ListLabel>
              <Typography variant="body2" sx={{ fontWeight: 600, mt: 0.5 }}>
                Two VRCs (Verifiable Relationship Credentials) from current Foundry members.
              </Typography>
            </Box>
            <Box sx={{ flex: 1 }} />
            <Button variant="contained" fullWidth sx={primaryBtnSx}>
              Apply for membership
            </Button>
          </MobileWebScreen>
        </PhoneFrame>
      </FlankedPhone>

      {/* STEP 2 */}
      <Typography variant="overline" sx={stepLabelSx}>
        Step 2 — Priya and Tom vouch for Marcus
      </Typography>

      <FlankedPhone
        ux={
          <>
            Two people who already know Marcus vouch for him directly — a couple of taps each.
          </>
        }
        backend={
          <>
            Each VRC is signed by the issuer's <GlossaryAside term="M-DID" /> — Priya's and
            Tom's personal identifiers. Marcus holds them in his vault. Foundry never needs to
            contact Priya or Tom to verify: the cryptographic signature is sufficient. No
            intermediary.
          </>
        }
      >
        <PhoneFrame>
          <Screen strap="Priya's vault · Issue a Verifiable Relationship Credential">
            <KeyValue label="To" value="Marcus" />
            <KeyValue label="Context" value="Foundry Worker Co-op application" />
            <Box sx={{ display: 'flex', gap: 1, alignItems: 'flex-start' }}>
              <Typography
                variant="caption"
                sx={{ fontWeight: 700, color: 'text.secondary', minWidth: 64 }}
              >
                Statement
              </Typography>
              <Typography variant="body2" sx={{ fontWeight: 600 }}>
                I know Marcus and vouch for him as a trustworthy collaborator.
              </Typography>
            </Box>
            <Button variant="contained" fullWidth sx={primaryBtnSx}>
              Issue VRC to Marcus
            </Button>
            <Typography variant="caption" color="text.secondary" sx={{ mt: 1 }}>
              Tom issues one too: "I worked alongside Marcus at Bristol Tech Co-op. Reliable
              and skilled." Marcus's vault now holds both:
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <VrcRow text="VRC · Priya Kumar" />
              <VrcRow text="VRC · Tom Ellis" />
            </Box>
          </Screen>
        </PhoneFrame>
      </FlankedPhone>

      {/* STEP 3 */}
      <Typography variant="overline" sx={stepLabelSx}>
        Step 3 — Marcus presents his application bundle
      </Typography>

      <FlankedPhone
        ux={
          <>
            Marcus reviews exactly what he's about to share — the two required vouches, plus
            extra context he chooses to include.
          </>
        }
        backend={
          <>
            The bundle is a signed presentation. Foundry receives only what Marcus selects,
            and every credential in it carries its issuer's signature.
          </>
        }
      >
        <PhoneFrame>
          <Screen strap="Marcus's application to Foundry">
            <ListLabel>Required</ListLabel>
            <CheckRow text="VRC · Priya Kumar (Foundry)" />
            <CheckRow text="VRC · Tom Ellis (Foundry)" />
            <ListLabel>Also sharing (Marcus's choice)</ListLabel>
            <VrcRow text="VMC · The Open Co-op — Member since 2022" />
            <VrcRow text="VEC · 'Strong systems thinker, great to work with'" />
            <VrcRow text="VRC · 6 mutual relationships across the network" />
            <Box sx={{ flex: 1 }} />
            <Button variant="contained" fullWidth sx={primaryBtnSx}>
              Submit application
            </Button>
          </Screen>
        </PhoneFrame>
      </FlankedPhone>

      <DesktopCard org="Foundry Worker Co-op">
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            mb: 2,
            color: 'success.main',
          }}
        >
          <VerifiedUser sx={{ fontSize: 22 }} />
          <Typography sx={{ fontWeight: 800, letterSpacing: '0.03em' }}>
            ✓ MEMBERSHIP APPROVED
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
          <AuditRow text="2 VRCs from current Foundry members — confirmed" />
          <AuditRow text="Both issuers are active members — confirmed" />
          <AuditRow text="Credentials within validity period — confirmed" />
        </Box>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
          Additional context received: existing co-op membership verified · peer endorsement
          on record · network relationships: 6
        </Typography>
      </DesktopCard>

      <AnnotationPair
        ux={
          <>
            Marcus chose to share his existing reputation alongside the required vouches — he
            didn't start from zero. He arrived with evidence of who he already is.
          </>
        }
        backend={
          <>
            Foundry's governance logic evaluated the required credentials automatically
            against its VTC policies — no admin decision needed for the threshold check. The
            full audit trail is cryptographically verifiable and permanent.
          </>
        }
      />

      <OrgValueLine>
        For Foundry: governance rules enforced automatically, with a full verifiable audit
        trail, no admin burden, and no KYC overhead — new members are already verified by the
        community's own trust graph.
      </OrgValueLine>
    </Section>
  );
}
