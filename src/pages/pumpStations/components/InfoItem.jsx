import PropTypes from 'prop-types';
import MainCard from '@components/MainCard';
import { Grid, Typography, Box, Divider } from '@mui/material';
import React from 'react';
import FillProgress from '../items/GetProgressVertical';
import PressureList from '../items/PressureList';
import PumpStatusClear from '../items/PumpStatusClear';
import WorkStatus from '@pages/kns/items/WorkSatatus';
import Pressure from '../items/Pressure';
import { useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';

const InfoItem = ({ data }) => {
    const theme = useTheme();
    const matchDownMD = useMediaQuery(theme.breakpoints.up('sm'));
    const hardVoltage = 400;
    const CircleStyle = {
        width: matchDownMD ? '10em' : '8.5em',
        padding: 5
    };
    return (
        <>
            {' '}
            <MainCard sx={{ mt: 2, pb: 0.7 }}>
                <Grid container>
                    <Grid item xs={4} md={5} lg={3}>
                        <Box style={CircleStyle}>
                            <FillProgress data={data?.pressure} />
                        </Box>
                    </Grid>
                    <Grid item xs={8} md={8} lg={9}>
                        <Grid item xs={12} sm={12} md={12} lg={12} sx={{ ml: 3 }}>
                            <Typography variant="h6" color="textSecondary" sx={{ mt: 0 }}>
                                Напрацьовано:&nbsp;&nbsp;{data?.pump?.engineHours}&nbsp;<b>Год</b>
                            </Typography>
                            <Typography variant="h6" color="textSecondary" sx={{ mt: 1.4 }}>
                                Кількість запусків:&nbsp;&nbsp;<b>{data?.pump?.runTimes}</b>
                            </Typography>
                            <Typography variant="h6" color="textSecondary" sx={{ mt: 1.4 }}>
                                Тиск:&nbsp;&nbsp;
                                <Pressure num={data?.pressure} />
                                &nbsp;
                            </Typography>
                            <Typography variant="h6" color="textSecondary" sx={{ mt: 1.4 }}>
                                Миттєва втрата:&nbsp;&nbsp;{data?.InstWconsumption}&nbsp;<b>м³/год</b>
                            </Typography>
                            <Typography variant="h6" color="textSecondary" sx={{ mt: 1.4 }}>
                                Показник лічильника:&nbsp;&nbsp;{data?.waterMeter}&nbsp;<b>м³</b>
                            </Typography>
                        </Grid>
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} lg={12} sx={{ mt: 2 }}>
                        <Typography variant="h5" color="textSecondary">
                            Насос
                        </Typography>
                        <Divider sx={{ mt: 0, mb: 2 }} />
                    </Grid>
                    <Grid item xs={12} md={12} lg={12}>
                        <Grid container lg={12} sx={{ mt: -1.5 }}>
                            <Grid item lg={6} md={6} xs={6}>
                                <Typography variant="h6" color="textSecondary" sx={{ mt: 1 }}>
                                    Режим:&nbsp;&nbsp;
                                    <WorkStatus current={data?.pump?.mode} />
                                </Typography>
                            </Grid>

                            <Grid
                                item
                                lg={6}
                                md={6}
                                xs={6}
                                sx={{ display: { md: 'flex', xs: 'flex' }, justifyContent: { md: 'flex-end', xs: 'flex-end' } }}
                            >
                                <Typography variant="h6" color="textSecondary" sx={{ mt: 1 }}>
                                    Статус:&nbsp;&nbsp;
                                    <PumpStatusClear isOnline={data?.pump?.workingStatus} />
                                </Typography>
                            </Grid>
                        </Grid>
                        <Divider sx={{ mt: 1 }} />
                        <p />
                        <Typography variant="h6" color="textSecondary" sx={{ mt: 1.7 }}>
                            Споживання:&nbsp;&nbsp;
                            <b>
                                {(hardVoltage * (data?.pump?.currentAmpsL1 + data?.pump?.currentAmpsL2 + data?.pump?.currentAmpsL3)) / 1000}{' '}
                                Кв/год.
                            </b>{' '}
                            ({data?.pump?.voltagePers}%)
                        </Typography>
                        <p />
                        <Typography variant="h6" color="textSecondary" sx={{ mt: 1 }}>
                            Напруга:&nbsp;&nbsp;<b>{hardVoltage} В.</b>
                        </Typography>
                        <p />
                        <Typography variant="h6" color="textSecondary" sx={{ mt: 0.9 }}>
                            <b>L1:</b> {data?.pump?.currentAmpsL1 ?? 0}A | <b>L2:</b> {data?.pump?.currentAmpsL2 ?? 0}A | <b>L3:</b>{' '}
                            {data?.pump?.currentAmpsL3 ?? 0}A
                        </Typography>
                    </Grid>
                    <Grid item lg={12} sx={{ mt: 2 }}>
                        <Divider />
                    </Grid>
                    <PressureList />
                </Grid>
            </MainCard>
        </>
    );
};

InfoItem.propTypes = {
    data: PropTypes.shape({
        InstWconsumption: PropTypes.number,
        pressure: PropTypes.number,
        pump: PropTypes.shape({
            currentAmpsL1: PropTypes.number,
            currentAmpsL2: PropTypes.number,
            currentAmpsL3: PropTypes.number,
            engineHours: PropTypes.number,
            mode: PropTypes.number,
            runTimes: PropTypes.number,
            voltagePers: PropTypes.number,
            workingStatus: PropTypes.bool
        }),
        waterMeter: PropTypes.number
    }),
    levels: PropTypes.object
};
export default React.memo(InfoItem);
