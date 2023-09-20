import { Box } from '@mui/material';
import React from 'react';

const footerStyles = {
    padding: '16px',
    textAlign: 'center',
    position: 'fixed',
    bottom: 0,
    left: 0,
    width: '100%'
};

const Footer = () => {
    return (
        <footer style={footerStyles}>
            <Box>
                {/* Your footer content goes here */}
                <p>&copy; {new Date().getFullYear()} Your Website</p>
            </Box>
        </footer>
    );
};
export default Footer;
