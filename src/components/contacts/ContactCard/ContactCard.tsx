import {forwardRef, useState, useEffect} from 'react';
import {Card, CardContent, useTheme} from '@mui/material';
import type {Contact} from '@/types/contact';
import {ContactCardDetailed} from './ContactCardDetailed';
import {useNextGraphAuth, useResource, useSubject} from '@/lib/nextgraph';
import {isNextGraphEnabled} from "@/utils/featureFlags";
import {SocialContactShapeType} from "@/.ldo/contact.shapeTypes";
import {SocialContact} from "@/.ldo/contact.typings";
import {NextGraphAuth} from "@/types/nextgraph";
import type {UseContactDragDropReturn} from '@/hooks/contacts/useContactDragDrop';
import {dataService} from '@/services/dataService';
import {iconFilter} from "@/hooks/contacts/useContacts";


export interface ContactCardProps {
  contacts: Contact[];
  nuri: string;
  isSelectionMode: boolean;
  isManualMergeMode: boolean;
  isMultiSelectMode: boolean;
  isSelected: boolean;
  onContactClick: (contactId: string) => void;
  onSelectContact: (contactId: string) => void;
  dragDrop?: UseContactDragDropReturn;
  onSetIconFilter: (key: iconFilter, value: string) => void;
}

export const ContactCard = forwardRef<HTMLDivElement, ContactCardProps>(
  ({
     contacts,
     nuri,
     isSelectionMode,
     isManualMergeMode,
     onContactClick,
     dragDrop,
     onSetIconFilter
   }, ref) => {
    const isNextGraph = isNextGraphEnabled();
    const nextGraphAuth = useNextGraphAuth() || {} as NextGraphAuth;
    const {session} = nextGraphAuth;
    const sessionId = session?.sessionId;
    const theme = useTheme();

    const [contact, setContact] = useState<Contact>({} as Contact);

    useResource(sessionId && nuri, {subscribe: true});
    const socialContact: SocialContact | undefined = useSubject(SocialContactShapeType, sessionId && nuri.substring(0, 53));

    useEffect(() => {
      if (!isNextGraph) {
        const fetchContact = async () => {
          try {
            const contactData = await dataService.getContact(nuri);
            if (contactData) {
              setContact(contactData);
            }
          } catch (error) {
            console.error('Failed to fetch contact by ID:', error);
          }
        };
        fetchContact();
      } else {
        if (socialContact) {
          setContact(socialContact);
        }
      }
    }, [isNextGraph, nuri, socialContact, contacts]);

    const getContactOpacity = (planetStatus?: string) => {
      switch (planetStatus) {
        case 'member':
          return 1.0; // 100% opacity for joined PLANET members
        case 'invited':
          return 0.7; // 70% opacity (30% transparency) for invited users
        case 'not_invited':
        default:
          return 0.5; // 50% opacity (50% transparency) for not yet invited
      }
    };


    return (
      <Card
        ref={ref}
        draggable={dragDrop && isSelectionMode && !isManualMergeMode}
        onDragStart={(e) => dragDrop?.handleDragStart(e, nuri)}
        onDragEnd={dragDrop?.handleDragEnd}
        onClick={() => onContactClick(contact['@id'] || '')}
        sx={{
          cursor: (isSelectionMode || isManualMergeMode) ? 'default' : 'pointer',
          transition: 'all 0.2s ease-in-out',
          border: 1,
          borderColor: 'divider',
          '&:hover': (!isSelectionMode && !isManualMergeMode) ? {
            borderColor: 'primary.main',
            boxShadow: theme.shadows[2],
            transform: 'translateY(-1px)',
          } : {},
          position: 'relative',
          width: '100%',
          opacity: getContactOpacity(contact.planetStatus?.value),
        }}
      >
        <CardContent sx={{
          p: {xs: '8px 16px', md: 0.5},
          '&:last-child': {
            pb: 0.5
          }
        }}>
          <ContactCardDetailed
            contact={contact}
            getPlanetStatusIcon={() => null}
            onSetIconFilter={onSetIconFilter}
          />
        </CardContent>
      </Card>
    );
  }
);

ContactCard.displayName = 'ContactCard';