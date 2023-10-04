import MainCard from '@components/MainCard';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Grid, Stack, Typography, Box, Divider, Tooltip, Chip } from '@mui/material';
import React from 'react';

import CheckOnline from '@pages/kns/items/CheckOnline';
import AlarmStatus from '@pages/kns/items/GetAlert';
import WorkStatus from '@pages/kns/items/WorkSatatus';
import PumpStatusClear from '../items/PumpStatusClear';
import Pressure from '../items/Pressure';
import { useTheme } from '@mui/material/styles';
import TimeAgo from '@pages/counters/components/timeAgo';
import AlertsCount from '@pages/kns/items/AlertsCount';
import NumberWithAnimation from '@pages/kns/components/NumberWithAnimation';

const PumpSingle = ({ data, lastUpdate }) => {
    const theme = useTheme();
    const AlarmColor = () => {
        let color = theme.palette.mode === 'dark' ? theme.palette.divider : theme.palette.grey.A800;
        if (data?.online) {
            if (data?.alarmStatus === 2) {
                color = theme.palette.warning.main;
            } else if (data?.alarmStatus === 1) {
                color = theme.palette.error.main;
            }
        }
        return color;
    };

    return (
        <>
            <Grid item xs={12} sm={12} md={6} lg={6} xl={4} UWHD={3}>
                <Tooltip title={`Переглянути інформацію про свердловину №${data?.pumpID}`} placement="bottom">
                    <Link to={`/pump-single?id=${data?.pumpID}`} style={{ textDecoration: 'none' }}>
                        <MainCard contentSX={{ p: 2.25, borderColor: AlarmColor() }} hoverActive borderCustom>
                            <Grid container rowSpacing={4.5} columnSpacing={2.75}>
                                <Grid item xs={9} sm={6} md={6} lg={8}>
                                    <Typography variant="h5" noWrap color="textSecondary">
                                        Свердловина №{data?.pumpID} - {data?.address}
                                    </Typography>
                                </Grid>
                                <Grid item xs={3} sm={6} md={6} lg={4} display="flex" justifyContent="flex-end">
                                    <CheckOnline isOnline={data?.online} />
                                </Grid>
                                {data?.maintenance ? (
                                    <>
                                        <Grid item xs={12} sm={12} md={12} lg={12} sx={{ mt: -2.25, mb: -2 }}>
                                            <Box direction="column" align="center">
                                                <Typography variant="h5" color="textSecondary" sx={{ mt: { md: 17, xs: 5 } }}>
                                                    Технічне обслуговування свердловини №{data?.pumpID}
                                                </Typography>
                                                <Typography variant="h6" color="textSecondary" sx={{ mb: { md: 17.8, xs: 5 } }}>
                                                    Керування відключено
                                                </Typography>
                                            </Box>
                                        </Grid>
                                    </>
                                ) : data?.online ? (
                                    <>
                                        <Grid item xs={5} sm={6} md={6} lg={6} sx={{ mt: -2.75 }}>
                                            <Typography variant="h6" color="textSecondary">
                                                Аварії:&nbsp;&nbsp;
                                                <AlarmStatus current={data?.alarmStatus} />
                                            </Typography>
                                        </Grid>
                                        <Grid
                                            item
                                            xs={7}
                                            sm={6}
                                            md={6}
                                            lg={6}
                                            display="flex"
                                            sx={{ mt: -2.75, justifyContent: 'flex-end' }}
                                        >
                                            <Typography variant="h6" color="textSecondary">
                                                Аварії за тиждень:&nbsp;&nbsp;
                                                <AlertsCount count={0} />
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={12} sm={12} md={12} lg={12} sx={{ mt: -3.75, mb: -0.5 }}>
                                            <Divider sx={{ mt: 1 }} />
                                        </Grid>
                                        <Grid item xs={12} sm={5.5} md={5.5} lg={5.5} sx={{ mt: -2.75 }}>
                                            <Typography variant="h6" color="textSecondary">
                                                <TimeAgo targetTime={new Date(lastUpdate)} text="Оновлено" />
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={12} sm={6} md={6} lg={6} sx={{ mt: -2.75 }}>
                                            <Typography variant="h6" color="textSecondary">
                                                Версія схеми&nbsp;&nbsp;
                                                <Chip label={data?.scheme} variant="combined" color="success" size="small" />
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={12} sm={5.5} md={5.5} lg={5.5} sx={{ mt: -2.75 }}>
                                            <Typography variant="h5" color="textSecondary">
                                                Загальні дані
                                            </Typography>
                                            <Typography variant="h6" color="textSecondary" sx={{ mt: 1.4 }}>
                                                Напрацьовано:&nbsp;&nbsp;
                                                <NumberWithAnimation number={(data?.pump?.engineHours ?? 0).toFixed(0)} one />
                                                &nbsp;<b>Год</b>
                                            </Typography>
                                            <Typography variant="h6" color="textSecondary" sx={{ mt: 1.4 }}>
                                                Кількість запусків:&nbsp;&nbsp;
                                                <b>
                                                    <NumberWithAnimation number={(data?.pump?.runTimes ?? 0).toFixed(0)} one />
                                                </b>
                                            </Typography>
                                            <Typography variant="h6" color="textSecondary" sx={{ mt: 1.4 }}>
                                                Тиск:&nbsp;&nbsp;
                                                <Pressure num={data?.pressure === -1 ? 'NaN' : data?.pressure} />
                                                &nbsp;
                                            </Typography>
                                            <Typography variant="h6" color="textSecondary" sx={{ mt: 1.4 }}>
                                                Лічильник води:&nbsp;&nbsp;
                                                <NumberWithAnimation number={(data?.waterMeter ?? 0).toFixed(0)} one />
                                                &nbsp;<b>м³</b>
                                            </Typography>
                                            <Typography variant="h6" color="textSecondary" sx={{ mt: 1.4 }}>
                                                Миттєва втрата:&nbsp;&nbsp;
                                                <NumberWithAnimation number={(data?.InstWconsumption ?? 0).toFixed(0)} />
                                                &nbsp;<b>м³/год</b>
                                            </Typography>
                                        </Grid>

                                        <Grid item xs={12} sm={6.5} md={6.5} lg={6.5} sx={{ mt: -2.75 }}>
                                            <Typography variant="h5" color="textSecondary">
                                                Насос
                                            </Typography>
                                            <Typography variant="h6" color="textSecondary" sx={{ mt: 1 }}>
                                                Режим:&nbsp;&nbsp;
                                                <WorkStatus current={data?.pump?.mode} />
                                            </Typography>
                                            <Typography variant="h6" color="textSecondary" sx={{ mt: 1 }}>
                                                Статус:&nbsp;&nbsp;
                                                <PumpStatusClear isOnline={data?.pump?.workingStatus} />
                                            </Typography>

                                            <Divider sx={{ mt: 2 }} />
                                            <p />
                                            <Typography variant="h6" color="textSecondary" sx={{ mt: 1 }}>
                                                Споживання:&nbsp;&nbsp;
                                                <b>
                                                    <NumberWithAnimation
                                                        number={(
                                                            (data?.voltage_L1 * data?.pump?.currentAmpsL1 +
                                                                data?.voltage_L2 * data?.pump?.currentAmpsL2 +
                                                                data?.voltage_L3 * data?.pump?.currentAmpsL3) /
                                                            1000
                                                        ).toFixed(2)}
                                                    />{' '}
                                                    Кв/год.
                                                </b>{' '}
                                                {data?.pump?.voltagePers != null ? `(${data?.pump.voltagePers}%)` : ''}
                                            </Typography>
                                            <p />
                                            <Typography variant="h6" color="textSecondary" sx={{ mt: 0.9 }}>
                                                <b>L1:</b> <NumberWithAnimation number={(data?.voltage_L1 ?? 0).toFixed(0)} />V | <b>L2:</b>{' '}
                                                <NumberWithAnimation number={(data?.voltage_L2 ?? 0).toFixed(0)} />V | <b>L3:</b>{' '}
                                                <NumberWithAnimation number={(data?.voltage_L3 ?? 0).toFixed(0)} />V
                                            </Typography>
                                            <p />
                                            <Typography variant="h6" color="textSecondary" sx={{ mt: 0.9 }}>
                                                <b>L1:</b> <NumberWithAnimation number={(data?.pump?.currentAmpsL1 ?? 0).toFixed(2)} rev />A
                                                | <b>L2:</b>{' '}
                                                <NumberWithAnimation number={(data?.pump?.currentAmpsL2 ?? 0).toFixed(2)} rev />A |{' '}
                                                <b>L3:</b> <NumberWithAnimation number={(data?.pump?.currentAmpsL3 ?? 0).toFixed(2)} rev />A
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={12} sm={12} md={12} lg={12} sx={{ mt: -3.25 }}>
                                            <Typography variant="h6" color="textSecondary">
                                                Лічильник електроенергії:&nbsp;&nbsp;
                                                <NumberWithAnimation number={(data?.energyMeter ?? 0).toFixed(2)} one />
                                                &nbsp;<b>Кв.год.</b>
                                            </Typography>
                                        </Grid>
                                    </>
                                ) : (
                                    <>
                                        <Grid item xs={12} sm={12} md={12} lg={12} sx={{ mt: -2.25, mb: -2 }}>
                                            <Box direction="column" align="center">
                                                {data?.exist ? (
                                                    <>
                                                        <Typography variant="h5" color="textSecondary" sx={{ mt: { md: 17, xs: 5 } }}>
                                                            Відсутнє підкнючення до свердловини №{data?.pumpID}
                                                        </Typography>
                                                        <Typography variant="h6" color="textSecondary" sx={{ mb: { md: 17.9, xs: 5 } }}>
                                                            <TimeAgo targetTime={new Date(lastUpdate)} text="Востаннє в мережі" />
                                                        </Typography>
                                                    </>
                                                ) : (
                                                    <>
                                                        <Typography variant="h5" color="textSecondary" sx={{ mt: { md: 17, xs: 5 } }}>
                                                            Відсутні дані про свердловину № {data?.pumpID}
                                                        </Typography>
                                                        <Typography variant="h6" color="textSecondary" sx={{ mb: { md: 17.8, xs: 5 } }}>
                                                            Перевірте налашутвання панелі.
                                                        </Typography>
                                                    </>
                                                )}
                                            </Box>
                                        </Grid>
                                    </>
                                )}
                            </Grid>
                        </MainCard>
                    </Link>
                </Tooltip>
                <br />
            </Grid>
        </>
    );
};

PumpSingle.propTypes = {
    Alarm: PropTypes.number,
    data: PropTypes.shape({
        InstWconsumption: PropTypes.any,
        address: PropTypes.string,
        alarmStatus: PropTypes.number,
        exist: PropTypes.bool,
        maintenance: PropTypes.bool,
        online: PropTypes.bool,
        voltage: PropTypes.number,
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
        pumpID: PropTypes.number,
        waterMeter: PropTypes.number
    }),
    exist: PropTypes.bool,
    id: PropTypes.number,
    isOnline: PropTypes.bool,
    lastUpdate: PropTypes.string,
    levels: PropTypes.object,
    location: PropTypes.string,
    maintenance: PropTypes.bool,
    workers: PropTypes.array
};
export default React.memo(PumpSingle);
