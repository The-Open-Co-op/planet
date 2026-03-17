import React, { useState } from 'react';
import {
  Box, Typography, FormControl, InputLabel, Select, MenuItem,
  Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField,
  alpha,
} from '@mui/material';
import {
  Add, Business, PersonOutline, Groups, FamilyRestroom, Favorite,
  Home, LocationOn, Public,
} from '@mui/icons-material';
import RCardPrivacySettings from '@/components/account/RCardPrivacySettings';
import { ProfileInformation } from '@/components/account/AccountPage/ProfileInformation';
import { useTrustProfiles } from '@/hooks/useTrustProfiles';
import type { Contact } from '@/types/contact';

const AVAILABLE_COLORS = [
  { value: '#ef4444', label: 'Red' },
  { value: '#f59e0b', label: 'Amber' },
  { value: '#22c55e', label: 'Green' },
  { value: '#2563eb', label: 'Blue' },
  { value: '#8b5cf6', label: 'Purple' },
  { value: '#ec4899', label: 'Pink' },
  { value: '#059669', label: 'Teal' },
  { value: '#6b7280', label: 'Grey' },
];

const AVAILABLE_ICONS = [
  { value: 'PersonOutline', label: 'Person' },
  { value: 'Favorite', label: 'Heart' },
  { value: 'FamilyRestroom', label: 'Family' },
  { value: 'Business', label: 'Business' },
  { value: 'Public', label: 'Globe' },
  { value: 'Groups', label: 'Group' },
  { value: 'Home', label: 'Home' },
  { value: 'LocationOn', label: 'Location' },
];

interface MeContactViewProps {
  contact: Contact;
}

