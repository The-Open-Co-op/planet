import {
  Typography,
  Box,
  Button,
  Select,
  MenuItem,
  FormControl,
  TextField,
  IconButton,
} from '@mui/material';
import {Add, Delete} from '@mui/icons-material';
import {AccountRegistry} from "@/utils/accountRegistry";
import React, {useCallback, useState} from 'react';
import type {Contact} from "@/types/contact";
import {ContactKeysWithHidden, setUpdatedTime} from "@/utils/contactUtils";
import {dataset, useLdo} from "@/lib/nextgraph";
import {isNextGraphEnabled} from "@/utils/featureFlags";
import {MultiPropertyItem} from "@/components/contacts/MultiPropertyWithVisibility/MultiPropertyItem.tsx";


type ResolvableKey = ContactKeysWithHidden;

interface AccountsVariantProps<K extends ResolvableKey> {
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

export const AccountsVariant = <K extends ResolvableKey>({
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
                                                           contact
                                                         }: AccountsVariantProps<K>) => {
  const [newItemProtocol, setNewItemProtocol] = useState('linkedin');
  const [customLabel, setCustomLabel] = useState('');
  const availableAccountTypes = AccountRegistry.getAllAccountTypes();
  const {commitData, changeData} = useLdo();
  const isNextgraph = isNextGraphEnabled();

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, setUpdateTrigger] = useState(0);

  const persistProtocolChange = useCallback((itemId: string, protocol: string) => {
    if (!contact) return;

    const updateProtocolWithUserSource = (contactObj: Contact) => {
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
        if (targetItem.source === "user") {
          // @ts-expect-error TODO: narrow later
          targetItem.protocol = protocol;
        } else {
          // Create copy with user source for non-user sources
          const newEntry = {
            //@ts-expect-error whatever
            [subKey]: targetItem[subKey] || '',
            protocol: protocol,
            source: "user",
            hidden: false,
          };
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
        updateProtocolWithUserSource(changedContactObj);
        commitData(changedContactObj);
      }
    } else {
      updateProtocolWithUserSource(contact);
      setUpdateTrigger(prev => prev + 1);
    }
  }, [changeData, commitData, contact, isNextgraph, propertyKey, subKey, setUpdateTrigger]);

  const renderEditingItem = (item: any, index: number) => {
    const itemId = item['@id'] || `${propertyKey}_${index}`;
    const currentValue = editingValues[itemId] !== undefined ? editingValues[itemId] : (item[subKey] || '');

    return (
      <Box key={itemId} sx={{display: 'flex', alignItems: 'start', gap: 1, width: '100%', mb: 1}}>
        <FormControl size="small" sx={{minWidth: {xs: 100, sm: 140}}}>
          <Select
            value={item.protocol || 'linkedin'}
            disabled={item.source !== "user"}
            onChange={(e) => persistProtocolChange(itemId, e.target.value)}
            variant="outlined"
          >
            {availableAccountTypes.map(accountType => (
              <MenuItem key={accountType.protocol} value={accountType.protocol}>
                <Box sx={{display: 'flex', alignItems: 'center', gap: 1}}>
                  <Box sx={{display: {xs: 'none', sm: 'block'}, '& svg': {verticalAlign: 'middle'}}}>
                    {accountType.icon && React.cloneElement(accountType.icon, {fontSize: 'small'})}
                  </Box>
                  <Typography variant="body2">{accountType.label}</Typography>
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
        />
        
        {onRemoveItem && visibleItems.length > 1 && (
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
        <Typography variant="caption" color="text.secondary" sx={{fontWeight: 600, textTransform: 'uppercase', fontSize: '0.7rem', minWidth: {xs: '50px', sm: '70px'}}}>
          {item.protocol === 'other' && item.customLabel ? item.customLabel : AccountRegistry.getLabel(item.protocol)}
        </Typography>
        {AccountRegistry.getLink(item.protocol, item.value) ? (
          <Typography
            variant="body2"
            component="a"
            href={AccountRegistry.getLink(item.protocol, item.value)}
            target="_blank"
            rel="noopener noreferrer"
            sx={{
              color: '#0077b5',
              textDecoration: 'none',
              fontSize: '0.9rem',
              '&:hover': {
                textDecoration: 'underline',
              },
            }}
          >
            View Profile
          </Typography>
        ) : (
          <Typography variant="body2" sx={{fontSize: '0.9rem'}}>
            {item.value}
          </Typography>
        )}
      </Box>
    );
  };

  const renderNewItemForm = () => {
    const handleProtocolChange = (protocol: string) => {
      setNewItemProtocol(protocol);
    };

    return (
      <>
        {isAddingNew && <Box sx={{display: 'flex', flexDirection: 'column', gap: 1, width: '100%', mb: 1}}>
          <Box sx={{display: 'flex', alignItems: 'start', gap: 1, width: '100%'}}>
            <FormControl size="small" sx={{minWidth: {xs: 100, sm: 140}}}>
              <Select
                value={newItemProtocol}
                disabled={false}
                onChange={(e) => handleProtocolChange(e.target.value)}
                variant="outlined"
              >
                {availableAccountTypes.map(accountType => (
                  <MenuItem key={accountType.protocol} value={accountType.protocol}>
                    <Box sx={{display: 'flex', alignItems: 'center', gap: 1}}>
                      <Box sx={{display: {xs: 'none', sm: 'block'}}}>
                        {accountType.icon && React.cloneElement(accountType.icon, {fontSize: 'small'})}
                      </Box>
                      <Typography variant="body2">{accountType.label}</Typography>
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
                  onAddNewItem({protocol: newItemProtocol, customLabel: newItemProtocol === 'other' ? customLabel : undefined});
                } else {
                  setIsAddingNew(false);
                  setNewItemValue('');
                  setCustomLabel('');
                }
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  onAddNewItem({protocol: newItemProtocol, customLabel: newItemProtocol === 'other' ? customLabel : undefined});
                } else if (e.key === 'Escape') {
                  setIsAddingNew(false);
                  setNewItemValue('');
                  setCustomLabel('');
                }
              }}
              autoFocus={true}
              placeholder={placeholder || `Add new ${label?.toLowerCase() || 'item'}`}
            />
          </Box>
          
          {newItemProtocol === 'other' && (
            <TextField
              size="small"
              value={customLabel}
              onChange={(e) => setCustomLabel(e.target.value)}
              placeholder="Account type name"
              variant="outlined"
              sx={{ml: '148px'}}
            />
          )}
        </Box>}
        <Button
          disabled={isAddingNew && !newItemValue.trim()}
          startIcon={<Add/>}
          onClick={() => setIsAddingNew(true)}
          variant="text"
          size="small"
          sx={{alignSelf: 'flex-end', mt: 2, color: '#1976d2', '&:hover': { backgroundColor: 'rgba(25, 118, 210, 0.04)' }}}
        >
          Add {label?.toLowerCase() || 'item'}
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