export interface ProfileCard {
  id: string;
  name: string;
  description?: string;
  color?: string;
  icon?: string;
  isDefault: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// Legacy alias for backwards compatibility
export type RCard = ProfileCard;

/**
 * VouchCredential — based on W3C Verifiable Credential schema.
 * Maps to the VouchCredential JSON-LD structure.
 */
export interface Vouch {
  /** Unique credential ID */
  id: string;
  /** DID of the issuer (who sent the vouch) — maps to a contact ID */
  issuer: string;
  /** DID of the subject (who received the vouch) */
  subject: string;
  /** What this vouch is for */
  trustArea: string;
  /** Confidence score 0–1 */
  confidenceScore: number;
  /** Endorsement comment from the voucher */
  comment: string;
  /** When the credential was issued (ISO 8601 timestamp) */
  issuanceDate: string;
}

export interface NotificationAction {
  id: string;
  type: 'accept' | 'reject' | 'assign' | 'view' | 'select_rcard';
  label: string;
  variant?: 'text' | 'outlined' | 'contained';
  color?: 'primary' | 'secondary' | 'success' | 'error' | 'warning';
}

export interface Notification {
  id: string;
  type: 'vouch' | 'connection' | 'system';
  title: string;
  message: string;
  fromUserId?: string;
  fromUserName?: string;
  fromUserAvatar?: string;
  targetUserId: string;
  isRead: boolean;
  isActionable: boolean;
  status: 'pending' | 'accepted' | 'rejected' | 'completed';
  actions?: NotificationAction[];
  metadata?: {
    vouchId?: string;
    groupId?: string;
    messageId?: string;
    profileCardId?: string;
    rCardId?: string; // Legacy alias
    rCardIds?: string[]; // Multiple rCard assignments
    contactId?: string;
    selectedRCardId?: string;
    selectedRCardIds?: string[]; // Multiple selections
  };
  createdAt: Date;
  updatedAt: Date;
}

export interface VouchNotification extends Notification {
  type: 'vouch';
  metadata: {
    vouchId: string;
    profileCardId?: string;
    rCardId?: string; // Legacy alias
  };
}

export interface ConnectionNotification extends Notification {
  type: 'connection';
  metadata: {
    contactId: string;
    selectedRCardId?: string;
  };
}

export interface NotificationSummary {
  total: number;
  unread: number;
  pending: number;
  byType: {
    vouch: number;
    connection: number;
    system: number;
  };
}

export type PrivacyLevel = 'none' | 'limited' | 'moderate' | 'intimate';
export type LocationSharingLevel = 'none' | 'city' | 'region' | 'exact';
export type ArticleSharingLevel = 'none' | 'selected' | 'all';
export type PhotoSharingLevel = 'none' | 'tagged' | 'events' | 'all';
export type CalendarSharingLevel = 'none' | 'busy_free' | 'availability' | 'full';
export type GroupSharingLevel = 'none' | 'selected' | 'all';

export interface PrivacySettings {
  keyRecoveryBuddy: boolean;
  dataSharing: {
    location: LocationSharingLevel;
    articles: ArticleSharingLevel;
    photos: PhotoSharingLevel;
    calendar: CalendarSharingLevel;
    groups: GroupSharingLevel;
  };
  reSharing: {
    enabled: boolean;
    maxHops: number;
  };
}

export interface ProfileCardWithPrivacy extends ProfileCard {
  privacySettings: PrivacySettings;
}

// Legacy alias for backwards compatibility
export type RCardWithPrivacy = ProfileCardWithPrivacy;

export interface ContactPrivacyOverride {
  contactId: string;
  profileCardId: string;
  rCardId?: string; // Legacy alias
  overrides: Partial<PrivacySettings>;
  createdAt: Date;
  updatedAt: Date;
}

// Default privacy settings template
export const DEFAULT_PRIVACY_SETTINGS: PrivacySettings = {
  keyRecoveryBuddy: false,
  dataSharing: {
    location: 'none',
    articles: 'none',
    photos: 'none',
    calendar: 'none',
    groups: 'none',
  },
  reSharing: {
    enabled: true,
    maxHops: 3,
  },
};

// Default profile card categories
export const DEFAULT_PROFILE_CARDS: Omit<ProfileCard, 'id' | 'createdAt' | 'updatedAt'>[] = [
  {
    name: 'Default',
    description: 'Connections not allocated to another card',
    color: '#6b7280',
    icon: 'PersonOutline',
    isDefault: true,
  },
  {
    name: 'Public',
    description: 'Your public-facing profile visible to everyone',
    color: '#0066CC',
    icon: 'Public',
    isDefault: true,
  },
  {
    name: 'Family',
    description: 'Family members and relatives',
    color: '#f59e0b',
    icon: 'FamilyRestroom',
    isDefault: true,
  },
  {
    name: 'Friends',
    description: 'Personal friends and social connections',
    color: '#7c3aed',
    icon: 'Favorite',
    isDefault: true,
  },
  {
    name: 'Business',
    description: 'Professional business contacts and partnerships',
    color: '#2563eb',
    icon: 'Business',
    isDefault: true,
  },
  {
    name: 'Community',
    description: 'Community members and local connections',
    color: '#059669',
    icon: 'Public',
    isDefault: true,
  },
];

// Legacy alias for backwards compatibility
export const DEFAULT_RCARDS = DEFAULT_PROFILE_CARDS;