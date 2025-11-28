import type { RCardWithPrivacy } from '@/types/notification';
import type { PersonhoodCredentials } from '@/types/personhood';

export interface ProfileSectionProps {
  personhoodCredentials: PersonhoodCredentials;
  onGenerateQR: () => void;
  onRefreshCredentials: () => void;
  initialProfileData?: ProfileData;
}

export interface SettingsSectionProps {
  rCards: RCardWithPrivacy[];
  selectedRCard: RCardWithPrivacy | null;
  onRCardSelect: (rCard: RCardWithPrivacy) => void;
  onCreateRCard: () => void;
  onEditRCard: (rCard: RCardWithPrivacy) => void;
  onDeleteRCard: (rCard: RCardWithPrivacy) => void;
  onUpdate: (updatedRCard: RCardWithPrivacy) => void;
  initialProfileData?: ProfileData;
}

export interface AccountPageProps {
  initialTab?: number;
  profileData?: ProfileData;
  handleLogout?: () => Promise<void>;
  isNextGraph: boolean;
}

export interface CustomSocialLink {
  id: string;
  platform: string;
  username: string;
}

export interface ProfileData {
  name?: string;
  jobTitle?: string;
  email?: string;
  phone?: string;
  location?: string;
  bio?: string;
  avatar?: string;
  website?: string;
  linkedin?: string;
  twitter?: string;
  facebook?: string;
  instagram?: string;
  github?: string;
  customSocialLinks: CustomSocialLink[];
}