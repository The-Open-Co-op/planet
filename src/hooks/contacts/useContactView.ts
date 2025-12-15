import { dataService } from '@/services/dataService';
import type { Contact } from '@/types/contact';
import type { Group } from '@/types/group';
import type { RCardType, RCardAssignment } from '@/types/rcard';
import { useNextGraphAuth, useResource, useSubject } from '@/lib/nextgraph';
import { isNextGraphEnabled } from '@/utils/featureFlags';
import { SocialContactShapeType } from '@/.ldo/contact.shapeTypes';
import { SocialContact } from '@/.ldo/contact.typings';
import { NextGraphAuth } from '@/types/nextgraph';
import { useEffect, useState, useCallback } from 'react';

const useContactData = (nuri: string | null) => {
  const [contact, setContact] = useState<Contact | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const isNextGraph = isNextGraphEnabled();
  const nextGraphAuth = useNextGraphAuth() || {} as NextGraphAuth;
  const { session } = nextGraphAuth;
  const sessionId = session?.sessionId;

  // NextGraph subscription
  useResource(sessionId && nuri ? nuri : undefined, { subscribe: true });
  const socialContact: SocialContact | undefined = useSubject(
    SocialContactShapeType,
    sessionId && nuri ? nuri.substring(0, 53) : undefined
  );

  useEffect(() => {
    if (!nuri) {
      setContact(undefined);
      setIsLoading(false);
      return;
    }

    if (!isNextGraph) {
      // Mock data loading
      const fetchContact = async () => {
        setIsLoading(true);
        setError(null);
        try {
          const contactData = await dataService.getContact(nuri);
          setContact(contactData);
        } catch (err) {
          setError(err instanceof Error ? err.message : 'Failed to load contact');
        } finally {
          setIsLoading(false);
        }
      };
      fetchContact();
    } else {
      if (socialContact) {
        setContact(socialContact as Contact);
        setIsLoading(false);
        setError(null);
      }
    }
  }, [nuri, isNextGraph, socialContact, sessionId, refreshTrigger]);

  const refreshContact = useCallback(() => {
    setRefreshTrigger(prev => prev + 1);
  }, []);

  return { contact, isLoading, error, setContact, refreshContact };
};

export const useContactView = (id: string | null) => {
  const [contactGroups, setContactGroups] = useState<Group[]>([]);
  const [humanityDialogOpen, setHumanityDialogOpen] = useState(false);
  const [groupsError, setGroupsError] = useState<string | null>(null);

  const { contact, isLoading: contactLoading, error: contactError, setContact, refreshContact } = useContactData(id);

  // Load and filter groups when contact changes
  useEffect(() => {
    const loadGroups = async () => {
      if (!contact) {
        setContactGroups([]);
        return;
      }

      setGroupsError(null);

      try {
        const allGroups = await dataService.getGroups();

        // Filter groups that the contact belongs to
        const contactGroupsData = contact.internalGroup;
        const contactGroupIds = contactGroupsData ? Array.from(contactGroupsData).map(group => group.value) : [];
        const userGroups = allGroups.filter(group =>
          contactGroupIds.includes(group.id)
        );
        setContactGroups(userGroups);
      } catch (err) {
        console.error('Failed to load groups:', err);
        setGroupsError('Failed to load groups');
      }
    };

    loadGroups();
  }, [contact]);

  const toggleHumanityVerification = useCallback(async () => {
    if (!contact) return;

    const newScore = contact.humanityConfidenceScore === 5 ? 3 : 5;

    try {
      // Update locally immediately for responsiveness
      const updatedContact = {
        ...contact,
        humanityConfidenceScore: newScore,
        updatedAt: {
          '@id': `updated-at-${contact['@id']}`,
          valueDateTime: new Date().toISOString()
        }
      };

      setContact(updatedContact);

      // In a real app, this would make an API call
      await dataService.updateContact(contact['@id'] || '', {
        humanityConfidenceScore: newScore
      });
    } catch (error) {
      console.error('Failed to update humanity score:', error);
      // Revert on error - restore original contact
      setContact(contact);
    }
  }, [contact, setContact]);

  const inviteToPLANET = useCallback(async () => {
    if (!contact) return;

    try {
      // Update locally immediately
      const updatedContact = {
        ...contact,
        planetStatus: {
          '@id': `nao-status-${contact['@id']}`,
          value: 'invited' as const
        },
        updatedAt: {
          '@id': `updated-at-${contact['@id']}`,
          valueDateTime: new Date().toISOString()
        }
      };

      setContact(updatedContact);

      // In a real app, this would make an API call
      await dataService.updateContact(contact['@id'] || '', {
        planetStatus: {
          '@id': `nao-status-${contact['@id']}`,
          value: 'invited'
        }
      });
    } catch (error) {
      console.error('Failed to invite to PLANET:', error);
      // Revert on error
      setContact(contact);
    }
  }, [contact, setContact]);

  const assignRCard = useCallback(async (cardType: RCardType) => {
    if (!contact) return;

    try {
      // Create new assignment
      const newAssignment: RCardAssignment = {
        cardType,
        assignedAt: new Date(),
        assignedBy: 'current-user' // In a real app, this would be the current user's ID
      };

      // Update locally immediately
      const currentAssignments = contact.rCardAssignments || [];
      const updatedAssignments = currentAssignments.filter(a => a.cardType !== cardType);
      updatedAssignments.push(newAssignment);

      const updatedContact = {
        ...contact,
        rCardAssignments: updatedAssignments,
        updatedAt: {
          '@id': `updated-at-${contact['@id']}`,
          valueDateTime: new Date().toISOString()
        }
      };

      setContact(updatedContact);

      // In a real app, this would make an API call
      await dataService.updateContact(contact['@id'] || '', {
        rCardAssignments: updatedAssignments
      });

      console.log(`✅ Assigned ${cardType} Trust Profile to ${contact['@id']}`);
    } catch (error) {
      console.error('Failed to assign Trust Profile:', error);
      // Revert on error
      setContact(contact);
    }
  }, [contact, setContact]);

  const removeRCard = useCallback(async (cardType: RCardType) => {
    if (!contact) {
      console.log('❌ No contact available for removing Trust Profile');
      return;
    }

    console.log(`🗑️ Attempting to remove ${cardType} Trust Profile from ${contact['@id']}`);
    console.log('Current assignments:', contact.rCardAssignments);

    try {
      // Update locally immediately
      const currentAssignments = contact.rCardAssignments || [];
      const updatedAssignments = currentAssignments.filter(a => a.cardType !== cardType);

      console.log('Updated assignments after filtering:', updatedAssignments);

      const updatedContact = {
        ...contact,
        rCardAssignments: updatedAssignments,
        updatedAt: {
          '@id': `updated-at-${contact['@id']}`,
          valueDateTime: new Date().toISOString()
        }
      };

      setContact(updatedContact);

      // In a real app, this would make an API call
      await dataService.updateContact(contact['@id'] || '', {
        rCardAssignments: updatedAssignments
      });

      console.log(`✅ Removed ${cardType} Trust Profile from ${contact['@id']}`);
    } catch (error) {
      console.error('Failed to remove Trust Profile:', error);
      // Revert on error
      setContact(contact);
    }
  }, [contact, setContact]);

  return {
    // Data
    contact,
    contactGroups,

    // Loading states
    isLoading: contactLoading,

    // Errors
    error: contactError || groupsError,

    // UI state
    humanityDialogOpen,
    setHumanityDialogOpen,

    // Actions
    toggleHumanityVerification,
    inviteToPLANET,
    refreshContact,
    assignRCard,
    removeRCard
  };
};