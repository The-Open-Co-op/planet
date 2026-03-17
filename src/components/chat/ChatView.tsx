import { useState, useRef, useEffect } from 'react';
import { Box, Typography, Avatar, TextField, IconButton } from '@mui/material';
import { ArrowBack, Lock, Send } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { chatStore } from '@/mocks/chat';
import type { ChatMessage } from '@/mocks/chat';
import { dataService } from '@/services/dataService';
import { resolveFrom } from '@/utils/contactUtils';
import type { SocialContact } from '@/.ldo/contact.typings';

const REACTION_EMOJIS = [
  { emoji: '🧠', label: 'Wise / Clever' },
  { emoji: '❤️', label: 'Kind / Caring' },
  { emoji: '😂', label: 'Funny' },
  { emoji: '✅', label: 'Well done' },
  { emoji: '⚠️', label: 'Warning' },
  { emoji: '❌', label: 'Not good' },
];

interface ChatViewProps {
  contactId: string;
  /** Custom back handler — if not provided, navigates to /chat. Pass null to hide the back button. */
  onBack?: (() => void) | null;
}

export const ChatView = ({ contactId, onBack }: ChatViewProps) => {
  const navigate = useNavigate();
  const [conversation, setConversation] = useState(() => chatStore.getConversation(contactId) || null);
  const [messages, setMessages] = useState<ChatMessage[]>(conversation?.messages || []);
  const [input, setInput] = useState('');
  const [reactionMsgId, setReactionMsgId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Create conversation if it doesn't exist
  useEffect(() => {
    if (!conversation && contactId) {
      dataService.getContact(contactId).then(contact => {
        if (contact) {
          const contactName = resolveFrom(contact as SocialContact, 'name')?.value || 'Contact';
          const photo = resolveFrom(contact as SocialContact, 'photo');
          const conv = chatStore.getOrCreateConversation(contactId, contactName, photo?.value);
          setConversation(conv);
          setMessages(conv.messages);
        }
      });
    }
  }, [contactId, conversation]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  if (!conversation) {
    return (
      <Box sx={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Typography variant="body2" color="text.secondary">Loading...</Typography>
      </Box>
    );
  }

  const handleReaction = (messageId: string, emoji: string) => {
    chatStore.addReaction(contactId, messageId, emoji, 'current-user');
    setMessages([...chatStore.getConversation(contactId)!.messages]);
    setReactionMsgId(null);
    // TODO: Issue a micro-VRC for this reaction
    console.log('Reaction VRC:', { messageId, emoji, contactId });
  };

  const handleSend = () => {
    if (!input.trim()) return;
    const newMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      text: input.trim(),
      senderId: 'current-user',
      timestamp: new Date().toISOString(),
      status: 'sent',
    };
    chatStore.addMessage(contactId, newMsg);
    setMessages([...chatStore.getConversation(contactId)!.messages]);
    setInput('');

    // Simulate delivery after 500ms
    setTimeout(() => {
      chatStore.updateMessageStatus(contactId, newMsg.id, 'delivered');
      setMessages(
        [...chatStore.getConversation(contactId)!.messages]
      );
    }, 500);
  };

  const formatTime = (timestamp: string) => {
    return new Date(timestamp).toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' });
  };

  const formatDateSeparator = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Yesterday';
    return date.toLocaleDateString(undefined, { weekday: 'long', day: 'numeric', month: 'short' });
  };

  // Group messages and insert date separators
  const shouldShowDate = (msg: ChatMessage, prevMsg?: ChatMessage) => {
    if (!prevMsg) return true;
    const d1 = new Date(msg.timestamp).toDateString();
    const d2 = new Date(prevMsg.timestamp).toDateString();
    return d1 !== d2;
  };

  return (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column', bgcolor: 'background.default' }}>
      {/* Header */}
      <Box sx={{
        px: 1,
        py: 0.75,
        display: 'flex',
        alignItems: 'center',
        gap: 1,
        borderBottom: '1px solid',
        borderColor: 'divider',
      }}>
        {onBack !== null && (
          <IconButton size="small" onClick={() => onBack ? onBack() : navigate('/chat')}>
            <ArrowBack sx={{ fontSize: 20 }} />
          </IconButton>
        )}
        <Avatar
          src={conversation.contactAvatar}
          sx={{ width: 32, height: 32 }}
        >
          {conversation.contactName.charAt(0)}
        </Avatar>
        <Box sx={{ flex: 1, minWidth: 0 }}>
          <Typography variant="subtitle2" sx={{ fontWeight: 600, lineHeight: 1.2 }}>
            {conversation.contactName}
          </Typography>
          <Typography variant="caption" sx={{
            color: conversation.isOnline ? 'success.main' : 'text.secondary',
            fontSize: '0.6rem',
          }}>
            {conversation.isOnline ? 'online' : conversation.lastSeen || 'offline'}
          </Typography>
        </Box>
        <Lock sx={{ fontSize: 18, color: 'text.disabled' }} />
      </Box>

      {/* Messages */}
      <Box sx={{
        flex: 1,
        overflow: 'auto',
        px: 1.5,
        py: 1,
        display: 'flex',
        flexDirection: 'column',
        gap: 0.75,
      }}>
        {messages.map((msg, i) => {
          const isSystem = msg.senderId === 'system';
          const isMe = msg.senderId === 'current-user';
          const showDate = shouldShowDate(msg, messages[i - 1]);

          return (
            <Box key={msg.id}>
              {/* Date separator */}
              {showDate && (
                <Box sx={{ display: 'flex', justifyContent: 'center', my: 1 }}>
                  <Box sx={{
                    px: 1.5,
                    py: 0.25,
                    borderRadius: 2,
                    bgcolor: 'action.hover',
                  }}>
                    <Typography variant="caption" sx={{ fontSize: '0.6rem', color: 'text.secondary' }}>
                      {formatDateSeparator(msg.timestamp)}
                    </Typography>
                  </Box>
                </Box>
              )}

              {/* System message */}
              {isSystem ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', my: 0.5 }}>
                  <Box sx={{
                    px: 1.5,
                    py: 0.5,
                    borderRadius: 2,
                    bgcolor: 'action.hover',
                  }}>
                    <Typography variant="caption" sx={{ fontSize: '0.65rem', color: 'text.secondary' }}>
                      {msg.text}
                    </Typography>
                  </Box>
                </Box>
              ) : (
                /* Regular message */
                <Box sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: isMe ? 'flex-end' : 'flex-start',
                  mb: 0.25,
                  position: 'relative',
                }}>
                  {/* Reaction picker */}
                  {reactionMsgId === msg.id && (
                    <Box sx={{
                      position: 'absolute',
                      top: -28,
                      [isMe ? 'right' : 'left']: 8,
                      display: 'flex',
                      gap: 0.5,
                      px: 0.75,
                      py: 0.25,
                      borderRadius: 2,
                      bgcolor: 'background.paper',
                      boxShadow: '0 2px 12px rgba(0,0,0,0.15)',
                      zIndex: 5,
                    }}>
                      {REACTION_EMOJIS.map(({ emoji }) => (
                        <Box
                          key={emoji}
                          onClick={(e) => { e.stopPropagation(); handleReaction(msg.id, emoji); }}
                          sx={{
                            width: 26,
                            height: 26,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderRadius: '50%',
                            cursor: 'pointer',
                            fontSize: '0.9rem',
                            '&:hover': { bgcolor: 'action.hover', transform: 'scale(1.2)' },
                            transition: 'transform 0.1s',
                          }}
                        >
                          {emoji}
                        </Box>
                      ))}
                    </Box>
                  )}

                  <Box
                    onClick={() => !isMe && setReactionMsgId(reactionMsgId === msg.id ? null : msg.id)}
                    sx={{
                      maxWidth: '78%',
                      bgcolor: isMe ? '#D4D7DC' : '#E9EAED',
                      color: 'text.primary',
                      borderRadius: isMe ? '12px 12px 4px 12px' : '12px 12px 12px 4px',
                      px: 1.25,
                      py: 0.75,
                      cursor: isMe ? 'default' : 'pointer',
                    }}
                  >
                    <Typography sx={{ fontSize: '0.8rem', lineHeight: 1.4 }}>
                      {msg.text}
                      <Box component="span" sx={{
                        fontSize: '0.55rem',
                        color: 'text.disabled',
                        ml: 0.75,
                        whiteSpace: 'nowrap',
                        float: 'right',
                        mt: '3px',
                      }}>
                        {formatTime(msg.timestamp)}
                        {isMe && (
                          <Box component="span" sx={{
                            ml: 0.25,
                            color: msg.status === 'read' ? '#53bdeb' : 'text.disabled',
                          }}>
                            {msg.status === 'sent' ? '✓' : '✓✓'}
                          </Box>
                        )}
                      </Box>
                    </Typography>
                  </Box>

                  {/* Reactions display */}
                  {msg.reactions && msg.reactions.length > 0 && (
                    <Box sx={{
                      display: 'flex',
                      gap: 0.25,
                      mt: -0.5,
                      px: 0.75,
                      py: 0.25,
                      borderRadius: 2,
                      bgcolor: 'background.paper',
                      boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                      border: '1px solid',
                      borderColor: 'divider',
                      fontSize: '0.75rem',
                      cursor: 'pointer',
                    }}>
                      {msg.reactions.map((r, ri) => (
                        <span
                          key={ri}
                          onClick={(e) => { e.stopPropagation(); handleReaction(msg.id, r.emoji); }}
                        >
                          {r.emoji}
                        </span>
                      ))}
                    </Box>
                  )}
                </Box>
              )}
            </Box>
          );
        })}
        <div ref={messagesEndRef} />
      </Box>

      {/* Input bar */}
      <Box sx={{
        px: 1,
        py: 0.75,
        flexShrink: 0,
        display: 'flex',
        alignItems: 'center',
        gap: 0.75,
        borderTop: '1px solid',
        borderColor: 'divider',
      }}>
        <TextField
          fullWidth
          size="small"
          placeholder="Message"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && (e.preventDefault(), handleSend())}
          sx={{
            '& .MuiOutlinedInput-root': {
              borderRadius: 3,
              bgcolor: 'action.hover',
              '& fieldset': { border: 'none' },
            },
            '& .MuiInputBase-input': { py: 0.75, fontSize: '0.85rem' },
          }}
        />
        <IconButton
          size="small"
          onClick={handleSend}
          disabled={!input.trim()}
          color="primary"
        >
          <Send sx={{ fontSize: 20 }} />
        </IconButton>
      </Box>
    </Box>
  );
};
