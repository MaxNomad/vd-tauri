import PropTypes from 'prop-types';
import { Chip, Grid, Avatar, Box } from '@mui/material';
import pump_img from '@assets/images/icons/pump.png';
import React from 'react';
import { Progress } from 'rsuite';
import { useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';

const TankStatus = ({ props, cols = 4 }) => {
    const theme = useTheme();
    const matchDownMD = useMediaQuery(theme.breakpoints.up('sm'));
    const CircleStyle = {
        width: matchDownMD ? '7.65em' : '6.65em',
        display: 'inline-block',
        marginBottom: 16
    };
    return (
        <Grid item xs={4} sm={4} md={cols} lg={cols} sx={{ mt: -2.25, mb: 0.5 }}>
            <Box direction="column" align="center">
                <Box
                    style={CircleStyle}
                    sx={{
                        ml: { lg: 0, md: 1 },
                        mt: { lg: 0.8, md: 1, xs: 0.5 },
                        pl: { lg: 2, md: 1, xs: 0.5 },
                        pr: { lg: 2, md: 1, xs: 0.5 }
                    }}
                >
                    <Progress.Circle percent={0}/>
                </Box>
                <Chip label={`${props?.value} м³`} size="small" />
            </Box>
        </Grid>
    );
};
TankStatus.propTypes = {
    isOnline: PropTypes.bool,
    setImage: PropTypes.bool,
    cols: PropTypes.number
};

export default TankStatus;
