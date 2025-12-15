import React, { useState, useEffect } from 'react';
import { Box, Typography, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { Add, Business, PersonOutline, Groups, FamilyRestroom, Favorite, Home, LocationOn, Public } from '@mui/icons-material';
import RCardPrivacySettings from '@/components/account/RCardPrivacySettings';
import { ProfileInformation } from '@/components/account/AccountPage/ProfileInformation';
import { DEFAULT_RCARDS, DEFAULT_PRIVACY_SETTINGS } from '@/types/notification';
import type { RCardWithPrivacy } from '@/types/notification';
import type { Contact } from '@/types/contact';

interface MeContactViewProps {
  contact: Contact;
}

export const MeContactView: React.FC<MeContactViewProps> = () => {
  const [rCards, setRCards] = useState<RCardWithPrivacy[]>([]);
  const [selectedRCard, setSelectedRCard] = useState<RCardWithPrivacy | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const rCardsWithPrivacy: RCardWithPrivacy[] = DEFAULT_RCARDS.map((rCard, index) => ({
      ...rCard,
      id: `default-${index}`,
      createdAt: new Date(),
      updatedAt: new Date(),
      privacySettings: DEFAULT_PRIVACY_SETTINGS
    }));
    setRCards(rCardsWithPrivacy);
    // Select the first non-default card
    const firstNonDefault = rCardsWithPrivacy.find(card => card.name !== 'Default');
    setSelectedRCard(firstNonDefault || rCardsWithPrivacy[0] || null);
  }, []);


  const handleCreateRCard = () => {
    // TODO: Implement create RCard functionality
    console.log('Create RCard');
  };


  const handleRCardUpdate = (updatedRCard: RCardWithPrivacy) => {
    setRCards(prev =>
      prev.map(card => card.id === updatedRCard.id ? updatedRCard : card)
    );
    setSelectedRCard(updatedRCard);
  };


  const handleDropdownChange = (event: any) => {
    const selectedId = event.target.value;
    if (selectedId === 'add') {
      handleCreateRCard();
    } else {
      const selectedCard = rCards.find(card => card.id === selectedId);
      if (selectedCard) {
        setSelectedRCard(selectedCard);
      }
    }
  };

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

  const getRCardColor = (cardName: string) => {
    switch (cardName) {
      case 'Business':
        return '#7b1fa2'; // purple
      case 'Friends':
        return '#388e3c'; // green
      case 'Family':
        return '#388e3c'; // green
      case 'Community':
        return '#1976d2'; // blue
      case 'Default':
        return '#6b7280'; // gray
      default:
        return '#6b7280'; // default gray
    }
  };

  return (
    <Box>
      {/* Profile Cards Dropdown */}
      <Box sx={{ mb: 3 }}>
        <FormControl fullWidth>
          <InputLabel>Trust Profile</InputLabel>
          <Select
            value={selectedRCard?.id || ''}
            onChange={handleDropdownChange}
            label="Trust Profile"
          >
            {rCards
              .filter(rCard => rCard.name !== 'Default')
              .map((rCard) => {
                const cardColor = getRCardColor(rCard.name);
                return (
                  <MenuItem key={rCard.id} value={rCard.id}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Box sx={{ color: cardColor }}>
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
      </Box>

      {/* Tab Content */}
      {selectedRCard && (
        <Box sx={{ mt: 3 }}>
          {/* Profile Information for this rCard */}
          <ProfileInformation 
            cardName={selectedRCard.name}
            initialProfileData={undefined}
            isEditing={isEditing}
            onEditingChange={setIsEditing}
          />

          {/* Privacy Settings - only show when not editing */}
          {!isEditing && (
            <Box sx={{ mt: 3 }}>
              <RCardPrivacySettings
                rCard={selectedRCard}
                onUpdate={handleRCardUpdate}
              />
            </Box>
          )}

        </Box>
      )}
    </Box>
  );
};