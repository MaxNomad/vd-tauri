import ComponentSkeleton from '@pages/components-overview/ComponentSkeleton';
import { Grid, Typography, Box } from '@mui/material';
import React from 'react';
const OfficeRoot = () => {
    return (
        <>
            <ComponentSkeleton renderContent>
                <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" sx={{ mt: '30vh' }}>
                    <Typography variant="h1" color="primary" gutterBottom>
                        404
                    </Typography>
                    <Typography variant="h4" color="textPrimary" align="center" gutterBottom>
                        Об`єкти відсутні
                    </Typography>
                    <Typography variant="body1" color="textSecondary" align="center" sx={{ mb: 3 }}>
                        Перевірте налаштування панелі
                    </Typography>
                </Box>
            </ComponentSkeleton>
        </>
    );
};

export default OfficeRoot;
