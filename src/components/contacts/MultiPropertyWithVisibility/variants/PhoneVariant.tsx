import {
  Typography,
  Box,
  Button,
  Select,
  MenuItem,
  FormControl,
  IconButton,
} from '@mui/material';
import {Add, Delete, Phone, Smartphone, Work, Home} from '@mui/icons-material';
import {useCallback, useState} from 'react';
import type {Contact} from "@/types/contact";
import {ContactKeysWithHidden, setUpdatedTime} from "@/utils/contactUtils";
import {dataset, useLdo} from "@/lib/nextgraph";
import {isNextGraphEnabled} from "@/utils/featureFlags";
import {MultiPropertyItem} from "@/components/contacts/MultiPropertyWithVisibility/MultiPropertyItem.tsx";

type ResolvableKey = ContactKeysWithHidden;

interface PhoneVariantProps<K extends ResolvableKey> {
  visibleItems: any[];
  isEditing: boolean;
  editingValues: Record<string, string>;
  isAddingNew: boolean;
  newItemValue: string;
  placeholder?: string;
  label?: string;
  subKey: string;
  propertyKey: K;
  onInputChange: (itemId: string, value: string) => void;
  onBlur: (itemId: string) => void;
  onAddNewItem: (updates?: Record<any, any>) => void;
  onNewItemValueChange: (value: string) => void;
  setIsAddingNew: (adding: boolean) => void;
  setNewItemValue: (value: string) => void;
  onRemoveItem?: (itemId: string) => void;
  contact?: Contact;
}

const phoneTypes = [
  { value: 'mobile', label: 'Mobile', icon: <Smartphone fontSize="small"/> },
  { value: 'work', label: 'Work', icon: <Work fontSize="small"/> },
  { value: 'home', label: 'Home', icon: <Home fontSize="small"/> },
  { value: 'other', label: 'Other', icon: <Phone fontSize="small"/> }
];

interface PhoneVariantPropsWithRefresh<K extends ResolvableKey> extends PhoneVariantProps<K> {
  onRefresh?: () => void;
}

