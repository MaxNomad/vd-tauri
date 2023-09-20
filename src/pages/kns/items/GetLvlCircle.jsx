import PropTypes from 'prop-types';
import { Progress } from 'rsuite';
import { useTheme } from '@mui/material/styles';
import LiquidFillGauge from 'react-liquid-gauge';
import { useMediaQuery } from '@mui/material';

import React from 'react';
import config from '@config';

const FillCircle = ({ levels }) => {
    const theme = useTheme();
    const matchDownMD = useMediaQuery(theme.breakpoints.up('sm'));

    const fractionAsInt = (value) => {
        let str = ("" + value).split(".")[1];
        return str ? + str : "00";
    }
    const CircleStyle = {
        width: matchDownMD ? 142 : 100,
        padding: 5
    };
    let color;
    let tail;
    let tail2;

    if (levels?.current <= levels?.first) {
        color = theme.palette.primary.main;
        tail = theme.palette.primary.lighter;
        tail2 = theme.palette.primary.dark;
    }
    if (levels?.current >= levels?.first) {
        color = theme.palette.success.main;
        tail = theme.palette.success.lighter;
        tail2 = theme.palette.success.dark;
    }
    if (levels?.current >= levels?.second) {
        color = theme.palette.warning.main;
        tail = theme.palette.warning.lighter;
        tail2 = theme.palette.warning.dark;
    }
    if (levels?.current >= levels?.third) {
        color = theme.palette.error.main;
        tail = theme.palette.error.lighter;
        tail2 = theme.palette.error.dark;
    }
    if (levels?.current >= levels?.max) {
        color = theme.palette.grey.A100;
        tail = theme.palette.grey.A200;
        tail2 = theme.palette.grey.A200;
    }
    const gradientStops = [
        {
            key: levels?.current,
            stopColor: tail,
            stopOpacity: 1,
            offset: levels?.current
        },
    ];
    
    const value = levels ? Number(((levels?.current / levels?.max) * 100).toFixed(2)) : 0
    return !JSON.parse(localStorage.liqChartsPreset || config.liqChartsPreset) ? <Progress.Circle trailColor={tail} percent={value} strokeColor={color ? color : '#1890ff'} /> : <LiquidFillGauge
        value={parseInt(value)}
        percent={`.${fractionAsInt(value)}%`}
        width={CircleStyle.width}
        height={CircleStyle.width}
        textSize={0.7}
        textOffsetX={0}
        textOffsetY={0}
        gradientStops={gradientStops}
        riseAnimation
        waveAnimation
        waveFrequency={2}
        waveAmplitude={1}
        gradient
        circleStyle={{
            fill: color ? color : '#1890ff'
        }}
        textStyle={{
            fill: theme.palette.secondary.dark,

        }}
        waveTextStyle={{
            fill: theme.palette.secondary.dark,
        }}
    />;
};

FillCircle.propTypes = {
    levels: PropTypes.object
};

export default React.memo(FillCircle);