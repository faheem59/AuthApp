import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel"
import Select from "@mui/material/Select"
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography" ;
import { yupResolver } from '@hookform/resolvers/yup';
import localforage from 'localforage';
import { useAuth } from '../utils/AuthContext';
import { UserData } from '../utils/Types';
import { useNavigate } from 'react-router-dom';
import { SignUpschema } from '../utils/schemas/loginSignupSchema';
import FormField from './commonComponet/FormField';
import Loader from '../components/commonComponet/Loader'; 

const SignupForm = () => {
    const navigate = useNavigate();
    const { handleSubmit, control, formState: { errors } } = useForm<UserData>({
        resolver: yupResolver(SignUpschema),
    });
    const { login, users } = useAuth();
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false); 

    const onSubmit = async (data: UserData) => {
        setLoading(true); 

        try {
            const existingUsers: UserData[] = users;
            const isAdminExist = existingUsers.find((user) => user.role === 'admin');
            const isEmailExist = existingUsers.find((user) => user.email === data.email);
            const isPhoneExist = existingUsers.find((user) => user.phone === data.phone);

            if (data.role === 'admin' && isAdminExist) {
                setError('Only one admin is allowed.');
                setLoading(false); 
                return;
            }

            if (existingUsers.length >= 6) {
                setError('Only 6 users are allowed.');
                setLoading(false); 
                return;
            }

            if (isEmailExist || isPhoneExist) {
                setError('Email or Phone already exists.');
                setLoading(false); 
                return;
            }

            const newUser: UserData = { ...data, id: (existingUsers.length + 1).toString() };
            await localforage.setItem('users', [...existingUsers, newUser]);
            login(newUser);
            setError(null);
            alert('User registered successfully');
            navigate('/login');
        } catch (error) {
            console.error('Failed to register user', error);
        } finally {
            setLoading(false); 
        }
    };

    return (
        <>
           
            <Typography variant="h5" gutterBottom sx={{ textAlign: 'center' }}>
                    SignUp
                </Typography>
            {loading && <Loader />} 
            <form onSubmit={handleSubmit(onSubmit)}>
                {error && <Typography color="error">{error}</Typography>}
                <FormField
                    name="name"
                    control={control}
                    label="Name"
                    error={!!errors.name}
                    helperText={errors.name?.message}
                />
                <FormField
                    name="email"
                    control={control}
                    label="Email"
                    error={!!errors.email}
                    helperText={errors.email?.message}
                />
                <FormField
                    name="phone"
                    control={control}
                    label="Phone"
                    error={!!errors.phone}
                    helperText={errors.phone?.message}
                />
                <FormField
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

                    <Button type="submit" variant="contained" color="primary"
                        disabled={loading}
                        sx={{ width: '100%', marginTop: '10px', }}>
                        SignUp
                        {loading && <Loader />}
                    </Button>
            </form>
        
        </>
    );
};

export default SignupForm;
