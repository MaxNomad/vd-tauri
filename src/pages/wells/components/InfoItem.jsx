import PropTypes from 'prop-types';
import MainCard from '@components/MainCard';
import { Grid, Typography, Box, Divider, Button } from '@mui/material';
import React from 'react';
import FillProgress from '../items/GetProgressVertical';
import PressureList from '../items/PressureList';
import PumpStatusClear from '../items/PumpStatusClear';
import WorkStatus from '@pages/kns/items/WorkSatatus';
import Pressure from '../items/Pressure';
import { useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import TimeAgo from '@pages/counters/components/timeAgo';
import { ThunderboltOutlined } from '@ant-design/icons';

const InfoItem = ({ data }) => {
    const theme = useTheme();
    const matchDownMD = useMediaQuery(theme.breakpoints.up('sm'));

    return (
        <>
            {' '}
            <MainCard sx={{ mt: 2 }}>
                <Grid container>
                    <Grid item xs={12} md={12} lg={6}>
                        <Typography variant="h6" color="textSecondary">
                            Тиск:&nbsp;&nbsp;
                            <Pressure num={data?.pressure === -1 ? 'NaN' : data?.pressure} />
                        </Typography>
                        <Typography
                            variant="h6"
                            color="textSecondary"
                            sx={{ ml: -1.2, mt: 0.3, mb: { lg: -1.6 }, maxWidth: { md: 280, xs: 380 }, pr: 2 }}
                        >
                            <FillProgress data={data?.pressure} active={data?.pump?.workingStatus} />
                        </Typography>
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} lg={6}>
                        <Typography variant="h6" color="textSecondary" sx={{ mt: 0 }}>
                            Напрацьовано:&nbsp;&nbsp;{data?.pump?.engineHours}&nbsp;<b>Год</b>
                        </Typography>
                        {data?.pump?.runTimes != null ? (
                            <Typography variant="h6" color="textSecondary" sx={{ mt: 1.4 }}>
                                Кількість запусків:&nbsp;&nbsp;<b>{data?.pump?.runTimes}</b>
                            </Typography>
                        ) : null}
                        <Typography variant="h6" color="textSecondary" sx={{ mt: 1.4 }}>
                            Миттєва втрата:&nbsp;&nbsp;{data?.InstWconsumption}&nbsp;<b>м³/год</b>
                        </Typography>
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} lg={6}>
                        <Typography
                            variant="h6"
                            color="textSecondary"
                            sx={{ mt: { md: data?.energyMeter != null ? 1.4 : -2.75, xs: 1.4 } }}
                        >
                            Лічильник води:&nbsp;&nbsp;{data?.waterMeter}&nbsp;<b>м³</b>
                        </Typography>
                    </Grid>
                    {data?.energyMeter != null ? (
                        <Grid item xs={12} sm={12} md={12} lg={6}>
                            <Typography variant="h6" color="textSecondary" sx={{ mt: 1.4 }}>
                                Лічильник електроенергії:&nbsp;&nbsp;{data?.energyMeter}&nbsp;<b>Кв.год.</b>
                            </Typography>
                        </Grid>
                    ) : null}
                    <Grid item xs={12} sm={12} md={12} lg={12} sx={{ mt: 1.4 }}>
                        <Typography variant="h5" color="textSecondary">
                            Насос
                        </Typography>
                        <Divider sx={{ mt: 0, mb: 2 }} />
                    </Grid>
                    <Grid item xs={12} md={12} lg={12}>
                        <Grid container lg={12} sx={{ mt: -1.5 }}>
                            <Grid item lg={6} md={6} xs={6}>
                                <Typography variant="h6" color="textSecondary" sx={{ mt: 0.7 }}>
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
                                <Typography variant="h6" color="textSecondary" sx={{ mt: 0.7 }}>
                                    Статус:&nbsp;&nbsp;
                                    <PumpStatusClear isOnline={data?.pump?.workingStatus} />
                                </Typography>
                            </Grid>
                        </Grid>
                        <Divider sx={{ mt: 1 }} />
                        <p />
                        <Grid container lg={12}>
                            <Grid item xs={12} sm={12} md={12} lg={5}>
                                <Typography variant="h3" color="textSecondary" sx={{ mt: 2, display: 'flex' }}>
                                    <ThunderboltOutlined style={{ fontSize: 20, paddingTop: 5 }} />
                                    <b>
                                        {(
                                            (data?.voltage_L1 * data?.pump?.currentAmpsL1 +
                                                data?.voltage_L2 * data?.pump?.currentAmpsL2 +
                                                data?.voltage_L3 * data?.pump?.currentAmpsL3) /
                                            1000
                                        ).toFixed(4)}{' '}
                                    </b>{' '}
                                    <Typography variant="caption" color="textSecondary">
                                        &nbsp;&nbsp;Кв/год.
                                        <p />
                                        {data?.pump?.voltagePers != null ? (
                                            <Typography variant="caption" color="textSecondary" sx={{ mt: -10, ml: 0.7 }}>
                                                {data?.pump.voltagePers}%
                                            </Typography>
                                        ) : (
                                            ''
                                        )}
                                    </Typography>
                                </Typography>
                            </Grid>
                            <Grid item xs={12} sm={12} md={12} lg={7}>
                                <Typography variant="h6" color="textSecondary" sx={{ mt: 0.9 }}>
                                    <b>L1:</b> {(data?.voltage_L1 ?? 0).toFixed(2)}V | <b>L2:</b> {(data?.voltage_L2 ?? 0).toFixed(2)}V |{' '}
                                    <b>L3:</b> {(data?.voltage_L3 ?? 0).toFixed(2)}V
                                </Typography>
                                <p />
                                <Typography variant="h6" color="textSecondary" sx={{ mt: 0.9 }}>
                                    <b>L1:</b> {data?.pump?.currentAmpsL1 ?? 0}A | <b>L2:</b> {data?.pump?.currentAmpsL2 ?? 0}A | <b>L3:</b>{' '}
                                    {data?.pump?.currentAmpsL3}A
                                </Typography>
                            </Grid>
                        </Grid>
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
export default InfoItem;
