import PropTypes from 'prop-types';
import React from 'react';
// material-ui
import { Box, Grid } from '@mui/material';

// project import
import AuthCard from './AuthCard';
import Logo from '@components/Logo';
import AuthFooter from '@components/cards/AuthFooter';

// assets
import AuthBackground from '@assets/images/auth/AuthBackground';
import { isTauri } from '@utils/Tauri';

// ==============================|| AUTHENTICATION - WRAPPER ||============================== //

const AuthWrapper = ({ children }) => {
    const height = !isTauri ? '95vh' : '100vh';
    return (
        <Box className={'authContainer'}>
            <AuthBackground />
            <Grid
                container
                direction="column"
                justifyContent="flex-end"
                sx={{
                    minHeight: height
                }}
            >
                <Grid item xs={12} sx={{ ml: 3, mt: 3 }}>
                    <Logo />
                </Grid>
                <Grid item xs={12}>
                    <Grid
                        item
                        xs={12}
                        container
                        justifyContent="center"
                        alignItems="center"
                        sx={{ minHeight: { xs: `calc(${height} - 134px)`, md: `calc(${height} - 112px)` } }}
                    >
                        <Grid item>
                            <AuthCard>{children}</AuthCard>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12} sx={{ m: 3, mt: 1 }}>
                    <AuthFooter />
                </Grid>
            </Grid>
        </Box>
    );
};

AuthWrapper.propTypes = {
    children: PropTypes.node
};

export default AuthWrapper;
