import { Box, Typography, Button } from '@mui/material';
import { Section } from '@/components/trust-demo/SectionTracker';
import {
  SectionHeading,
  BlueLink,
  StandardLink,
  OC_BLUE,
} from '@/components/trust-demo/sectionKit';
import { LINKS } from '@/components/trust-demo/trustDemoData';

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
    <SectionHeading>For Developers</SectionHeading>
    <Typography variant="body1" color="text.secondary" sx={{ mb: 2.5 }}>
      The trust layer is built entirely on open, recognised standards — no proprietary
      formats and no lock-in. Every piece is an open specification anyone can build on and
      interoperate with.
    </Typography>

    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.75, mb: 3 }}>
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
      alignItems: 'center',
      textAlign: 'center',
      gap: 1.5,
    }}
  >
    <Typography variant="body2" color="text.secondary" sx={{ flex: 1 }}>
      {prompt}
    </Typography>
    <Button
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      variant="contained"
      sx={{ textTransform: 'none', fontWeight: 700, bgcolor: OC_BLUE, '&:hover': { bgcolor: '#0055AA' } }}
    >
      {action}
    </Button>
  </Box>
);

export const ClosingSection = () => (
  <Section slug="closing" title="Closing" bg="default" sx={{ pb: 12 }}>
    <SectionHeading>Get involved</SectionHeading>
    <Typography variant="body1" color="text.secondary" sx={{ mb: 2.5 }}>
      Today's web runs on platforms that hijack our attention, harvest our data and lock our
      connections inside walled gardens — leaving us unsure what's real and who to trust, and
      starting from scratch every time we join something new. You've just seen the alternative:
      trust that lives with people, not platforms.
    </Typography>
    <Typography variant="body1" color="text.secondary" sx={{ mb: 2.5 }}>
      None of it is owned by a single organisation. The{' '}
      <BlueLink href={LINKS.firstPersonProject}>First Person Project</BlueLink> is defining the
      open protocols — including the Trust over IP DTG credential spec that the graph is built
      on. <BlueLink href={LINKS.openCoop}>The Open Co-op</BlueLink> is the member-owned initiative
      building the tools and the network, and it grows with every person and community that joins.
    </Typography>

    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr 1fr' }, gap: 2, mt: 3 }}>
      <CtaCard
        prompt="Run a cooperative or community?"
        action="Get in touch"
        href={LINKS.ctaPilot}
      />
      <CtaCard
        prompt="Want to build on the protocol?"
        action="Explore the open spec"
        href={LINKS.ctaBuild}
      />
      <CtaCard
        prompt="Want to help?"
        action="Join The Open Co-op"
        href={LINKS.ctaJoin}
      />
    </Box>
  </Section>
);
