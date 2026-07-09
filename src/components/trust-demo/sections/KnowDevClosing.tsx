import { Box, Typography, Button } from '@mui/material';
import { Section } from '@/components/trust-demo/SectionTracker';
import { GlossaryAside } from '@/components/trust-demo/GlossaryAside';
import {
  SectionHeading,
  BlueLink,
  StandardLink,
  OC_BLUE,
} from '@/components/trust-demo/sectionKit';
import { LINKS } from '@/components/trust-demo/trustDemoData';

/* ── §6 The Know Component (teaser) ─────────────────────────────── */
export const KnowSection = () => (
  <Section slug="know" title="The Know Component" bg="default">
    <SectionHeading>Your community's knowledge, inside its own walls</SectionHeading>
    <Typography variant="body1" color="text.secondary" sx={{ mb: 2.5 }}>
      Every community generates knowledge — decisions made, projects documented, expertise
      accumulated. Today that knowledge lives in silos: old email threads, forgotten
      documents, data locked inside platforms the community doesn't own.
    </Typography>
    <Typography variant="body1" color="text.secondary" sx={{ mb: 2.5 }}>
      The Open Co-op is specifying <Box component="span" sx={{ fontWeight: 600, color: 'text.primary' }}>Community OS</Box> —
      a cooperative operating system for communities that will include a private AI assistant
      living inside your community's trust boundary. It can answer members' questions, help
      newcomers find their feet, and surface the community's collective knowledge — all
      without your data ever leaving your control, because it runs within your{' '}
      <GlossaryAside term="VTC" />.
    </Typography>
    <Typography variant="body2">
      We'll be demoing Community OS separately.{' '}
      <BlueLink href={LINKS.ctaPilot}>Stay in touch →</BlueLink>
    </Typography>
  </Section>
);

/* ── §7 For Developers ──────────────────────────────────────────── */
const CodeBlock = () => (
  <Box
    component="pre"
    sx={{
      mt: 3,
      p: 2.5,
      borderRadius: 2,
      bgcolor: 'grey.900',
      color: 'grey.50',
      fontSize: '0.78rem',
      lineHeight: 1.6,
      overflow: 'auto',
      fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
    }}
  >{`// Verify a Verifiable Membership Credential (VMC)
// from a recognised cooperative
const result = await planet.verify({
  holder: 'did:key:z6MkpTHR8VNs...',
  credentialType: 'MembershipCredential',
  trustedIssuers: cooperativeNetwork.registry
})
// → {
//     verified: true,
//     issuer: 'did:web:bristoltechcoop.coop',
//     communityName: 'Bristol Tech Co-op',
//     validUntil: '2027-01-15T00:00:00Z'
//   }`}</Box>
);

export const DevelopersSection = () => (
  <Section slug="developers" title="For Developers" bg="paper">
    <SectionHeading>Built on open standards</SectionHeading>

    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 3 }}>
      <StandardLink href={LINKS.w3cDids}>W3C Decentralised Identifiers</StandardLink>
      <StandardLink href={LINKS.w3cVc}>W3C Verifiable Credentials 2.0</StandardLink>
      <StandardLink href={LINKS.toipDtgSpec}>Trust over IP — DTG spec</StandardLink>
      <StandardLink href={LINKS.myTermsSdBase}>IEEE 7012-2025 (MyTerms)</StandardLink>
      <StandardLink href={LINKS.ayra}>Ayra Trust Registry Fabric</StandardLink>
    </Box>

    <Typography variant="body1" color="text.secondary" sx={{ mb: 2.5 }}>
      Build on these standards and you inherit something no platform can manufacture: a
      network of real, verified relationships your users already hold. New users don't arrive
      cold. Governance logic doesn't need a moderation army. Communities don't start from zero.
    </Typography>
    <Typography variant="body1" color="text.secondary" sx={{ mb: 2.5 }}>
      Because the protocol is open and owned by no one, the trust your users build on your
      platform travels with them — which means they chose to be there, not trapped. A
      different relationship between platform and user, and better software.
    </Typography>

    <CodeBlock />

    <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
      No proprietary SDK. No vendor lock-in. No data leaving the user's vault without their
      explicit consent.
    </Typography>
  </Section>
);

/* ── §8 Closing ─────────────────────────────────────────────────── */
const CtaCard = ({ prompt, action, href }: { prompt: string; action: string; href: string }) => (
  <Box
    sx={{
      p: 2.5,
      borderRadius: 2.5,
      border: '1px solid',
      borderColor: 'divider',
      bgcolor: 'background.paper',
      display: 'flex',
      flexDirection: 'column',
      gap: 1.5,
    }}
  >
    <Typography variant="body2" color="text.secondary">
      {prompt}
    </Typography>
    <Button
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      variant="contained"
      sx={{ alignSelf: 'flex-start', textTransform: 'none', fontWeight: 700, bgcolor: OC_BLUE, '&:hover': { bgcolor: '#0055AA' } }}
    >
      {action}
    </Button>
  </Box>
);

export const ClosingSection = () => (
  <Section slug="closing" title="Closing" bg="default" sx={{ pb: 12 }}>
    <SectionHeading>The trust layer the internet never had</SectionHeading>
    <Typography variant="body1" color="text.secondary" sx={{ mb: 2.5 }}>
      We're building it on open protocols, owned by no one, governed cooperatively. The
      network grows with every person and community that joins — and we're looking for
      collaborators, early adopters, and everyone else who recognises this matters.
    </Typography>

    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr 1fr' }, gap: 2, mt: 3 }}>
      <CtaCard
        prompt="Run a cooperative or community network?"
        action="Pilot Community OS"
        href={LINKS.ctaPilot}
      />
      <CtaCard
        prompt="Want to build on the protocol?"
        action="Explore the open spec"
        href={LINKS.ctaBuild}
      />
      <CtaCard
        prompt="Want to help build a member-owned trust network for the internet?"
        action="Join The Open Co-op"
        href={LINKS.ctaJoin}
      />
    </Box>
  </Section>
);
