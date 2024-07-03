import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import localforage from 'localforage';
import { useNavigate } from 'react-router-dom';
import { LoginFormInput, UserData } from '../Types';
import { loginSchema } from '../schemas/loginSignupSchema';
import { useState } from 'react';
import { useAuth } from '../AuthContext';

export const useLoginForm = () => {
    const navigate = useNavigate();
    const { handleSubmit, control, formState: { errors } } = useForm<LoginFormInput>({
        resolver: yupResolver(loginSchema),
    });

    const { login: authLogin } = useAuth(); 

    const [error, setError] = useState<string | null>(null);

    const onSubmit = async (data: LoginFormInput) => {
        try {
            const users: UserData[] = await localforage.getItem('users') || [];
            const user = users.find(u => u.email === data.emailOrPhone || u.phone === data.emailOrPhone);

            if (!user) {
                setError('User does not exist.');
                return;
            }
            if (user.password !== data.password || user.role !== data.role) {
                setError('Invalid credentials.');
                return;
            }
            console.log('Login successful:', user);
            setError(null);
            authLogin(user)
            if (user.role === 'user') {
                navigate(`/profile/${user.id}`); 
            } else {
                navigate("/home");
            }
        } catch (error) {
            console.error('Failed to log in:', error);
            setError('Failed to log in. Please try again.');
        }
    };

    return { handleSubmit, control, errors, error, onSubmit };
};
