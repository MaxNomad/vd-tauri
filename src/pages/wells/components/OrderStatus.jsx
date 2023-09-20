import PropTypes from 'prop-types';
import React from 'react';

import { Stack, Typography } from '@mui/material';

import Dot from '@components/@extended/Dot';

const OrderStatus = ({ status }) => {
    let color;
    let title;

    switch (status) {
        case 0:
            color = 'success';
            title = 'Низький';
            break;
        case 1:
            color = 'warning';
            title = 'Середній';
            break;
        case 2:
            color = 'error';
            title = 'Високий';
            break;
        default:
            color = 'primary';
            title = 'Дані відсутні';
    }

    return (
        <Stack direction="row" spacing={1} alignItems="center">
            <Dot color={color} />
            <Typography>{title}</Typography>
        </Stack>
    );
};

OrderStatus.propTypes = {
    status: PropTypes.number
};

export default OrderStatus;
