import PropTypes from 'prop-types';
import { Chip, Grid, Avatar, Box, Typography } from '@mui/material';
import pump_img from '@assets/images/icons/pump.png';
import React from 'react';
import { Progress } from 'rsuite';
import { useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import Pressure from './Pressure';
import NumberWithAnimation from '@pages/kns/components/NumberWithAnimation';

const BranchStatus = ({ props, cols = 4 }) => {
    const theme = useTheme();
    const matchDownMD = useMediaQuery(theme.breakpoints.up('sm'));

    return (
        <Grid item xs={12} sm={6} md={cols} lg={cols} sx={{ mt: -2.25, mb: 0.5 }}>
            <Box direction="column">
                <Typography variant="h5" color="textSecondary">
                    Гілка №{props?.id}
                </Typography>
                <Typography variant="h6" color="textSecondary" sx={{ mt: 1.4 }}>
                    Вихідний тиск:&nbsp;&nbsp;
                    <Pressure num={props?.pressure} />
                    &nbsp;
                </Typography>
                <Typography variant="h6" color="textSecondary" sx={{ mt: 1.4 }}>
                    Вихідний потік:&nbsp;&nbsp;
                    <NumberWithAnimation number={(props?.flow ?? 0).toFixed(2)} one /> м³/год.{' '}
                    &nbsp;
                </Typography>
            </Box>
        </Grid>
    );
};
BranchStatus.propTypes = {
    isOnline: PropTypes.bool,
    setImage: PropTypes.bool,
    cols: PropTypes.number
};

export default BranchStatus;
