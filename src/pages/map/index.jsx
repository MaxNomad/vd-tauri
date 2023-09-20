import { Typography } from '@mui/material';
import MainCard from '@components/MainCard';
import ComponentSkeleton from '@pages/components-overview/ComponentSkeleton';
import GoogleMapComponent from './mapComponent';
import React from 'react';

const MapRoot= () => {
    return (
        <>
            <ComponentSkeleton renderContent>
                <MainCard title="Карта об`єктів">
                    <Typography variant="body2">
                        <GoogleMapComponent />
                    </Typography>
                </MainCard>
            </ComponentSkeleton>
        </>
    );
};

export default MapRoot;
