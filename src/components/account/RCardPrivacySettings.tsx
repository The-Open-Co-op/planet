import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Typography,
  Box,
  Switch,
  Slider,
  Collapse,
  ToggleButton,
  ToggleButtonGroup,
} from '@mui/material';
import {
  LocationOn,
  Refresh,
  AccountCircle,
  VerifiedUser,
  Article,
  Photo,
  CalendarMonth,
  Groups,
  ChevronRight,
  ExpandMore,
  Public,
} from '@mui/icons-material';
import type {
  RCardWithPrivacy,
  LocationSharingLevel,
  ArticleSharingLevel,
  PhotoSharingLevel,
  CalendarSharingLevel,
  GroupSharingLevel,
} from '@/types/notification';
import { DEFAULT_PRIVACY_SETTINGS } from '@/types/notification';
import { useVRCs } from '@/hooks/useVRCs';

const BORDER_COLOR = '#D4D7DC';

interface RCardPrivacySettingsProps {
  rCard: RCardWithPrivacy;
  onUpdate: (updatedRCard: RCardWithPrivacy) => void;
}

interface DataSharingOption<T> {
  value: T;
  label: string;
}

const locationOptions: DataSharingOption<LocationSharingLevel>[] = [
  { value: 'none', label: 'None' },
  { value: 'city', label: 'City' },
  { value: 'region', label: 'Region' },
  { value: 'exact', label: 'Exact' },
];

type LocationDuration = 'none' | '1h' | '1d' | '1w' | 'always';
const locationDurationOptions: DataSharingOption<LocationDuration>[] = [
  { value: '1h', label: '1 Hour' },
  { value: '1d', label: '1 Day' },
  { value: '1w', label: '1 Week' },
  { value: 'always', label: 'Always' },
];

const articleOptions: DataSharingOption<ArticleSharingLevel>[] = [
  { value: 'none', label: 'None' },
  { value: 'selected', label: 'Selected' },
  { value: 'all', label: 'All' },
];

const photoOptions: DataSharingOption<PhotoSharingLevel>[] = [
  { value: 'none', label: 'None' },
  { value: 'tagged', label: 'Tagged' },
  { value: 'events', label: 'Events' },
  { value: 'all', label: 'All' },
];

const calendarOptions: DataSharingOption<CalendarSharingLevel>[] = [
  { value: 'none', label: 'None' },
  { value: 'busy_free', label: 'Busy/Free' },
  { value: 'availability', label: 'Availability' },
  { value: 'full', label: 'Full' },
];

const groupOptions: DataSharingOption<GroupSharingLevel>[] = [
  { value: 'none', label: 'None' },
  { value: 'selected', label: 'Selected' },
  { value: 'all', label: 'All' },
];

/** Full-width divider matching the container borders */
const SettingsDivider = () => (
  <Box sx={{ borderBottom: `1px solid ${BORDER_COLOR}` }} />
);

