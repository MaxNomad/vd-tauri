import MainCard from '@components/MainCard';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Grid, Stack, Typography, Box, Divider, Tooltip, Chip, IconButton, Link as MuiLink } from '@mui/material';
import React from 'react';

import CheckOnline from '@pages/kns/items/CheckOnline';
import AlarmStatus from '@pages/kns/items/GetAlert';
import WorkStatus from '@pages/kns/items/WorkSatatus';
import PumpStatusClear from '../items/PumpStatusClear';
import Pressure from '../items/Pressure';
import { useTheme } from '@mui/material/styles';
import CopyToClipboard from 'react-copy-to-clipboard';
import { CopyOutlined, RiseOutlined } from '@ant-design/icons';
import { toastSuccess } from '@pages/components-overview/toasts';
import NumberWithAnimation from '@pages/kns/components/NumberWithAnimation';
import PumpStatus from '@pages/kns/items/PumpStatus';
import TankStatus from '../items/TankStatus';
import TimeAgo from '@pages/counters/components/timeAgo';
import BranchStatus from '../items/branchStatus';

const PnsSingle = ({ data, lastUpdate }) => {
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
    const renderPumps = Array.isArray(data.pumps)
        ? data.pumps.map((pump) => {
              return <PumpStatus isOnline={pump?.pumpActive} key={pump?.pumpID} cols={2} current={1} />;
          })
        : null;
    const renderTanks = Array.isArray(data.levels.current)
        ? data.levels.current.map((tank) => {
              return tank.exist ? <TankStatus props={tank} cols={2} /> : null;
          })
        : null;

    const renderBranches = Array.isArray(data.outputBranches)
        ? data.outputBranches.map((branch) => {
              return branch.exist ? <BranchStatus props={branch} cols={4} /> : null;
          })
        : null;
    return (
        <>
            <Grid item xs={12} sm={6} md={6} lg={6} UWHD={4}>
                <Tooltip title={`Переглянути інформацію про НС №${data?.nsID}`} placement="bottom">
                    <Link to={`/pumpstation-single?id=${data?.nsID}`} style={{ textDecoration: 'none' }}>
                        <MainCard contentSX={{ p: 2.25, borderColor: AlarmColor() }} borderCustom hoverActive>
                            <Grid container rowSpacing={4.5} columnSpacing={2.75}>
                                <Grid item xs={9} sm={6} md={6} lg={8}>
                                    <Typography variant="h5" color="textSecondary">
                                        НС №{data?.nsID} - {data?.address}
                                    </Typography>
                                </Grid>
                                <Grid item xs={3} sm={6} md={6} lg={4} display="flex" justifyContent="flex-end">
                                    <CheckOnline isOnline={data?.online} />
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
                                        <Grid item xs={12} sm={12} md={12} lg={12} sx={{ mt: -2.75 }}>
                                            <Typography variant="h6" color="textSecondary">
                                                Аварії:&nbsp;&nbsp;
                                                <AlarmStatus current={data?.alarmStatus} />
                                            </Typography>
                                            <Divider sx={{ mt: 1 }} />
                                        </Grid>

                                        <Grid item xs={12} sm={6} md={6} lg={6} sx={{ mt: -2.75 }}>
                                            <Typography variant="h5" color="textSecondary">
                                                Загальні дані
                                            </Typography>
                                            <Typography variant="h6" color="textSecondary" sx={{ mt: 1.4 }}>
                                                Вихідний тиск на місто:&nbsp;&nbsp;
                                                <Pressure num={data?.outputPressure} />
                                                &nbsp;
                                            </Typography>

                                            <Typography variant="h6" color="textSecondary" sx={{ mt: 1.4 }}>
                                                Загальний вхідний потік:&nbsp;&nbsp;
                                                <b>
                                                    <NumberWithAnimation number={(data?.inputFlow ?? 0).toFixed(2)} one /> м³/год.{' '}
                                                </b>
                                            </Typography>
                                            <Typography variant="h6" color="textSecondary" sx={{ mt: 1.4 }}>
                                                Загальний вихідний потік:&nbsp;&nbsp;
                                                <b>
                                                    <NumberWithAnimation number={(data?.outputFlow ?? 0).toFixed(2)} one /> м³/год.{' '}
                                                </b>
                                            </Typography>
                                        </Grid>

                                        <Grid item xs={12} sm={6} md={6} lg={6} sx={{ mt: -2.75 }}>
                                            <Typography variant="h5" color="textSecondary">
                                                Резервуар
                                            </Typography>
                                            <Typography variant="h6" color="textSecondary" sx={{ mt: 1.4 }}>
                                                Загальна ємність:&nbsp;&nbsp;
                                                <b>
                                                    <NumberWithAnimation number={data?.levels?.global} rev /> м³{' '}
                                                </b>{' '}
                                                (
                                                <NumberWithAnimation
                                                    number={((data?.levels?.global / data?.levels?.max) * 100).toFixed(2)}
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
                                        </Grid>
                                        
                                        <Grid item xs={12} sx={{ mt: -2.25 }}>
                                        <Divider/>
                                        </Grid>
                                        {renderBranches}
                                        
                                        <Grid item xs={12} sx={{ mt: -2.25 }}>
                                            <Typography variant="h5" color="textSecondary">
                                                Насоси
                                                <Divider />
                                            </Typography>
                                        </Grid>
                                        {renderPumps}
                                        <Grid item xs={12} sx={{ mt: -3.25 }}>
                                            <Typography variant="h5" color="textSecondary">
                                                Резервуари
                                                <Divider />
                                            </Typography>
                                        </Grid>
                                        {renderTanks[0] !== null ? (
                                            renderTanks
                                        ) : (
                                            <Grid item xs={12} sm={12} md={12} lg={12} sx={{ mt: -2.25, mb: -2 }}>
                                                <Box direction="column" align="center">
                                                    <Typography variant="h5" color="textSecondary" sx={{ mt: 5 }}>
                                                        Резервуарів не виявлено
                                                    </Typography>
                                                    <Typography variant="h6" color="textSecondary" sx={{ mb: 7 }}>
                                                        Перерірте налаштування
                                                    </Typography>
                                                </Box>
                                            </Grid>
                                        )}
                                    </>
                                ) : (
                                    <>
                                        <Grid item xs={12} sm={12} md={12} lg={12} sx={{ mt: -2.25, mb: -2 }}>
                                            <Box direction="column" align="center">
                                                {data?.exist ? (
                                                    <>
                                                        <Typography variant="h5" color="textSecondary" sx={{ mt: 16 }}>
                                                            Відсутнє підкнючення до НС №{data?.pnsID}
                                                        </Typography>
                                                        <Typography variant="h6" color="textSecondary" sx={{ mb: 16 }}>
                                                            <TimeAgo targetTime={new Date(lastUpdate)} text="Востаннє в мережі" />
                                                        </Typography>
                                                    </>
                                                ) : (
                                                    <>
                                                        <Typography variant="h5" color="textSecondary" sx={{ mt: 16 }}>
                                                            Відсутні дані про НС № {data?.pnsID}
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
                </Tooltip>
                <br />
            </Grid>
        </>
    );
};

PnsSingle.propTypes = {
    Alarm: PropTypes.number,
    data: PropTypes.shape({
        InstWconsumption: PropTypes.any,
        address: PropTypes.string,
        alarmStatus: PropTypes.number,
        exist: PropTypes.bool,
        maintenance: PropTypes.bool,
        online: PropTypes.bool,
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
export default React.memo(PnsSingle);
