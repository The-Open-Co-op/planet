import {Box, TextField} from "@mui/material";
import {FormPhoneField} from "@/components/ui/FormPhoneField/FormPhoneField";
import {useFieldValidation, ValidationType} from "@/hooks/useFieldValidation";
import {useCallback, useEffect, useState} from "react";

interface MultiPropertyItemProps {
  itemId: string,
  value: string,
  onChange: (e: any) => void,
  onBlur: () => void,
  placeholder: string,
  onKeyDown?: (e: any) => void,
  autoFocus?: boolean,
  validateType?: ValidationType,
  validateParent?: (isValid: boolean) => void,
}

export const MultiPropertyItem = ({
                                    itemId,
                                    value,
                                    onChange,
                                    onBlur,
                                    placeholder,
                                    onKeyDown,
                                    autoFocus,
                                    validateType = "text",
                                    validateParent
                                  }: MultiPropertyItemProps) => {
  const {setFieldValue, triggerField, error, errorMessage} = useFieldValidation(value, validateType, { validateOn: "blur", required: true });
  const [isValid, setIsValid] = useState(true);

  const validate = useCallback((valid: boolean) => {
    if (validateParent) validateParent(valid);
    setIsValid(valid);
  }, [validateParent]);

  const triggerValidation = useCallback((value: string) => {
    setFieldValue(value);
    triggerField().then((valid) => validate(valid));
  }, [setFieldValue, triggerField, validate]);

  const handleBlur = () => {
    if (isValid) onBlur();
  };

  useEffect(() => triggerValidation(value), [triggerValidation, value]);

  const renderTextField = () => {
    const fieldProps = {
      value,
      onChange: (e: any) => {
        onChange(e);
        triggerValidation(e.target.value);
      },
      onBlur: handleBlur,
      error: error,
      helperText: errorMessage,
      variant: "outlined" as const,
      size: "small" as const,
      placeholder,
      onKeyDown,
      autoFocus,
      sx: {
        flex: 1,
        width: {xs: '100%', md: 'auto'},
        '& .MuiOutlinedInput-input': {
          fontSize: '0.875rem',
          fontWeight: 'normal',
        }
      }
    };

    switch (validateType) {
      case "phone": {
        // FormPhoneField handles its own validation, so don't pass error/helperText from our validation
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const {error, helperText, ...phoneProps} = fieldProps;
        return <FormPhoneField {...phoneProps} />;
      }
      case "email":
      case "url":
      default:
        return <TextField {...fieldProps} />;
    }
  }

  return (
    <Box key={itemId} sx={{
      display: 'flex',
      flexDirection: {xs: 'column', md: 'row'},
      alignItems: {xs: 'flex-start', md: 'center'},
      gap: {xs: 0.5, md: 1},
      width: '100%'
    }}>
      {renderTextField()}
    </Box>
  )
    ;
}