/** A row with a label, optional description, toggle switch, and optional expandable content */
const ToggleRow = ({
  icon,
  label,
  description,
  checked,
  onChange,
  expanded,
  onToggleExpand,
  children,
}: {
  icon: React.ReactNode;
  label: string;
  description?: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  expanded?: boolean;
  onToggleExpand?: () => void;
  children?: React.ReactNode;
}) => {
  const rowRef = useRef<HTMLDivElement>(null);

  const scrollIntoView = () => {
    setTimeout(() => {
      const el = rowRef.current;
      if (!el) return;

      // Walk up to find the actual scrollable ancestor
      let scrollParent: HTMLElement | null = el.parentElement;
      while (scrollParent) {
        const style = getComputedStyle(scrollParent);
        if (style.overflow === 'auto' || style.overflow === 'scroll' ||
            style.overflowY === 'auto' || style.overflowY === 'scroll') {
          break;
        }
        scrollParent = scrollParent.parentElement;
      }

      const rect = el.getBoundingClientRect();
      if (scrollParent) {
        const parentRect = scrollParent.getBoundingClientRect();
        const overflow = rect.bottom - parentRect.bottom + 20;
        if (overflow > 0) {
          scrollParent.scrollBy({ top: overflow, behavior: 'smooth' });
        }
      } else {
        const overflow = rect.bottom - window.innerHeight + 20;
        if (overflow > 0) {
          window.scrollBy({ top: overflow, behavior: 'smooth' });
        }
      }
    }, 350);
  };

  const handleExpanded = () => {
    if (!expanded) scrollIntoView();
    onToggleExpand?.();
  };

  const handleToggle = (newChecked: boolean) => {
    onChange(newChecked);
    if (newChecked && children && onToggleExpand && !expanded) {
      onToggleExpand();
      scrollIntoView();
    }
  };

  return (
    <Box ref={rowRef}>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          px: 2,
          py: 1.5,
          gap: 1.5,
        }}
      >
        <Box sx={{ color: 'action.active', display: 'flex' }}>{icon}</Box>
        <Box
          sx={{ flex: 1, minWidth: 0, cursor: onToggleExpand ? 'pointer' : 'default' }}
          onClick={() => onToggleExpand && handleExpanded()}
        >
          <Typography variant="body2" sx={{ fontWeight: 600, lineHeight: 1.2 }}>
            {label}
          </Typography>
          {description && (
            <Typography variant="caption" color="text.secondary" sx={{ lineHeight: 1.2 }}>
              {description}
            </Typography>
          )}
        </Box>
        <Switch
          checked={checked}
          onChange={(e) => handleToggle(e.target.checked)}
          size="small"
        />
      </Box>
      {children && (
        <Collapse in={expanded}>
          {children}
        </Collapse>
      )}
    </Box>
  );
};

/** A row with a label that expands to show content */
const ExpandableRow = ({
  icon,
  label,
  value,
  expanded,
  onToggle,
  children,
  hideChevron,
}: {
  icon: React.ReactNode;
  label: string;
  value?: string;
  expanded: boolean;
  onToggle?: () => void;
  children: React.ReactNode;
  hideChevron?: boolean;
}) => (
  <Box>
    <Box
      onClick={onToggle}
      sx={{
        display: 'flex',
        alignItems: 'center',
        px: 2,
        py: 1.5,
        gap: 1.5,
        cursor: onToggle ? 'pointer' : 'default',
        '&:hover': onToggle ? { bgcolor: 'action.hover' } : {},
      }}
    >
      <Box sx={{ color: 'action.active', display: 'flex' }}>{icon}</Box>
      <Box sx={{ flex: 1, minWidth: 0 }}>
        <Typography variant="body2" sx={{ fontWeight: 600 }}>
          {label}
        </Typography>
      </Box>
      {value && (
        <Typography variant="caption" color="text.secondary" sx={{ mr: 0.5 }}>
          {value}
        </Typography>
      )}
      {!hideChevron && (expanded ? (
        <ExpandMore fontSize="small" color="action" />
      ) : (
        <ChevronRight fontSize="small" color="action" />
      ))}
    </Box>
    <Collapse in={expanded}>
      <Box sx={{ px: 2, pb: 2, pt: 0.5 }}>
        {children}
      </Box>
    </Collapse>
  </Box>
);

