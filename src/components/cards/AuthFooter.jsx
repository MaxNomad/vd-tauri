// material-ui
import { useMediaQuery, Container, Link, Typography, Stack } from '@mui/material';
import React from 'react';
// ==============================|| FOOTER - AUTHENTICATION ||============================== //

const AuthFooter = () => {
    const matchDownSM = useMediaQuery((theme) => theme.breakpoints.down('sm'));

    return (
        <Container maxWidth="xl">
            <Stack
                direction={matchDownSM ? 'column' : 'row'}
                justifyContent={matchDownSM ? 'center' : 'space-between'}
                spacing={2}
                textAlign={matchDownSM ? 'center' : 'inherit'}
            >
                <Typography variant="subtitle2" color="secondary" component="span">
                    <Typography component={Link} variant="subtitle2" href="https://vd.lutsk.ua/" target="_blank" underline="hover">
                        КП Луцькводоканал
                    </Typography>
                </Typography>

                <Stack
                    direction={matchDownSM ? 'column' : 'row'}
                    spacing={matchDownSM ? 1 : 3}
                    textAlign={matchDownSM ? 'center' : 'inherit'}
                >
                    <Typography
                        variant="subtitle2"
                        color="secondary"
                        component={Link}
                        href="https://github.com/MaxNomad"
                        target="_blank"
                        underline="hover"
                    >
                        GitHub
                    </Typography>
                    <Typography
                        variant="subtitle2"
                        color="secondary"
                        component={Link}
                        href="https://admin.vd.lutsk.ua/wp-content/uploads/2023/06/ppvdlutsk.pdf"
                        target="_blank"
                        underline="hover"
                    >
                        CA Privacy Notice
                    </Typography>
                </Stack>
            </Stack>
        </Container>
    );
};

export default AuthFooter;
