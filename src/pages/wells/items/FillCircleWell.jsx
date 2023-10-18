import PropTypes from 'prop-types';
import { Progress } from 'rsuite';
import { useTheme } from '@mui/material/styles';
import LiquidFillGauge from 'react-liquid-gauge';
import { useMediaQuery } from '@mui/material';

import React from 'react';
import config from '@config';

const FillCircleWell = ({ data }) => {
    const theme = useTheme();
    const matchDownMD = useMediaQuery(theme.breakpoints.up('sm'));
    const fractionAsInt = (value) => {
        let str = ('' + value).split('.')[1];
        return str ? +str : '00';
    };
    const CircleStyle = {
        width: matchDownMD ? 100 : 100,
        padding: 5
    };
    const color = theme.palette.primary.main;
    const tail = theme.palette.primary.lighter;
    const tail2 = theme.palette.primary.dark;

    const gradientStops = [
        {
            stopColor: tail,
            stopOpacity: 1,
        }
    ];

    const value = data ? Number(((data?.levels?.global / data?.levels?.max) * 100).toFixed(2)) : 0;
    return !JSON.parse(localStorage.liqChartsPreset || config.liqChartsPreset) ? (
        <Progress.Circle trailColor={tail} percent={value} strokeColor={color ? color : '#1890ff'} />
    ) : (
        <LiquidFillGauge
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
                fill: theme.palette.secondary.dark
            }}
            waveTextStyle={{
                fill: theme.palette.secondary.dark
            }}
        />
    );
};

FillCircleWell.propTypes = {
    levels: PropTypes.object
};

export default React.memo(FillCircleWell);