export const MeContactView: React.FC<MeContactViewProps> = () => {
  const { activeProfiles, updateProfile, addProfile } = useTrustProfiles();
  const [selectedProfileId, setSelectedProfileId] = useState<string>(activeProfiles[0]?.id || '');
  const [isEditing, setIsEditing] = useState(false);
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [newProfileName, setNewProfileName] = useState('');
  const [newProfileColor, setNewProfileColor] = useState('#8b5cf6');
  const [newProfileIcon, setNewProfileIcon] = useState('PersonOutline');

  const selectedRCard = activeProfiles.find(p => p.id === selectedProfileId) || activeProfiles[0] || null;

  const handleCreateProfile = () => {
    if (!newProfileName.trim()) return;
    const profile = addProfile(newProfileName.trim(), newProfileColor, newProfileIcon);
    setSelectedProfileId(profile.id);
    setShowCreateDialog(false);
    setNewProfileName('');
    setNewProfileColor('#8b5cf6');
    setNewProfileIcon('PersonOutline');
  };

  const handleDropdownChange = (event: any) => {
    const selectedId = event.target.value;
    if (selectedId === 'add') {
      setShowCreateDialog(true);
    } else {
      setSelectedProfileId(selectedId);
    }
  };

  const getRCardIcon = (iconName: string) => {
    switch (iconName) {
      case 'Business': return <Business />;
      case 'PersonOutline': return <PersonOutline />;
      case 'Groups': return <Groups />;
      case 'FamilyRestroom': return <FamilyRestroom />;
      case 'Favorite': return <Favorite />;
      case 'Home': return <Home />;
      case 'LocationOn': return <LocationOn />;
      case 'Public': return <Public />;
      default: return <PersonOutline />;
    }
  };

  const getRCardIconSmall = (iconName: string, size = 20) => {
    const sx = { fontSize: size };
    switch (iconName) {
      case 'Business': return <Business sx={sx} />;
      case 'PersonOutline': return <PersonOutline sx={sx} />;
      case 'Groups': return <Groups sx={sx} />;
      case 'FamilyRestroom': return <FamilyRestroom sx={sx} />;
      case 'Favorite': return <Favorite sx={sx} />;
      case 'Home': return <Home sx={sx} />;
      case 'LocationOn': return <LocationOn sx={sx} />;
      case 'Public': return <Public sx={sx} />;
      default: return <PersonOutline sx={sx} />;
    }
  };

  return (
    <Box>
      {/* Trust Profile container */}
      <Box sx={{
        border: '1px solid #D4D7DC',
        borderRadius: '8px',
      }}>
        {/* Dropdown header */}
        <FormControl fullWidth size="small">
          <InputLabel sx={{ bgcolor: 'background.default', px: 0.5 }}>Trust Profile</InputLabel>
          <Select
            value={selectedRCard?.id || ''}
            onChange={handleDropdownChange}
            label="Trust Profile"
            sx={{
              '& .MuiOutlinedInput-notchedOutline': { border: 'none' },
            }}
          >
            {activeProfiles.map((rCard) => {
              const cardColor = rCard.color || '#6b7280';
              return (
                <MenuItem key={rCard.id} value={rCard.id}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Box sx={{ color: cardColor, display: 'flex', alignItems: 'center' }}>
                      {getRCardIcon(rCard.icon || 'PersonOutline')}
                    </Box>
                    <Typography sx={{ color: cardColor, fontWeight: 500 }}>
                      {rCard.name}
                    </Typography>
                  </Box>
                </MenuItem>
              );
            })}
            <MenuItem value="add">
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Add color="primary" />
                <Typography color="primary" sx={{ fontWeight: 500 }}>
                  Add New Profile
                </Typography>
              </Box>
            </MenuItem>
          </Select>
        </FormControl>

        {/* Content for selected profile */}
        {selectedRCard && (
          <Box sx={{
            borderTop: '1px solid #D4D7DC',
          }}>
            <ProfileInformation
              cardName={selectedRCard.name}
              initialProfileData={undefined}
              isEditing={isEditing}
              onEditingChange={setIsEditing}
            />

            {!isEditing && (
              <Box sx={{ borderTop: '1px solid #D4D7DC' }}>
                <RCardPrivacySettings
                  rCard={selectedRCard}
                  onUpdate={updateProfile}
                />
              </Box>
            )}
          </Box>
        )}
      </Box>
      <Box sx={{ height: 15 }} />

      {/* Create New Profile Dialog */}
      <Dialog
        open={showCreateDialog}
        onClose={() => setShowCreateDialog(false)}
        maxWidth="xs"
        fullWidth
      >
        <DialogTitle sx={{ pb: 1 }}>New Trust Profile</DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 1 }}>
            <TextField
              fullWidth
              size="small"
              label="Profile name"
              value={newProfileName}
              onChange={(e) => setNewProfileName(e.target.value)}
              autoFocus
            />

            {/* Color picker */}
            <Box>
              <Typography variant="caption" color="text.secondary" sx={{ mb: 0.5, display: 'block' }}>
                Colour
              </Typography>
              <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                {AVAILABLE_COLORS.map((c) => (
                  <Box
                    key={c.value}
                    onClick={() => setNewProfileColor(c.value)}
                    sx={{
                      width: 32,
                      height: 32,
                      borderRadius: '50%',
                      bgcolor: c.value,
                      cursor: 'pointer',
                      border: newProfileColor === c.value ? '3px solid' : '2px solid transparent',
                      borderColor: newProfileColor === c.value ? 'text.primary' : 'transparent',
                      transition: 'border-color 0.15s',
                      '&:hover': { opacity: 0.8 },
                    }}
                  />
                ))}
              </Box>
            </Box>

            {/* Icon picker */}
            <Box>
              <Typography variant="caption" color="text.secondary" sx={{ mb: 0.5, display: 'block' }}>
                Icon
              </Typography>
              <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                {AVAILABLE_ICONS.map((ic) => (
                  <Box
                    key={ic.value}
                    onClick={() => setNewProfileIcon(ic.value)}
                    sx={{
                      width: 36,
                      height: 36,
                      borderRadius: 1,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                      color: newProfileIcon === ic.value ? newProfileColor : 'text.secondary',
                      bgcolor: newProfileIcon === ic.value ? alpha(newProfileColor, 0.1) : 'transparent',
                      border: '1px solid',
                      borderColor: newProfileIcon === ic.value ? alpha(newProfileColor, 0.3) : 'divider',
                      transition: 'all 0.15s',
                      '&:hover': { bgcolor: 'action.hover' },
                    }}
                  >
                    {getRCardIconSmall(ic.value)}
                  </Box>
                ))}
              </Box>
            </Box>

            {/* Preview */}
            {newProfileName.trim() && (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, pt: 0.5 }}>
                <Box sx={{ color: newProfileColor }}>
                  {getRCardIconSmall(newProfileIcon)}
                </Box>
                <Typography sx={{ color: newProfileColor, fontWeight: 500 }}>
                  {newProfileName}
                </Typography>
              </Box>
            )}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowCreateDialog(false)} color="inherit">Cancel</Button>
          <Button
            onClick={handleCreateProfile}
            variant="contained"
            disabled={!newProfileName.trim()}
          >
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};
