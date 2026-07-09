import { Box, Typography, Button, InputBase } from '@mui/material';
import { Search, Home, AccountBalance, VerifiedUser, Extension } from '@mui/icons-material';
import { Section } from '@/components/trust-demo/SectionTracker';
import { PhoneFrame } from '@/components/demo/PhoneFrame';
import { FlankedPhone } from '@/components/trust-demo/FlankedPhone';
import { GlossaryAside } from '@/components/trust-demo/GlossaryAside';
import { MobileWebScreen } from '@/components/trust-demo/MobileWebScreen';
import { SectionHeading, OrgValueLine, OC_BLUE, BlueLink } from '@/components/trust-demo/sectionKit';
import type { ReactNode } from 'react';

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

const ResultRow = ({
  icon,
  title,
  subtitle,
}: {
  icon: ReactNode;
  title: string;
  subtitle: string;
}) => (
  <Box
    sx={{
      display: 'flex',
      gap: 1.25,
      p: 1.5,
      borderRadius: 1.5,
      border: '1px solid',
      borderColor: 'divider',
      bgcolor: 'background.paper',
    }}
  >
    <Box sx={{ color: OC_BLUE, mt: 0.25 }}>{icon}</Box>
    <Box>
      <Typography variant="body2" sx={{ fontWeight: 700 }}>
        {title}
      </Typography>
      <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 0.25 }}>
        {subtitle}
      </Typography>
    </Box>
  </Box>
);

/** Sarah's PLANET agent as a browser-plugin popup floating over the third-party
 *  site. White card (no clash with the site's colour); the match is computed
 *  locally, on her device — nothing is sent to the site. */
const PlanetPluginPopup = () => (
  <Box
    sx={{
      bgcolor: 'background.paper',
      border: '1px solid',
      borderColor: 'divider',
      borderRadius: 2,
      boxShadow: 3,
      p: 1.25,
      display: 'flex',
      gap: 1,
      alignItems: 'flex-start',
    }}
  >
    <Box
      sx={{
        width: 24,
        height: 24,
        borderRadius: '7px',
        bgcolor: OC_BLUE,
        color: '#fff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
      }}
    >
      <VerifiedUser sx={{ fontSize: 15 }} />
    </Box>
    <Box sx={{ flex: 1, minWidth: 0 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mb: 0.25 }}>
        <Extension sx={{ fontSize: 12, color: OC_BLUE }} />
        <Typography variant="caption" sx={{ fontWeight: 800, color: OC_BLUE, letterSpacing: '0.02em' }}>
          PLANET · browser plugin
        </Typography>
      </Box>
      <Typography variant="caption" sx={{ display: 'block', fontWeight: 700, color: 'text.primary', lineHeight: 1.3 }}>
        You meet Mossley's criteria — you'd be a priority applicant
      </Typography>
      <Typography variant="caption" sx={{ display: 'block', color: 'text.secondary', lineHeight: 1.4 }}>
        Checked privately on your device. Nothing shared yet.
      </Typography>
    </Box>
  </Box>
);

