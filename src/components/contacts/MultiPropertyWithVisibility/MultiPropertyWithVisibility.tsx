import {useState, useCallback, useEffect} from 'react';
import {
  Typography,
  Box,
} from '@mui/material';
import type {Contact} from '@/types/contact';
import type {SocialContact} from '@/.ldo/contact.typings';
import {ContactKeysWithHidden, setUpdatedTime} from '@/utils/contactUtils';
import {getVisibleItems} from '@/utils/contactUtils';
import {dataset, useLdo} from "@/lib/nextgraph";
import {isNextGraphEnabled} from "@/utils/featureFlags";
import {ChipsVariant, AccountsVariant, PhoneVariant, EmailVariant} from './variants';
import {ValidationType} from "@/hooks/useFieldValidation";

type ResolvableKey = ContactKeysWithHidden;

interface MultiPropertyWithVisibilityProps<K extends ResolvableKey> {
  label?: string;
  icon?: React.ReactNode;
  contact?: Contact;
  propertyKey: K;
  subKey?: string;
  hideLabel?: boolean;
  hideIcon?: boolean;
  showManageButton?: boolean;
  isEditing?: boolean;
  placeholder?: string;
  variant?: "chips" | "accounts" | "phone" | "email";
  validateType?: ValidationType;
}