/** List of vouches with toggle + click-through to contact */
const VouchList = ({
  vouches,
  sharedVouchIds,
  onToggle,
}: {
  vouches: import('@/types/notification').Vouch[];
  sharedVouchIds: string[];
  onToggle: (id: string, shared: boolean) => void;
}) => {
  const navigate = useNavigate();

  return (
    <Box>
      {vouches.map((vouch, index) => {
        const isShared = sharedVouchIds.includes(vouch.id);
        return (
          <Box key={vouch.id}>
            {index > 0 && <Box sx={{ borderBottom: `1px solid ${BORDER_COLOR}` }} />}
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                py: 1,
              }}
            >
              <Box
                sx={{
                  flex: 1,
                  minWidth: 0,
                  cursor: 'pointer',
                  '&:hover': { opacity: 0.7 },
                }}
                onClick={() => navigate(`/contacts/${vouch.fromUserId}`, {
                  state: { highlightVouchId: vouch.id, from: 'trust-profile' }
                })}
              >
                <Typography variant="body2" sx={{ fontWeight: 600 }}>
                  {vouch.skill}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  From {vouch.fromUserName}
                </Typography>
              </Box>
              <Switch
                checked={isShared}
                onChange={(e) => onToggle(vouch.id, e.target.checked)}
                size="small"
              />
              <ChevronRight
                fontSize="small"
                color="action"
                sx={{ cursor: 'pointer' }}
                onClick={() => navigate(`/contacts/${vouch.fromUserId}`, {
                  state: { highlightVouchId: vouch.id, from: 'trust-profile' }
                })}
              />
            </Box>
          </Box>
        );
      })}
    </Box>
  );
};