export default function JourneyManchester() {
  return (
    <Section slug="journey-manchester" title="Journey 4 · Find, and Be Found" bg="paper">
      <SectionHeading>Find, and Be Found</SectionHeading>

      <Typography variant="body1" sx={{ color: 'text.secondary' }}>
        Sarah is moving to Manchester. She wants to find a new place to live and connect with
        others building a regenerative economy there — in a city where nobody knows her yet.
      </Typography>

      <Typography variant="body1" sx={{ color: 'text.secondary', mt: 2 }}>
        Communities on PLANET publish an open public profile using the{' '}
        <BlueLink href="https://murmurations.network">Murmurations</BlueLink> protocol — so they
        don't have to recreate their details for every new map, directory or app. They publish
        once and become discoverable everywhere, on directories and maps like{' '}
        <BlueLink href="https://cobot.murmurations.network/">CoBot</BlueLink>. When Sarah searches
        there, she's browsing the open Murmurations index — and because each community's criteria are public,
        her own PLANET agent can work out whether she qualifies privately, on her device, without
        exposing anything.
      </Typography>

      {/* STEP 1 — Discovery */}
      <Typography variant="overline" sx={stepLabelSx}>
        Step 1 — Discovery
      </Typography>

      <FlankedPhone
        ux={
          <>
            A simple search surfaces communities that fit — pulled from their own open profiles.
          </>
        }
        backend={
          <>
            Discovery runs against communities' open Murmurations profiles — a shared, public
            index. Nothing about Sarah is shared at this stage; she's just browsing.
          </>
        }
      >
        <PhoneFrame>
          <MobileWebScreen url="cobot.murmurations.network" siteName="CoBot" accent="#166534">
            <Typography variant="h6" sx={{ fontWeight: 800, mb: 0.5 }}>
              Find cooperative communities
            </Typography>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                px: 1.5,
                py: 1,
                borderRadius: 1.5,
                border: '1px solid',
                borderColor: 'divider',
                bgcolor: 'background.paper',
              }}
            >
              <Search sx={{ color: 'text.secondary', fontSize: 20 }} />
              <InputBase value="Manchester" readOnly sx={{ flex: 1, fontSize: '0.9rem' }} />
            </Box>

            <ResultRow
              icon={<Home sx={{ fontSize: 20 }} />}
              title="Mossley Housing Co-op"
              subtitle="1 room available · Members of housing co-ops given priority · Applications open now"
            />
            <ResultRow
              icon={<AccountBalance sx={{ fontSize: 20 }} />}
              title="Manchester Mutual Credit Network"
              subtitle="Open to members of recognised cooperative organisations"
            />
          </MobileWebScreen>
        </PhoneFrame>
      </FlankedPhone>

      {/* STEP 2 — Mossley listing + private match */}
      <Typography variant="overline" sx={stepLabelSx}>
        Step 2 — A match, before sharing anything
      </Typography>

      <Typography variant="body1" sx={{ color: 'text.secondary', mb: 1 }}>
        Sarah opens Mossley's listing. The page itself only shows public information — the room
        and the membership criteria. Her PLANET agent can also access the page via a browser
        plugin to quietly check those criteria against her vault and flag, right at the top, that
        she'd qualify as a priority applicant. Mossley sees none of this: the check runs entirely
        on Sarah's device.
      </Typography>

      <FlankedPhone
        ux={
          <>
            Sarah's agent tells her she qualifies — she sees she'd be a priority applicant before
            she's shared a thing, and only applies if she wants to.
          </>
        }
        backend={
          <>
            Because Mossley's criteria are public, Sarah's PLANET agent checks them against her
            credentials locally, on her device. Mossley learns nothing about her until she taps
            Apply — at which point she makes a selective-disclosure presentation, sharing only
            what's needed.
          </>
        }
      >
        <PhoneFrame>
          <MobileWebScreen url="mossleyhousing.coop" siteName="Mossley Housing Co-op" accent="#4F46E5">
            <PlanetPluginPopup />
                <Typography variant="body2" sx={{ fontWeight: 700 }}>
                  1 room available — shared house, central Manchester
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Monthly contribution: £650 all-inclusive
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
                  <Typography variant="caption" sx={{ fontWeight: 800, letterSpacing: '0.04em', color: 'text.secondary', display: 'block', mb: 0.75 }}>
                    MEMBERSHIP CRITERIA
                  </Typography>
                  <Typography variant="caption" sx={{ display: 'block', color: 'text.primary', mb: 0.5 }}>
                    Priority given to applicants holding a <GlossaryAside term="VMC" /> from another
                    housing co-op
                  </Typography>
                  <Typography variant="caption" sx={{ display: 'block', color: 'text.primary' }}>
                    All cooperative members welcome to apply
                  </Typography>
                </Box>

                <Button variant="contained" fullWidth sx={primaryBtnSx}>
                  Apply now
                </Button>
          </MobileWebScreen>
        </PhoneFrame>
      </FlankedPhone>

      <Typography variant="body1" sx={{ color: 'text.secondary', mt: 5 }}>
        The same thing happens when Sarah approaches the Manchester Mutual Credit Network — her
        existing credentials speak for her trustworthiness, and she's extended a line of credit
        immediately, despite being brand new to the community.
      </Typography>

      <OrgValueLine>
        For Mossley Housing Co-op: applicants arrive pre-verified, due diligence is instant, and
        community fit is evident before a single conversation — with no personal data handled until
        the applicant actively chooses to proceed.
      </OrgValueLine>
    </Section>
  );
}