export const MultiPropertyWithVisibility = <K extends ResolvableKey>({
                                                                       label,
                                                                       contact,
                                                                       propertyKey,
                                                                       subKey = 'value',
                                                                       hideLabel = false,
                                                                       showManageButton = true,
                                                                       isEditing = false,
                                                                       variant = "chips",
                                                                       placeholder,
                                                                       validateType = "text"
                                                                     }: MultiPropertyWithVisibilityProps<K>) => {
  const [editingValues, setEditingValues] = useState<Record<string, string>>({});
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [newItemValue, setNewItemValue] = useState('');

  const {commitData, changeData} = useLdo();

  const isNextgraph = isNextGraphEnabled() && !contact?.isDraft;

  const [allItems, setAllItems] = useState<any[]>([]);

  const loadAllItems = useCallback(() => {
    const items = contact && contact[propertyKey]
      ? contact[propertyKey]?.toArray().filter(el => el["@id"])
      : [];
    setAllItems(items);
  }, [contact, propertyKey])

  useEffect(() => {
    loadAllItems();
  }, [loadAllItems]);


  const persistFieldChange = useCallback((itemId: string, newValue: string) => {
    if (!contact) return;

    const editPropertyWithUserSource = (contactObj: Contact, addId?: boolean) => {
      const fieldSet = contactObj[propertyKey];
      if (!fieldSet) return;

      let targetItem = fieldSet.toArray().find((item: any) => item["@id"] === itemId);
      for (const item of fieldSet) {
        if (item["@id"] === itemId) {
          targetItem = item;
          break;
        }
      }

      if (targetItem) {
        if (targetItem.source === "user") {
          // @ts-expect-error TODO: narrow later
          targetItem[subKey] = newValue;
        } else {
          // Create copy with user source for non-user sources
          const newEntry = {
            [subKey]: newValue,
            source: "user",
            hidden: false
          };
          if (addId) {
            newEntry["@id"] = Math.random().toExponential(32);
          }
          // @ts-expect-error TODO: we will need more field types handlers later
          fieldSet.add(newEntry);
        }
      }

      setUpdatedTime(contactObj);

      return contactObj;
    };

    if (isNextgraph) {
      const resource = dataset.getResource(contact["@id"]!);
      if (!resource.isError && resource.type !== "InvalidIdentifierResouce") {
        const changedContactObj = changeData(contact, resource);
        editPropertyWithUserSource(changedContactObj);
        commitData(changedContactObj);
      }
    } else {
      editPropertyWithUserSource(contact, true);
    }
  }, [changeData, commitData, contact, isNextgraph, propertyKey, subKey]);

  const addNewItem = useCallback((updates?: Record<K, any>) => {
    if (!contact || !newItemValue.trim()) return;

    const addNewPropertyWithUserSource = (contactObj: Contact, addId?: boolean) => {
      const fieldSet = contactObj[propertyKey];
      if (!fieldSet) return;

      const newEntry = {
        [subKey]: newItemValue.trim(),
        source: "user",
        hidden: false,
        ...updates
      };

      if (addId) {
        // @ts-expect-error whatever
        newEntry["@id"] = Math.random().toExponential(32);
      }
      // @ts-expect-error TODO: we will need more field types handlers later
      fieldSet.add(newEntry);

      setUpdatedTime(contactObj);

      return contactObj;
    };

    if (isNextgraph) {
      const resource = dataset.getResource(contact["@id"]!);
      if (!resource.isError && resource.type !== "InvalidIdentifierResouce") {
        const changedContactObj = changeData(contact, resource);
        addNewPropertyWithUserSource(changedContactObj);
        commitData(changedContactObj);
      }
    } else {
      addNewPropertyWithUserSource(contact, true);
    }

    setNewItemValue('');
    setIsAddingNew(false);
    loadAllItems();
  }, [changeData, commitData, contact, isNextgraph, newItemValue, propertyKey, subKey, loadAllItems]);

  const removeItem = useCallback((itemId: string) => {
    if (!contact) return;

    const removePropertyItem = (contactObj: Contact) => {
      const fieldSet = contactObj[propertyKey];
      if (!fieldSet) return;

      // Find and remove the item
      const itemsArray = fieldSet.toArray();
      const itemToRemove = itemsArray.find(item => item["@id"] === itemId);
      
      if (itemToRemove) {
        fieldSet.delete(itemToRemove as any);
        setUpdatedTime(contactObj);
      }

      return contactObj;
    };

    if (isNextgraph) {
      const resource = dataset.getResource(contact["@id"]!);
      if (!resource.isError && resource.type !== "InvalidIdentifierResouce") {
        const changedContactObj = changeData(contact, resource);
        removePropertyItem(changedContactObj);
        commitData(changedContactObj);
      }
    } else {
      removePropertyItem(contact);
    }

    loadAllItems();
  }, [changeData, commitData, contact, isNextgraph, propertyKey, loadAllItems]);

  const persistTypeChange = useCallback((itemId: string, typeField: string, newTypeValue: string) => {
    if (!contact) return;

    const updateTypeWithUserSource = (contactObj: Contact) => {
      const fieldSet = contactObj[propertyKey];
      if (!fieldSet) return;

      let targetItem = null;
      for (const item of fieldSet) {
        if (item["@id"] === itemId) {
          targetItem = item;
          break;
        }
      }

      if (targetItem) {
        // @ts-expect-error TODO: narrow later
        targetItem[typeField] = newTypeValue;
        // If it wasn't a user source, mark it as user source since they're editing it
        if (targetItem.source !== "user") {
          targetItem.source = "user";
        }
      }

      setUpdatedTime(contactObj);
      return contactObj;
    };

    if (isNextgraph) {
      const resource = dataset.getResource(contact["@id"]!);
      if (!resource.isError && resource.type !== "InvalidIdentifierResouce") {
        const changedContactObj = changeData(contact, resource);
        updateTypeWithUserSource(changedContactObj);
        commitData(changedContactObj);
      }
    } else {
      updateTypeWithUserSource(contact);
    }

    loadAllItems();
  }, [changeData, commitData, contact, isNextgraph, propertyKey, loadAllItems]);

  const handleInputChange = useCallback((itemId: string, newValue: string) => {
    setEditingValues(prev => ({...prev, [itemId]: newValue}));
  }, []);

  const handleBlur = useCallback((itemId: string) => {
    const newValue = editingValues[itemId];
    if (newValue !== undefined) {
      // Find the original item to compare values
      const originalItem = allItems.find(item => item["@id"] === itemId);
      const originalValue = originalItem ? (originalItem[subKey] || '') : '';

      // Only persist if the value actually changed
      if (newValue !== originalValue) {
        persistFieldChange(itemId, newValue);
      }

      setEditingValues(prev => {
        const updated = {...prev};
        delete updated[itemId];
        return updated;
      });
    }
    
    // Also check for type changes (phoneType, emailType)
    const phoneTypeKey = `${itemId}_phoneType`;
    const emailTypeKey = `${itemId}_emailType`;
    
    if (editingValues[phoneTypeKey] !== undefined) {
      const originalItem = allItems.find(item => item["@id"] === itemId);
      const originalType = originalItem ? (originalItem.phoneType || 'mobile') : 'mobile';
      
      if (editingValues[phoneTypeKey] !== originalType) {
        persistTypeChange(itemId, 'phoneType', editingValues[phoneTypeKey]);
      }
      
      setEditingValues(prev => {
        const updated = {...prev};
        delete updated[phoneTypeKey];
        return updated;
      });
    }
    
    if (editingValues[emailTypeKey] !== undefined) {
      const originalItem = allItems.find(item => item["@id"] === itemId);
      const originalType = originalItem ? (originalItem.emailType || 'personal') : 'personal';
      
      if (editingValues[emailTypeKey] !== originalType) {
        persistTypeChange(itemId, 'emailType', editingValues[emailTypeKey]);
      }
      
      setEditingValues(prev => {
        const updated = {...prev};
        delete updated[emailTypeKey];
        return updated;
      });
    }
  }, [editingValues, persistFieldChange, persistTypeChange, allItems, subKey]);

  useEffect(() => {
    if (isEditing && contact) {
      const initialValues: Record<string, string> = {};
      allItems.forEach(item => {
        if (item["@id"]) {
          initialValues[item["@id"]] = item[subKey] || '';
        }
      });
      setEditingValues(initialValues);
    }
  }, [isEditing, contact, allItems, subKey]);

  // Handle page navigation/unload to persist any unsaved changes
  useEffect(() => {
    const handleBeforeUnload = () => {
      if (isEditing && Object.keys(editingValues).length > 0) {
        Object.entries(editingValues).forEach(([itemId, value]) => {
          persistFieldChange(itemId, value);
        });
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [editingValues, isEditing, persistFieldChange]);

  if (!contact) {
    return null;
  }

  const visibleItems = getVisibleItems(contact as SocialContact, propertyKey);

  if (visibleItems.length === 0 && !showManageButton && !isEditing) return null;


  const renderVariant = () => {
    const commonProps = {
      visibleItems,
      isEditing,
      editingValues,
      isAddingNew,
      newItemValue,
      placeholder,
      label,
      subKey,
      propertyKey,
      onInputChange: handleInputChange,
      onBlur: handleBlur,
      onAddNewItem: addNewItem,
      onNewItemValueChange: setNewItemValue,
      setIsAddingNew,
      setNewItemValue,
      onRemoveItem: removeItem,
      contact,
      validateType,
      onRefresh: loadAllItems
    };

    switch (variant) {
      case "chips":
        return <ChipsVariant {...commonProps} />;
      case "accounts":
        return <AccountsVariant {...commonProps} />;
      case "phone":
        return <PhoneVariant {...commonProps} />;
      case "email":
        return <EmailVariant {...commonProps} />;
      default:
        return <ChipsVariant {...commonProps} />;
    }
  };

  if (!isEditing && visibleItems.length === 0) return null;

  return (
    <Box sx={{mb: 3, pb: 2, borderBottom: '1px solid rgba(0, 0, 0, 0.08)'}}>
      {!hideLabel && label && (
        <Typography variant="caption" color="text.secondary" sx={{fontWeight: 600, mb: 1, display: 'block', textTransform: 'uppercase', fontSize: '0.7rem'}}>
          {label}
        </Typography>
      )}
      
      <Box sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 1,
        alignItems: 'flex-start'
      }}>
        {renderVariant()}
      </Box>
    </Box>
  );
};