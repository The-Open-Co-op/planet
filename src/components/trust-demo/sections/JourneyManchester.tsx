import { Box, Typography, Button, InputBase } from '@mui/material';
import { Search, Home, AccountBalance, Check, ArrowForward } from '@mui/icons-material';
import { Section } from '@/components/trust-demo/SectionTracker';
import { PhoneFrame } from '@/components/demo/PhoneFrame';
import { FlankedPhone } from '@/components/trust-demo/FlankedPhone';
import { GlossaryAside } from '@/components/trust-demo/GlossaryAside';
import {
  SectionHeading,
  OrgValueLine,
  ScreenHeader,
  OC_BLUE,
} from '@/components/trust-demo/sectionKit';
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

const TickRow = ({ children }: { children: ReactNode }) => (
  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
    <Check sx={{ color: 'success.main', fontSize: 18 }} />
    <Typography variant="caption" sx={{ color: 'text.primary' }}>
      {children}
    </Typography>
  </Box>
);

export default function JourneyManchester() {
  return (
    <Section slug="journey-manchester" title="Journey 4 · Finding Your People" bg="paper">
      <SectionHeading>Finding Your People</SectionHeading>

      <Typography variant="body1" sx={{ color: 'text.secondary' }}>
        Sarah is moving to Manchester. She wants to find a new place to live and connect with
        others building a regenerative economy there — in a city where nobody knows her yet.
      </Typography>

      {/* STEP 1 — Discovery */}
      <Typography variant="overline" sx={stepLabelSx}>
        Step 1 — Discovery
      </Typography>

      <FlankedPhone
        ux={
          <>
            A simple search surfaces communities that fit — and hints at where Sarah already
            qualifies.
          </>
        }
        backend={
          <>
            Discovery runs against communities' published membership criteria. Nothing about Sarah
            is shared at this stage — she's just browsing.
          </>
        }
      >
        <PhoneFrame>
          <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            <ScreenHeader org="Find cooperative communities" />
            <Box sx={{ flex: 1, overflow: 'auto', p: 2, display: 'flex', flexDirection: 'column', gap: 1.5 }}>
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
            </Box>
          </Box>
        </PhoneFrame>
      </FlankedPhone>

      {/* STEP 2 — Mossley listing + match */}
      <Typography variant="overline" sx={stepLabelSx}>
        Step 2 — A match, before sharing anything
      </Typography>

      <FlankedPhone
        ux={
          <>
            Sarah sees at a glance that she qualifies, and why. She doesn't fill in a form or write
            a covering letter — her credentials speak for her.
          </>
        }
        backend={
          <>
            Mossley queries Sarah's credential bundle against its encoded membership criteria and
            finds a match. This all happens before Sarah has shared any personal data — she only
            proceeds if she chooses to.
          </>
        }
      >
        <PhoneFrame>
          <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            <ScreenHeader org="Mossley Housing Co-op" />
            <Box sx={{ flex: 1, overflow: 'auto', p: 2, display: 'flex', flexDirection: 'column', gap: 1.5 }}>
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

              <Box
                sx={{
                  p: 1.5,
                  borderRadius: 1.5,
                  bgcolor: 'rgba(46,125,50,0.1)',
                  border: '1px solid',
                  borderColor: 'success.main',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 0.75,
                }}
              >
                <Typography variant="caption" sx={{ fontWeight: 800, letterSpacing: '0.04em', color: 'success.dark', display: 'block', mb: 0.25 }}>
                  YOUR CREDENTIALS MATCH THEIR CRITERIA
                </Typography>
                <TickRow>Multiple cooperative memberships verified</TickRow>
                <TickRow>Peer relationships on record</TickRow>
                <TickRow>Verified track record across the network</TickRow>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mt: 0.5 }}>
                  <ArrowForward sx={{ color: 'success.dark', fontSize: 18 }} />
                  <Typography variant="caption" sx={{ fontWeight: 800, color: 'success.dark', letterSpacing: '0.04em' }}>
                    PRIORITY APPLICANT
                  </Typography>
                </Box>
              </Box>

              <Button variant="contained" fullWidth sx={primaryBtnSx}>
                Apply now
              </Button>
            </Box>
          </Box>
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
