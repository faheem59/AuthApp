import { useState } from 'react';
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import { useParams } from 'react-router-dom';
import { useAuth } from '../utils/AuthContext';
import { UserDataUpdate } from '../utils/Types';
import { useProfilePage } from '../utils/CustomHooks/useProfilePage';
import localforage from 'localforage';
import Loader from '../components/commonComponet/Loader';
import FormFieldProfile from '../components/commonComponet/CommonFormFieldProfile';
import CommonButton from '../components/commonComponet/CommonButton';

const ProfilePage = () => {
    const { user, users} = useAuth(); 
    const [editMode, setEditMode] = useState(false);
    const [loading, setLoading] = useState(false);
    const { id: requestedUserId } = useParams<{ id: string }>();

    const { control, handleSubmit, userData, setUserData } = useProfilePage(
        {
            id: undefined,
            name: '',
            email: '',
            phone: '',
            password: '',
            role: 'user',
        },
        requestedUserId || ""
    );

    const toggleEditMode = () => {
        setLoading(true);
        setTimeout(() => {
            setEditMode(prev => !prev);
            setLoading(false);
        }, 1000);
    };

    const onSubmit = async (data: UserDataUpdate) => {
        setLoading(true);

        try {
            const updatedUserData = { ...userData, ...data };
            const updatedUsers = users.map(u => (u.id === userData.id ? updatedUserData : u));

            // Update localforage
            await localforage.setItem('users', updatedUsers);

            // Update context state
            setUserData(updatedUserData);

            setEditMode(false);
        } catch (error) {
            console.error('Failed to update user data:', error);
        } finally {
            setLoading(false);
        }
    };

    if (!user) {
        return <Loader />;
    }

    if ((user.role === 'admin' || userData?.id === user.id) && userData &&
        (requestedUserId || "") <= users.length.toString()) {
        return (
            <>
                <Grid container justifyContent="center" alignItems="center" style={{ marginTop: 20 }}>
                    <Grid item xs={10} sm={8} md={6} lg={4} boxShadow={'none'}>
                        <Card>
                            <CardContent>
                                <Typography variant="h4" gutterBottom align="center">
                                    Profile
                                </Typography>

                                {editMode ? (
                                    <form onSubmit={handleSubmit(onSubmit)}>
                                        {loading && <Loader />}
                                        <FormFieldProfile name="name" control={control} label="Name" defaultValue={userData.name} />
                                        <FormFieldProfile name="email" control={control} label="Email" defaultValue={userData.email} />
                                        <FormFieldProfile name="phone" control={control} label="Phone" defaultValue={userData.phone} />
                                        <FormFieldProfile
                                            name="password"
                                            control={control}
                                            label="Password"
                                            defaultValue={userData.password}
                                            type="password"
                                        />
                                        <CommonButton
                                            type="submit"
                                            onClick={toggleEditMode}
                                        >
                                            Save
                                        </CommonButton>
                                        <CommonButton
                                            onClick={() => {
                                                setEditMode(false);
                                                setUserData(userData); // Reset form fields to original values
                                            }}
                                        >
                                            Cancel
                                        </CommonButton>
                                    </form>
                                ) : (
                                    <div>
                                        <Typography variant="body1">
                                            <strong>Name:</strong> {userData.name}
                                        </Typography>
                                        <Typography variant="body1">
                                            <strong>Email:</strong> {userData.email}
                                        </Typography>
                                        <Typography variant="body1">
                                            <strong>Phone:</strong> {userData.phone}
                                        </Typography>
                                        <CommonButton
                                            onClick={toggleEditMode}
                                            loading={loading}
                                        >
                                            Edit
                                        </CommonButton>
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </>
        );
    }

    return (
        <Grid container justifyContent="center" alignItems="center" style={{ minHeight: '100vh' }}>
            <Loader />
        </Grid>
    );
};

export default ProfilePage;
