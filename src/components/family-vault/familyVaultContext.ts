import { createContext, useContext } from 'react';
import type { MemoryEntry, MemoryCategory, PersonId } from './familyVaultData';

/** Shared state for the Family Vault demo — see FamilyVaultState.tsx for the provider. */

export type ApprovalStage = 'pending' | 'parent' | 'complete';

export interface CircleInvite {
  id: string;
  name: string;
  /** The role they were given, e.g. 'View only'. */
  role: string;
  duration: string;
}

export interface FamilyVaultContextValue {
  /** Records the family has accepted into the vault (step 2). */
  acceptedRecordIds: string[];
  acceptRecord: (id: string) => void;
  /** The record whose "check this record" panel is open. */
  checkingRecordId: string | null;
  setCheckingRecordId: (id: string | null) => void;

  /** Memory entries, after any corrections (step 3). */
  memory: MemoryEntry[];
  correctMemory: (id: string, text: string) => void;
  removeMemory: (id: string) => void;
  addMemory: (category: MemoryCategory, about: PersonId, text: string) => void;

  /** The new school's request (step 4) — opened from Alerts, like records are. */
  requestOpened: boolean;
  openRequest: () => void;
  selectedItemIds: string[];
  toggleItem: (id: string) => void;
  duration: string;
  setDuration: (d: string) => void;
  approval: ApprovalStage;
  advanceApproval: () => void;

  /** The clinic share (step 5): which option was chosen, if any. */
  clinicChoice: 'answer' | 'full' | null;
  setClinicChoice: (c: 'answer' | 'full' | null) => void;

  /** The learning app (step 6). */
  appItemIds: string[];
  toggleAppItem: (id: string) => void;
  appGranted: boolean;
  grantApp: () => void;

  /** The trusted circle (step 8) — invites and removals persist across steps. */
  invitedCircle: CircleInvite[];
  inviteToCircle: (invite: CircleInvite) => void;
  circleRemovedIds: string[];
  removeFromCircle: (id: string) => void;

  /** Grants ended by hand in the access log (step 7). */
  revokedIds: string[];
  revokeAccess: (id: string) => void;

  /** The assistant's draft (step 9). */
  assistantAsked: boolean;
  askAssistant: () => void;
  assistantShared: boolean;
  shareAssistantDraft: () => void;
  /** What the family did with the assistant's one inferred line. */
  inferenceDropped: boolean;
  dropInference: () => void;
  /** The corrected wording, once a parent has rewritten it. */
  inferenceCorrection: string | null;
  correctInference: (text: string) => void;

  reset: () => void;
}

export const FamilyVaultContext = createContext<FamilyVaultContextValue | null>(null);

export const useFamilyVault = () => {
  const ctx = useContext(FamilyVaultContext);
  if (!ctx) throw new Error('useFamilyVault must be used inside FamilyVaultProvider');
  return ctx;
};
