import React from 'react';
import { Controller, Control } from 'react-hook-form';
import { TextField, FormControl, FormControlProps } from '@mui/material';
import { UserDataUpdate } from '../../utils/Types';

interface FormFieldProps {
    name: keyof UserDataUpdate;
    control: Control<UserDataUpdate>;
    label: string;
    error?: boolean;
    helperText?: string;
    fullWidth?: boolean;
    margin?: FormControlProps['margin'];
    defaultValue?: string; 
    type?: string
}

const FormFieldProfile: React.FC<FormFieldProps> = ({
    name,
    control,
    label,
    error = false,
    helperText,
    fullWidth = true,
    margin = 'normal',
    defaultValue = '', 
    
}) => {
    return (
        <FormControl fullWidth={fullWidth} margin={margin}>
            <Controller
                name={name}
                control={control}
                defaultValue={defaultValue} 
                render={({ field }) => (
                    <TextField
                        {...field}
                        label={label}
                        variant="outlined"
                        error={error}
                        helperText={helperText}
                    />
                )}
            />
        </FormControl>
    );
};

export default FormFieldProfile;
