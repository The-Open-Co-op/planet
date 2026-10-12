import { Box, IconButton, Link, Typography } from '@mui/material';
import { ArrowBack, CheckCircle, Verified, DescriptionOutlined } from '@mui/icons-material';
import { LINKS } from '@/components/trust-demo/trustDemoData';
import type { ReactNode } from 'react';
import { DemoTabBar } from '@/components/onboarding/DemoTabBar';
import type { DemoTab } from '@/components/onboarding/DemoTabBar';
import type { Person } from './familyVaultData';

export const FV_BLUE = '#0066CC';

/** A Family Vault app screen: title bar, scrolling body, the shared app nav. */
export const VaultScreen = ({
  title,
  subtitle,
  tab = 'home',
  onBack,
  chips,
  tint,
  badges,
  children,
}: {
  title: string;
  subtitle?: string;
  tab?: DemoTab;
  /** Shows a back arrow to the left of the title. */
  onBack?: () => void;
  /** Filter chips, pinned under the title so they stay put as the body scrolls. */
  chips?: ReactNode;
  /** Background wash — used to signal whose phone this is. */
  tint?: string;
  /** Unread counts for the app nav, e.g. { alerts: 2 }. */
  badges?: Partial<Record<DemoTab, number>>;
  children: ReactNode;
}) => (
  <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column', bgcolor: tint || 'transparent' }}>
    <Box
      sx={{
        px: 2,
        py: 1.25,
        borderBottom: '1px solid',
        borderColor: 'divider',
        display: 'flex',
        alignItems: 'center',
        gap: 1,
      }}
    >
      {onBack && (
        <IconButton size="small" onClick={onBack} aria-label="Back" sx={{ ml: -1 }}>
          <ArrowBack sx={{ fontSize: 18 }} />
        </IconButton>
      )}
      <Box sx={{ minWidth: 0 }}>
        <Typography sx={{ fontWeight: 800, lineHeight: 1.2, color: FV_BLUE }} noWrap>
          {title}
        </Typography>
        {subtitle && (
          <Typography variant="caption" color="text.secondary">
            {subtitle}
          </Typography>
        )}
      </Box>
    </Box>
    {chips && (
      <Box
        sx={{
          px: 2,
          py: 1,
          flexShrink: 0,
          borderBottom: '1px solid',
          borderColor: 'divider',
          bgcolor: 'background.paper',
        }}
      >
        {chips}
      </Box>
    )}
    <Box sx={{ flex: 1, overflow: 'auto', p: 2, display: 'flex', flexDirection: 'column', gap: 1.5 }}>
      {children}
    </Box>
    <DemoTabBar active={tab} activeColor={FV_BLUE} badges={badges} />
  </Box>
);

/** Small all-caps label above a group. */
export const GroupLabel = ({ children }: { children: ReactNode }) => (
  <Typography
    variant="caption"
    sx={{ fontWeight: 800, letterSpacing: '0.04em', color: 'text.secondary', display: 'block' }}
  >
    {children}
  </Typography>
);

/** Plain card used for records, requests and memory entries. */
export const VaultCard = ({ children, accent }: { children: ReactNode; accent?: string }) => (
  <Box
    sx={{
      p: 1.5,
      borderRadius: 1.5,
      border: '1px solid',
      borderColor: accent || 'divider',
      bgcolor: accent ? `${accent}0D` : 'background.paper',
    }}
  >
    {children}
  </Box>
);

/** Status pill — used for Declared / Inferred and build status. */
export const Pill = ({
  label,
  color = '#475569',
  filled = false,
}: {
  label: string;
  color?: string;
  filled?: boolean;
}) => (
  <Box
    component="span"
    sx={{
      display: 'inline-flex',
      alignItems: 'center',
      px: 0.75,
      py: 0.25,
      borderRadius: 1,
      fontSize: '0.6rem',
      fontWeight: 800,
      letterSpacing: '0.03em',
      lineHeight: 1.6,
      color: filled ? '#fff' : color,
      bgcolor: filled ? color : `${color}1A`,
      whiteSpace: 'nowrap',
    }}
  >
    {label}
  </Box>
);

/** Avatar + name + role, with the verified mark. */
export const PersonChip = ({ person, compact }: { person: Person; compact?: boolean }) => (
  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, minWidth: 0 }}>
    <Box
      sx={{
        width: compact ? 26 : 32,
        height: compact ? 26 : 32,
        borderRadius: '50%',
        bgcolor: person.color,
        color: '#fff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: compact ? '0.65rem' : '0.75rem',
        fontWeight: 800,
        flexShrink: 0,
      }}
    >
      {person.initials}
    </Box>
    <Box sx={{ minWidth: 0 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
        <Typography variant="body2" sx={{ fontWeight: 700 }} noWrap>
          {person.name}
          {person.age ? `, ${person.age}` : ''}
        </Typography>
        {person.verified && <Verified sx={{ fontSize: 13, color: FV_BLUE, flexShrink: 0 }} />}
      </Box>
      {!compact && (
        <Typography variant="caption" color="text.secondary" sx={{ display: 'block', lineHeight: 1.3 }}>
          {person.access}
        </Typography>
      )}
    </Box>
  </Box>
);

/**
 * The terms a share was made under, small enough for a log row. Every share
 * records one, so it stays readable after the grant itself has ended.
 */
export const TermsLink = ({
  label = 'MyTerms SD-BASE',
  href = LINKS.myTermsSdBase,
}: {
  label?: string;
  href?: string;
}) => (
  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
    <DescriptionOutlined sx={{ fontSize: 13, color: 'text.disabled' }} />
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      underline="hover"
      variant="caption"
      onClick={(e) => e.stopPropagation()}
      sx={{ color: 'text.secondary' }}
    >
      {label}
    </Link>
  </Box>
);

/** A green tick line — "signed by", "not revoked", and so on. */
export const CheckLine = ({ children }: { children: ReactNode }) => (
  <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 0.75 }}>
    <CheckCircle sx={{ fontSize: 14, color: 'success.main', mt: '2px', flexShrink: 0 }} />
    <Typography variant="caption" sx={{ color: 'text.primary', lineHeight: 1.4 }}>
      {children}
    </Typography>
  </Box>
);

/** Field/value rows — used for the report's learner and vaccination schemas. */
export const FieldRows = ({ rows }: { rows: { label: string; value: string }[] }) => (
  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.75 }}>
    {rows.map((r) => (
      <Box key={r.label}>
        <Typography
          variant="caption"
          sx={{ fontWeight: 800, color: 'text.secondary', display: 'block', lineHeight: 1.3 }}
        >
          {r.label}
        </Typography>
        <Typography variant="caption" sx={{ color: 'text.primary', lineHeight: 1.4 }}>
          {r.value}
        </Typography>
      </Box>
    ))}
  </Box>
);
