import { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
  Switch,
  FormControlLabel,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Slider,
  Divider,
} from '@mui/material';
import {
  Security,
  LocationOn,
  Refresh,
  VpnKey,
  CheckCircle,
} from '@mui/icons-material';
import type { RCardWithPrivacy, LocationSharingLevel, Vouch } from '@/types/notification';
import { DEFAULT_PRIVACY_SETTINGS } from '@/types/notification';

// Mock vouches data
const mockVouches: Vouch[] = [
  {
    id: '1',
    fromUserId: 'user-123',
    fromUserName: 'Sarah Johnson',
    fromUserAvatar: '/images/sarah.jpg',
    toUserId: 'me',
    skill: 'React Development',
    description: 'Excellent React developer with deep understanding of modern patterns',
    level: 'expert',
    endorsementText: 'Built our entire frontend with React hooks and TypeScript',
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15'),
  },
  {
    id: '2',
    fromUserId: 'user-456',
    fromUserName: 'Mike Chen',
    fromUserAvatar: '/images/mike.jpg',
    toUserId: 'me',
    skill: 'Project Management',
    description: 'Outstanding project management and team leadership skills',
    level: 'advanced',
    endorsementText: 'Led our biggest project delivery successfully',
    createdAt: new Date('2024-01-10'),
    updatedAt: new Date('2024-01-10'),
  },
  {
    id: '3',
    fromUserId: 'user-789',
    fromUserName: 'Emma Davis',
    fromUserAvatar: '/images/emma.jpg',
    toUserId: 'me',
    skill: 'TypeScript',
    description: 'Strong TypeScript skills and mentoring abilities',
    level: 'intermediate',
    endorsementText: 'Helped the team adopt TypeScript best practices',
    createdAt: new Date('2024-01-05'),
    updatedAt: new Date('2024-01-05'),
  },
];

interface RCardPrivacySettingsProps {
  rCard: RCardWithPrivacy;
  onUpdate: (updatedRCard: RCardWithPrivacy) => void;
}

