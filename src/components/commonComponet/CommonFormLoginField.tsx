import React from 'react';
import { Controller, Control } from 'react-hook-form';
import { TextField, FormControl, FormControlProps } from '@mui/material';
import { LoginFormInput } from '../../utils/Types';

interface FormFieldProps {
    name: keyof LoginFormInput;
    control: Control<LoginFormInput>;
    label: string;
    error?: boolean;
    helperText?: string;
    fullWidth?: boolean;
    margin?: FormControlProps['margin'];
}

const FormLoginField: React.FC<FormFieldProps> = ({
    name,
    control,
    label,
    error = false,
    helperText,
    fullWidth = true,
    margin = 'normal',
}) => {
    return (
        <FormControl fullWidth={fullWidth} margin={margin}>
            <Controller
                name={name}
                control={control}
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

export default FormLoginField;
