import { useState } from 'react';
import Typography from "@mui/material/Typography";
import MenuItem from '@mui/material/MenuItem';
import { useLoginForm } from '../utils/CustomHooks/useLoginFrom';
import { Controller } from 'react-hook-form';
import { LoginFormInput } from '../utils/Types';
import FormLoginField from './commonComponet/CommonFormLoginField';
import FormControl from "@mui/material/FormControl"; 
import { TextField } from '@mui/material';
import CommonButton from './commonComponet/CommonButton';

const LoginForm = () => {
    const { handleSubmit, control, errors, error, onSubmit } = useLoginForm();
    const [loading, setLoading] = useState(false);

    const handleLoginSubmit = async (data: LoginFormInput) => {
        setLoading(true);

        setTimeout(async () => {
            try {
                await onSubmit(data);
            } catch (error) {
                console.error('Login failed:', error);
            } finally {
                setLoading(false);
            }
        }, 1000);
    };

    return (
           <>

            <form onSubmit={handleSubmit(handleLoginSubmit)}>
                {error && (
                    <Typography color="error" style={{ marginBottom: '10px' }}>
                        {error}
                    </Typography>
                )}

                <FormLoginField
                    name="emailOrPhone"
                    control={control}
                    label="Email or Phone"
                    error={!!errors.emailOrPhone}
                    helperText={errors.emailOrPhone?.message}
                />

                <FormLoginField
                    name="password"
                    control={control}
                    label="Password"
                    error={!!errors.password}
                    helperText={errors.password?.message}
                />

                <FormControl fullWidth margin="normal">
                    <Controller
                        name="role"
                        control={control}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                select
                                label="Role"
                                id="role"
                                variant="outlined"
                                error={!!errors.role}
                            >
                                <MenuItem value="admin">Admin</MenuItem>
                                <MenuItem value="user">User</MenuItem>
                            </TextField>
                        )}
                    />
                </FormControl>
                <CommonButton type="submit" loading={loading}>
                    Login
                </CommonButton>
            </form>
           </>
        
    );
};

export default LoginForm;
