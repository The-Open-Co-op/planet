import { useState, useEffect } from 'react';
import { dataService } from '@/services/dataService';
import { resolveFrom } from '@/utils/contactUtils';
import type { SocialContact } from '@/.ldo/contact.typings';

interface ResolvedContact {
  name: string;
  avatar?: string;
  isLoading: boolean;
  isResolved: boolean;
}

/**
 * Hook to resolve contact information from contact ID
 * Falls back to provided fallback values if contact not found
 */
export const useContactResolver = (
  contactId?: string, 
  fallbackName?: string,
  fallbackAvatar?: string
): ResolvedContact => {
  const [resolvedContact, setResolvedContact] = useState<ResolvedContact>({
    name: fallbackName || 'Unknown',
    avatar: fallbackAvatar,
    isLoading: !!contactId,
    isResolved: false,
  });

  useEffect(() => {
    let isCancelled = false;

    const resolveContact = async () => {
      if (!contactId) {
        setResolvedContact({
          name: fallbackName || 'Unknown',
          avatar: fallbackAvatar,
          isLoading: false,
          isResolved: false,
        });
        return;
      }

      try {
        setResolvedContact(prev => ({ ...prev, isLoading: true }));
        
        const contact = await dataService.getContact(contactId);
        
        if (isCancelled) return;

        if (contact) {
          const socialContact = contact as SocialContact;
          const resolvedName = resolveFrom(socialContact, 'name');
          const resolvedAvatar = resolveFrom(socialContact, 'photo');

          setResolvedContact({
            name: resolvedName?.value || fallbackName || 'Unknown',
            avatar: resolvedAvatar?.value || fallbackAvatar,
            isLoading: false,
            isResolved: true,
          });
        } else {
          // Contact not found, use fallback
          setResolvedContact({
            name: fallbackName || 'Unknown',
            avatar: fallbackAvatar,
            isLoading: false,
            isResolved: false,
          });
        }
      } catch (error) {
        if (isCancelled) return;
        
        console.warn('Failed to resolve contact:', contactId, error);
        
        // Use fallback on error
        setResolvedContact({
          name: fallbackName || 'Unknown',
          avatar: fallbackAvatar,
          isLoading: false,
          isResolved: false,
        });
      }
    };

    resolveContact();

    return () => {
      isCancelled = true;
    };
  }, [contactId, fallbackName, fallbackAvatar]);

  return resolvedContact;
};