import { useEffect, useState } from 'react';
import { dataService } from '@/services/dataService';
import type { Contact } from '@/types/contact';
import type { SocialContact } from '@/.ldo/contact.typings';
import { resolveFrom } from '@/utils/contactUtils';

/** Some mock contacts only carry a name under a source resolveFrom doesn't prefer. */
export const contactName = (c: Contact) => {
  const resolved = resolveFrom(c as unknown as SocialContact, 'name')?.value;
  if (resolved) return resolved;
  const first = [...((c.name as unknown as Iterable<{ value?: string }>) ?? [])][0];
  return first?.value || 'Unknown';
};

export const contactInitials = (c: Contact) =>
  contactName(c)
    .split(' ')
    .map((w) => w[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

/** The demo's contact list, named and sorted. */
export const useContacts = () => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  useEffect(() => {
    dataService.getContacts().then((data) => {
      setContacts(
        data
          .filter((c) => !c.isMe && (c['@id'] || '') !== 'me' && contactName(c) !== 'Unknown')
          .sort((a, b) => contactName(a).localeCompare(contactName(b)))
      );
    });
  }, []);
  return contacts;
};
