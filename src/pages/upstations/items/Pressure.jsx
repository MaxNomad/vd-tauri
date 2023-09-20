import PropTypes from 'prop-types';
import { Chip } from '@mui/material';
import React from 'react';

const Pressure = ({ num, title = null, levelsInput, levelsOutput }) => {
    let color;
    if (levelsInput?.min + 1 < 2 && num > levelsInput?.min) {
        color = 'primary';
    }
    if (num <= levelsInput?.norm && num >= levelsInput?.norm - 1.5) {
        color = 'success';
    }
    if (num >= levelsInput?.norm && num < levelsInput?.norm + 1.5) {
        color = 'warning';
    }
    if (num <= levelsInput?.min || num >= levelsInput?.max) {
        color = 'error';
    }
    if (num > 8) {
        color = 'secondary';
    }

    let colorOut;
    if (levelsOutput?.min + 1 < 2 && num > levelsOutput?.min) {
        colorOut = 'primary';
    }
    if (num <= levelsOutput?.norm && num >= levelsOutput?.norm - 1.5) {
        colorOut = 'success';
    }
    if (num >= levelsOutput?.norm && num < levelsOutput?.norm + 1.5) {
        colorOut = 'warning';
    }
    if (num <= levelsOutput?.min || num >= levelsOutput?.max) {
        colorOut = 'error';
    }
    if (num > 8) {
        colorOut = 'secondary';
    }
    if (levelsInput) {
        return <Chip label={!title ? (num ?? 0).toFixed(2) + ' bar' : title} size="small" color={color} />;
    } else {
        return <Chip label={!title ? (num ?? 0).toFixed(2) + ' bar' : title} size="small" color={colorOut} />;
    }
    
};
Pressure.propTypes = {
    num: PropTypes.number,
    title: PropTypes.any
};

export default Pressure;
