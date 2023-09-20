import PropTypes from 'prop-types';
import { Chip } from '@mui/material';
import React from 'react';

const Pressure = ({ num , title = null}) => {
    let color;
    if (num < 2 && num > 1){
        color = 'primary';
    }
    if (num <= 3.9 && num >= 2){
        color = 'success';
    }
    if (num >= 4 && num < 6){
        color = 'warning';
    }
    if (num <= 1 || num >= 6){
        color = 'error';
    }
    if (num > 7){
        color = 'secondary';
    }
    return <Chip label={!title ? num + ' bar': title} size="small" color={color} />;
};
Pressure.propTypes = {
  num: PropTypes.number,
  title: PropTypes.any
}

export default Pressure;
