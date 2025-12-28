import {forwardRef, useState} from 'react';
import {
  Typography,
  Box,
  Chip,
  useTheme,
  alpha,
  Card,
  CardContent,
  Button,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  Switch,
  FormControlLabel,
  Divider,
} from '@mui/material';
import {
  LinkedIn,
  Person,
  VerifiedUser,
  PersonSearch, Send, Favorite, Email, Add,
  Info,
  Business, Groups, FamilyRestroom, Public, Close,
} from '@mui/icons-material';
import { useMediaQuery } from '@mui/material';
import type {Contact} from '@/types/contact';
import type {RCardType} from '@/types/rcard';
import type {SocialContact} from '@/.ldo/contact.typings';
import {resolveFrom} from '@/utils/contactUtils';
import {getContactPhotoStyles} from "@/utils/photoStyles";
import {PropertyWithSources} from '../PropertyWithSources';

export interface ContactViewHeaderProps {
  contact: Contact | null;
  isLoading: boolean;
  isEditing?: boolean;
  showStatus?: boolean;
  showTags?: boolean;
  showActions?: boolean;
  validateParent?: (valid: boolean) => void;
  onHumanityToggle?: () => void;
  onAssignRCard?: (cardType: RCardType) => void;
  onRemoveRCard?: (cardType: RCardType) => void;
}

