import React, { useState, useEffect } from 'react';

// material-ui
import { Box, Tab, Tabs } from '@mui/material';

// project import
import MainCard from '@components/MainCard';
import TabProfile from '@sections/apps/profiles/account/TabProfile';
import TabPersonal from '@sections/apps/profiles/account/TabPersonal';
import TabAccount from '@sections/apps/profiles/account/TabAccount';
import TabPassword from '@sections/apps/profiles/account/TabPassword';
import TabSettings from '@sections/apps/profiles/account/TabSettings';
import TabPannel from '@sections/apps/profiles/account/TabPannel';
// assets
import { ContainerOutlined, FileTextOutlined, LockOutlined, SettingOutlined, UserOutlined, ControlOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import { fetchUserData } from '@pages/authentication/redux/authThunk';

// ==============================|| PROFILE - ACCOUNT ||============================== //

const AccountProfile = () => {
    const dispatch = useDispatch();

    const [value, setValue] = useState('basic');
    useEffect(() => {
      dispatch(fetchUserData());
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [value]);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
            <MainCard border={false} boxShadow>
                <Box sx={{ borderBottom: 1, borderColor: 'divider', width: '100%' }}>
                    <Tabs value={value} onChange={handleChange} variant="scrollable" scrollButtons="auto" aria-label="account profile tab">
                        <Tab label="Профіль" icon={<UserOutlined />} value="basic" iconPosition="start" />
                        <Tab label="Активні сесії" icon={<ContainerOutlined />} value="my-account" iconPosition="start" />
                        <Tab label="Безпека" icon={<LockOutlined />} value="password" iconPosition="start" />
                        <Tab label="Редагувати профіль" icon={<FileTextOutlined />} value="personal" iconPosition="start" />
                        <Tab label="Налаштування" icon={<SettingOutlined />} value="settings" iconPosition="start" />
                        <Tab label="Глобальні" icon={<ControlOutlined />} value="pannel" iconPosition="start" />
                    </Tabs>
                </Box>
                <Box sx={{ mt: 2.5 }}>
                    {value === 'basic' && <TabProfile />}
                    {value === 'personal' && <TabPersonal />}
                    {value === 'my-account' && <TabAccount />}
                    {value === 'password' && <TabPassword />}
                    {value === 'settings' && <TabSettings />}
                    {value === 'pannel' && <TabPannel />}
                </Box>
            </MainCard>
    );
};

export default AccountProfile;
