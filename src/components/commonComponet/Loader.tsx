import React from 'react';
import { CircularProgress, Box } from '@mui/material';

const Loader: React.FC = () => {
    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                overflow: "hidden"
                
            }}
        >
            <CircularProgress size={24} />
        </Box>
    );
};

export default Loader;
