import PropTypes from 'prop-types';
import React from 'react';
// material-ui
import { Grid, Stack, Typography, Avatar, Alert, Tooltip, useMediaQuery } from '@mui/material';

// project import
import MainCard from '@components/MainCard';

import isError from '@assets/images/icons/error.png';
import isSuccess from '@assets/images/icons/success.png';
import { useTheme } from '@mui/material/styles';

// ==============================|| STATISTICS - Status CARD  ||============================== //

const Status = ({ title, text, status, extraText, newDesign = false }) => {
    const theme = useTheme();
    const greaterThanMid = useMediaQuery(theme.breakpoints.down('md'));
    const useSmall = greaterThanMid ? greaterThanMid : newDesign;
    return (
        <>
            {newDesign ? (
                <Tooltip title={`${text} - ${extraText}`} placement="top">
                    <Alert severity={status === true ? 'success' : 'error'} sx={{ mt: 0, mb: -1.4 }}>
                        {title}
                    </Alert>
                </Tooltip>
            ) : (
                <MainCard contentSX={{ p: 2.25 }}>
                    <Grid container rowSpacing={4.5} columnSpacing={2.75}>
                        <Grid item xs={8} sm={8} md={8} lg={8}>
                            <Typography variant="h6" color="textSecondary">
                                {title}
                            </Typography>
                            <Typography variant="h5" sx={{ color: !status ? 'error.main' : 'success.main' }}>
                                {text}
                            </Typography>
                            <Typography variant="caption" color="textSecondary">
                                {extraText}
                            </Typography>
                        </Grid>
                        <Grid item xs={4} sm={4} md={4} lg={4} display="flex" justifyContent="flex-end">
                            <Avatar
                                alt="profile user"
                                src={status === true ? isSuccess : isError}
                                sx={{ width: 50, height: 50, mr: 1, mt: 1.22 }}
                            />
                        </Grid>
                    </Grid>
                </MainCard>
            )}
        </>
    );
};

Status.propTypes = {
    title: PropTypes.string,
    text: PropTypes.oneOfType([PropTypes.node, PropTypes.string]),
    status: PropTypes.bool,
    extraText: PropTypes.oneOfType([PropTypes.node, PropTypes.string])
};

Status.defaultProps = {
    color: 'primary'
};

export default Status;
