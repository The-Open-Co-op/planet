import { Box, Typography, Link, Stack } from '@mui/material';
import { KeyboardArrowDown } from '@mui/icons-material';
import { PhoneFrame } from '@/components/demo/PhoneFrame';
import { SectionTrackerProvider, Section } from '@/components/trust-demo/SectionTracker';
import { CredentialVault } from '@/components/trust-demo/CredentialVault';
import { AnnotationPair } from '@/components/trust-demo/InlineAnnotation';
import { GlossaryAside } from '@/components/trust-demo/GlossaryAside';
import { CryptoSimulatedBadge } from '@/components/trust-demo/CryptoSimulatedBadge';
import { LINKS } from '@/components/trust-demo/trustDemoData';

const StandardLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <Link
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    underline="hover"
    sx={{
      px: 1.5,
      py: 0.75,
      borderRadius: 1.5,
      border: '1px solid',
      borderColor: 'divider',
      bgcolor: 'background.paper',
      color: 'text.secondary',
      fontSize: '0.8rem',
      fontWeight: 600,
      '&:hover': { color: 'text.primary', borderColor: 'grey.300' },
    }}
  >
    {children}
  </Link>
);

const SectionEyebrow = ({ children }: { children: React.ReactNode }) => (
  <Typography
    variant="overline"
    sx={{ color: 'text.secondary', fontWeight: 700, display: 'block', mb: 1.5 }}
  >
    {children}
  </Typography>
);

const OrgValueLine = ({ children }: { children: React.ReactNode }) => (
  <Box
    sx={{
      mt: 3,
      p: 2,
      borderLeft: '3px solid',
      borderColor: 'success.main',
      bgcolor: 'rgba(46,125,50,0.05)',
      borderRadius: '0 8px 8px 0',
    }}
  >
    <Typography variant="body2" sx={{ color: 'text.primary' }}>
      <Box component="span" sx={{ fontWeight: 700 }}>
        For communities:{' '}
      </Box>
      {children}
    </Typography>
  </Box>
);

const TrustLayerDemoPage = () => {
  return (
    <Box
      sx={{
        height: '100vh',
        overflowY: 'auto',
        overflowX: 'hidden',
        bgcolor: 'background.default',
      }}
    >
      <SectionTrackerProvider>
        {/* ── Hero ───────────────────────────────────────────── */}
        <Section slug="intro" title="Intro" maxWidth={760} sx={{ minHeight: '92vh', justifyContent: 'center' }}>
          <Typography
            variant="h2"
            sx={{ fontWeight: 800, letterSpacing: '-0.02em', mb: 3, fontSize: { xs: '2.2rem', sm: '3rem' } }}
          >
            The internet is missing a trust layer.
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 2.5, fontSize: '1.05rem' }}>
            The Web has been captured by “big tech” platforms that hijack our attention,
            harvest our data and sell it to the highest bidders. It's drowning in ads,
            clickbait, deepfakes and AI slop — leaving us unsure what's real and who to
            trust. Our connections and content are locked in walled gardens, and every new
            platform means recreating your profile from scratch.
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 3.5, fontSize: '1.05rem' }}>
            The{' '}
            <Link href={LINKS.firstPersonProject} target="_blank" rel="noopener noreferrer" underline="hover" sx={{ fontWeight: 600 }}>
              First Person Project
            </Link>{' '}
            is building the open protocols to change this — aligned with a stack of
            recognised open standards. No single organisation owns any of it.{' '}
            <Link href={LINKS.openCoop} target="_blank" rel="noopener noreferrer" underline="hover" sx={{ fontWeight: 600 }}>
              The Open Co-op
            </Link>{' '}
            is the member-owned initiative specifying and building the tools and network to
            make it real. Below are working demos of the concept.
          </Typography>

          <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap', gap: 1, mb: 4 }}>
            <StandardLink href={LINKS.w3cVc}>W3C Verifiable Credentials</StandardLink>
            <StandardLink href={LINKS.trustOverIp}>Trust over IP</StandardLink>
            <StandardLink href={LINKS.myTerms}>MyTerms (IEEE 7012)</StandardLink>
            <StandardLink href={LINKS.ayra}>Ayra</StandardLink>
          </Stack>

          <CryptoSimulatedBadge />

          <Box sx={{ mt: 6, display: 'flex', alignItems: 'center', gap: 1, color: 'text.disabled' }}>
            <KeyboardArrowDown />
            <Typography variant="caption">Scroll to begin — Sarah's vault</Typography>
          </Box>
        </Section>

        {/* ── §1 The Vault ───────────────────────────────────── */}
        <Section slug="vault" title="The Vault" maxWidth={760}>
          <SectionEyebrow>Section 1 — The Vault</SectionEyebrow>
          <Typography variant="h4" sx={{ fontWeight: 700, mb: 2 }}>
            Everyone has a vault
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
            A personal, encrypted store of your credentials that works across your devices.
            Only you hold the keys. Here's Sarah's — a stack of credentials that make up her
            reputation. Tap any card to see its details, share it, or inspect the raw data
            model.
          </Typography>

          <Box sx={{ display: 'flex', justifyContent: 'center', mb: 1 }}>
            <PhoneFrame>
              <CredentialVault title="Sarah's Vault" />
            </PhoneFrame>
          </Box>

          <AnnotationPair
            ux={
              <>
                Sarah's vault holds her credentials as cards — the endorsements and
                memberships that make up her reputation, all in one place she controls.
              </>
            }
            backend={
              <>
                Each credential is signed by its issuer's <GlossaryAside term="DID" /> (Decentralised
                Identifier). Communities sign with their <GlossaryAside term="C-DID" />; individuals
                sign with their <GlossaryAside term="M-DID" />. Sarah controls her own M-DID and
                vault — no third party holds her keys.
              </>
            }
          />

          <OrgValueLine>
            members arrive with verifiable history. No forms. No chasing references. No
            personal data liability.
          </OrgValueLine>
        </Section>

        {/* ── Personhood ─────────────────────────────────────── */}
        <Section slug="personhood" title="Staying human" maxWidth={680}>
          <SectionEyebrow>How the network stays human</SectionEyebrow>
          <Typography variant="h5" sx={{ fontWeight: 700, mb: 2 }}>
            A defence against bots — and unwanted AI
          </Typography>
          <Typography variant="body1" color="text.secondary">
            A <GlossaryAside term="PHC" /> is a cryptographic proof that you are a real human
            being, not a bot or automated agent. Personhood Credentials are the foundation of
            trust in the network. The protocol makes proof-of-humanity verifiable by creating
            an audit trail of who issues whom a PHC — providing a mechanism to exclude
            unwanted bots and their promoters.
          </Typography>
        </Section>

        {/* Journeys 1–4, developer section and closing land in later phases. */}
        <Section slug="more-coming" title="More coming" maxWidth={680} sx={{ pb: 12 }}>
          <Box
            sx={{
              p: 3,
              borderRadius: 3,
              border: '1px dashed',
              borderColor: 'divider',
              textAlign: 'center',
              color: 'text.secondary',
            }}
          >
            <Typography variant="body2">
              Next: four journeys — joining a co-op with trust, member discounts, getting
              vouched in, and finding your people somewhere new — plus the developer section
              and call to action.
            </Typography>
          </Box>
        </Section>
      </SectionTrackerProvider>
    </Box>
  );
};

export default TrustLayerDemoPage;
