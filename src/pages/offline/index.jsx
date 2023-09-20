import React from 'react';
import { Box, Typography, Button } from '@mui/material';

const AppOffline = () => {
    const refreshPage = () => {
        window.location.reload(false);
      }
    return (
        <>
            <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" sx={{ mt: '30vh' }}>
                <Typography variant="h1" color="primary" gutterBottom>
                    500
                </Typography>
                <Typography variant="h4" color="textPrimary" align="center" gutterBottom>
                    Помилка підключення до серверів
                </Typography>
                <Typography variant="body1" color="textSecondary" align="center" sx={{ mb: 3 }}>
                    Відсутній доступ до інтернету або сервери недоступні.
                </Typography>
                <Button onClick={()=> refreshPage()}>Перезавантажити сторінку</Button>
            </Box>
        </>
    );
};

export default AppOffline;
