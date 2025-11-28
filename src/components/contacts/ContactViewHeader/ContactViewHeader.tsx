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
  CheckCircle,
  PersonOutline, PersonSearch, Send, Favorite, Email, Add,
  Info,
} from '@mui/icons-material';
import type {Contact} from '@/types/contact';
import {useRelationshipCategories} from "@/hooks/useRelationshipCategories";
import {resolveFrom} from '@/utils/contactUtils';
import {getContactPhotoStyles} from "@/utils/photoStyles";
import {PropertyWithSources} from '../PropertyWithSources';

export interface ContactViewHeaderProps {
  contact: Contact | null;
  contactGroups?: Array<{"@id": string; name: string}>;
  isLoading: boolean;
  isEditing?: boolean;
  showStatus?: boolean;
  showTags?: boolean;
  showActions?: boolean;
  validateParent?: (valid: boolean) => void;
  onHumanityToggle?: () => void;
}

export const ContactViewHeader = forwardRef<HTMLDivElement, ContactViewHeaderProps>(
  ({contact, contactGroups = [], isEditing = false, showTags = true, showActions = true, showStatus = true, validateParent, onHumanityToggle}, ref) => {
    const theme = useTheme();
    const {getCategoryIcon, getCategoryById} = useRelationshipCategories();
    const [aboutModalOpen, setAboutModalOpen] = useState(false);

    if (!contact) return null;

    const name = resolveFrom(contact, 'name');
    const photo = resolveFrom(contact, 'photo');
    const tags = contact.tag;

    const getNaoStatusIndicator = (contact: Contact) => {
      switch (contact.naoStatus?.value) {
        case 'member':
          return {
            icon: <VerifiedUser/>,
            label: 'PLANET Member',
            color: theme.palette.success.main,
            bgColor: theme.palette.success.light + '20',
            borderColor: theme.palette.success.main
          };
        case 'invited':
          return {
            icon: <CheckCircle/>,
            label: 'PLANET Invited',
            color: theme.palette.warning.main,
            bgColor: theme.palette.warning.light + '20',
            borderColor: theme.palette.warning.main
          };
        default:
          return {
            icon: <PersonOutline/>,
            label: 'Not in PLANET',
            color: theme.palette.text.secondary,
            bgColor: 'transparent',
            borderColor: theme.palette.divider
          };
      }
    };
    const naoStatus = getNaoStatusIndicator(contact);

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

              {/* Relationship Category Indicator */}
              {contact.relationshipCategory && (() => {
                const categoryInfo = getCategoryById(contact.relationshipCategory);
                return categoryInfo ? (
                  <Chip
                    icon={getCategoryIcon(contact.relationshipCategory, 16)}
                    label={categoryInfo.name}
                    variant="outlined"
                    sx={{
                      backgroundColor: alpha(categoryInfo.color, 0.08),
                      borderColor: alpha(categoryInfo.color, 0.2),
                      color: categoryInfo.color,
                      fontWeight: 500
                    }}
                  />
                ) : null;
              })()}

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
              {/* Invite to NAO button for non-members */}
              {contact.naoStatus?.value === 'not_invited' && (
                <Button
                  variant="contained"
                  startIcon={<Send/>}
                  size="small"
                  onClick={/*handleInviteToNao*/() => {
                  }}
                  color="primary"
                >
                  Invite to NAO
                </Button>
              )}

              {/* Vouch and Praise buttons */}
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
            </Box>}

          </Box>
        </Box>
        
        {/* About Modal */}
        <Dialog open={aboutModalOpen} onClose={() => setAboutModalOpen(false)} maxWidth="sm" fullWidth>
          <DialogTitle>About: {name?.value || 'Contact'}</DialogTitle>
          <DialogContent>
            <Box sx={{ pt: 2 }}>
              <FormControlLabel
                control={
                  <Switch 
                    checked={contact.humanityConfidenceScore === 5} 
                    onChange={(e) => {
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
              {contactGroups.length > 0 && (
                <Box sx={{ mb: 3 }}>
                  <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
                    {contactGroups.length} Groups in common
                  </Typography>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                    {contactGroups.map(group => (
                      <Typography key={group['@id']} variant="body2" color="text.secondary">
                        {group.name}
                      </Typography>
                    ))}
                  </Box>
                </Box>
              )}
              
              <Divider sx={{ mb: 2 }} />
              
              {/* Added/Updated/Last interaction info */}
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                <Box>
                  <Typography variant="caption" color="text.secondary">
                    Added
                  </Typography>
                  <Typography variant="body2">
                    {contact.createdAt && !isNaN(Date.parse(contact.createdAt)) 
                      ? new Date(contact.createdAt).toLocaleDateString() 
                      : new Date('2023-11-15').toLocaleDateString()}
                  </Typography>
                </Box>
                
                <Box>
                  <Typography variant="caption" color="text.secondary">
                    Updated
                  </Typography>
                  <Typography variant="body2">
                    {contact.updatedAt && !isNaN(Date.parse(contact.updatedAt)) 
                      ? new Date(contact.updatedAt).toLocaleDateString() 
                      : new Date('2024-01-20').toLocaleDateString()}
                  </Typography>
                </Box>
                
                <Box>
                  <Typography variant="caption" color="text.secondary">
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
      </Box>
    );
  }
);

ContactViewHeader.displayName = 'ContactViewHeader';