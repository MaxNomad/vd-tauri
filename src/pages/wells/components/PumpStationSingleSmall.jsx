import MainCard from '@components/MainCard';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Grid, Stack, Typography, Box, Divider, Tooltip, Chip, Badge } from '@mui/material';
import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import TimeAgo from '@pages/counters/components/timeAgo';
import AlarmStatus from '@pages/kns/items/GetAlert';
import Pressure from '@pages/pumpStations/items/Pressure';
import CheckOnline from '@pages/kns/items/CheckOnline';
import NumberWithAnimation from '@pages/kns/components/NumberWithAnimation';
import FillCircleWell from '../items/FillCircleWell';

const PumpStationSingleSmall = ({ data }) => {
    const theme = useTheme();
    const [searchParams] = useSearchParams();
    const AlarmColor = () => {
        let color = theme.palette.mode === 'dark' ? theme.palette.divider : theme.palette.grey.A800;
        if (data?.online) {
            if (data?.alarmStatus === 2) {
                color = theme.palette.warning.main;
            } else if (data?.alarmStatus === 1) {
                color = theme.palette.error.main;
            }
        } else {
            color = theme.palette.secondary.main;
        }
        return color;
    };

    return (
        <>
            <Grid item xs={12} sm={6} md={4} lg={4} xl={4} UWHD={3}>
                <Link to={`/pumpstation-single?id=${data?.nsID}`} style={{ textDecoration: 'none' }}>
                    <MainCard contentSX={{ p: 1.25, borderColor: AlarmColor() }} hoverActive borderCustom>
                        <Grid container rowSpacing={4.5} columnSpacing={2.75}>
                        <Grid item xs={12}>
                                        <Typography variant="h5" color="textSecondary">
                                            НС №{data?.nsID} - {data?.address}
                                        </Typography>
                                    </Grid>
                            {data?.maintenance ? (
                                <>
                                    <Grid item xs={12} sm={12} md={12} lg={12} sx={{ mt: -2.25, mb: -2 }}>
                                        <Box direction="column" align="center">
                                            <Typography variant="h5" color="textSecondary" sx={{ mt: 16 }}>
                                                Технічне обслуговування НС №{data?.pnsID}
                                            </Typography>
                                            <Typography variant="h6" color="textSecondary" sx={{ mb: 16 }}>
                                                Керування відключено
                                            </Typography>
                                        </Box>
                                    </Grid>
                                </>
                            ) : data?.online ? (
                                <>
                                    <Grid item  xs={4} sm={12} md={4} lg={4} sx={{ mt: -2.25, ml: 2 }}>
                                        <FillCircleWell data={data}/>
                                    </Grid>
                                    <Grid item  xs={7} sm={12} md={7} lg={7} sx={{ mt: -2.25 }}>
                                    <Typography variant="h6" color="textSecondary" sx={{ mt: -0.4 }}>
                                                Загальна ємність:&nbsp;&nbsp;
                                                <b>
                                                    <NumberWithAnimation number={data?.levels?.global} rev /> м³{' '}
                                                </b>{' '}
                                                (
                                                <NumberWithAnimation
                                                    number={((data?.levels?.global / data?.levels?.max) * 100).toFixed(1)}
                                                    rev
                                                />{' '}
                                                %)
                                            </Typography>
                                            <Typography variant="h6" color="textSecondary" sx={{ mt: 1 }}>
                                                Максимальна ємність:&nbsp;&nbsp;
                                                <b>
                                                    <NumberWithAnimation number={data?.levels?.max} rev /> м³{' '}
                                                </b>
                                            </Typography>
                                            <Typography variant="h6" color="textSecondary" sx={{ mt: 1.4 }}>
                                                Загальний вхідний потік:&nbsp;&nbsp;
                                                <b>
                                                    <NumberWithAnimation number={(data?.inputFlow ?? 0).toFixed(0)} one /> м³/год.{' '}
                                                </b>
                                            </Typography>
                                            <Typography variant="h6" color="textSecondary" sx={{ mt: 1.4 }}>
                                                Загальний вихідний потік:&nbsp;&nbsp;
                                                <b>
                                                    <NumberWithAnimation number={(data?.outputFlow ?? 0).toFixed(0)} one /> м³/год.{' '}
                                                </b>
                                            </Typography>
                                    </Grid>
                                </>
                            ) : (
                                <>
                                    <Grid item xs={12} sm={12} md={12} lg={12} sx={{ mt: -2.25, mb: -2 }}>
                                        <Box direction="column" align="center">
                                            {data?.exist ? (
                                                <>
                                                    <Typography variant="h5" color="textSecondary" sx={{ mt: 16 }}>
                                                        Відсутнє підкнючення до НС №{data?.nsID}
                                                    </Typography>
                                                    <Typography variant="h6" color="textSecondary" sx={{ mb: 16 }}>
                                                        <TimeAgo targetTime={new Date(data.lastUpdate)} text="Востаннє в мережі" />
                                                    </Typography>
                                                </>
                                            ) : (
                                                <>
                                                    <Typography variant="h5" color="textSecondary" sx={{ mt: 16 }}>
                                                        Відсутні дані про НС № {data?.nsID}
                                                    </Typography>
                                                    <Typography variant="h6" color="textSecondary" sx={{ mb: 16 }}>
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
            </Grid>
        </>
    );
};

PumpStationSingleSmall.propTypes = {
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
        pumpID: PropTypes.string,
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
export default React.memo(PumpStationSingleSmall);
