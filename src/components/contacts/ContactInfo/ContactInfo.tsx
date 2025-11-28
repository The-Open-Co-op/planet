import {forwardRef} from 'react';
import {
  Typography,
  Card,
  CardContent
} from '@mui/material';
import {
  Email,
  Phone,
  Business,
  AccountBox,
} from '@mui/icons-material';
import type {Contact} from '@/types/contact';
import {MultiPropertyWithVisibility} from '../MultiPropertyWithVisibility';
import {PropertyWithSources} from "@/components/contacts/PropertyWithSources";

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
          />

          <MultiPropertyWithVisibility
            label="Phone"
            contact={contact}
            propertyKey="phoneNumber"
            isEditing={isEditing}
            placeholder={"Phone number"}
            validateType={"phone"}
          />

          <MultiPropertyWithVisibility
            contact={contact}
            propertyKey="account"
            isEditing={isEditing}
            placeholder={"Account"}
            variant={"accounts"}
            hideLabel={true}
          />
      </div>
    );
  }
);

ContactInfo.displayName = 'ContactInfo';