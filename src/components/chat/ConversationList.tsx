import { useState, useEffect } from 'react';
import {
  Box, Typography, Avatar, InputAdornment, TextField, Checkbox, Button, IconButton,
} from '@mui/material';
import { Search, Add, ArrowBack, Groups, PhotoCamera } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { chatStore } from '@/mocks/chat';
import { dataService } from '@/services/dataService';
import { resolveFrom } from '@/utils/contactUtils';
import type { Contact } from '@/types/contact';
import type { SocialContact } from '@/.ldo/contact.typings';

type Screen = 'list' | 'newChat' | 'selectGroupMembers' | 'nameGroup';

export const ConversationList = ({ onConversationClick }: { onConversationClick?: (contactId: string) => void } = {}) => {
  const navigate = useNavigate();
  const [screen, setScreen] = useState<Screen>('list');
  const [members, setMembers] = useState<Contact[]>([]);
  const [selectedMemberIds, setSelectedMemberIds] = useState<string[]>([]);
  const [groupName, setGroupName] = useState('');
  const [groupPhoto, setGroupPhoto] = useState<string | null>(null);

  useEffect(() => {
    if (screen === 'newChat' || screen === 'selectGroupMembers') {
      dataService.getContacts().then(contacts => {
        setMembers(contacts.filter(c => c.planetStatus?.value === 'member' && !c.isMe));
      });
    }
  }, [screen]);

  const handleToggleMember = (id: string) => {
    setSelectedMemberIds(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  const handleCreateGroup = () => {
    const memberNames = selectedMemberIds.map(id => {
      const contact = members.find(c => c['@id'] === id);
      return contact ? resolveFrom(contact as SocialContact, 'name')?.value || 'Unknown' : 'Unknown';
    });

    const conv = chatStore.getOrCreateConversation(
      `group-${Date.now()}`,
      groupName || memberNames.join(', '),
      groupPhoto || undefined,
    );
    // Add system message
    chatStore.addMessage(conv.contactId, {
      id: `sys-${Date.now()}`,
      text: `Group created with ${memberNames.join(', ')}`,
      senderId: 'system',
      timestamp: new Date().toISOString(),
      status: 'read',
    });

    setScreen('list');
    setSelectedMemberIds([]);
    setGroupName('');
    setGroupPhoto(null);
    navigate(`/chat/${conv.contactId}`);
  };

  const handlePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setGroupPhoto(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
    if (diffDays === 0) return date.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' });
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return date.toLocaleDateString(undefined, { weekday: 'short' });
    return date.toLocaleDateString(undefined, { day: 'numeric', month: 'short' });
  };

  const renderMemberRow = (contact: Contact, options?: { checkbox?: boolean; onClick?: () => void }) => {
    const name = resolveFrom(contact as SocialContact, 'name');
    const photo = resolveFrom(contact as SocialContact, 'photo');
    const org = resolveFrom(contact as SocialContact, 'organization');
    const isSelected = selectedMemberIds.includes(contact['@id'] || '');

    return (
      <Box
        key={contact['@id']}
        onClick={options?.onClick}
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 1.5,
          px: 2,
          py: 1,
          cursor: 'pointer',
          '&:hover': { bgcolor: 'action.hover' },
        }}
      >
        {options?.checkbox && (
          <Checkbox
            size="small"
            checked={isSelected}
            sx={{ p: 0.5 }}
          />
        )}
        <Avatar src={photo?.value} sx={{ width: 40, height: 40 }}>
          {name?.value?.charAt(0) || '?'}
        </Avatar>
        <Box sx={{ flex: 1, minWidth: 0 }}>
          <Typography variant="body2" sx={{ fontWeight: 500 }}>
            {name?.value || 'Unknown'}
          </Typography>
          {org?.value && (
            <Typography variant="caption" color="text.secondary" sx={{
              overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', display: 'block',
            }}>
              {org.value}
            </Typography>
          )}
        </Box>
      </Box>
    );
  };

  // --- Name Group screen ---
  if (screen === 'nameGroup') {
    return (
      <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column', bgcolor: 'background.default' }}>
        <Box sx={{ px: 2, pt: 1.5, pb: 1, display: 'flex', alignItems: 'center', gap: 1 }}>
          <ArrowBack
            sx={{ fontSize: 20, color: 'text.secondary', cursor: 'pointer' }}
            onClick={() => setScreen('selectGroupMembers')}
          />
          <Typography variant="h6" sx={{ fontWeight: 700, flex: 1 }}>
            New Group
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', py: 3, gap: 1.5 }}>
          <Box sx={{ position: 'relative' }}>
            <Avatar
              src={groupPhoto || undefined}
              sx={{ width: 72, height: 72, bgcolor: '#0066CC' }}
            >
              <Groups sx={{ fontSize: 32, color: 'white' }} />
            </Avatar>
            <input accept="image/*" id="group-photo" type="file" hidden onChange={handlePhotoUpload} />
            <label htmlFor="group-photo">
              <IconButton
                component="span"
                size="small"
                sx={{
                  position: 'absolute', bottom: -2, right: -2,
                  bgcolor: 'background.paper', border: '1px solid', borderColor: 'divider',
                  width: 26, height: 26,
                }}
              >
                <PhotoCamera sx={{ fontSize: 14 }} />
              </IconButton>
            </label>
          </Box>
          <Typography variant="caption" color="text.secondary">
            Add photo (optional)
          </Typography>
        </Box>

        <Box sx={{ px: 2, mb: 2 }}>
          <TextField
            fullWidth
            size="small"
            label="Group name"
            value={groupName}
            onChange={(e) => setGroupName(e.target.value)}
            autoFocus
          />
        </Box>

        <Typography variant="caption" color="text.secondary" sx={{ px: 2, mb: 1, fontWeight: 600 }}>
          {selectedMemberIds.length} member{selectedMemberIds.length !== 1 ? 's' : ''} selected
        </Typography>
        <Box sx={{ flex: 1, overflow: 'auto' }}>
          {members.filter(c => selectedMemberIds.includes(c['@id'] || '')).map(contact =>
            renderMemberRow(contact)
          )}
        </Box>

        <Box sx={{ p: 1.5, borderTop: '1px solid', borderColor: 'divider' }}>
          <Button
            variant="contained"
            fullWidth
            disabled={!groupName.trim()}
            onClick={handleCreateGroup}
            sx={{ bgcolor: '#0066CC', '&:hover': { bgcolor: '#004C99' }, textTransform: 'none', fontWeight: 700, borderRadius: 2 }}
          >
            Create Group
          </Button>
        </Box>
      </Box>
    );
  }

  // --- Select Group Members screen ---
  if (screen === 'selectGroupMembers') {
    return (
      <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column', bgcolor: 'background.default' }}>
        <Box sx={{ px: 2, pt: 1.5, pb: 1, display: 'flex', alignItems: 'center', gap: 1 }}>
          <ArrowBack
            sx={{ fontSize: 20, color: 'text.secondary', cursor: 'pointer' }}
            onClick={() => { setScreen('newChat'); setSelectedMemberIds([]); }}
          />
          <Typography variant="h6" sx={{ fontWeight: 700, flex: 1 }}>
            Add Members
          </Typography>
        </Box>

        <Box sx={{ flex: 1, overflow: 'auto' }}>
          {members.map(contact =>
            renderMemberRow(contact, {
              checkbox: true,
              onClick: () => handleToggleMember(contact['@id'] || ''),
            })
          )}
        </Box>

        <Box sx={{ p: 1.5, borderTop: '1px solid', borderColor: 'divider' }}>
          <Button
            variant="contained"
            fullWidth
            disabled={selectedMemberIds.length < 2}
            onClick={() => setScreen('nameGroup')}
            sx={{ bgcolor: '#0066CC', '&:hover': { bgcolor: '#004C99' }, textTransform: 'none', fontWeight: 700, borderRadius: 2 }}
          >
            Next ({selectedMemberIds.length} selected)
          </Button>
        </Box>
      </Box>
    );
  }

  // --- New Chat screen ---
  if (screen === 'newChat') {
    return (
      <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column', bgcolor: 'background.default' }}>
        <Box sx={{ px: 2, pt: 1.5, pb: 1, display: 'flex', alignItems: 'center', gap: 1 }}>
          <ArrowBack
            sx={{ fontSize: 20, color: 'text.secondary', cursor: 'pointer' }}
            onClick={() => setScreen('list')}
          />
          <Typography variant="h6" sx={{ fontWeight: 700, flex: 1 }}>
            New Chat
          </Typography>
        </Box>

        {/* New Group option */}
        <Box
          onClick={() => setScreen('selectGroupMembers')}
          sx={{
            display: 'flex', alignItems: 'center', gap: 1.5,
            px: 2, py: 1.25, cursor: 'pointer',
            '&:hover': { bgcolor: 'action.hover' },
            borderBottom: '1px solid', borderColor: 'divider',
          }}
        >
          <Box sx={{
            width: 40, height: 40, borderRadius: '50%', bgcolor: '#0066CC',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <Groups sx={{ fontSize: 20, color: 'white' }} />
          </Box>
          <Typography variant="body2" sx={{ fontWeight: 600 }}>
            New Group
          </Typography>
        </Box>

        <Typography variant="caption" color="text.secondary" sx={{ px: 2, pt: 1.5, pb: 0.5, fontWeight: 600, textTransform: 'uppercase', letterSpacing: 0.5 }}>
          PLANET Members
        </Typography>
        <Box sx={{ flex: 1, overflow: 'auto' }}>
          {members.map(contact =>
            renderMemberRow(contact, {
              onClick: () => {
                setScreen('list');
                navigate(`/chat/${contact['@id']}`);
              },
            })
          )}
        </Box>
      </Box>
    );
  }

  // --- Conversation List ---
  const conversations = chatStore.getConversations();

  return (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column', bgcolor: 'background.default' }}>
      <Box sx={{ px: 2, pt: 1.5, pb: 1, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Typography variant="h5" sx={{ fontWeight: 800 }}>
          Chats
        </Typography>
        <Add
          sx={{ fontSize: 24, color: 'text.secondary', cursor: 'pointer' }}
          onClick={() => setScreen('newChat')}
        />
      </Box>

      <Box sx={{ px: 2, pb: 1 }}>
        <TextField
          fullWidth
          size="small"
          placeholder="Search"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search sx={{ fontSize: 18, color: 'text.disabled' }} />
              </InputAdornment>
            ),
          }}
          sx={{
            '& .MuiOutlinedInput-root': { borderRadius: 3, bgcolor: 'action.hover', '& fieldset': { border: 'none' } },
            '& .MuiInputBase-input': { py: 0.75, fontSize: '0.85rem' },
          }}
        />
      </Box>

      <Box sx={{ flex: 1, overflow: 'auto' }}>
        {conversations.length === 0 ? (
          <Box sx={{ textAlign: 'center', py: 8, px: 3 }}>
            <Typography variant="body2" color="text.secondary">
              No conversations yet. Tap + to start chatting.
            </Typography>
          </Box>
        ) : (
          conversations.map((conv) => {
            const lastMessage = conv.messages[conv.messages.length - 1];
            const isSystem = lastMessage?.senderId === 'system';
            const isMe = lastMessage?.senderId === 'current-user';
            const preview = !lastMessage ? '' : isSystem
              ? lastMessage.text
              : isMe
              ? `You: ${lastMessage.text}`
              : lastMessage.text;

            return (
              <Box
                key={conv.id}
                onClick={() => onConversationClick ? onConversationClick(conv.contactId) : navigate(`/chat/${conv.contactId}`)}
                sx={{
                  display: 'flex', alignItems: 'center', gap: 1.5,
                  px: 2, py: 1.25, cursor: 'pointer',
                  '&:hover': { bgcolor: 'action.hover' },
                  '&:active': { bgcolor: 'action.selected' },
                }}
              >
                <Box sx={{ position: 'relative', flexShrink: 0 }}>
                  <Avatar src={conv.contactAvatar} sx={{ width: 48, height: 48 }}>
                    {conv.contactName.charAt(0)}
                  </Avatar>
                  {conv.isOnline && (
                    <Box sx={{
                      position: 'absolute', bottom: 1, right: 1,
                      width: 12, height: 12, borderRadius: '50%',
                      bgcolor: '#22c55e', border: '2px solid', borderColor: 'background.default',
                    }} />
                  )}
                </Box>
                <Box sx={{ flex: 1, minWidth: 0 }}>
                  <Box sx={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', mb: 0.25 }}>
                    <Typography variant="body2" sx={{
                      fontWeight: conv.unreadCount > 0 ? 700 : 500,
                      overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                    }}>
                      {conv.contactName}
                    </Typography>
                    <Typography variant="caption" sx={{
                      color: conv.unreadCount > 0 ? 'primary.main' : 'text.secondary',
                      fontSize: '0.65rem', flexShrink: 0, ml: 1,
                    }}>
                      {lastMessage ? formatTime(lastMessage.timestamp) : ''}
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Typography variant="caption" sx={{
                      color: conv.unreadCount > 0 ? 'text.primary' : 'text.secondary',
                      fontWeight: conv.unreadCount > 0 ? 500 : 400,
                      overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', flex: 1,
                    }}>
                      {isMe && !isSystem && lastMessage && (
                        <Box component="span" sx={{ color: lastMessage.status === 'read' ? '#53bdeb' : 'text.disabled', mr: 0.5, letterSpacing: '-3px' }}>
                          ✓✓
                        </Box>
                      )}
                      {preview}
                    </Typography>
                    {conv.unreadCount > 0 && (
                      <Box sx={{
                        minWidth: 20, height: 20, borderRadius: 10,
                        bgcolor: 'primary.main', display: 'flex', alignItems: 'center', justifyContent: 'center',
                        ml: 1, flexShrink: 0,
                      }}>
                        <Typography sx={{ fontSize: '0.6rem', color: 'white', fontWeight: 700 }}>
                          {conv.unreadCount}
                        </Typography>
                      </Box>
                    )}
                  </Box>
                </Box>
              </Box>
            );
          })
        )}
      </Box>
    </Box>
  );
};
