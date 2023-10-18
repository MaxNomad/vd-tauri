import React from 'react';
import { Box, Typography, Button } from '@mui/material';

const AppError = ({ error, resetErrorBoundary }) => {
    const refreshPage = () => {
        window.location.reload(false);
    };
    return (
        <>
            <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" sx={{ mt: '30vh' }}>
                <Typography variant="h1" color="primary" gutterBottom>
                    500
                </Typography>
                <Typography variant="h4" color="textPrimary" align="center" gutterBottom>
                    Критична помилка 500
                </Typography>
                <Typography variant="body1" color="textSecondary" align="center" sx={{ mb: 3 }}>
                    {error.message}
                </Typography>
                <Typography variant="body1" color="textSecondary" align="center" sx={{ mb: 3 }}></Typography>

                <Button onClick={() => window.location.reload()}>Перезавантажити сторінку</Button>

                <Button onClick={resetErrorBoundary} sx={{ mt: 2 }}>
                    Скинути помилки
                </Button>
            </Box>
        </>
    );
};

export default AppError;
