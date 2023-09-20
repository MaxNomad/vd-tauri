import React, { useEffect, useState } from 'react';

// next

// material-ui
import { useTheme } from '@mui/material/styles';
import useConfig from 'hooks/useConfig';

// ==============================|| TOP CARD - RADIAL BAR CHART ||============================== //

const ProfileRadialChart = () => {
    const theme = useTheme();
    const { mode } = useConfig();

    const textPrimary = theme.palette.text.primary;
    const primary = theme.palette.primary.main;
    const grey0 = theme.palette.grey[0];
    const grey500 = theme.palette.grey[500];
    const grey200 = theme.palette.grey[200];

    const [series] = useState([30]);

    return <div id="chart"></div>;
};

export default ProfileRadialChart;
