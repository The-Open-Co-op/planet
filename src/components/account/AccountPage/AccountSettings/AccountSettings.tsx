import { forwardRef, useState } from 'react';
import {
  Typography,
  Box,
  Card,
  CardContent,
  Switch,
  FormControlLabel,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Alert,
  Divider,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Avatar,
  Chip,
  ToggleButton,
  ToggleButtonGroup,
} from '@mui/material';
import {
  SmartToy,
  Warning,
  DeleteForever,
  ExpandMore,
  Business,
  PersonOutline,
  Groups,
  FamilyRestroom,
  Favorite,
  Home,
  LocationOn,
  Public,
  Badge,
  Settings,
  Article,
  Photo,
  CalendarMonth,
} from '@mui/icons-material';
import PersonhoodCredentialsComponent from '@/components/account/PersonhoodCredentials';
import RCardPrivacySettings from '@/components/account/RCardPrivacySettings';
import type { PersonhoodCredentials } from '@/types/personhood';
import type { RCardWithPrivacy, LocationSharingLevel, ArticleSharingLevel, PhotoSharingLevel, CalendarSharingLevel, GroupSharingLevel } from '@/types/notification';
import { DEFAULT_PRIVACY_SETTINGS } from '@/types/notification';

// Data sharing options
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

interface AccountSettingsProps {
  personhoodCredentials: PersonhoodCredentials;
}

// Mock profile cards data
const initialProfileCards: RCardWithPrivacy[] = [
  {
    id: '1',
    name: 'Default',
    description: 'Connections not allocated to another card',
    color: '#6b7280',
    icon: 'PersonOutline',
    isDefault: true,
    createdAt: new Date(),
    updatedAt: new Date(),
    privacySettings: {
      keyRecoveryBuddy: false,
      dataSharing: { location: 'none', articles: 'none', photos: 'none', calendar: 'none', groups: 'none' },
      reSharing: { enabled: false, maxHops: 1 },
    },
  },
  {
    id: '2',
    name: 'Friends',
    description: 'Personal friends and social connections',
    color: '#ef4444',
    icon: 'Favorite',
    isDefault: true,
    createdAt: new Date(),
    updatedAt: new Date(),
    privacySettings: {
      keyRecoveryBuddy: false,
      dataSharing: { location: 'city', articles: 'all', photos: 'events', calendar: 'busy_free', groups: 'selected' },
      reSharing: { enabled: true, maxHops: 4 },
    },
  },
  {
    id: '3',
    name: 'Family',
    description: 'Family members and relatives',
    color: '#f59e0b',
    icon: 'FamilyRestroom',
    isDefault: true,
    createdAt: new Date(),
    updatedAt: new Date(),
    privacySettings: {
      keyRecoveryBuddy: true,
      dataSharing: { location: 'exact', articles: 'all', photos: 'all', calendar: 'full', groups: 'all' },
      reSharing: { enabled: true, maxHops: 6 },
    },
  },
  {
    id: '4',
    name: 'Business',
    description: 'Professional business contacts and partnerships',
    color: '#2563eb',
    icon: 'Business',
    isDefault: true,
    createdAt: new Date(),
    updatedAt: new Date(),
    privacySettings: {
      keyRecoveryBuddy: false,
      dataSharing: { location: 'city', articles: 'selected', photos: 'none', calendar: 'availability', groups: 'none' },
      reSharing: { enabled: true, maxHops: 2 },
    },
  },
  {
    id: '5',
    name: 'Community',
    description: 'Community members and local connections',
    color: '#059669',
    icon: 'Public',
    isDefault: true,
    createdAt: new Date(),
    updatedAt: new Date(),
    privacySettings: {
      keyRecoveryBuddy: false,
      dataSharing: { location: 'region', articles: 'selected', photos: 'tagged', calendar: 'busy_free', groups: 'selected' },
      reSharing: { enabled: true, maxHops: 3 },
    },
  },
];

