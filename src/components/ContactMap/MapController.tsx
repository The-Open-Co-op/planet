import { useEffect } from 'react';
import { useMap } from 'react-leaflet';
import L from 'leaflet';
import { DEFAULT_CENTER, DEFAULT_ZOOM } from './mapUtils';
import type { MapControllerProps } from './types';
import { resolveFrom } from '@/utils/contactUtils';

export const MapController = ({ contacts }: MapControllerProps) => {
  const map = useMap();
  const contactsWithLocation = contacts.filter((contact) => {
    const address = resolveFrom(contact, 'address');
    return address?.coordLat && address?.coordLng;
  });

  useEffect(() => {
    if (contactsWithLocation.length === 0) {
      map.setView(DEFAULT_CENTER, DEFAULT_ZOOM);
      return;
    }

    if (contactsWithLocation.length === 1) {
      const contact = contactsWithLocation[0];
      const address = resolveFrom(contact, 'address');
      if (address?.coordLat && address?.coordLng) {
        map.setView(
          [address.coordLat, address.coordLng],
          10
        );
      }
      return;
    }

    const validContacts = contactsWithLocation.filter((contact) => {
      const address = resolveFrom(contact, 'address');
      return address?.coordLat !== undefined && address?.coordLng !== undefined;
    });
    
    const bounds = L.latLngBounds(
      validContacts.map((contact) => {
        const address = resolveFrom(contact, 'address');
        return [address!.coordLat!, address!.coordLng!];
      })
    );
    map.fitBounds(bounds, { padding: [20, 20] });
  }, [map, contactsWithLocation]);

  return null;
};