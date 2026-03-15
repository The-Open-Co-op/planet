import {SocialContact} from "@/.ldo/contact.typings";
import {RCardAssignment} from "./rcard";

export interface SortParams {
  sortBy?: string;
  sortDirection?: 'asc' | 'desc';
}

export interface Contact extends Omit<SocialContact, 'createdAt' | 'updatedAt'> {
  createdAt?: string | SocialContact['createdAt'];
  updatedAt?: string | SocialContact['updatedAt'];
  humanityConfidenceScore?: number;
  vouchesSent?: number;
  vouchesReceived?: number;
  relationshipCategory?: 'friends_family' | 'community' | 'business' | string;
  rCardAssignments?: RCardAssignment[];
  lastInteractionAt?: Date;
  lastInteraction?: string;
  interactionCount?: number;
  recentInteractionScore?: number;
  sharedTagsCount?: number;
  isDraft?: boolean;
  isMe?: boolean;
  planetStatus?: {
    value: string;
    source?: string;
  };
}

export interface SimpleMockContact {
  name: string,
  email: string,
  phoneNumber: string
}

export interface ImportSource {
  id: string;
  name: string;
  type: Source;
  icon: string;
  description: string;
  isAvailable: boolean;
}

export type Source = "user" | "GreenCheck" | "linkedin" | "iPhone" | "Android Phone" | "Gmail" | "vcard";