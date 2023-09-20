import PropTypes from 'prop-types';
import { Chip} from '@mui/material';
import React from 'react';
const BlockAlert = ({ current }) => {
    let color;
    let title;
    switch (current) {
        case false:
            color = 'success';
            title = 'Ні';
            break;
        case true:
            color = 'error';
            title = 'Так';
            break;
        default:
            color = 'error';
            title = 'Не визначено';
    }
    return <Chip label={title} size="small" color={color} />;
};

BlockAlert.propTypes = {
    current: PropTypes.bool
};

export default BlockAlert;
