import React from 'react';
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid" 
import Box from "@mui/material/Box";
import Card from "@mui/material/Card"
import CardHeader from "@mui/material/CardHeader"
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography"
import { useNavigate } from 'react-router-dom';
import LoginForm from '../components/LoginForm';
import SignupForm from '../components/SignupForm';
import { Props } from '../utils/Types';



const LoginSignupPage: React.FC<Props> = ({ formType }) => {
    const navigate = useNavigate();

    return (
        <Container maxWidth="sm" sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
            <Card sx={{ width: '100%', padding: 3 }}>
                <CardHeader
                    title={
                        <Box display="flex" justifyContent="space-between">
                            <Typography
                                variant="h5"  
                                onClick={() => navigate('/login')}
                                sx={{
                                    cursor: 'pointer',
                                    textDecoration: formType === 'login' ? 'underline' : 'none',
                                    fontWeight: formType === 'login' ? 'bold' : 'normal',
                                    color: formType === 'login' ? "blue" : 'red'
                                }}
                            >
                                Login
                            </Typography>
                            <Typography
                                variant="h5"
                                onClick={() => navigate('/signup')}
                                sx={{
                                    cursor: 'pointer',
                                    textDecoration: formType === 'signup' ? 'underline' : 'none',
                                    fontWeight: formType === 'signup' ? 'bold' : 'normal',
                                    color: formType === 'signup' ? "blue" : 'red'
                                }}
                            >
                                Signup
                            </Typography>
                        </Box>
                    }
                />
                <CardContent>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            {formType === 'login' ? <LoginForm /> : <SignupForm />}
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        </Container>
    );
}

export default LoginSignupPage;