const RCardPrivacySettings = ({ rCard, onUpdate }: RCardPrivacySettingsProps) => {
  const { getAcceptedVouchesForProfile, refresh: refreshVRCs } = useVRCs();
  const [settings, setSettings] = useState(rCard?.privacySettings || DEFAULT_PRIVACY_SETTINGS);
  const [sharedVouchIds, setSharedVouchIds] = useState<string[]>([]);

  // Vouches assigned to THIS specific Trust Profile
  const profileVouches = getAcceptedVouchesForProfile(rCard.id);

  // Refresh VRC data on mount
  useEffect(() => {
    refreshVRCs();
  }, [refreshVRCs]);

  // Sync shared IDs when profile vouches change — new ones default to shared
  useEffect(() => {
    setSharedVouchIds(prev => {
      const assignedIds = profileVouches.map(v => v.id);
      const newIds = assignedIds.filter(id => !prev.includes(id));
      if (newIds.length > 0 || prev.some(id => !assignedIds.includes(id))) {
        return [...prev.filter(id => assignedIds.includes(id)), ...newIds];
      }
      return prev.length === 0 ? assignedIds : prev;
    });
  }, [profileVouches]);
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  useEffect(() => {
    setSettings(rCard?.privacySettings || DEFAULT_PRIVACY_SETTINGS);
  }, [rCard]);

  const handleSettingChange = (
    category: string,
    field: string,
    value: unknown
  ) => {
    const newSettings = { ...settings };

    if (category === 'dataSharing' && newSettings.dataSharing) {
      newSettings.dataSharing = {
        ...newSettings.dataSharing,
        [field]: value
      };
    } else if (category === 'reSharing' && newSettings.reSharing) {
      newSettings.reSharing = {
        ...newSettings.reSharing,
        [field]: value
      };
    } else if (category === 'general') {
      if (field === 'keyRecoveryBuddy') {
        (newSettings as Record<string, unknown>)[field] = value;
      }
    }

    setSettings(newSettings);

    const updatedRCard = {
      ...rCard,
      privacySettings: newSettings,
      updatedAt: new Date(),
    };

    onUpdate(updatedRCard);
  };

  const handleVouchToggle = (vouchId: string, isShared: boolean) => {
    if (isShared) {
      setSharedVouchIds(prev => [...prev, vouchId]);
    } else {
      setSharedVouchIds(prev => prev.filter(id => id !== vouchId));
    }
  };

  const toggleSection = (section: string) => {
    setExpandedSection(prev => prev === section ? null : section);
  };

  const getLabelForValue = <T extends string>(options: DataSharingOption<T>[], value: T) => {
    return options.find(o => o.value === value)?.label || value;
  };

  const DataSharingToggleGroup = <T extends string>({
    options,
    value,
    onChange
  }: {
    options: DataSharingOption<T>[];
    value: T;
    onChange: (value: T) => void;
  }) => (
    <ToggleButtonGroup
      value={value}
      exclusive
      onChange={(_, newValue) => newValue && onChange(newValue)}
      size="small"
      fullWidth
      sx={{
        '& .MuiToggleButton-root': {
          textTransform: 'none',
          flex: 1,
          py: 0.4,
          fontSize: '0.7rem',
          fontWeight: 500,
          border: '1px solid',
          borderColor: 'divider',
          color: 'text.secondary',
          '&.Mui-selected': {
            bgcolor: 'action.selected',
            color: 'text.primary',
            fontWeight: 600,
            borderColor: 'text.disabled',
            '&:hover': { bgcolor: 'action.selected' },
          },
        },
      }}
    >
      {options.map((option) => (
        <ToggleButton key={option.value} value={option.value}>
          {option.label}
        </ToggleButton>
      ))}
    </ToggleButtonGroup>
  );

  return (
    <Box>
      {/* Section subtitle */}
      <Box sx={{ px: 2, py: 0.5, bgcolor: 'action.hover', borderBottom: `1px solid ${BORDER_COLOR}` }}>
        <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600, textTransform: 'uppercase', letterSpacing: 0.5 }}>
          Sharing settings
        </Typography>
      </Box>

      {/* Vouches */}
      <ExpandableRow
        icon={<VerifiedUser fontSize="small" />}
        label="Vouches"
        value={profileVouches.length === 0 ? 'None' : `${sharedVouchIds.length} of ${profileVouches.length}`}
        expanded={profileVouches.length > 0 && expandedSection === 'vouches'}
        onToggle={profileVouches.length > 0 ? () => toggleSection('vouches') : undefined}
        hideChevron={profileVouches.length === 0}
      >
        <VouchList
          vouches={profileVouches}
          sharedVouchIds={sharedVouchIds}
          onToggle={handleVouchToggle}
        />
      </ExpandableRow>

      <SettingsDivider />

      {/* Location */}
      <ToggleRow
        icon={<LocationOn fontSize="small" />}
        label="Location"
        checked={settings.dataSharing.location !== 'none'}
        onChange={(checked) => handleSettingChange('dataSharing', 'location', checked ? 'city' : 'none')}
        expanded={expandedSection === 'location'}
        onToggleExpand={() => toggleSection('location')}
      >
        <Box sx={{ px: 2, pb: 1.5 }}>
          <Typography variant="caption" color="text.secondary" sx={{ mb: 0.5, display: 'block' }}>
            Precision
          </Typography>
          <DataSharingToggleGroup
            options={[
              { value: 'city' as LocationSharingLevel, label: 'City' },
              { value: 'region' as LocationSharingLevel, label: 'Region' },
              { value: 'exact' as LocationSharingLevel, label: 'Exact' },
            ]}
            value={settings.dataSharing.location}
            onChange={(value) => handleSettingChange('dataSharing', 'location', value)}
          />
          <Box sx={{ mt: 1 }}>
            <Typography variant="caption" color="text.secondary" sx={{ mb: 0.5, display: 'block' }}>
              Duration
            </Typography>
            <DataSharingToggleGroup
              options={locationDurationOptions}
              value={(settings.dataSharing as any).locationDuration || 'always'}
              onChange={(value) => handleSettingChange('dataSharing', 'locationDuration', value)}
            />
          </Box>
        </Box>
      </ToggleRow>

      <SettingsDivider />

      {/* Posts */}
      <ToggleRow
        icon={<Article fontSize="small" />}
        label="Posts"
        checked={settings.dataSharing.articles !== 'none'}
        onChange={(checked) => handleSettingChange('dataSharing', 'articles', checked ? 'all' : 'none')}
      />

      <SettingsDivider />

      {/* Photos */}
      <ToggleRow
        icon={<Photo fontSize="small" />}
        label="Photos"
        checked={settings.dataSharing.photos !== 'none'}
        onChange={(checked) => handleSettingChange('dataSharing', 'photos', checked ? 'all' : 'none')}
        expanded={expandedSection === 'photos'}
        onToggleExpand={() => toggleSection('photos')}
      >
        <Box sx={{ px: 2, pb: 1.5 }}>
          <DataSharingToggleGroup
            options={[
              { value: 'all' as PhotoSharingLevel, label: 'All' },
              { value: 'events' as PhotoSharingLevel, label: 'Albums' },
              { value: 'tagged' as PhotoSharingLevel, label: 'Select' },
            ]}
            value={settings.dataSharing.photos}
            onChange={(value) => handleSettingChange('dataSharing', 'photos', value)}
          />
        </Box>
      </ToggleRow>

      <SettingsDivider />

      {/* Calendar */}
      <ToggleRow
        icon={<CalendarMonth fontSize="small" />}
        label="Calendar"
        checked={settings.dataSharing.calendar !== 'none'}
        onChange={(checked) => handleSettingChange('dataSharing', 'calendar', checked ? 'busy_free' : 'none')}
        expanded={expandedSection === 'calendar'}
        onToggleExpand={() => toggleSection('calendar')}
      >
        <Box sx={{ px: 2, pb: 1.5 }}>
          <Typography variant="caption" color="text.secondary" sx={{ mb: 0.5, display: 'block' }}>
            Detail
          </Typography>
          <DataSharingToggleGroup
            options={[
              { value: 'busy_free' as CalendarSharingLevel, label: 'Availability' },
              { value: 'full' as CalendarSharingLevel, label: 'Full Details' },
            ]}
            value={settings.dataSharing.calendar}
            onChange={(value) => handleSettingChange('dataSharing', 'calendar', value)}
          />
          <Box sx={{ mt: 1 }}>
            <Typography variant="caption" color="text.secondary" sx={{ mb: 0.5, display: 'block' }}>
              Duration
            </Typography>
            <DataSharingToggleGroup
              options={locationDurationOptions}
              value={(settings.dataSharing as any).calendarDuration || 'always'}
              onChange={(value) => handleSettingChange('dataSharing', 'calendarDuration', value)}
            />
          </Box>
        </Box>
      </ToggleRow>

      <SettingsDivider />

      {/* Account Recovery */}
      <ToggleRow
        icon={<AccountCircle fontSize="small" />}
        label="Account Recovery"
        checked={settings.keyRecoveryBuddy}
        onChange={(checked) => handleSettingChange('general', 'keyRecoveryBuddy', checked)}
        expanded={expandedSection === 'recovery'}
        onToggleExpand={() => toggleSection('recovery')}
      >
        <Box sx={{ px: 2, pb: 1.5 }}>
          <Typography variant="caption" color="text.secondary">
            Allow contacts to help you recover your account
          </Typography>
        </Box>
      </ToggleRow>

      <SettingsDivider />

      {/* Network Access */}
      <ToggleRow
        icon={<Public fontSize="small" />}
        label="Network Access"
        checked={settings.reSharing.enabled}
        onChange={(checked) => handleSettingChange('reSharing', 'enabled', checked)}
        expanded={expandedSection === 'network'}
        onToggleExpand={() => toggleSection('network')}
      >
        <Box sx={{ pl: 2, pr: 4, pb: 2 }}>
          <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 1.5 }}>
            Allow contacts to traverse your trust graph
          </Typography>
          <Slider
            value={settings.reSharing.maxHops}
            onChange={(_, value) => handleSettingChange('reSharing', 'maxHops', value)}
            min={1}
            max={6}
            step={1}
            marks={[
              { value: 1, label: '1' },
              { value: 2, label: '2' },
              { value: 3, label: '3' },
              { value: 4, label: '4' },
              { value: 5, label: '5' },
              { value: 6, label: '∞' },
            ]}
            sx={{ color: 'primary.main', ml: 1 }}
          />
          <Typography variant="caption" color="text.secondary">
            {settings.reSharing.maxHops === 6
              ? 'Unlimited hops'
              : `Up to ${settings.reSharing.maxHops} hops`
            }
          </Typography>
        </Box>
      </ToggleRow>

    </Box>
  );
};

export default RCardPrivacySettings;
