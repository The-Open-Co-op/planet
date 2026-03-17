export interface ChatMessage {
  id: string;
  text: string;
  senderId: string;
  timestamp: string;
  status: 'sent' | 'delivered' | 'read';
  reactions?: { emoji: string; userId: string }[];
}

export interface Conversation {
  id: string;
  contactId: string;
  contactName: string;
  contactAvatar?: string;
  isOnline: boolean;
  lastSeen?: string;
  messages: ChatMessage[];
  unreadCount: number;
}

const ME = 'current-user';

const _conversations: Conversation[] = [
  {
    id: 'conv-sarah',
    contactId: 'contact:1',
    contactName: 'Sarah Mitchell',
    contactAvatar: '/images/sarah-mitchell.png',
    isOnline: true,
    messages: [
      { id: 'sys-1', text: 'You and Sarah are now connected 🎉', senderId: 'system', timestamp: '2026-03-16T10:32:00Z', status: 'read' },
      { id: 'm1', text: 'Hi Sarah, thanks for inviting me to PLANET!', senderId: ME, timestamp: '2026-03-16T10:33:00Z', status: 'read' },
      { id: 'm2', text: "Jonny! So glad you're here. How's it going?", senderId: 'contact:1', timestamp: '2026-03-16T10:34:00Z', status: 'read' },
      { id: 'm3', text: "Great - just getting set up. This is pretty slick.", senderId: ME, timestamp: '2026-03-16T10:35:00Z', status: 'read' },
      { id: 'm4', text: "Try importing your contacts and setting up some trust profiles. You can control exactly what each group of contacts sees.", senderId: 'contact:1', timestamp: '2026-03-16T10:36:00Z', status: 'read' },
      { id: 'm5', text: "That sounds great. I've been waiting for something like this for ages.", senderId: ME, timestamp: '2026-03-16T10:37:00Z', status: 'delivered' },
    ],
    unreadCount: 0,
  },
  {
    id: 'conv-amanda',
    contactId: 'contact:7',
    contactName: 'Amanda Foster',
    isOnline: false,
    lastSeen: 'yesterday',
    messages: [
      { id: 'sys-af', text: 'You and Amanda are now connected 🎉', senderId: 'system', timestamp: '2026-03-13T09:00:00Z', status: 'read' },
      { id: 'af-1', text: 'Hey Jonny, great to connect on PLANET!', senderId: 'contact:7', timestamp: '2026-03-13T09:05:00Z', status: 'read' },
      { id: 'af-2', text: 'Likewise! Looking forward to collaborating.', senderId: ME, timestamp: '2026-03-13T09:10:00Z', status: 'read' },
    ],
    unreadCount: 0,
  },
  {
    id: 'conv-ariana',
    contactId: 'contact:2',
    contactName: 'Ariana Bahrami',
    isOnline: true,
    messages: [
      { id: 'sys-ab', text: 'You and Ariana are now connected 🎉', senderId: 'system', timestamp: '2026-03-10T14:00:00Z', status: 'read' },
      { id: 'ab-1', text: 'Hi Jonny! Shall we catch up on the API project?', senderId: 'contact:2', timestamp: '2026-03-12T11:00:00Z', status: 'read' },
      { id: 'ab-2', text: "Yes! I'll send you the updated specs.", senderId: ME, timestamp: '2026-03-12T11:15:00Z', status: 'delivered' },
    ],
    unreadCount: 0,
  },
  {
    id: 'conv-marcus',
    contactId: 'contact:3',
    contactName: 'Marcus Thompson',
    isOnline: false,
    lastSeen: '2 hours ago',
    messages: [
      { id: 'sys-mt', text: 'You and Marcus are now connected 🎉', senderId: 'system', timestamp: '2026-03-15T16:00:00Z', status: 'read' },
    ],
    unreadCount: 0,
  },
  {
    id: 'conv-elena',
    contactId: 'contact:5',
    contactName: 'Elena Rodriguez',
    isOnline: true,
    messages: [
      { id: 'sys-er', text: 'You and Elena are now connected 🎉', senderId: 'system', timestamp: '2026-03-15T10:00:00Z', status: 'read' },
      { id: 'er-1', text: 'Hey! Love what you did with the new designs.', senderId: 'contact:5', timestamp: '2026-03-16T08:00:00Z', status: 'read' },
    ],
    unreadCount: 1,
  },
];

/** Mutable conversations store — shared singleton */
export const chatStore = {
  getConversations: () => _conversations,

  getConversation: (contactId: string) =>
    _conversations.find(c => c.contactId === contactId),

  getOrCreateConversation: (contactId: string, contactName: string, contactAvatar?: string): Conversation => {
    let conv = _conversations.find(c => c.contactId === contactId);
    if (!conv) {
      conv = {
        id: `conv-${Date.now()}`,
        contactId,
        contactName,
        contactAvatar,
        isOnline: true,
        messages: [],
        unreadCount: 0,
      };
      _conversations.unshift(conv);
    }
    return conv;
  },

  addMessage: (contactId: string, message: ChatMessage) => {
    const conv = _conversations.find(c => c.contactId === contactId);
    if (conv) {
      conv.messages.push(message);
    }
  },

  updateMessageStatus: (contactId: string, messageId: string, status: ChatMessage['status']) => {
    const conv = _conversations.find(c => c.contactId === contactId);
    if (conv) {
      const msg = conv.messages.find(m => m.id === messageId);
      if (msg) msg.status = status;
    }
  },

  addReaction: (contactId: string, messageId: string, emoji: string, userId: string) => {
    const conv = _conversations.find(c => c.contactId === contactId);
    if (conv) {
      const msg = conv.messages.find(m => m.id === messageId);
      if (msg) {
        if (!msg.reactions) msg.reactions = [];
        // One reaction per user per message — remove existing, then add new (or just remove if same)
        const existingIdx = msg.reactions.findIndex(r => r.userId === userId);
        if (existingIdx >= 0) {
          const isSame = msg.reactions[existingIdx].emoji === emoji;
          msg.reactions.splice(existingIdx, 1);
          if (isSame) return; // Toggle off
        }
        msg.reactions.push({ emoji, userId });
      }
    }
  },
};

/** @deprecated Use chatStore instead */
export const mockConversations = _conversations;
