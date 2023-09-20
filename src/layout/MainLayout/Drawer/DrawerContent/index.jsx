// project import
import Navigation from './Navigation';
import SimpleBar from '@components/third-party/SimpleBar';
import React from 'react';
// ==============================|| DRAWER CONTENT ||============================== //

const DrawerContent = () => (
    <SimpleBar
        sx={{
            '& .simplebar-content': {
                display: 'flex',
                flexDirection: 'column'
            }
        }}
    >
        <Navigation />
    </SimpleBar>
);

export default DrawerContent;
