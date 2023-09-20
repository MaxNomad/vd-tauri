import PropTypes from 'prop-types';
import React from 'react';

import { Stack, Typography } from '@mui/material';

import Dot from '@components/@extended/Dot';

const ActiveStatus = ({ active }) => {
    let color;
    let title;

    switch (active) {
        case false:
            color = 'success';
            title = 'Не активна';
            break;
        case true:
            color = 'error';
            title = 'Активна';
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

ActiveStatus.propTypes = {
    active: PropTypes.bool
};
export default React.memo(ActiveStatus);
