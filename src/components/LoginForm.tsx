import { useState } from 'react';
import Button from "@mui/material/Button"
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField" 
import MenuItem from '@mui/material/MenuItem';
import { useLoginForm } from '../utils/CustomHooks/useLoginFrom';
import { Controller } from 'react-hook-form';
import { LoginFormInput } from '../utils/Types';
import Loader from '../components/commonComponet/Loader';
import FormLoginField from './commonComponet/FormLoginField';
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
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                width: '100%',
                padding: '5px',
                borderRadius: '8px',
                backgroundColor: '#fff',
            }}
        >
            <Typography variant="h5" gutterBottom>
                Login
            </Typography>

            <form onSubmit={handleSubmit(handleLoginSubmit)} style={{ width: '100%' }}>
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

                <FormLoginField
                    name="role"
                    control={control}
                    label="Role"
                    error={!!errors.role}
                    render={({ field }) => (
                        <Controller
                            {...field}
                            as={
                                <TextField
                                    select
                                    label="Role"
                                    variant="outlined"
                                    error={!!errors.role}
                                    helperText={errors.role?.message}
                                    size="small"
                                >
                                    <MenuItem value="admin">Admin</MenuItem>
                                    <MenuItem value="user">User</MenuItem>
                                </TextField>
                            }
                        />
                    )}
                />

                <Button type="submit" variant="contained" color="primary" disabled={loading} sx={{ width: '100%', marginTop: '10px', position: 'relative' }}>
                    {loading && <Loader/>}
                    Login
                </Button>
            </form>
        </Box>
    );
};

export default LoginForm;
