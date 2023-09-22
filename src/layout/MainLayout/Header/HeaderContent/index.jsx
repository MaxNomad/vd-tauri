// material-ui
import { Box } from '@mui/material';
import React from 'react';
// project import
import Profile from './Profile';
import Notification from './Notification';
import UpdateNotification from './UpdateNotification';
import { isTauri } from '@utils/Tauri';

// ==============================|| HEADER - CONTENT ||============================== //

const HeaderContent = () => {
    return (
        <>
            {<Box sx={{ width: '100%', ml: 1 }} />}
            <UpdateNotification />
            <Profile />
        </>
    );
};

export default HeaderContent;