const getRCardIcon = (iconName: string) => {
  switch (iconName) {
    case 'Business':
      return <Business />;
    case 'PersonOutline':
      return <PersonOutline />;
    case 'Groups':
      return <Groups />;
    case 'FamilyRestroom':
      return <FamilyRestroom />;
    case 'Favorite':
      return <Favorite />;
    case 'Home':
      return <Home />;
    case 'LocationOn':
      return <LocationOn />;
    case 'Public':
      return <Public />;
    default:
      return <PersonOutline />;
  }
};

export const AccountSettings = forwardRef<HTMLDivElement, AccountSettingsProps>(
  ({ personhoodCredentials }, ref) => {
    const [aiEnabled, setAiEnabled] = useState(true);
    const [showDeleteDialog, setShowDeleteDialog] = useState(false);
    const [deleteConfirmation, setDeleteConfirmation] = useState('');
    const [profileCards, setProfileCards] = useState<RCardWithPrivacy[]>(initialProfileCards);
    const [expandedCard, setExpandedCard] = useState<string | false>(false);
    const [appSettings, setAppSettings] = useState({
      location: 'city' as LocationSharingLevel,
      articles: 'selected' as ArticleSharingLevel,
      photos: 'events' as PhotoSharingLevel,
      calendar: 'busy_free' as CalendarSharingLevel,
      groups: 'selected' as GroupSharingLevel,
    });

    const handleAppSettingChange = <T extends string>(field: string, value: T) => {
      setAppSettings(prev => ({ ...prev, [field]: value }));
    };

    const handleAccordionChange = (cardId: string) => (_event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpandedCard(isExpanded ? cardId : false);
    };

    const handleCardUpdate = (updatedCard: RCardWithPrivacy) => {
      setProfileCards(prev => prev.map(card =>
        card.id === updatedCard.id ? updatedCard : card
      ));
    };

    const handleAiToggle = (event: React.ChangeEvent<HTMLInputElement>) => {
      setAiEnabled(event.target.checked);
      console.log('AI functionality', event.target.checked ? 'enabled' : 'disabled');
    };

    const handleDeleteAccount = () => {
      setShowDeleteDialog(true);
    };

    const handleConfirmDelete = () => {
      if (deleteConfirmation.toLowerCase() === 'delete my account') {
        console.log('Account deletion confirmed');
        // In a real app, this would call an API to delete the account
        alert('Account deletion would be processed. This is a demo.');
        setShowDeleteDialog(false);
        setDeleteConfirmation('');
      }
    };

    const handleCancelDelete = () => {
      setShowDeleteDialog(false);
      setDeleteConfirmation('');
    };

    return (
      <Box ref={ref}>
        {/* AI Settings */}
        <Card sx={{ mb: 3 }}>
          <CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
              <SmartToy color="primary" sx={{ fontSize: 28 }} />
              <Box sx={{ flexGrow: 1 }}>
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  AI Features
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Control AI-powered features and recommendations
                </Typography>
              </Box>
            </Box>

            <FormControlLabel
              control={
                <Switch
                  checked={aiEnabled}
                  onChange={handleAiToggle}
                  color="primary"
                />
              }
              label={
                <Box>
                  <Typography variant="body1" sx={{ fontWeight: 500 }}>
                    Enable AI Features
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Allow AI to help with content suggestions, connection recommendations, and smart features
                  </Typography>
                </Box>
              }
            />

            {!aiEnabled && (
              <Alert severity="info" sx={{ mt: 2 }}>
                AI features are disabled. You won't receive smart recommendations or AI-powered insights.
              </Alert>
            )}
          </CardContent>
        </Card>

        {/* Personhood Credentials */}
        <Box sx={{ mb: 3 }}>
          <PersonhoodCredentialsComponent
            credentials={personhoodCredentials}
          />
        </Box>

        <Divider sx={{ my: 3 }} />

        {/* Danger Zone */}
        <Card sx={{ border: 1, borderColor: 'error.main' }}>
          <CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
              <Warning color="error" sx={{ fontSize: 28 }} />
              <Box sx={{ flexGrow: 1 }}>
                <Typography variant="h6" sx={{ fontWeight: 600, color: 'error.main' }}>
                  Danger Zone
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Irreversible and destructive actions
                </Typography>
              </Box>
            </Box>

            <Alert severity="warning" sx={{ mb: 3 }}>
              <Typography variant="body2" sx={{ fontWeight: 500, mb: 1 }}>
                Account Deletion Warning
              </Typography>
              <Typography variant="body2">
                Deleting your account will permanently remove all your data, connections, posts, documents, 
                and profile information. This action cannot be undone.
              </Typography>
            </Alert>

            <Button
              variant="outlined"
              color="error"
              startIcon={<DeleteForever />}
              onClick={handleDeleteAccount}
              sx={{
                borderColor: 'error.main',
                color: 'error.main',
                '&:hover': {
                  borderColor: 'error.dark',
                  backgroundColor: 'error.light',
                  color: 'error.dark',
                }
              }}
            >
              Delete My Account
            </Button>
          </CardContent>
        </Card>

        <Divider sx={{ my: 3 }} />

        {/* App Settings */}
        <Card sx={{ mb: 3 }}>
          <CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
              <Settings color="primary" sx={{ fontSize: 28 }} />
              <Box sx={{ flexGrow: 1 }}>
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  App Settings
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Control what data is shared with connected apps
                </Typography>
              </Box>
            </Box>

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
              {/* Location */}
              <Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5 }}>
                  <LocationOn fontSize="small" color="action" />
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>
                    Location
                  </Typography>
                </Box>
                <ToggleButtonGroup
                  value={appSettings.location}
                  exclusive
                  onChange={(_, value) => value && handleAppSettingChange('location', value)}
                  size="small"
                  fullWidth
                  sx={{
                    '& .MuiToggleButton-root': {
                      textTransform: 'none',
                      flex: 1,
                      py: 1,
                      '&.Mui-selected': {
                        bgcolor: 'primary.main',
                        color: 'primary.contrastText',
                        '&:hover': { bgcolor: 'primary.dark' },
                      },
                    },
                  }}
                >
                  {locationOptions.map((opt) => (
                    <ToggleButton key={opt.value} value={opt.value}>{opt.label}</ToggleButton>
                  ))}
                </ToggleButtonGroup>
              </Box>

              {/* Articles */}
              <Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5 }}>
                  <Article fontSize="small" color="action" />
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>
                    Articles
                  </Typography>
                </Box>
                <ToggleButtonGroup
                  value={appSettings.articles}
                  exclusive
                  onChange={(_, value) => value && handleAppSettingChange('articles', value)}
                  size="small"
                  fullWidth
                  sx={{
                    '& .MuiToggleButton-root': {
                      textTransform: 'none',
                      flex: 1,
                      py: 1,
                      '&.Mui-selected': {
                        bgcolor: 'primary.main',
                        color: 'primary.contrastText',
                        '&:hover': { bgcolor: 'primary.dark' },
                      },
                    },
                  }}
                >
                  {articleOptions.map((opt) => (
                    <ToggleButton key={opt.value} value={opt.value}>{opt.label}</ToggleButton>
                  ))}
                </ToggleButtonGroup>
              </Box>

              {/* Photos */}
              <Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5 }}>
                  <Photo fontSize="small" color="action" />
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>
                    Photos
                  </Typography>
                </Box>
                <ToggleButtonGroup
                  value={appSettings.photos}
                  exclusive
                  onChange={(_, value) => value && handleAppSettingChange('photos', value)}
                  size="small"
                  fullWidth
                  sx={{
                    '& .MuiToggleButton-root': {
                      textTransform: 'none',
                      flex: 1,
                      py: 1,
                      '&.Mui-selected': {
                        bgcolor: 'primary.main',
                        color: 'primary.contrastText',
                        '&:hover': { bgcolor: 'primary.dark' },
                      },
                    },
                  }}
                >
                  {photoOptions.map((opt) => (
                    <ToggleButton key={opt.value} value={opt.value}>{opt.label}</ToggleButton>
                  ))}
                </ToggleButtonGroup>
              </Box>

              {/* Calendar */}
              <Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5 }}>
                  <CalendarMonth fontSize="small" color="action" />
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>
                    Calendar
                  </Typography>
                </Box>
                <ToggleButtonGroup
                  value={appSettings.calendar}
                  exclusive
                  onChange={(_, value) => value && handleAppSettingChange('calendar', value)}
                  size="small"
                  fullWidth
                  sx={{
                    '& .MuiToggleButton-root': {
                      textTransform: 'none',
                      flex: 1,
                      py: 1,
                      '&.Mui-selected': {
                        bgcolor: 'primary.main',
                        color: 'primary.contrastText',
                        '&:hover': { bgcolor: 'primary.dark' },
                      },
                    },
                  }}
                >
                  {calendarOptions.map((opt) => (
                    <ToggleButton key={opt.value} value={opt.value}>{opt.label}</ToggleButton>
                  ))}
                </ToggleButtonGroup>
              </Box>

              {/* Groups */}
              <Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5 }}>
                  <Groups fontSize="small" color="action" />
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>
                    Groups
                  </Typography>
                </Box>
                <ToggleButtonGroup
                  value={appSettings.groups}
                  exclusive
                  onChange={(_, value) => value && handleAppSettingChange('groups', value)}
                  size="small"
                  fullWidth
                  sx={{
                    '& .MuiToggleButton-root': {
                      textTransform: 'none',
                      flex: 1,
                      py: 1,
                      '&.Mui-selected': {
                        bgcolor: 'primary.main',
                        color: 'primary.contrastText',
                        '&:hover': { bgcolor: 'primary.dark' },
                      },
                    },
                  }}
                >
                  {groupOptions.map((opt) => (
                    <ToggleButton key={opt.value} value={opt.value}>{opt.label}</ToggleButton>
                  ))}
                </ToggleButtonGroup>
              </Box>
            </Box>
          </CardContent>
        </Card>

        {/* Delete Account Dialog */}
        <Dialog
          open={showDeleteDialog}
          onClose={handleCancelDelete}
          maxWidth="sm"
          fullWidth
          PaperProps={{
            sx: {
              borderRadius: 3,
            }
          }}
        >
          <DialogTitle sx={{ color: 'error.main' }}>
            Delete Account
          </DialogTitle>
          <DialogContent>
            <Alert severity="error" sx={{ mb: 3 }}>
              <Typography variant="body2" sx={{ fontWeight: 600, mb: 1 }}>
                This action is permanent and cannot be undone!
              </Typography>
              <Typography variant="body2">
                All of your data will be permanently deleted, including:
              </Typography>
              <Box component="ul" sx={{ mt: 1, mb: 0, pl: 2 }}>
                <li>Profile information and rCards</li>
                <li>All posts, documents, and social queries</li>
                <li>Connection network and vouches</li>
                <li>Privacy settings and preferences</li>
                <li>Personhood credentials and verifications</li>
              </Box>
            </Alert>

            <Typography variant="body2" sx={{ mb: 2 }}>
              To confirm account deletion, please type{' '}
              <Typography component="span" sx={{ fontWeight: 600, fontFamily: 'monospace' }}>
                delete my account
              </Typography>
              {' '}in the field below:
            </Typography>

            <TextField
              fullWidth
              value={deleteConfirmation}
              onChange={(e) => setDeleteConfirmation(e.target.value)}
              placeholder="delete my account"
              variant="outlined"
              sx={{
                '& .MuiOutlinedInput-root': {
                  '&.Mui-focused fieldset': {
                    borderColor: 'error.main',
                  },
                },
              }}
            />
          </DialogContent>
          <DialogActions sx={{ px: 3, pb: 3 }}>
            <Button onClick={handleCancelDelete} variant="outlined">
              Cancel
            </Button>
            <Button
              onClick={handleConfirmDelete}
              variant="contained"
              color="error"
              disabled={deleteConfirmation.toLowerCase() !== 'delete my account'}
              startIcon={<DeleteForever />}
            >
              Delete Account
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    );
  }
);

AccountSettings.displayName = 'AccountSettings';