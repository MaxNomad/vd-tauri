import PropTypes from 'prop-types';
import { Progress } from 'rsuite';
import { useTheme } from '@mui/material/styles';
import React from 'react';

const FillProgress = ({ data }) => {
    const theme = useTheme();
    let color;
    let tail;
    if (data < 1) {
        color = theme.palette.error.main;
        tail = theme.palette.error.lighter;
    }
    if (data < 2 && data > 1) {
        color = theme.palette.primary.main;
        tail = theme.palette.primary.lighter;
    }
    if (data <= 3.9 && data >= 2) {
        color = theme.palette.success.main;
        tail = theme.palette.success.lighter;
    }
    if (data >= 4 && data < 6) {
        color = theme.palette.warning.main;
        tail = theme.palette.warning.lighter;
    }
    if (data >= 6 && data < 7) {
        color = theme.palette.error.main;
        tail = theme.palette.error.lighter;
    }
    if (data > 7) {
        color = theme.palette.grey.A100;
        tail = theme.palette.grey.A200;
    }

    return (
        <Progress.Circle
            trailColor={tail}
            percent={data ? Number(((data / 10) * 100).toFixed(2)) : 0}
            strokeColor={color ? color : '#1890ff'}
        />
    );
};

FillProgress.propTypes = {
    data: PropTypes.number,
    type: PropTypes.object
};

export default FillProgress;
