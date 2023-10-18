import { Typography } from '@mui/material';
import MainCard from '@components/MainCard';
import ComponentSkeleton from '@pages/components-overview/ComponentSkeleton';
import GoogleMapComponent from './mapComponent';
import React from 'react';

const MapRoot = () => {
    return (
        <>
            <ComponentSkeleton renderContent>
                <MainCard title="Карта об`єктів">
                    <GoogleMapComponent />
                </MainCard>
            </ComponentSkeleton>
        </>
    );
};

export default MapRoot;
