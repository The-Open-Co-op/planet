import {forwardRef, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {
  Typography,
  Box,
  Chip,
  alpha,
  Card,
  CardContent,
  Button,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Divider,
  TextField,
} from '@mui/material';
import {
  LinkedIn,
  Person,
  VerifiedUser,
  PersonSearch, Send, Email, Add,
  Info,
  ChatBubble,
  Business, Groups, FamilyRestroom, Public, Close,
} from '@mui/icons-material';
import type {Contact} from '@/types/contact';
import type {RCardType} from '@/types/rcard';
import type {SocialContact} from '@/.ldo/contact.typings';
import { DEFAULT_PROFILE_CARDS } from '@/types/notification';
import { useOnboardingDemo } from '@/components/demo/DemoContext';
import { chatStore } from '@/mocks/chat';
import { RCardSelectionModal } from '@/components/notifications/RCardSelectionModal';

/** Get canonical color for a card type from the single source of truth */
const getCardColor = (cardType: string): string => {
  const card = DEFAULT_PROFILE_CARDS.find(c => c.name === cardType);
  return card?.color || '#6b7280';
};

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
  ({contact, isEditing = false, showTags = true, showActions = true, showStatus = true, validateParent, onHumanityToggle: _onHumanityToggle, onAssignRCard, onRemoveRCard}, ref) => {
    const navigate = useNavigate();
    const onboardingDemo = useOnboardingDemo();
    const [aboutModalOpen, setAboutModalOpen] = useState(false);
    const [trustProfileDialogOpen, setTrustProfileDialogOpen] = useState(false);
    const [sendVouchOpen, setSendVouchOpen] = useState(false);
    const [vouchTrustArea, setVouchTrustArea] = useState('');
    const [vouchConfidence, setVouchConfidence] = useState(0.8);
    const [vouchComment, setVouchComment] = useState('');
    const [vouchSent, setVouchSent] = useState(false);
    const [inviteOpen, setInviteOpen] = useState(false);
    const [connectionState, setConnectionState] = useState<'none' | 'pending' | 'connected'>(() => {
      // In onboarding demo, use the connectedContactIds list instead of chatStore
      if (onboardingDemo.active && onboardingDemo.connectedContactIds.length > 0) {
        return onboardingDemo.connectedContactIds.includes(contact?.['@id'] || '') ? 'connected' : 'none';
      }
      return chatStore.getConversation(contact?.['@id'] || '') ? 'connected' : 'none';
    });
    const [connectModalOpen, setConnectModalOpen] = useState(false);
    const [inviteSent, setInviteSent] = useState(false);
    const [inviteChannel, setInviteChannel] = useState('WhatsApp');

    if (!contact) return null;

    const name = resolveFrom(contact as SocialContact, 'name');
    const photo = resolveFrom(contact as SocialContact, 'photo');
    const tags = contact.tag;


    const getRCardIcon = (cardType: RCardType, size = 20) => {
      const color = getCardColor(cardType);
      switch (cardType) {
        case 'Business':
          return <Business sx={{ fontSize: size, color }} />;
        case 'Friends':
          return <Groups sx={{ fontSize: size, color }} />;
        case 'Family':
          return <FamilyRestroom sx={{ fontSize: size, color }} />;
        case 'Community':
          return <Public sx={{ fontSize: size, color }} />;
        default:
          return null;
      }
    };

    const getRCardColor = (cardType: RCardType) => {
      return getCardColor(cardType);
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

              {/* Conditional buttons based on PLANET status + connection */}
              {contact.planetStatus?.value === 'member' && connectionState === 'connected' ? (
                <>
                  {/* Connected member: Chat + Vouch */}
                  <Button
                    variant="contained"
                    startIcon={<ChatBubble/>}
                    size="small"
                    onClick={(e) => {
                      e.stopPropagation();
                      const demo = onboardingDemo;
                      if (demo?.active && demo?.onChatClick) {
                        demo.onChatClick(contact['@id'] || '');
                      } else {
                        navigate(`/chat/${contact['@id']}`);
                      }
                    }}
                    sx={{ bgcolor: '#0066CC', '&:hover': { bgcolor: '#004C99' }, textTransform: 'none' }}
                  >
                    Chat
                  </Button>
                  <Button
                    variant="contained"
                    startIcon={<VerifiedUser/>}
                    size="small"
                    onClick={(e) => { e.stopPropagation(); setSendVouchOpen(true); }}
                    sx={{ bgcolor: '#0066CC', '&:hover': { bgcolor: '#004C99' }, textTransform: 'none' }}
                  >
                    Vouch
                  </Button>
                </>
              ) : contact.planetStatus?.value === 'member' && connectionState === 'pending' ? (
                <>
                  <Button
                    variant="outlined"
                    size="small"
                    disabled
                    sx={{ textTransform: 'none', color: 'text.secondary' }}
                  >
                    Connection pending
                  </Button>
                </>
              ) : contact.planetStatus?.value === 'member' && connectionState === 'none' ? (
                <>
                  {/* Unconnected member: Connect first — choose Trust Profile */}
                  <Button
                    variant="contained"
                    startIcon={<PersonSearch/>}
                    size="small"
                    onClick={(e) => {
                      e.stopPropagation();
                      setConnectModalOpen(true);
                    }}
                    sx={{ bgcolor: '#0066CC', '&:hover': { bgcolor: '#004C99' }, textTransform: 'none' }}
                  >
                    Connect
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
                  onClick={(e) => { e.stopPropagation(); setInviteOpen(true); }}
                  sx={{ bgcolor: '#0066CC', '&:hover': { bgcolor: '#004C99' }, textTransform: 'none' }}
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
                Assigned to
              </Typography>
              <Box sx={{
                display: 'flex',
                gap: 1,
                flexWrap: 'wrap',
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
                      label={assignment.cardType}
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
                    label=""
                    size="medium"
                    clickable
                    onClick={() => setTrustProfileDialogOpen(true)}
                    sx={{
                      borderStyle: 'dashed',
                      color: 'text.secondary',
                      borderColor: 'text.secondary',
                      flexShrink: 0,
                      '& .MuiChip-label': { display: 'none' },
                      '& .MuiChip-icon': { mx: 'auto' },
                      width: 32,
                      height: 32,
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
                  <Typography variant="body2" color="success.main" sx={{ fontWeight: 500 }}>
                    Member
                  </Typography>
                ) : (
                  <Typography variant="body2" color="text.secondary">
                    None
                  </Typography>
                )}
              </Box>
              
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

        {/* Send Vouch Dialog */}
        <Dialog
          open={sendVouchOpen}
          onClose={() => { setSendVouchOpen(false); setVouchSent(false); }}
          maxWidth="xs"
          fullWidth
        >
          <DialogTitle sx={{ pr: 5 }}>
            {!vouchSent && (
              <>
                Send Vouch
                <Typography variant="body2" color="text.secondary">
                  Vouch for {name?.value?.split(' ')[0] || 'this contact'}
                </Typography>
              </>
            )}
            <IconButton
              onClick={() => { setSendVouchOpen(false); setVouchSent(false); }}
              sx={{ position: 'absolute', top: 8, right: 8 }}
              size="small"
            >
              <Close fontSize="small" />
            </IconButton>
          </DialogTitle>
          <DialogContent>
            {vouchSent ? (
              <Box sx={{ textAlign: 'center', py: 3 }}>
                <VerifiedUser sx={{ fontSize: 48, color: 'success.main', mb: 1 }} />
                <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                  Vouch sent
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {name?.value?.split(' ')[0]} will be notified
                </Typography>
              </Box>
            ) : (
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5, pt: 1 }}>
                <TextField
                  fullWidth
                  size="small"
                  label="Trust area"
                  placeholder="e.g. Web design, Accounting, Event organising"
                  value={vouchTrustArea}
                  onChange={(e) => setVouchTrustArea(e.target.value)}
                  autoFocus
                />

                <TextField
                  fullWidth
                  size="small"
                  label="Comment"
                  placeholder="Why are you vouching for this person?"
                  value={vouchComment}
                  onChange={(e) => setVouchComment(e.target.value)}
                  multiline
                  rows={3}
                />
              </Box>
            )}
          </DialogContent>
          {!vouchSent && (
            <DialogActions>
              <Button
                onClick={() => setSendVouchOpen(false)}
                color="inherit"
                size="small"
              >
                Cancel
              </Button>
              <Button
                variant="contained"
                size="small"
                disabled={!vouchTrustArea.trim() || !vouchComment.trim()}
                onClick={() => {
                  // TODO: Issue VRC via protocol SDK
                  console.log('Sending vouch:', {
                    issuer: 'did:example:currentuser',
                    subject: contact['@id'],
                    trustArea: vouchTrustArea,
                    confidenceScore: vouchConfidence,
                    comment: vouchComment,
                    issuanceDate: new Date().toISOString(),
                  });
                  setVouchSent(true);
                  setVouchTrustArea('');
                  setVouchConfidence(0.8);
                  setVouchComment('');
                }}
              >
                Send
              </Button>
            </DialogActions>
          )}
        </Dialog>

        {/* iOS permission mock — separate dialog */}
        <Dialog
          open={inviteOpen && inviteSent && inviteChannel === 'email'}
          onClose={() => { setInviteOpen(false); setInviteSent(false); }}
          PaperProps={{
            sx: {
              borderRadius: 2,
              maxWidth: 280,
              bgcolor: 'rgba(242,242,247,0.95)',
              backdropFilter: 'blur(20px)',
            },
          }}
        >
          <Box sx={{ p: 2.5, textAlign: 'center' }}>
            <Typography variant="body2" sx={{ fontWeight: 600, mb: 0.5 }}>
              "PLANET" wants to open "Mail"
            </Typography>
            <Typography variant="caption" color="text.secondary">
              This will compose a new email with your invite message.
            </Typography>
          </Box>
          <Divider />
          <Box sx={{ display: 'flex' }}>
            <Box
              onClick={() => { setInviteOpen(false); setInviteSent(false); }}
              sx={{
                flex: 1,
                py: 1.25,
                cursor: 'pointer',
                textAlign: 'center',
                borderRight: '1px solid',
                borderColor: 'divider',
                '&:hover': { bgcolor: 'action.hover' },
              }}
            >
              <Typography variant="body2" sx={{ color: '#0066CC' }}>
                Cancel
              </Typography>
            </Box>
            <Box
              onClick={() => { setInviteOpen(false); setInviteSent(false); }}
              sx={{
                flex: 1,
                py: 1.25,
                cursor: 'pointer',
                textAlign: 'center',
                '&:hover': { bgcolor: 'action.hover' },
              }}
            >
              <Typography variant="body2" sx={{ color: '#0066CC', fontWeight: 600 }}>
                Open
              </Typography>
            </Box>
          </Box>
        </Dialog>

        {/* Invite to PLANET Dialog */}
        <Dialog
          open={inviteOpen && !(inviteSent && inviteChannel === 'email')}
          onClose={() => { setInviteOpen(false); setInviteSent(false); }}
          maxWidth="xs"
          fullWidth
        >
          <DialogTitle sx={{ pr: 5 }}>
            {!inviteSent && (
              <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                Invite {name?.value?.split(' ')[0] || 'this contact'} to PLANET
              </Typography>
            )}
            <IconButton
              onClick={() => { setInviteOpen(false); setInviteSent(false); }}
              sx={{ position: 'absolute', top: 8, right: 8 }}
              size="small"
            >
              <Close fontSize="small" />
            </IconButton>
          </DialogTitle>
          <DialogContent>
            {inviteSent && inviteChannel === 'clipboard' ? (
              <Box sx={{ textAlign: 'center', py: 3 }}>
                <Send sx={{ fontSize: 48, color: '#0066CC', mb: 1 }} />
                <Typography variant="body2" color="text.secondary">
                  Invite text copied to clipboard
                </Typography>
              </Box>
            ) : !inviteSent ? (
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5, pt: 0.5 }}>
                {/* Message */}
                <TextField
                  fullWidth
                  multiline
                  rows={5}
                  size="small"
                  defaultValue={`Hey ${name?.value?.split(' ')[0] || ''}, I'm using PLANET for private, decentralised networking. Join me → planetnetwork.app/j/x7k2m`}
                />

                {/* Link info */}
                <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.65rem' }}>
                  Single-use invite link — expires in 7 days
                </Typography>
              </Box>
            ) : null}
          </DialogContent>
          {!inviteSent && (
            <DialogActions>
              <Button
                size="small"
                onClick={() => {
                  navigator.clipboard?.writeText(`Hey ${name?.value?.split(' ')[0] || ''}, I'm using PLANET for private, decentralised networking. Join me → planetnetwork.app/j/x7k2m`);
                  setInviteSent(true);
                  setInviteChannel('clipboard');
                }}
                sx={{ textTransform: 'none', color: '#0066CC' }}
              >
                Copy
              </Button>
              <Button
                variant="contained"
                size="small"
                onClick={() => {
                  setInviteSent(true);
                  setInviteChannel('email');
                }}
                sx={{ bgcolor: '#0066CC', '&:hover': { bgcolor: '#004C99' }, textTransform: 'none' }}
              >
                Email
              </Button>
            </DialogActions>
          )}
        </Dialog>

        {/* Connect — Select Trust Profile */}
        <RCardSelectionModal
          open={connectModalOpen}
          onClose={() => setConnectModalOpen(false)}
          onSelect={(rCardIds) => {
            setConnectionState('pending');
            setConnectModalOpen(false);
            console.log('Connection request sent with Trust Profile:', rCardIds);
          }}
          contactName={resolveFrom(contact as SocialContact, 'name')?.value}
          multiSelect={false}
          title="Connect"
          description="Select a profile to connect with:"
          submitLabel="Connect"
        />

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
                      <Typography variant="subtitle2" sx={{ fontWeight: 600, textTransform: 'none', ml: 1 }}>
                        {cardType}{isAssigned && ' — Assigned'}
                      </Typography>
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