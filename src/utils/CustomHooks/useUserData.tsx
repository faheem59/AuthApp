import { useEffect, useState } from 'react';
import localforage from 'localforage';
import { UserDataUpdate } from '../Types';

export const useUserData = () => {
    const [userData, setUserData] = useState<UserDataUpdate>({
        id:'',
        name: '',
        email: '',
        phone: '',
        password: '',
    });

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const storedUserData: UserDataUpdate[] | null = await localforage.getItem('users');
                if (storedUserData && storedUserData.length > 0) {
                    setUserData(storedUserData[0]);
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        fetchUserData();
    }, []);

    return { userData, setUserData };
};
