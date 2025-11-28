import { Marker, Popup } from 'react-leaflet';
import { createCustomIcon } from './mapUtils';
import { ContactPopup } from './ContactPopup';
import type { ContactMarkerProps } from './types';
import { resolveFrom } from '@/utils/contactUtils';

export const ContactMarker = ({ contact, onContactClick }: ContactMarkerProps) => {
  const address = resolveFrom(contact, 'address');
  if (!address?.coordLat || !address?.coordLng) return null;

  return (
    <Marker
      key={contact['@id']}
      position={[
        address.coordLat,
        address.coordLng,
      ]}
      icon={createCustomIcon(contact)}
    >
      <Popup>
        <ContactPopup contact={contact} onContactClick={onContactClick} />
      </Popup>
    </Marker>
  );
};