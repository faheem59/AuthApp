import { useState } from 'react';
import Button from "@mui/material/Button"
import Typography from "@mui/material/Typography";
import MenuItem from '@mui/material/MenuItem';
import { useLoginForm } from '../utils/CustomHooks/useLoginFrom';
import { Controller } from 'react-hook-form';
import { LoginFormInput } from '../utils/Types';
import Loader from '../components/commonComponet/Loader';
import FormLoginField from './commonComponet/FormLoginField';
import FormControl from "@mui/material/FormControl"; 
import InputLabel from "@mui/material/InputLabel"
import Select from '@mui/material/Select';

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
            <Typography variant="h5" gutterBottom sx={{ textAlign: 'center' }}>
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

                <FormControl fullWidth margin="normal">
                    <InputLabel id="role-label">Role</InputLabel>
                    <Controller
                        name="role"
                        control={control}
                        render={({ field }) => (
                            <Select
                                {...field}
                                labelId="role-label"
                                id="role"
                                variant="outlined"
                                error={!!errors.role}
                            >
                                <MenuItem value="admin">Admin</MenuItem>
                                <MenuItem value="user">User</MenuItem>
                            </Select>
                        )}
                    />
                </FormControl>

                <Button type="submit" variant="contained" color="primary" disabled={loading} sx={{ width: '100%', marginTop: '10px', position: 'relative' }}>
                    {loading && <Loader />}
                    Login
                </Button>
            </form>
           </>
        
    );
};

export default LoginForm;
