import PropTypes from 'prop-types';
import { Chip, Grid, Avatar, Box, Badge, Tooltip  } from '@mui/material';
import pump_img from '@assets/images/icons/pump.png';
import React from 'react';

const PumpStatus = ({ isOnline, setImage, current, cols = 4 }) => {
    let color;
    let title;
    switch (isOnline) {
        case true:
            color = 'success';
            title = 'В роботі';
            break;
        case false:
            color = 'primary';
            title = 'Призупинено';
            break;
        default:
            color = 'error';
            title = 'Не визначено';
    }

    let colorMode;
    let titleMode;
    switch (current) {
        case 0:
            colorMode = 'warning';
            titleMode = 'Ручний';
            break;
        case 1:
            colorMode = 'success';
            titleMode = 'Авто';
            break;
        case 2:
            colorMode = 'error';
            titleMode = 'Вимкнено';
            break;
        default:
            colorMode = 'error';
            titleMode = 'Не визначено';
    }
    return (
        <Grid item xs={4} sm={4} md={4} lg={cols} sx={{ mt: -2.25, mb: 0.5 }}>
            <Box direction="column" align="center">
                {!setImage ? <Tooltip title={`Режим роботи насосу: ${titleMode}`} placement="top"><Badge color={colorMode} badgeContent={titleMode}  sx={{display: "inline-block"}}  size="sm" ><Avatar alt="" src={pump_img} sx={{ width: 60, height: 60 }} /></Badge></Tooltip> : ''}
                <p/>
                <Chip label={title} size="small" color={color} />
            </Box>
        </Grid>
    );
};
PumpStatus.propTypes = {
    isOnline: PropTypes.bool,
    setImage: PropTypes.bool,
    cols: PropTypes.number,
    current: PropTypes.number,
};

export default PumpStatus;
