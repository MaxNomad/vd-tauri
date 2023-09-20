import { Grid, Stack, Typography } from '@mui/material';
// project import
import AuthLogin from './auth-forms/AuthLogin';
import AuthWrapper from './AuthWrapper';
import AuthContext from './context/AuthContext';
import React, { useContext } from 'react';
// ================================|| LOGIN ||================================ //

const Login = () => {
    const { user } = useContext(AuthContext);
    if (!user) {
        return (
            <AuthWrapper>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <Stack direction="row" justifyContent="space-between" alignItems="baseline" sx={{ mb: { xs: -0.5, sm: 0.5 } }}>
                            <Typography variant="h3">Авторизація</Typography>
                        </Stack>
                    </Grid>
                    <Grid item xs={12}>
                        <AuthLogin />
                    </Grid>
                </Grid>
            </AuthWrapper>
        );
    }
};

export default Login;
