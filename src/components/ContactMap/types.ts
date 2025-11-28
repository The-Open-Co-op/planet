import type { Contact } from '@/types/contact';

export interface ContactMapProps {
  contacts: Contact[];
  onContactClick?: (contact: Contact) => void;
}

export interface MapControllerProps {
  contacts: Contact[];
}

export interface ContactMarkerProps {
  contact: Contact;
  onContactClick?: (contact: Contact) => void;
}

export interface ContactPopupProps {
  contact: Contact;
  onContactClick?: (contact: Contact) => void;
}