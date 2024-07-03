import { useState } from 'react';
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography"
import Button from '@mui/material/Button';
import { useAuth } from '../utils/AuthContext';
import { UserData } from '../utils/Types';
import { useNavigate } from 'react-router-dom';
import Loader from '../components/commonComponet/Loader';


const AdminHomePage = () => {
    const { users} = useAuth();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false); 

    const nonAdminUsers = users.filter(user => user.role !== 'admin');

    const handleEdit = (userId: string) => {
        setLoading(true); 
        navigate(`/profile/${userId}`);
        setTimeout(() => {
            setLoading(false); 
        }, 2000);
    };

    return (
        <>
            {loading && <Loader />} 
           
            <Grid container spacing={2} justifyContent="center" alignItems="center" marginTop={4}>
              
                {nonAdminUsers.map((user: UserData) => (
                    <Grid item key={user.email} xs={12} sm={6} md={6} lg={3}>
                        <Card>
                            <CardContent>
                                <Typography variant="h6">{user.name}</Typography>
                                <Typography variant="body2">Email: {user.email}</Typography>
                                <Typography variant="body2">Phone: {user.phone}</Typography>
                                <Typography variant="body2">Role: {user.role}</Typography>
                                <Button
                                    onClick={() => {
                                        if (user.id !== undefined) {
                                            handleEdit(user.id);
                                        } else {
                                            console.error(`User ID is undefined for user: ${user.name}`);
                                        }
                                    }}
                                    variant="contained"
                                    color="primary"
                                    style={{ marginTop: '10px' }}
                                >
                                    Edit
                                </Button>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </>
    );
};

export default AdminHomePage;
