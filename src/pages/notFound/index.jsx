import React from 'react';
import { Box, Typography, Button, Link as MuiLink } from '@mui/material';
import { Link } from 'react-router-dom';

const NotFound = ({
    code = 404,
    text = 'Сторінку не знайдено.',
    subText = 'Дана сторінка, могла бути видалена або тимчасово недоступна.'
}) => {
    return (
        <>
            <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" sx={{ mt: '30vh' }}>
                <Typography variant="h1" color="primary" gutterBottom>
                    {code}
                </Typography>
                <Typography variant="h4" color="textPrimary" align="center" gutterBottom>
                    {text}
                </Typography>
                <Typography variant="body1" color="textSecondary" align="center" sx={{ mb: 3 }}>
                    {subText}
                </Typography>
                <Typography component={MuiLink} variant="h6" href="/" underline="hover">
                    Назад на головну
                </Typography>
            </Box>
        </>
    );
};

export default NotFound;
