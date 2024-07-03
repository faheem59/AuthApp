import  AppBar from "@mui/material/AppBar"
import Toolbar from "@mui/material/Toolbar"
import Typography from "@mui/material/Typography"; 
import IconButton  from '@mui/material/IconButton';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { useAuth } from '../../utils/AuthContext';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
    const navigate = useNavigate();
    const { user, logout } = useAuth(); 
    const isAdmin = user?.role === 'admin'; 

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <AppBar position="static" sx={{backgroundColor: "black"}}>
            <Toolbar>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    Admin User App
                </Typography>
                {(user || isAdmin) && ( 
                    <IconButton
                        size="large"
                        edge="end"
                        color="inherit"
                        aria-label="logout"
                        onClick={handleLogout}
                    >
                        <ExitToAppIcon />
                    </IconButton>
                )}
        
            </Toolbar>
        </AppBar>
    );
}

export default Navbar;
