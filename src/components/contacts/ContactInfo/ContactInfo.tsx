import {forwardRef} from 'react';
import type {Contact} from '@/types/contact';
import {MultiPropertyWithVisibility} from '../MultiPropertyWithVisibility';

export interface ContactInfoProps {
  contact: Contact | null;
  isEditing?: boolean;
}

export const ContactInfo = forwardRef<HTMLDivElement, ContactInfoProps>(
  ({contact, isEditing}, ref) => {
    if (!contact) return null;

    //const linkedin = getPropByType(contact, 'url', "linkedIn");

    return (
      <div ref={ref}>
          <MultiPropertyWithVisibility
            label="Email"
            contact={contact}
            propertyKey="email"
            isEditing={isEditing}
            placeholder={"Email"}
            validateType={"email"}
            variant={"email"}
          />

          <MultiPropertyWithVisibility
            label="Phone"
            contact={contact}
            propertyKey="phoneNumber"
            isEditing={isEditing}
            placeholder={"Phone number"}
            validateType={"phone"}
            variant={"phone"}
          />

          <MultiPropertyWithVisibility
            label="Accounts"
            contact={contact}
            propertyKey="account"
            isEditing={isEditing}
            placeholder={"Account"}
            variant={"accounts"}
            hideLabel={!isEditing}
          />
      </div>
    );
  }
);

ContactInfo.displayName = 'ContactInfo';