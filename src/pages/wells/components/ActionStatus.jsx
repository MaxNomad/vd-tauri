import PropTypes from 'prop-types';
import React from 'react';

import { Stack, Typography } from '@mui/material';

import Dot from '@components/@extended/Dot';

const ActionStatus = ({ status }) => {
    let color;

    switch (status) {
        case 'TurnOn':
            color = 'success';
            break;
        case 'TurnOff':
            color = 'primary';
            break;
        case 'AlarmReset':
        case 'UpdateDbTriggers':
            color = 'warning';
            break;
        case 'ClearTable':
        case 'RebootDevice':
            color = 'error';
            break;
        case 'AlarmReset1':
        case 'UpdateDbTriggers1':
            color = 'secondary';
            break;
        default:
            color = 'primary';
    }

    return (
        <Stack direction="row" spacing={1} alignItems="center">
            <Dot color={color} />
            <Typography>{status}</Typography>
        </Stack>
    );
};

ActionStatus.propTypes = {
    status: PropTypes.string
};

export default ActionStatus;
