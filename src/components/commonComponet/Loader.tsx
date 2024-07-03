import React from 'react';
import { CircularProgress, Box } from '@mui/material';

const Loader: React.FC = () => {
    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
               
            }}
        >
            <CircularProgress />
        </Box>
    );
};

export default Loader;