const RCardPrivacySettings = ({ rCard, onUpdate }: RCardPrivacySettingsProps) => {
  const [settings, setSettings] = useState(rCard?.privacySettings || DEFAULT_PRIVACY_SETTINGS);
  // Track which vouches are shared via this profile (mock data - would come from rCard in real app)
  const [sharedVouchIds, setSharedVouchIds] = useState<string[]>(['1']); // Example: first vouch is shared

  // Sync settings when rCard changes
  useEffect(() => {
    setSettings(rCard?.privacySettings || DEFAULT_PRIVACY_SETTINGS);
  }, [rCard]);

  const handleSettingChange = (
    category: string,
    field: string,
    value: unknown
  ) => {
    const newSettings = { ...settings };
    
    if (category === 'dataSharing' && newSettings.dataSharing && field in newSettings.dataSharing) {
      newSettings.dataSharing = {
        ...newSettings.dataSharing,
        [field]: value
      };
    } else if (category === 'reSharing' && newSettings.reSharing && field in newSettings.reSharing) {
      newSettings.reSharing = {
        ...newSettings.reSharing,
        [field]: value
      };
    } else if (category === 'general') {
      // Handle root level properties
      if (field === 'keyRecoveryBuddy') {
        (newSettings as Record<string, unknown>)[field] = value;
      } else if (field === 'locationSharing' || field === 'locationDeletionHours') {
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

  // Split vouches into shared and not shared, then sort each group
  const sharedVouches = mockVouches
    .filter(vouch => sharedVouchIds.includes(vouch.id))
    .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  
  const unsharedVouches = mockVouches
    .filter(vouch => !sharedVouchIds.includes(vouch.id))
    .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());


  return (
    <Card sx={{ mb: 3 }}>
      <CardContent sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
          <Security color="primary" />
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            Privacy Settings
          </Typography>
        </Box>

        <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
          Configure what is shared with contacts assigned to this profile.
        </Typography>

        {/* Key Recovery & Trust Settings */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
            <VpnKey fontSize="small" />
            Key Recovery
          </Typography>
          
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <FormControlLabel
              control={
                <Switch
                  checked={settings.keyRecoveryBuddy}
                  onChange={(e) => handleSettingChange('general', 'keyRecoveryBuddy', e.target.checked)}
                />
              }
              label={
                <Box>
                  <Typography variant="body2" sx={{ fontWeight: 500 }}>
                    
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Allow contacts to help recover your account
                  </Typography>
                </Box>
              }
            />
            
          </Box>
        </Box>

        <Divider sx={{ my: 2 }} />

        {/* Location Sharing */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
            <LocationOn fontSize="small" />
            Location Sharing
          </Typography>
          
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel>Location Sharing Level</InputLabel>
            <Select
              value={settings.locationSharing}
              label="Location Sharing Level"
              onChange={(e) => handleSettingChange('general', 'locationSharing', e.target.value as LocationSharingLevel)}
            >
              <MenuItem value="never">Never</MenuItem>
              <MenuItem value="limited">Limited (On Request)</MenuItem>
              <MenuItem value="always">Always</MenuItem>
            </Select>
          </FormControl>
          
          {settings.locationSharing !== 'never' && (
            <Box>
              <Typography variant="body2" sx={{ mb: 1 }}>
                Auto-delete location after: {settings.locationDeletionHours} hours
              </Typography>
              <Slider
                value={settings.locationDeletionHours}
                onChange={(_, value) => handleSettingChange('general', 'locationDeletionHours', value)}
                min={1}
                max={48}
                step={1}
                marks={[
                  { value: 1, label: '1h' },
                  { value: 8, label: '8h' },
                  { value: 24, label: '24h' },
                  { value: 48, label: '48h' },
                ]}
                sx={{ color: 'primary.main', mt: 2 }}
              />
            </Box>
          )}
        </Box>

        <Divider sx={{ my: 3 }} />

        {/* Re-sharing Settings */}
        <Box sx={{ mb: 2 }}>
          <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
            <Refresh fontSize="small" />
            Network Access
          </Typography>
          
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            Set how far contacts can traverse your trust graph:
          </Typography>
          
          <FormControlLabel
            control={
              <Switch
                checked={settings.reSharing.enabled}
                onChange={(e) => handleSettingChange('reSharing', 'enabled', e.target.checked)}
              />
            }
            label="Enable network access"
            sx={{ mb: 3 }}
          />
          
          {settings.reSharing.enabled && (
            <Box>
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
                sx={{ color: 'primary.main' }}
              />
              <Typography variant="caption" color="text.secondary">
                {settings.reSharing.maxHops === 6 
                  ? 'Contacts assigned to this profile can traverse your network unlimited hops away from you'
                  : `Contacts assigned to this profile can traverse your network up to ${settings.reSharing.maxHops} hops away from you`
                }
              </Typography>
            </Box>
          )}
        </Box>

        <Divider sx={{ my: 3 }} />

        {/* Vouches Shared via this Trust Profile */}
        <Box sx={{ mb: 2 }}>
          <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
            <CheckCircle fontSize="small" />
            Vouches shared
          </Typography>
          
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            Choose which vouches to share when contacts view this profile:
          </Typography>

          {/* Shared Vouches */}
          {sharedVouches.length > 0 && (
            <Box sx={{ mb: 3 }}>
              <Typography variant="subtitle2" sx={{ mb: 2, color: 'success.main', fontWeight: 600 }}>
                Shared Vouches
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                {sharedVouches.map((vouch) => (
                  <Box key={vouch.id} sx={{ 
                    display: 'flex', 
                    alignItems: 'flex-start', 
                    gap: 2,
                    p: 2,
                    border: 1,
                    borderColor: 'success.light',
                    borderRadius: 1,
                    bgcolor: 'success.50'
                  }}>
                    <Box sx={{ flex: 1 }}>
                      <Typography variant="body2" sx={{ fontWeight: 600, mb: 0.5 }}>
                        {vouch.skill}
                      </Typography>
                      <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 0.5 }}>
                        From {vouch.fromUserName}
                      </Typography>
                      <Typography variant="body2" sx={{ fontSize: '0.875rem' }}>
                        {vouch.description}
                      </Typography>
                    </Box>
                    <Switch
                      checked={true}
                      onChange={(e) => handleVouchToggle(vouch.id, e.target.checked)}
                      color="success"
                    />
                  </Box>
                ))}
              </Box>
            </Box>
          )}

          {/* Not Shared Vouches */}
          {unsharedVouches.length > 0 && (
            <Box>
              <Typography variant="subtitle2" sx={{ mb: 2, color: 'text.secondary', fontWeight: 600 }}>
                Not Shared Vouches
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                {unsharedVouches.map((vouch) => (
                  <Box key={vouch.id} sx={{ 
                    display: 'flex', 
                    alignItems: 'flex-start', 
                    gap: 2,
                    p: 2,
                    border: 1,
                    borderColor: 'grey.300',
                    borderRadius: 1,
                    bgcolor: 'grey.50'
                  }}>
                    <Box sx={{ flex: 1 }}>
                      <Typography variant="body2" sx={{ fontWeight: 600, mb: 0.5 }}>
                        {vouch.skill}
                      </Typography>
                      <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 0.5 }}>
                        From {vouch.fromUserName}
                      </Typography>
                      <Typography variant="body2" sx={{ fontSize: '0.875rem' }}>
                        {vouch.description}
                      </Typography>
                    </Box>
                    <Switch
                      checked={false}
                      onChange={(e) => handleVouchToggle(vouch.id, e.target.checked)}
                    />
                  </Box>
                ))}
              </Box>
            </Box>
          )}
        </Box>
      </CardContent>
    </Card>
  );
};

export default RCardPrivacySettings;