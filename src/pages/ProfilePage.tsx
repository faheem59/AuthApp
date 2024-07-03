import { useState } from 'react';
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import Button from '@mui/material/Button';
import { useParams } from 'react-router-dom';
import { useAuth } from '../utils/AuthContext';
import { UserDataUpdate } from '../utils/Types';
import { useProfilePage } from '../utils/CustomHooks/useProfilePage';
import localforage from 'localforage';
import Loader from '../components/commonComponet/Loader';
import FormFieldProfile from '../components/commonComponet/FormFieldProfile';

const ProfilePage = () => {
    const { user, users } = useAuth();
    //const navigate = useNavigate();
    const [editMode, setEditMode] = useState(false);
    const [loading, setLoading] = useState(false);
    const { id: requestedUserId } = useParams<{ id: string }>();

   
    const { control, handleSubmit, userData } = useProfilePage(
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
            setEditMode((prev) => !prev);
            setLoading(false);
        }, 1000);
    };

    const onSubmit = async (data: UserDataUpdate) => {
        setLoading(true);

        try {
            const updatedUserData = { ...userData, ...data };
            const updatedUsers = users.map((u) => (u.id === userData.id ? updatedUserData : u));
            await localforage.setItem('users', updatedUsers);
            setEditMode(false);
            //console.log('User data updated successfully:', updatedUserData);
        } catch (error) {
            console.error('Failed to update user data:', error);
        } finally {
            setLoading(false);
        }
    };

    if (!user) {
        return <Loader />;
    }
    if ((user.role === 'admin' || userData?.id === user.id) && userData) {
        return (
            <>
                <Grid container justifyContent="center" alignItems="center" style={{ height: '100vh' }}>
                    <Grid item xs={10} sm={8} md={6} lg={4}>
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
                                        <Button onClick={toggleEditMode} type="submit" variant="contained" color="primary" disabled={loading}>
                                            Save
                                        </Button>
                                        <Button
                                            onClick={toggleEditMode}
                                            variant="contained"
                                            color="secondary"
                                            style={{ marginLeft: '10px' }}
                                            disabled={loading}
                                        >
                                            Cancel
                                        </Button>

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
                                        
                                            <Button
                                                onClick={toggleEditMode}
                                                variant="contained"
                                                color="primary"
                                                sx={{ marginTop: '10px', width: "100%" }}
                                                disabled={loading}
                                            >
                                                {loading && <Loader />} Edit
                                            </Button>
                                      
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </>
        );
    }

    return <Loader />;
};

export default ProfilePage;
