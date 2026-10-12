import { useCallback, useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import { MEMORY, SCHOOL_REQUEST, LEARNING_APP } from './familyVaultData';
import type { MemoryEntry, MemoryCategory, PersonId } from './familyVaultData';
import { FamilyVaultContext } from './familyVaultContext';
import type { CircleInvite } from './familyVaultContext';

const defaultSelected = SCHOOL_REQUEST.items.filter((i) => i.defaultOn).map((i) => i.id);
const defaultAppItems = LEARNING_APP.items.filter((i) => i.defaultOn).map((i) => i.id);
import type { ApprovalStage } from './familyVaultContext';

/**
 * All demo state lives here so it survives moving between steps, and so one
 * Reset puts the whole story back to the beginning in front of an audience.
 */

export const FamilyVaultProvider = ({ children }: { children: ReactNode }) => {
  const [acceptedRecordIds, setAccepted] = useState<string[]>([]);
  const [checkingRecordId, setCheckingRecordId] = useState<string | null>(null);
  const [memory, setMemory] = useState<MemoryEntry[]>(MEMORY);
  const [requestOpened, setRequestOpened] = useState(false);
  const [selectedItemIds, setSelected] = useState<string[]>(defaultSelected);
  const [duration, setDuration] = useState(SCHOOL_REQUEST.defaultDuration);
  const [approval, setApproval] = useState<ApprovalStage>('pending');
  const [clinicChoice, setClinicChoice] = useState<'answer' | 'full' | null>(null);
  const [appItemIds, setAppItems] = useState<string[]>(defaultAppItems);
  const [appGranted, setAppGranted] = useState(false);
  const [revokedIds, setRevoked] = useState<string[]>([]);
  const [invitedCircle, setInvited] = useState<CircleInvite[]>([]);
  const [circleRemovedIds, setCircleRemoved] = useState<string[]>([]);

  const inviteToCircle = useCallback(
    (invite: CircleInvite) =>
      setInvited((prev) => (prev.some((i) => i.id === invite.id) ? prev : [...prev, invite])),
    []
  );
  const removeFromCircle = useCallback(
    (id: string) => setCircleRemoved((prev) => (prev.includes(id) ? prev : [...prev, id])),
    []
  );
  const [assistantAsked, setAssistantAsked] = useState(false);
  const [assistantShared, setAssistantShared] = useState(false);
  const [inferenceDropped, setInferenceDropped] = useState(false);
  const [inferenceCorrection, setInferenceCorrection] = useState<string | null>(null);

  const toggleAppItem = useCallback((id: string) => {
    setAppItems((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  }, []);
  const grantApp = useCallback(() => setAppGranted(true), []);
  const revokeAccess = useCallback(
    (id: string) => setRevoked((prev) => (prev.includes(id) ? prev : [...prev, id])),
    []
  );
  const askAssistant = useCallback(() => setAssistantAsked(true), []);
  const shareAssistantDraft = useCallback(() => setAssistantShared(true), []);
  const dropInference = useCallback(() => setInferenceDropped(true), []);
  const correctInference = useCallback((text: string) => setInferenceCorrection(text), []);

  const acceptRecord = useCallback((id: string) => {
    setAccepted((prev) => (prev.includes(id) ? prev : [...prev, id]));
  }, []);

  const correctMemory = useCallback((id: string, text: string) => {
    setMemory((prev) =>
      prev.map((m) =>
        m.id === id
          ? { ...m, text, declared: true, source: 'Corrected by the family', on: 'Today', confidence: undefined }
          : m
      )
    );
  }, []);

  const removeMemory = useCallback((id: string) => {
    setMemory((prev) => prev.filter((m) => m.id !== id));
  }, []);

  const addMemory = useCallback((category: MemoryCategory, about: PersonId, text: string) => {
    setMemory((prev) => [
      {
        id: `mem-new-${Date.now()}`,
        about,
        category,
        text,
        declared: true,
        source: 'Said by Maria',
        on: 'Today',
      },
      ...prev,
    ]);
  }, []);

  const openRequest = useCallback(() => setRequestOpened(true), []);

  const toggleItem = useCallback((id: string) => {
    setSelected((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  }, []);

  const advanceApproval = useCallback(() => {
    setApproval((prev) => (prev === 'pending' ? 'parent' : 'complete'));
  }, []);

  const reset = useCallback(() => {
    setAccepted([]);
    setCheckingRecordId(null);
    setMemory(MEMORY);
    setRequestOpened(false);
    setSelected(defaultSelected);
    setDuration(SCHOOL_REQUEST.defaultDuration);
    setApproval('pending');
    setClinicChoice(null);
    setAppItems(defaultAppItems);
    setAppGranted(false);
    setRevoked([]);
    setInvited([]);
    setCircleRemoved([]);
    setAssistantAsked(false);
    setAssistantShared(false);
    setInferenceDropped(false);
    setInferenceCorrection(null);
  }, []);

  const value = useMemo(
    () => ({
      acceptedRecordIds,
      acceptRecord,
      checkingRecordId,
      setCheckingRecordId,
      memory,
      correctMemory,
      removeMemory,
      addMemory,
      requestOpened,
      openRequest,
      selectedItemIds,
      toggleItem,
      duration,
      setDuration,
      approval,
      advanceApproval,
      clinicChoice,
      setClinicChoice,
      appItemIds,
      toggleAppItem,
      appGranted,
      grantApp,
      revokedIds,
      revokeAccess,
      invitedCircle,
      inviteToCircle,
      circleRemovedIds,
      removeFromCircle,
      assistantAsked,
      askAssistant,
      assistantShared,
      shareAssistantDraft,
      inferenceDropped,
      dropInference,
      inferenceCorrection,
      correctInference,
      reset,
    }),
    [
      acceptedRecordIds,
      acceptRecord,
      checkingRecordId,
      memory,
      correctMemory,
      removeMemory,
      addMemory,
      requestOpened,
      openRequest,
      selectedItemIds,
      toggleItem,
      duration,
      approval,
      advanceApproval,
      clinicChoice,
      appItemIds,
      toggleAppItem,
      appGranted,
      grantApp,
      revokedIds,
      revokeAccess,
      invitedCircle,
      inviteToCircle,
      circleRemovedIds,
      removeFromCircle,
      assistantAsked,
      askAssistant,
      assistantShared,
      shareAssistantDraft,
      inferenceDropped,
      dropInference,
      inferenceCorrection,
      correctInference,
      reset,
    ]
  );

  return <FamilyVaultContext.Provider value={value}>{children}</FamilyVaultContext.Provider>;
};
