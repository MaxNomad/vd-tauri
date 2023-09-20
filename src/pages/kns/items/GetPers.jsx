import PropTypes from 'prop-types';
import { Chip } from '@mui/material';
import React from 'react';
const GetPers = ({ levels }) => {
    let color;
    if (levels?.current < levels?.first) {
        color = 'primary';
    }
    if (levels?.current > levels?.first) {
        color = 'success';
    }
    if (levels?.current > levels?.second) {
        color = 'warning';
    }
    if (levels?.current > levels?.third) {
        color = 'error';
    }
    if (levels?.current > levels?.max) {
        color = 'secondary';
    }
    return <Chip label={levels ? `${((levels?.current / levels?.max) * 100).toFixed(2)} %` : 'Не визначено'} size="small" color={color ? color : "error"} />;



};

GetPers.propTypes = {
    levels: PropTypes.object
};

export default GetPers;