export const PhoneVariant = <K extends ResolvableKey>({
  visibleItems,
  isEditing,
  editingValues,
  isAddingNew,
  newItemValue,
  placeholder,
  label,
  subKey,
  propertyKey,
  onInputChange,
  onBlur,
  onAddNewItem,
  onNewItemValueChange,
  setIsAddingNew,
  setNewItemValue,
  onRemoveItem,
  contact,
  onRefresh
}: PhoneVariantPropsWithRefresh<K>) => {
  const [newItemType, setNewItemType] = useState('mobile');
  
  // Move hooks to top level
  const {commitData, changeData} = useLdo();
  const isNextgraph = isNextGraphEnabled();

  const handleTypeChange = useCallback((itemId: string, phoneType: string) => {
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
        targetItem.phoneType = phoneType;
        // If it wasn't a user source, mark it as user source since they're editing it
        if (targetItem.source !== "user") {
          targetItem.source = "user";
        }
      }

      setUpdatedTime(contactObj);
      return contactObj;
    };


    if (isNextgraph && !contact.isDraft) {
      const resource = dataset.getResource(contact["@id"]!);
      if (!resource.isError && resource.type !== "InvalidIdentifierResouce") {
        const changedContactObj = changeData(contact, resource);
        updateTypeWithUserSource(changedContactObj);
        commitData(changedContactObj);
      }
    } else {
      updateTypeWithUserSource(contact);
    }
    
    // Trigger a refresh to reload data
    if (onRefresh) {
      setTimeout(onRefresh, 0);
    }
  }, [contact, propertyKey, onRefresh, changeData, commitData, isNextgraph]);

  const renderEditingItem = (item: any, index: number) => {
    const itemId = item['@id'] || `${propertyKey}_${index}`;
    const currentValue = editingValues[itemId] !== undefined ? editingValues[itemId] : (item[subKey] || '');

    return (
      <Box key={itemId} sx={{display: 'flex', alignItems: 'start', gap: 1, width: '100%', mb: 1}}>
        <FormControl size="small" sx={{minWidth: {xs: 100, sm: 140}}}>
          <Select
            value={item.phoneType || 'mobile'}
            disabled={false}
            onChange={(e) => {
              handleTypeChange(itemId, e.target.value);
            }}
            variant="outlined"
          >
            {phoneTypes.map(phoneType => (
              <MenuItem key={phoneType.value} value={phoneType.value}>
                <Box sx={{display: 'flex', alignItems: 'center', gap: 1}}>
                  <Box sx={{display: {xs: 'none', sm: 'block'}, '& svg': {verticalAlign: 'middle'}}}>
                    {phoneType.icon}
                  </Box>
                  <Typography variant="body2">{phoneType.label}</Typography>
                </Box>
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <MultiPropertyItem
          itemId={itemId}
          value={currentValue}
          onChange={(e) => onInputChange(itemId, e.target.value)}
          onBlur={() => onBlur(itemId)}
          placeholder={placeholder ?? ""}
          validateType="phone"
        />
        
        {onRemoveItem && (
          <IconButton 
            size="small" 
            onClick={() => onRemoveItem(itemId)}
            sx={{color: 'error.main'}}
          >
            <Delete fontSize="small"/>
          </IconButton>
        )}
      </Box>
    );
  };

  const renderDisplayItem = (item: any, index: number, array: any[]) => {
    return (
      <Box key={item['@id'] || index} sx={{
        display: 'flex', 
        alignItems: 'center',
        gap: 2, 
        pb: index < array.length - 1 ? 2 : 0,
        mb: index < array.length - 1 ? 2 : 0,
        borderBottom: index < array.length - 1 ? '1px solid rgba(0, 0, 0, 0.08)' : 'none',
        width: '100%'
      }}>
        <Typography variant="caption" color="text.secondary" sx={{fontWeight: 600, textTransform: 'uppercase', fontSize: '0.7rem', minWidth: {xs: '40px', sm: '60px'}}}>
          {phoneTypes.find(type => type.value === item.phoneType)?.label || 'Mobile'}
        </Typography>
        <Typography variant="body2" sx={{fontSize: '0.9rem'}}>
          {item.value}
        </Typography>
      </Box>
    );
  };

  const renderNewItemForm = () => {
    const handleTypeChange = (phoneType: string) => {
      setNewItemType(phoneType);
    };

    return (
      <>
        {isAddingNew && <Box sx={{display: 'flex', alignItems: 'start', gap: 1, width: '100%', mb: 1}}>
          <FormControl size="small" sx={{minWidth: {xs: 100, sm: 140}}}>
            <Select
              value={newItemType}
              onChange={(e) => handleTypeChange(e.target.value)}
              variant="outlined"
            >
              {phoneTypes.map(phoneType => (
                <MenuItem key={phoneType.value} value={phoneType.value}>
                  <Box sx={{display: 'flex', alignItems: 'center', gap: 1}}>
                    <Box sx={{display: {xs: 'none', sm: 'block'}, '& svg': {verticalAlign: 'middle'}}}>
                      {phoneType.icon}
                    </Box>
                    <Typography variant="body2">{phoneType.label}</Typography>
                  </Box>
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <MultiPropertyItem
            itemId={visibleItems.length.toString()}
            value={newItemValue}
            onChange={(e) => onNewItemValueChange(e.target.value)}
            onBlur={() => {
              if (newItemValue.trim()) {
                onAddNewItem({phoneType: newItemType});
              } else {
                setIsAddingNew(false);
                setNewItemValue('');
              }
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                onAddNewItem({phoneType: newItemType});
              } else if (e.key === 'Escape') {
                setIsAddingNew(false);
                setNewItemValue('');
              }
            }}
            autoFocus={true}
            placeholder={placeholder || `Add new ${label?.toLowerCase() || 'phone'}`}
            validateType="phone"
          />
        </Box>}
        <Button
          disabled={isAddingNew && !newItemValue.trim()}
          startIcon={<Add/>}
          onClick={() => setIsAddingNew(true)}
          variant="text"
          size="small"
          sx={{alignSelf: 'flex-end', mt: 2, color: '#1976d2', '&:hover': { backgroundColor: 'rgba(25, 118, 210, 0.04)' }}}
        >
          Add {label?.toLowerCase() || 'phone'}
        </Button>
      </>
    );
  };

  return (
    <>
      {isEditing ? (
        <>
          {visibleItems.map(renderEditingItem)}
          {renderNewItemForm()}
        </>
      ) : (
        visibleItems.map((item, index) => renderDisplayItem(item, index, visibleItems))
      )}
    </>
  );
};