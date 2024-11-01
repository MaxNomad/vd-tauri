import MainCard from '@components/MainCard';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Grid, Stack, Typography, Box, Divider, Tooltip, Chip, IconButton, Link as MuiLink } from '@mui/material';
import React, { useMemo } from 'react';

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
import CheckSettings from '@components/third-party/checkSettings';
import TimeAgo from '@pages/counters/components/timeAgo';
import AlertsCount from '@pages/kns/items/AlertsCount';
import NetworkStatus from '@pages/counters/components/networkStatus';

const PnsPump = ({ props }) => {
    return (
        <>
            {' '}
            <Typography variant="h5" color="textSecondary" sx={{ mt: 2 }}>
                Насос №{props?.pumpID}
            </Typography>
            <Typography variant="h6" color="textSecondary" sx={{ mt: 1 }}>
                Статус:&nbsp;&nbsp;
                <PumpStatusClear isOnline={props?.pumpActive} />
            </Typography>
            <Typography variant="h6" color="textSecondary" sx={{ mt: 1 }}>
                Кількість запусків: {props?.runtimes}
            </Typography>
            <Typography variant="h6" color="textSecondary" sx={{ mt: 1 }}>
                Напрацьовано: {props?.runhours} год.
            </Typography>
        </>
    );
};

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
    const renderPns = data?.pumps?.map((pump) => {
        return pump?.pumpActive !== null ? <PnsPump props={pump} key={pump?.pumpID} /> : '';
    });
    return (
        <>
            <Grid item xs={12} sm={12} md={6} lg={6} xl={4} UWHD={3}>
                {/*<Tooltip title={`Переглянути інформацію про ПНС №${data?.pnsID}`} placement="bottom">*/}
                {/*  <Link to={`/pump-single?id=${data?.pnsID}`} style={{ textDecoration: 'none' }}> */}
                <MainCard contentSX={{ p: 2.25, borderColor: AlarmColor() }} borderCustom>
                    <Grid container rowSpacing={4.5} columnSpacing={2.75}>
                        <Grid item xs={8.2} sm={9} md={9} lg={8}>
                            <Typography noWrap variant="h5" color="textSecondary">
                                ПНС №{data?.pnsID} - {data?.address}
                            </Typography>
                        </Grid>
                        <Grid item xs={3.8} sm={3} md={3} lg={4} display="flex" justifyContent="flex-end" gap={0.3}>
                        
                        <NetworkStatus props={data?.signal} />&nbsp; <CheckSettings ok={data?.settingsStatus} /> <CheckOnline isOnline={data?.online} />
                        </Grid>
                        {data?.maintenance ? (
                            <>
                                <Grid item xs={12} sm={12} md={12} lg={12} sx={{ mt: -2.25, mb: -2 }}>
                                    <Box direction="column" align="center">
                                        <Typography variant="h5" color="textSecondary" sx={{ mt: 16 }}>
                                            Технічне обслуговування ПНС №{data?.pnsID}
                                        </Typography>
                                        <Typography variant="h6" color="textSecondary" sx={{ mb: 16 }}>
                                            Керування відключено
                                        </Typography>
                                    </Box>
                                </Grid>
                            </>
                        ) : data?.online ? (
                            <>
                                <Grid item xs={5} sm={6} md={6} lg={6} sx={{ mt: -2.75 }}>
                                    <Typography variant="h6" color="textSecondary">
                                        Аварії: <AlarmStatus current={data?.alarmStatus} />
                                    </Typography>
                                </Grid>
                                <Grid item xs={7} sm={6} md={6} lg={6} display="flex" sx={{ mt: -2.75, justifyContent: 'flex-end' }}>
                                    <Typography variant="h6" color="textSecondary">
                                        Аварії за тиждень:&nbsp;&nbsp;
                                        <AlertsCount count={0} />
                                    </Typography>
                                </Grid>
                                <Grid item xs={12} sm={12} md={12} lg={12} sx={{ mt: -3.75, mb: -0.5 }}>
                                    <Divider sx={{ mt: 1 }} />
                                </Grid>
                                <Grid item xs={12} sm={12} md={6} lg={6} sx={{ mt: -2.75 }}>
                                    <Typography variant="h6" color="textSecondary">
                                        <TimeAgo targetTime={new Date(lastUpdate)} text="Оновлено" />
                                    </Typography>
                                </Grid>
                                <Grid item xs={12} sm={12} md={6} lg={6} sx={{ mt: -2.75 }}>
                                    <Typography variant="h6" color="textSecondary">
                                        Версія схеми&nbsp;&nbsp;
                                        <Chip label={data?.scheme} variant="combined" color="success" size="small" />
                                    </Typography>
                                </Grid>
                                <Grid item xs={12} sm={6} md={6} lg={6} sx={{ mt: -2.75 }}>
                                    <Typography variant="h5" color="textSecondary">
                                        Загальні дані
                                    </Typography>
                                    <Typography variant="h6" color="textSecondary" sx={{ mt: 1.4 }}>
                                        Вхід. тиск:&nbsp;&nbsp;
                                        <Pressure num={data?.pressure_in} levelsInput={data?.levels?.input} />&nbsp;&nbsp;
                                        {data?.pressure_in_2 ? <Pressure num={data?.pressure_in_2} levelsInput={data?.levels?.input} /> : null}
                                        &nbsp;
                                    </Typography>
                                    <Typography variant="h6" color="textSecondary" sx={{ mt: 1.4 }}>
                                        Вихид. тиск:&nbsp;&nbsp;
                                        <Pressure num={data?.pressure_out} levelsOutput={data?.levels?.output} />&nbsp;&nbsp;
                                        {data?.pressure_out_2 ? <Pressure num={data?.pressure_out_2} levelsOutput={data?.levels?.output} /> : null}
                                        &nbsp;
                                    </Typography>
                                    <Typography variant="h5" color="textSecondary" sx={{ mt: 1.85 }}>
                                        Дані частотника
                                    </Typography>
                                    <Typography variant="h6" color="textSecondary" sx={{ mt: 1 }}>
                                        Частота:&nbsp;&nbsp;
                                        <b>
                                            <NumberWithAnimation number={data?.pumpFrequency} one /> Гц.{' '}
                                        </b>
                                    </Typography>
                                    <Typography variant="h6" color="textSecondary" sx={{ mt: 1 }}>
                                        Навантаження:&nbsp;&nbsp;
                                        <b>
                                            <NumberWithAnimation number={data?.pumpFrequencyPers} rev /> %{' '}
                                        </b>
                                    </Typography>
                                    <Divider sx={{ mt: 1 }} />
                                    <p />
                                    <Typography variant="h6" color="textSecondary" sx={{ mt: 1 }}>
                                        Споживання:&nbsp;&nbsp;
                                        <b>
                                            <NumberWithAnimation number={(data?.pumpСonsumption ?? 0).toFixed(2)} one /> Кв/год.
                                        </b>
                                    </Typography>

                                    <Typography variant="h6" color="textSecondary" sx={{ mt: 1 }}>
                                        Напруга:&nbsp;&nbsp;
                                        <b>
                                            <NumberWithAnimation number={data?.pumpVoltage} one /> В.
                                        </b>
                                    </Typography>

                                    <Typography variant="h6" color="textSecondary" sx={{ mt: 0.9 }}>
                                        <b>Струм:</b> <NumberWithAnimation number={(data?.pumpAmps ?? 0).toFixed(2)} one /> A
                                    </Typography>
                                </Grid>
                                <Grid item xs={12} sm={6} md={6} lg={6} sx={{ mt: -4.75 }}>
                                    {renderPns}
                                </Grid>
                            </>
                        ) : (
                            <>
                                <Grid item xs={12} sm={12} md={12} lg={12} sx={{ mt: -2.25, mb: -2 }}>
                                    <Box direction="column" align="center">
                                        {data?.exist ? (
                                            <>
                                                <Typography variant="h5" color="textSecondary" sx={{ mt: { sm: 21.5, xs: 5 } }}>
                                                    Відсутнє підкнючення до ПНС №{data?.pnsID}
                                                </Typography>
                                                <Typography variant="h6" color="textSecondary" sx={{ mb: { sm: 21.5, xs: 5 } }}>
                                                    <TimeAgo targetTime={lastUpdate} text="Востаннє в мережі" />
                                                </Typography>
                                            </>
                                        ) : (
                                            <>
                                                <Typography variant="h5" color="textSecondary" sx={{ mt: { sm: 21.5, xs: 5 } }}>
                                                    Відсутні дані про ПНС № {data?.pnsID}
                                                </Typography>
                                                <Typography variant="h6" color="textSecondary" sx={{ mb: { sm: 21.5, xs: 5 } }}>
                                                    Перевірте налашутвання панелі.
                                                </Typography>
                                            </>
                                        )}
                                    </Box>
                                </Grid>
                            </>
                        )}
                        <Grid item xs={12} sm={12} md={12} lg={12} sx={{ mt: -3 }}>
                            <Divider />
                        </Grid>

                        {data?.scadaCounter ? <>
                      
                                <Grid item xs={12} sm={12} md={12} lg={12} sx={{ mt: -4.25 }}>
                                    <Typography variant="h5" color="textSecondary" sx={{ mt: 1 }}>
                                        Показник:&nbsp;&nbsp;
                                        <b>
                                            <NumberWithAnimation number={data?.scadaCounter ?? 0} short/>
                                            <b> м³</b>
                                            
                                        </b>
                                    </Typography>
                                    <p>
                                        <Typography variant="h6" color="textSecondary" sx={{ mt: 1.8 }}>
                                            Показник з контроллера
                                        </Typography>
                                    </p>
                                </Grid>
                        </> : <>
                         {data?.deviceId != 'ID not specified' ? (
                            <>
                                <Grid item xs={12} sm={12} md={6.5} lg={6.5} sx={{ mt: -4.25 }}>
                                    <Typography variant="h5" color="textSecondary" sx={{ mt: 1 }}>
                                        Показник:&nbsp;&nbsp;
                                        <b>
                                            <NumberWithAnimation number={data?.counterValue ?? 0} short/>
                                            <b> м³</b>
                                            <Tooltip title="Зміна показника за добу в м³" placement="top-end">
                                                <Chip
                                                    variant="combined"
                                                    color={data?.counterValue - data?.counterValueOld === 0 ? 'warning' : 'success'}
                                                    label={`+${
                                                        data?.counterValue - data?.counterValueOld === 0 ? 0 : data?.counterValueOld ?? 0
                                                    }`}
                                                    sx={{ ml: 0.8, mt: -0.3 }}
                                                    size="small"
                                                />
                                            </Tooltip>
                                        </b>
                                    </Typography>
                                    <p>
                                        <Typography variant="h6" color="textSecondary" sx={{ mt: 1.8 }}>
                                            <TimeAgo targetTime={new Date(data?.lastUpdate)} text="Оновлено" />
                                        </Typography>
                                    </p>
                                </Grid>
                                <Grid item xs={12} sm={12} md={5.5} lg={5.5} sx={{ mt: -4.75 }}>
                                    <Typography variant="h6" color="textSecondary" sx={{ mt: 2.0 }}>
                                        ID:&nbsp;&nbsp;
                                        <CopyToClipboard text={data?.deviceId} onCopy={() => toastSuccess('ID лічильника скопійовано')}>
                                            <Tooltip title="Скопіювати ID" placement="top-end">
                                                <Chip label={data?.deviceId} size="small" />
                                            </Tooltip>
                                        </CopyToClipboard>
                                    </Typography>
                                    <Typography variant="h6" color="textSecondary" sx={{ mt: 1.5 }}>
                                        Serial:&nbsp;&nbsp;
                                        <CopyToClipboard
                                            text={data?.serial}
                                            onCopy={() => toastSuccess('Серійний номер лічильника скопійовано')}
                                        >
                                            <Tooltip title="Скопіювати серійний номер" placement="top-end">
                                                <Chip label={data?.serial} size="small" />
                                            </Tooltip>
                                        </CopyToClipboard>
                                    </Typography>
                                </Grid>
                            </>
                        ) : (
                            <Grid item xs={12} sm={12} md={12} lg={12} sx={{ mt: -2.75 }}>
                                <Typography variant="h6" color="textSecondary" textAlign={'center'} sx={{ mt: 1 }}>
                                    Серійний номер ліччильника не вказано. Перевірте &nbsp;
                                    <Typography
                                        component={MuiLink}
                                        variant="h6"
                                        href="https://admin.vd.lutsk.ua/login/"
                                        target="_blank"
                                        underline="hover"
                                    >
                                        налаштування.
                                    </Typography>
                                </Typography>
                                <Typography variant="h6" color="textSecondary" textAlign={'center'} sx={{ mt: 1 }}>
                                    Формат Number 00000000 на сайті &nbsp;
                                    <Typography
                                        component={MuiLink}
                                        variant="h6"
                                        href="https://py.iotsota.com/"
                                        target="_blank"
                                        underline="hover"
                                    >
                                        IotSota.
                                    </Typography>
                                </Typography>
                            </Grid>
                        )}</>
                        }
                       
                    </Grid>
                </MainCard>
                {/* </Link> */}
                {/*</Tooltip>*/}
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
