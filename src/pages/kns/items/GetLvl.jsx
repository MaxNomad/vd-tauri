import PropTypes from 'prop-types';
import { Chip } from '@mui/material';
import React from 'react';
const FillStatus = ({ levels }) => {
    let color;
    let title;

    if (levels?.current <= levels?.first) {
        color = 'primary';
        title = 'Низький';
    }
    if (levels?.current >= levels?.first) {
        color = 'success';
        title = 'Середній';
    }
    if (levels?.current >= levels?.second) {
        color = 'warning';
        title = 'Вище середнього';
    }
    if (levels?.current >= levels?.third) {
        color = 'error';
        title = 'Високий';
    }
    if (levels?.current >= levels?.max) {
        color = 'secondary';
        title = 'Критичний';
    }
    return <Chip label={levels ? title : 'Не визначено'} size="small" color={levels ? color : 'primary'} />;
};

FillStatus.propTypes = {
    levels: PropTypes.object
};
export default FillStatus;
