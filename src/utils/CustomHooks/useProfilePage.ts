import { useState, useEffect } from 'react';
import { useForm, UseFormReturn } from 'react-hook-form';
import { UserDataUpdate } from '../Types';
import { useAuth } from '../AuthContext';

export interface ProfileFormReturn extends UseFormReturn<UserDataUpdate> {
    userData: UserDataUpdate;
}

export const useProfilePage = (initialValues: UserDataUpdate, userId: string): ProfileFormReturn => {
    const { control, handleSubmit, reset, ...rest } = useForm<UserDataUpdate>({ defaultValues: initialValues });
    const {users} = useAuth();
    const [userData, setUserData] = useState<UserDataUpdate>(initialValues);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const user = users.find(u =>{
                    // console.log('1114', typeof u.id, typeof userId);
                    return String(u.id) === userId
                });
                // console.log("hdfjshjsjfs", users, userId);

                if (user) {
                    setUserData(user);
                    reset(user); 
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        fetchUserData();


    }, [userId, users, reset]);

    return { control, handleSubmit, reset, userData, ...rest };
};