export const ContactViewHeader = forwardRef<HTMLDivElement, ContactViewHeaderProps>(
  ({contact, isEditing = false, showTags = true, showActions = true, showStatus = true, validateParent, onHumanityToggle, onAssignRCard, onRemoveRCard}, ref) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const [aboutModalOpen, setAboutModalOpen] = useState(false);
    const [trustProfileDialogOpen, setTrustProfileDialogOpen] = useState(false);

    if (!contact) return null;

    const name = resolveFrom(contact as SocialContact, 'name');
    const photo = resolveFrom(contact as SocialContact, 'photo');
    const tags = contact.tag;


    const getRCardIcon = (cardType: RCardType, size = 20) => {
      switch (cardType) {
        case 'Business':
          return <Business sx={{ fontSize: size, color: '#7b1fa2' }} />;
        case 'Friends':
          return <Groups sx={{ fontSize: size, color: '#388e3c' }} />;
        case 'Family':
          return <FamilyRestroom sx={{ fontSize: size, color: '#388e3c' }} />;
        case 'Community':
          return <Public sx={{ fontSize: size, color: '#1976d2' }} />;
        default:
          return null;
      }
    };

    const getRCardColor = (cardType: RCardType) => {
      switch (cardType) {
        case 'Business':
          return '#7b1fa2';
        case 'Friends':
          return '#388e3c';
        case 'Family':
          return '#388e3c';
        case 'Community':
          return '#1976d2';
        default:
          return theme.palette.primary.main;
      }
    };

    return (
      <Box ref={ref}>
        <Box sx={{
          display: 'flex',
          alignItems: 'center',
          mb: 3,
          flexDirection: 'column',
          textAlign: 'center',
          gap: 2
        }}>
          <Box
            sx={{
              width: {xs: 100, sm: 120},
              height: {xs: 100, sm: 120},
              borderRadius: '50%',
              backgroundImage: photo?.value ? `url(${photo.value})` : 'none',
              backgroundSize: photo?.value ? getContactPhotoStyles(name?.value || '').backgroundSize : 'cover',
              backgroundPosition: photo?.value ? getContactPhotoStyles(name?.value || '').backgroundPosition : 'center center',
              backgroundRepeat: 'no-repeat',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: photo?.value ? 'transparent' : 'primary.main',
              color: 'white',
              fontSize: {xs: '2rem', sm: '3rem'},
              fontWeight: 'bold',
              flexShrink: 0
            }}
          >
            {!photo?.value && (name?.value?.charAt(0) || '')}
          </Box>

          <Box sx={{flex: 1, minWidth: 0, textAlign: 'center'}}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1 }}>
              <PropertyWithSources
                label={"Contact name"}
                contact={contact}
                propertyKey="name"
                variant="header"
                textVariant="h4"
                isEditing={isEditing}
                placeholder="Contact Name"
                required={true}
                validateParent={validateParent}
              />
              {!isEditing && (
                <IconButton 
                  size="small" 
                  onClick={() => setAboutModalOpen(true)}
                  sx={{ 
                    border: '1px solid', 
                    borderColor: 'divider',
                    width: 24,
                    height: 24,
                    '&:hover': {
                      backgroundColor: 'action.hover'
                    }
                  }}
                >
                  <Info sx={{ fontSize: 14 }} />
                </IconButton>
              )}
            </Box>

            <PropertyWithSources
              contact={contact}
              label={"Organization"}
              propertyKey="organization"
              variant="header"
              textVariant="body2"
              isEditing={isEditing}
              placeholder="Company Name"
            />

            {showStatus && <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1, mb: 2, flexWrap: 'wrap'}}>
              {/* Merged Contact Indicator */}
              {contact['@id'] === '1' || contact['@id'] === '3' || contact['@id'] === '5' ? (
                <Chip
                  icon={<PersonSearch/>}
                  label="Merged Contact"
                  variant="outlined"
                  sx={{
                    backgroundColor: alpha('#4caf50', 0.08),
                    borderColor: alpha('#4caf50', 0.2),
                    color: '#4caf50',
                    fontWeight: 500
                  }}
                />
              ) : null}
            </Box>}

            {/* Merged Contact Details */}
            {(contact['@id'] === '1' || contact['@id'] === '3' || contact['@id'] === '5') && (
              <Card variant="outlined" sx={{mb: 2, backgroundColor: alpha('#4caf50', 0.04)}}>
                <CardContent sx={{p: 2}}>
                  <Typography variant="h6" sx={{mb: 1, display: 'flex', alignItems: 'center', gap: 1}}>
                    <PersonSearch color="success"/>
                    Merged Contact Information
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{mb: 2}}>
                    This contact was created by merging multiple duplicate entries to give you a cleaner contact list.
                  </Typography>
                  <Typography variant="body2" sx={{fontWeight: 500, mb: 1}}>
                    Original sources merged:
                  </Typography>
                  <Box sx={{display: 'flex', gap: 1, flexWrap: 'wrap'}}>
                    <Chip size="small" label="LinkedIn Import" icon={<LinkedIn/>}/>
                    <Chip size="small" label="Gmail Contacts" icon={<Email/>}/>
                    {contact['@id'] === '3' && <Chip size="small" label="Manual Entry" icon={<Person/>}/>}
                  </Box>
                </CardContent>
              </Card>
            )}

            {showTags && <Box sx={{
              display: 'flex',
              gap: 1,
              flexWrap: 'wrap',
              mb: 2,
              justifyContent: {xs: 'center', sm: 'flex-start'}
            }}>
              {tags?.map((tag) => (
                <Chip key={tag["@id"]} label={tag.value} size="small"/>
              ))}
                <Chip
                    variant="outlined"
                    icon={<Add fontSize="small"/>}
                    label="Add tag"
                    size="small"
                    clickable
                    sx={{
                      borderStyle: 'dashed',
                      color: 'text.secondary',
                      borderColor: 'text.secondary',
                      '&:hover': {
                        borderColor: 'primary.main',
                        color: 'primary.main',
                      }
                    }}
                />
            </Box>}


            {/* Action Buttons */}
            {showActions && <Box sx={{
              display: 'flex',
              gap: 1,
              flexWrap: 'wrap',
              justifyContent: 'center',
              mt: 2
            }}>

              {/* Conditional buttons based on PLANET status */}
              {contact.planetStatus?.value === 'member' ? (
                <>
                  {/* Show Send buttons for PLANET members */}
                  <Button
                    variant="contained"
                    startIcon={<VerifiedUser/>}
                    size="small"
                    color="primary"
                  >
                    Send Vouch
                  </Button>
                  <Button
                    variant="contained"
                    startIcon={<Favorite/>}
                    size="small"
                    sx={{
                      backgroundColor: '#f8bbd9',
                      color: '#d81b60',
                      '&:hover': {
                        backgroundColor: '#f48fb1'
                      }
                    }}
                  >
                    Send Praise
                  </Button>
                </>
              ) : contact.planetStatus?.value === 'invited' ? (
                <Button
                  variant="outlined"
                  size="small"
                  disabled
                  sx={{ color: 'text.secondary' }}
                >
                  Invited
                </Button>
              ) : (
                <Button
                  variant="contained"
                  startIcon={<Send/>}
                  size="small"
                  color="primary"
                  onClick={/*handleInviteToNao*/() => {
                    // TODO: Implement invite logic
                    console.log('Invite to PLANET clicked');
                  }}
                >
                  Invite to PLANET
                </Button>
              )}
            </Box>}

            {/* Divider between action buttons and Trust Profiles - Only show if Trust Profiles will be displayed */}
            {showActions && !isEditing && (contact.planetStatus?.value === 'member' || contact.planetStatus?.value === 'invited') && <Box sx={{ 
              width: '100%', 
              height: '1px', 
              backgroundColor: 'divider', 
              my: 2, 
              opacity: 0.3 
            }} />}

            {/* Trust Profiles Section - Only for invited/member contacts */}
            {!isEditing && (contact.planetStatus?.value === 'member' || contact.planetStatus?.value === 'invited') && <Box sx={{ mb: 0 }}>
              <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1, color: 'text.secondary', textAlign: 'center' }}>
                Trust Profiles
              </Typography>
              <Box sx={{
                display: 'flex',
                gap: 1,
                flexWrap: 'nowrap',
                overflowX: 'auto',
                justifyContent: 'center',
                '&::-webkit-scrollbar': {
                  height: '4px'
                },
                '&::-webkit-scrollbar-thumb': {
                  backgroundColor: 'rgba(0,0,0,0.2)',
                  borderRadius: '2px'
                }
              }}>
                {contact.rCardAssignments?.map((assignment) => {
                  const cardColor = getRCardColor(assignment.cardType);
                  return (
                    <Chip
                      key={assignment.cardType}
                      icon={getRCardIcon(assignment.cardType, 16) || undefined}
                      label={isMobile ? '' : assignment.cardType}
                      variant="outlined"
                      onDelete={onRemoveRCard ? () => {
                        console.log(`🖱️ Delete clicked for ${assignment.cardType} Trust Profile`);
                        onRemoveRCard(assignment.cardType);
                      } : undefined}
                      deleteIcon={<Close fontSize="small" />}
                      sx={{
                        backgroundColor: alpha(cardColor, 0.08),
                        borderColor: alpha(cardColor, 0.2),
                        color: cardColor,
                        fontWeight: 500,
                        flexShrink: 0,
                        minWidth: {xs: '40px', sm: 'auto'},
                        '& .MuiChip-deleteIcon': {
                          color: alpha(cardColor, 0.7),
                          '&:hover': {
                            color: cardColor,
                          }
                        }
                      }}
                    />
                  );
                })}
                
                {/* Add Trust Profile Button */}
                {onAssignRCard && (
                  <Chip
                    variant="outlined"
                    icon={<Add fontSize="small"/>}
                    label={isMobile ? '' : 'Add'}
                    size="medium"
                    clickable
                    onClick={() => setTrustProfileDialogOpen(true)}
                    sx={{
                      borderStyle: 'dashed',
                      color: 'text.secondary',
                      borderColor: 'text.secondary',
                      flexShrink: 0,
                      minWidth: {xs: '40px', sm: 'auto'},
                      '&:hover': {
                        borderColor: 'primary.main',
                        color: 'primary.main',
                      }
                    }}
                  />
                )}
              </Box>
            </Box>}

          </Box>
        </Box>
        
        {/* About Modal */}
        <Dialog open={aboutModalOpen} onClose={() => setAboutModalOpen(false)} maxWidth="sm" fullWidth>
          <DialogTitle>About: {name?.value || 'Contact'}</DialogTitle>
          <DialogContent>
            <Box sx={{ pt: 2 }}>
              {/* PLANET Status */}
              <Box sx={{ mb: 2, p: 2, bgcolor: 'grey.50', borderRadius: 1 }}>
                <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
                  PLANET Status
                </Typography>
                {contact.planetStatus?.value === 'member' ? (
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant="body2" color="success.main" sx={{ fontWeight: 500 }}>
                      ✓ PLANET Member
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Joined {contact.joinedAt?.valueDateTime && !isNaN(Date.parse(contact.joinedAt.valueDateTime)) 
                        ? new Date(contact.joinedAt.valueDateTime).toLocaleDateString() 
                        : 'January 2024'}
                    </Typography>
                  </Box>
                ) : contact.planetStatus?.value === 'invited' ? (
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant="body2" color="warning.main" sx={{ fontWeight: 500 }}>
                      Invited to PLANET
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {contact.invitedAt?.valueDateTime && !isNaN(Date.parse(contact.invitedAt.valueDateTime)) 
                        ? new Date(contact.invitedAt.valueDateTime).toLocaleDateString() 
                        : 'recently'}
                    </Typography>
                  </Box>
                ) : (
                  <Typography variant="body2" color="text.secondary">
                    Not a PLANET member
                  </Typography>
                )}
              </Box>
              
              <FormControlLabel
                control={
                  <Switch 
                    checked={contact.humanityConfidenceScore === 5} 
                    onChange={() => {
                      console.log('Toggle clicked, current score:', contact.humanityConfidenceScore);
                      if (onHumanityToggle) {
                        onHumanityToggle();
                      }
                    }}
                  />
                }
                label="Vouch that this contact is human"
                labelPlacement="start"
                sx={{ mb: 2, display: 'flex', justifyContent: 'space-between', ml: 0 }}
              />
              
              {/* Groups in common */}
              <Divider sx={{ mb: 2 }} />
              
              {/* Added/Updated/Last interaction info */}
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography variant="body2" color="text.secondary">
                    Added
                  </Typography>
                  <Typography variant="body2">
                    {contact.createdAt && !isNaN(Date.parse(typeof contact.createdAt === 'string' ? contact.createdAt : contact.createdAt.valueDateTime)) 
                      ? new Date(typeof contact.createdAt === 'string' ? contact.createdAt : contact.createdAt.valueDateTime).toLocaleDateString() 
                      : new Date('2023-11-15').toLocaleDateString()}
                  </Typography>
                </Box>
                
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography variant="body2" color="text.secondary">
                    Updated
                  </Typography>
                  <Typography variant="body2">
                    {contact.updatedAt && !isNaN(Date.parse(typeof contact.updatedAt === 'string' ? contact.updatedAt : contact.updatedAt.valueDateTime)) 
                      ? new Date(typeof contact.updatedAt === 'string' ? contact.updatedAt : contact.updatedAt.valueDateTime).toLocaleDateString() 
                      : new Date('2024-01-20').toLocaleDateString()}
                  </Typography>
                </Box>
                
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography variant="body2" color="text.secondary">
                    Last interaction
                  </Typography>
                  <Typography variant="body2">
                    {contact.lastInteraction && !isNaN(Date.parse(contact.lastInteraction)) 
                      ? new Date(contact.lastInteraction).toLocaleDateString() 
                      : new Date('2024-03-10').toLocaleDateString()}
                  </Typography>
                </Box>
              </Box>
            </Box>
          </DialogContent>
        </Dialog>

        {/* Trust Profile Selection Dialog */}
        <Dialog open={trustProfileDialogOpen} onClose={() => setTrustProfileDialogOpen(false)} maxWidth="sm" fullWidth>
          <DialogTitle>Add Trust Profile</DialogTitle>
          <DialogContent>
            <Box sx={{ pt: 1 }}>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                {(['Friends', 'Family', 'Community', 'Business'] as RCardType[]).map((cardType) => {
                  const isAssigned = contact.rCardAssignments?.some(a => a.cardType === cardType);
                  const cardColor = getRCardColor(cardType);
                  
                  return (
                    <Button
                      key={cardType}
                      variant="outlined"
                      disabled={isAssigned}
                      startIcon={getRCardIcon(cardType, 20)}
                      onClick={() => {
                        if (onAssignRCard && !isAssigned) {
                          onAssignRCard(cardType);
                        }
                        setTrustProfileDialogOpen(false);
                      }}
                      sx={{
                        justifyContent: 'flex-start',
                        p: 2,
                        backgroundColor: isAssigned ? 'action.disabledBackground' : alpha(cardColor, 0.04),
                        borderColor: isAssigned ? 'action.disabled' : alpha(cardColor, 0.2),
                        color: isAssigned ? 'text.disabled' : cardColor,
                        '&:hover': {
                          backgroundColor: isAssigned ? 'action.disabledBackground' : alpha(cardColor, 0.08),
                          borderColor: isAssigned ? 'action.disabled' : cardColor,
                        }
                      }}
                    >
                      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', ml: 1, width: '100%' }}>
                        <Typography variant="subtitle2" sx={{ fontWeight: 600, textAlign: 'left', textTransform: 'none' }}>
                          {cardType}
                        </Typography>
                        <Typography variant="caption" color="text.secondary" sx={{ textAlign: 'left', width: '100%', textTransform: 'none' }}>
                          {cardType === 'Friends' && 'close personal connections'}
                          {cardType === 'Family' && 'family members and relatives'}
                          {cardType === 'Community' && 'community members and acquaintances'}
                          {cardType === 'Business' && 'professional and business contacts'}
                        </Typography>
                        {isAssigned && (
                          <Typography variant="caption" color="text.secondary" sx={{ textAlign: 'left', width: '100%', textTransform: 'none', fontStyle: 'italic' }}>
                            (already assigned)
                          </Typography>
                        )}
                      </Box>
                    </Button>
                  );
                })}
              </Box>
            </Box>
          </DialogContent>
        </Dialog>
      </Box>
    );
  }
);

ContactViewHeader.displayName = 'ContactViewHeader';