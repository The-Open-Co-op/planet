import {
  Box,
  Button,
  IconButton,
} from '@mui/material';
import {Add, Star, Delete} from '@mui/icons-material';
import {MultiPropertyItem} from "@/components/contacts/MultiPropertyWithVisibility/MultiPropertyItem.tsx";
import {ValidationType} from "@/hooks/useFieldValidation";
import {formatPhone} from "@/utils/phoneHelper";
import {useState} from "react";

interface ChipsVariantProps {
  visibleItems: any[];
  isEditing: boolean;
  editingValues: Record<string, string>;
  isAddingNew: boolean;
  newItemValue: string;
  placeholder?: string;
  label?: string;
  subKey: string;
  propertyKey: string;
  onInputChange: (itemId: string, value: string) => void;
  onBlur: (itemId: string) => void;
  onAddNewItem: () => void;
  onNewItemValueChange: (value: string) => void;
  setIsAddingNew: (adding: boolean) => void;
  setNewItemValue: (value: string) => void;
  onRemoveItem?: (itemId: string) => void;
  validateType?: ValidationType;
}

export const ChipsVariant = ({
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
                               validateType = "text"
                             }: ChipsVariantProps) => {
  const [isValid, setIsValid] = useState(true);

  const renderEditingItem = (item: any, index: number) => {
    const itemId = item['@id'] || `${propertyKey}_${index}`;
    const currentValue = editingValues[itemId] !== undefined ? editingValues[itemId] : (item[subKey] || '');

    return (
      <Box key={itemId} sx={{display: 'flex', alignItems: 'center', gap: 1, width: '100%', mb: 1}}>
        <MultiPropertyItem
          itemId={itemId}
          value={currentValue}
          source={item.source}
          onChange={(e) => onInputChange(itemId, e.target.value)}
          onBlur={() => onBlur(itemId)}
          placeholder={placeholder ?? ""}
          validateType={validateType}
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

  const renderDisplayItem = (item: any, index: number) => {
    const label = validateType === "phone" ? formatPhone(item[subKey]) :
      item[subKey]

    return (
      <Box key={item['@id'] || index} sx={{display: 'flex', alignItems: 'center', gap: 2}}>
        <Box sx={{color: 'text.primary', fontSize: '0.9rem'}}>
          {label}
        </Box>
        {item.preferred && <Star fontSize="small"/>}
      </Box>
    );
  };

  const renderNewItemForm = () => {
    return <>
      {isAddingNew && <MultiPropertyItem
        itemId={visibleItems.length.toString()}
        value={newItemValue}
        source={"user"}
        onChange={(e) => onNewItemValueChange(e.target.value)}
        onBlur={() => {
          if (newItemValue.trim()) {
            onAddNewItem();
          } else {
            setIsAddingNew(false);
            setNewItemValue('');
          }
        }}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            onAddNewItem();
          } else if (e.key === 'Escape') {
            setIsAddingNew(false);
            setNewItemValue('');
          }
        }}
        autoFocus={true}
        placeholder={placeholder || `Add new ${label?.toLowerCase() || 'item'}`}
        validateType={validateType}
        validateParent={setIsValid}
      />}
      <Button
        disabled={isAddingNew && !isValid}
        startIcon={<Add/>}
        onClick={() => setIsAddingNew(true)}
        variant="text"
        size="small"
        sx={{alignSelf: 'flex-end', mt: 2, color: '#1976d2', '&:hover': { backgroundColor: 'rgba(25, 118, 210, 0.04)' }}}
      >
        Add {label?.toLowerCase() || 'item'}
      </Button>
    </>
  };

  return (
    <>
      {isEditing ? (
        <>
          {visibleItems.map(renderEditingItem)}
          {renderNewItemForm()}
        </>
      ) : (
        visibleItems.map(renderDisplayItem)
      )}
    </>
  );
};