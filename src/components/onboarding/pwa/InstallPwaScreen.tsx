import { useEffect, useState } from 'react';
import { Box, Typography, ToggleButton, ToggleButtonGroup } from '@mui/material';
import { Lock, IosShare, AddBox } from '@mui/icons-material';
import type { AnnotationItem } from '@/components/demo/Annotation';

type AnnotationWithCategory = AnnotationItem & { category: 'ui' | 'protocol' };

const tokenAnnotation: AnnotationWithCategory = {
  side: 'right', top: 30, category: 'protocol',
  title: 'PWA install — token continuity, no Universal Links',
  description: "Invite token lives in the URL (planetnetwork.app/j/xxx). User leaves the URL in the address bar during Add to Home Screen, so iOS captures it as the icon's start URL; Android does the same when the PWA manifest leaves start_url unpinned. On first PWA launch, entry code reads the token from the path — with localStorage as an Android fallback for install-banner flows where the manifest start_url wins. Single-use token, 7-day server-side context. Same deferred deep-link result as native onboarding, without Universal Links.",
  tag: 'Backend',
};

const iosUxAnnotation: AnnotationWithCategory = {
  side: 'left', top: 87, category: 'ui',
  title: 'iPhone — tap the new icon',
  description: 'After Add to Home Screen, Safari stays open. The user taps the PLANET icon and PLANET launches full-screen (no Safari address bar or tabs).',
  tag: 'UX',
};

const androidUxAnnotation: AnnotationWithCategory = {
  side: 'left', top: 87, category: 'ui',
  title: 'Android — Install opens PLANET',
  description: 'Tapping Install in the Chrome prompt installs the PWA and hands straight over to it — PLANET opens full-screen with no extra step to find and tap an icon.',
  tag: 'UX',
};

export const iosInstallAnnotations: AnnotationWithCategory[] = [tokenAnnotation, iosUxAnnotation];
export const androidInstallAnnotations: AnnotationWithCategory[] = [tokenAnnotation, androidUxAnnotation];

interface InstallPwaScreenProps {
  onOpen?: () => void;
  setDynamicAnnotations?: (annotations: AnnotationWithCategory[] | null) => void;
}

type Platform = 'ios' | 'android';

/** Step 03 — Install PWA: Add to Home Screen (iOS) or install prompt (Android). */
export const InstallPwaScreen = ({ onOpen, setDynamicAnnotations }: InstallPwaScreenProps) => {
  const [platform, setPlatform] = useState<Platform>('ios');

  useEffect(() => {
    const ua = navigator.userAgent;
    if (/android/i.test(ua)) setPlatform('android');
    else if (/iphone|ipad|ipod/i.test(ua)) setPlatform('ios');
  }, []);

  useEffect(() => {
    if (!setDynamicAnnotations) return;
    setDynamicAnnotations(platform === 'android' ? androidInstallAnnotations : null);
  }, [platform, setDynamicAnnotations]);

  return (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column', bgcolor: '#ffffff' }}>
      {/* Mobile Safari/Chrome chrome */}
      <Box sx={{
        px: 1.25,
        py: 0.75,
        bgcolor: '#f2f2f7',
        borderBottom: '1px solid',
        borderColor: '#d1d1d6',
        display: 'flex',
        alignItems: 'center',
        gap: 0.75,
      }}>
        <Lock sx={{ fontSize: 11, color: '#8e8e93' }} />
        <Typography sx={{ fontSize: '0.7rem', color: '#3c3c43', flex: 1, textAlign: 'center', fontFamily: 'system-ui' }}>
          planetnetwork.app/j/x7k2m
        </Typography>
      </Box>

      {/* Page content */}
      <Box sx={{ flex: 1, overflow: 'auto', px: 2.5, py: 2, bgcolor: '#f8f9fb', display: 'flex', flexDirection: 'column' }}>
        <Typography sx={{ fontWeight: 800, fontSize: '1.1rem', mb: 0.5, color: '#111' }}>
          Install PLANET
        </Typography>
        <Typography sx={{ fontSize: '0.75rem', color: '#555', mb: 1.5, lineHeight: 1.5 }}>
          PLANET runs as a Progressive Web App — add it to your Home Screen for a fast, app-like experience.
        </Typography>

        {/* Platform toggle */}
        <ToggleButtonGroup
          value={platform}
          exclusive
          size="small"
          onChange={(_, v) => v && setPlatform(v)}
          sx={{
            mb: 2,
            alignSelf: 'flex-start',
            '& .MuiToggleButton-root': {
              textTransform: 'none',
              fontSize: '0.7rem',
              fontWeight: 600,
              py: 0.25,
              px: 1.25,
              color: '#0066CC',
              borderColor: '#0066CC',
              '&.Mui-selected': { bgcolor: 'rgba(0,102,204,0.12)', color: '#0066CC' },
            },
          }}
        >
          <ToggleButton value="ios">iPhone</ToggleButton>
          <ToggleButton value="android">Android</ToggleButton>
        </ToggleButtonGroup>

        {platform === 'ios' ? <IosInstructions onTapIcon={onOpen} /> : <AndroidInstructions onInstall={onOpen} />}
      </Box>
    </Box>
  );
};

