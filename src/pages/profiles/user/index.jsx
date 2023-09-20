import React, { useRef } from 'react';

// next
import { useLocation } from 'react-router-dom';
// material-ui
import { Grid } from '@mui/material';

// project import
import Page from '@components/Page';
import ProfileCard from '@sections/apps/profiles/user/ProfileCard';
import ProfileTabs from '@sections/apps/profiles/user/ProfileTabs';
import TabPersonal from '@sections/apps/profiles/user/TabPersonal';
import TabPayment from '@sections/apps/profiles/user/TabPayment';
import TabPassword from '@sections/apps/profiles/user/TabPassword';
import TabSettings from '@sections/apps/profiles/user/TabSettings';
import { useSearchParams } from 'react-router-dom';

// ==============================|| PROFILE - USER ||============================== //

const UserProfile = () => {
    const inputRef = useRef(null);

    const focusInput = () => {
        inputRef.current?.focus();
    };

    const tab = 'settings';
    return (
        <Page title="Perfil do Usuário">
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <ProfileCard focusInput={focusInput} />
                </Grid>
                <Grid item xs={12} md={3}>
                    <ProfileTabs focusInput={focusInput} />
                </Grid>
                <Grid item xs={12} md={9}>
                    {tab === 'personal' && <TabPersonal />}
                    {tab === 'payment' && <TabPayment />}
                    {tab === 'password' && <TabPassword />}
                    {tab === 'settings' && <TabSettings />}
                </Grid>
            </Grid>
        </Page>
    );
};

UserProfile.getLayout = function getLayout(page) {
    return { page };
};

export default UserProfile;
