import MainCard from '@components/MainCard';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Grid, Stack, Typography, Box, Divider, Tooltip } from '@mui/material';
import React from 'react';
import CheckOnline from '@pages/kns/items/CheckOnline';
import AlarmStatus from '@pages/kns/items/GetAlert';
import FillCircle from '@pages/kns/items/GetLvlCircle';
import FillStatus from '@pages/kns/items/GetLvl';
import PumpStatus from '@pages/kns/items/PumpStatus';
import { useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import NumberWithAnimation from './NumberWithAnimation';
import AlertsCount from '../items/AlertsCount';
import TimeAgo from '@pages/counters/components/timeAgo';

const KnsSingle = ({ isOnline, id, Alarm, levels, workers, location, lastUpdate, exist, maintenance, count }) => {
    const theme = useTheme();
    const matchDownMD = useMediaQuery(theme.breakpoints.up('sm'));
    const CircleStyle = {
        width: matchDownMD ? '11.65em' : '1.65em',
        display: 'inline-block'
    };

    const AlarmColor = () => {
        let color = theme.palette.mode === 'dark' ? theme.palette.divider : theme.palette.grey.A800;
        if (isOnline) {
            if (levels?.max - 5 < levels?.current || Alarm === 2) {
                color = theme.palette.warning.main;
            } else if (Alarm === 1) {
                color = theme.palette.error.main;
            }
        }
        return color;
    };

    const renderPumps = workers.map((pump) => {
        return <PumpStatus isOnline={pump?.workingStatus} current={pump?.mode} key={pump?.pumpID} />;
    });
    return (
        <>
            <Grid item xs={12} sm={6} md={6} lg={4} UWHD={3}>
                <Tooltip title={`Переглянути інформацію про КНС №${id}`} placement="bottom">
                    <Link to={`/kns-single?id=${id}`} style={{ textDecoration: 'none' }}>
                        <MainCard contentSX={{ p: 2.25, borderColor: AlarmColor() }} hoverActive borderCustom>
                            <Grid container rowSpacing={4.5} columnSpacing={2.75}>
                                <Grid item xs={9} sm={9} md={9} lg={9}>
                                    <Typography variant="h5" noWrap color="textSecondary">
                                        КНС №{id} - {location}
                                    </Typography>
                                </Grid>
                                <Grid item xs={3} sm={3} md={3} lg={3} display="flex" justifyContent="flex-end">
                                    <CheckOnline isOnline={isOnline} />
                                </Grid>
                                {maintenance ? (
                                    <>
                                        <Grid item xs={12} sm={12} md={12} lg={12} sx={{ mt: -2.25, mb: -2 }}>
                                            <Box direction="column" align="center">
                                                <Typography variant="h5" color="textSecondary" sx={{ mt: 21 }}>
                                                    Технічне обслуговування КНС №{id}
                                                </Typography>
                                                <Typography variant="h6" color="textSecondary" sx={{ mb: 18.1 }}>
                                                    Керування відключено
                                                </Typography>
                                            </Box>
                                        </Grid>
                                    </>
                                ) : isOnline ? (
                                    <>
                                        <Grid item xs={5} sm={6} md={6} lg={6} sx={{ mt: -2.75 }}>
                                            <Typography variant="h6" color="textSecondary">
                                                Аварії: <AlarmStatus current={Alarm} />
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
                                                <AlertsCount count={count ?? 0} />
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={12} sm={12} md={12} lg={12} sx={{ mt: -2.75 }}>
                                            <Typography variant="h6" color="textSecondary">
                                                <TimeAgo targetTime={new Date(lastUpdate)} text="Оновлено" />
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={12} sx={{ mt: -3.25 }}>
                                            <Typography variant="h5" color="textSecondary">
                                                Резервуар
                                                <Divider />
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={5} sm={5} md={5} lg={4.5} sx={{ mt: -3.25 }}>
                                            <Box
                                                style={CircleStyle}
                                                sx={{
                                                    ml: { lg: 0, md: 1 },
                                                    mt: { lg: 0.8, md: 1, xs: 0.5 },
                                                    pl: { lg: 2, md: 1, xs: 0.5 },
                                                    pr: { lg: 2, md: 1, xs: 0.5 }
                                                }}
                                            >
                                                <FillCircle levels={levels} />
                                            </Box>
                                        </Grid>
                                        <Grid
                                            item
                                            xs={7}
                                            sm={7}
                                            md={7}
                                            lg={7.5}
                                            sx={{ mt: { lg: -1.8, md: 0.8, sm: -1.8, xs: -3.8, UWHD: -0.4 } }}
                                        >
                                            <Typography variant="h6" color="textSecondary">
                                                <p style={{ marginTop: 15 }} />
                                                Поточний рівень:{' '}
                                                <b>
                                                    <NumberWithAnimation number={levels?.current} rev /> см.
                                                </b>
                                                <p />
                                                Макс. рівень: <b>{levels?.max || 0} см.</b>
                                                <p />
                                                Стоп рівень: <b>{levels?.min || 0} см.</b>
                                                <p style={{ marginTop: 10 }} />
                                                Рівень: &nbsp;
                                                <FillStatus levels={levels} />
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={12} sx={{ mt: -4.25 }}>
                                            <Typography variant="h5" color="textSecondary">
                                                Насоси
                                                <Divider />
                                            </Typography>
                                        </Grid>
                                        {renderPumps}
                                    </>
                                ) : (
                                    <>
                                        <Grid item xs={12} sm={12} md={12} lg={12} sx={{ mt: -2.25, mb: -2 }}>
                                            <Box direction="column" align="center">
                                                {exist ? (
                                                    <>
                                                        <Typography variant="h5" color="textSecondary" sx={{ mt: { md: 23.5, xs: 5 } }}>
                                                            Відсутнє підкнючення до КНС №{id}
                                                        </Typography>
                                                        <Typography variant="h6" color="textSecondary" sx={{ mb: { md: 20, xs: 5 } }}>
                                                            <TimeAgo targetTime={new Date(lastUpdate)} text="Востаннє в мережі" />
                                                        </Typography>
                                                    </>
                                                ) : (
                                                    <>
                                                        <Typography variant="h5" color="textSecondary" sx={{ mt: { md: 21, xs: 5 } }}>
                                                            Відсутні дані про КНС№ {id}
                                                        </Typography>
                                                        <Typography variant="h6" color="textSecondary" sx={{ mb: { md: 18.1, xs: 5 } }}>
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

KnsSingle.propTypes = {
    isOnline: PropTypes.bool,
    location: PropTypes.string,
    id: PropTypes.number,
    Alarm: PropTypes.number,
    levels: PropTypes.object,
    workers: PropTypes.array,
    lastUpdate: PropTypes.string,
    exist: PropTypes.bool,
    maintenance: PropTypes.bool,
    count: PropTypes.number
};
export default React.memo(KnsSingle);