const IosInstructions = ({ onTapIcon }: { onTapIcon?: () => void }) => (
  <>
    <Step num={1}>
      Tap <IosShare sx={{ fontSize: 14, verticalAlign: 'middle', mx: 0.25 }} /> at the bottom of Safari
    </Step>
    <Step num={2}>
      Choose <strong>Add to Home Screen</strong>
      <AddBox sx={{ fontSize: 14, verticalAlign: 'middle', ml: 0.5 }} />
    </Step>
    <Step num={3}>
      Confirm the name and tap <strong>Add</strong>
    </Step>

    <Box sx={{ flex: 1 }} />

    {/* Faux home screen strip */}
    <Box sx={{
      mt: 2,
      px: 2,
      py: 1.5,
      borderRadius: 2,
      bgcolor: 'rgba(0,0,0,0.04)',
      border: '1px dashed',
      borderColor: '#c9c9c9',
    }}>
      <Typography sx={{ fontSize: '0.75rem', color: '#333', textAlign: 'center', mb: 1.25, lineHeight: 1.45 }}>
        Once you've completed steps 1–3, tap the icon to open PLANET.
      </Typography>
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <Box
          role="button"
          tabIndex={0}
          onClick={onTapIcon}
          onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') onTapIcon?.(); }}
          aria-label="Open PLANET"
          sx={{
            cursor: 'pointer',
            p: 0.5,
            borderRadius: 1.5,
            transition: 'transform 0.15s',
            '&:hover': { transform: 'scale(1.05)' },
            '&:focus-visible': { outline: '2px solid #0066CC', outlineOffset: 2 },
          }}
        >
          <Box
            component="img"
            src="/images/planet-app-icon.jpg"
            alt=""
            sx={{ width: 56, height: 56, borderRadius: '14px', boxShadow: '0 2px 6px rgba(0,0,0,0.15)', display: 'block' }}
          />
        </Box>
      </Box>
    </Box>
  </>
);

const AndroidInstructions = ({ onInstall }: { onInstall?: () => void }) => (
  <>
    <Typography sx={{ fontSize: '0.78rem', color: '#222', lineHeight: 1.5, mb: 2 }}>
      Chrome will offer to install PLANET as an app. PLANET will open automatically once it's installed.
    </Typography>

    <Box sx={{ flex: 1 }} />

    {/* Faux Chrome install prompt */}
    <Box sx={{
      mt: 2,
      bgcolor: 'white',
      borderRadius: 2,
      p: 1.5,
      display: 'flex',
      alignItems: 'center',
      gap: 1.25,
      boxShadow: '0 4px 12px rgba(0,0,0,0.12)',
      border: '1px solid',
      borderColor: '#e0e0e0',
    }}>
      <Box
        component="img"
        src="/images/planet-app-icon.jpg"
        alt="PLANET"
        sx={{ width: 40, height: 40, borderRadius: '10px', flexShrink: 0 }}
      />
      <Box sx={{ flex: 1, minWidth: 0 }}>
        <Typography sx={{ fontSize: '0.78rem', fontWeight: 600, color: '#111', lineHeight: 1.2 }}>
          Install PLANET
        </Typography>
        <Typography sx={{ fontSize: '0.65rem', color: '#666', lineHeight: 1.2 }}>
          planetnetwork.app
        </Typography>
      </Box>
      <Box
        role="button"
        tabIndex={0}
        onClick={onInstall}
        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') onInstall?.(); }}
        sx={{
          px: 1.5,
          py: 0.5,
          borderRadius: 1.5,
          border: '1px solid #0066CC',
          color: '#0066CC',
          fontSize: '0.72rem',
          fontWeight: 700,
          cursor: 'pointer',
          transition: 'background-color 0.15s',
          '&:hover': { bgcolor: 'rgba(0,102,204,0.08)' },
          '&:focus-visible': { outline: '2px solid #0066CC', outlineOffset: 2 },
        }}
      >
        Install
      </Box>
    </Box>
  </>
);

interface StepProps {
  num: number;
  children: React.ReactNode;
}

const Step = ({ num, children }: StepProps) => (
  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, py: 0.5 }}>
    <Box sx={{
      width: 20,
      height: 20,
      borderRadius: '50%',
      bgcolor: '#0066CC',
      color: 'white',
      fontSize: '0.65rem',
      fontWeight: 700,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexShrink: 0,
    }}>
      {num}
    </Box>
    <Typography sx={{ fontSize: '0.78rem', color: '#222', lineHeight: 1.4, flex: 1 }}>
      {children}
    </Typography>
  </Box>
);
