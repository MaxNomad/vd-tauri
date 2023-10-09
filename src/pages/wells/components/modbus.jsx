import React, { useEffect, useState } from 'react';
import { Chip, Divider, Grid, Skeleton, Typography } from '@mui/material';
import CheckOnline from '@pages/kns/items/CheckOnline';
import { useDispatch, useSelector } from 'react-redux';
import config from '../../../config';
import { getWellModbus } from '../redux/modbusSlice';

const processString = (inputString) => inputString[0] + inputString.match(/[A-Z]/g).join('') + inputString.slice(-1);

const Modbus = ({ data }) => {
    const [timer, setTimer] = useState(Date.now());
    const [firstLoad, setFirstLoad] = useState(false);
    const wellData = useSelector((state) => state.wellModbus);
    const dispatch = useDispatch();

    useEffect(() => {
        const interval = setInterval(
            () => setTimer(Date.now()),
            localStorage.apiUpdateTime ? localStorage.apiUpdateTime : config.defaultUpdateTime
        );
        return () => {
            clearInterval(interval);
        };
    }, []);
    useEffect(() => {
        dispatch(getWellModbus(data?.pumpID)).then(() => setInterval(() => setFirstLoad(true), config.delay));
    }, [timer]);

    return (
        <>
            <Grid container sx={{ mt: -1.4 }}>
                <Grid item lg={5} md={12} sm={12} xs={12}>
                    <Typography variant="h6" color="textSecondary" sx={{ mt: 1.4 }}>
                        {firstLoad ? (
                            <>
                                Статус ModBus&nbsp;&nbsp; <CheckOnline isOnline={wellData?.data?.status} />
                            </>
                        ) : (
                            <Skeleton variant="text" sx={{ fontSize: '1.7rem', width: 170, mb: -1.1, mt: -1.2 }} />
                        )}
                    </Typography>
                    <Divider sx={{ mt: 1.8 }} />
                    <Typography variant="h6" color="textSecondary" sx={{ mt: 1.4 }}>
                        Device IP: &nbsp;&nbsp;
                        <Chip label={data?.modbus?.ip ?? 'Адреса не вказана'} variant="combined" color="secondary" size="small" />
                    </Typography>
                    <Typography variant="h6" color="textSecondary" sx={{ mt: 1.4 }}>
                        Device Port: &nbsp;&nbsp;
                        <Chip label={data?.modbus?.port ?? 'Порт не вказано'} variant="combined" color="secondary" size="small" />
                    </Typography>
                    <Typography variant="h6" color="textSecondary" sx={{ mt: 1.4 }}>
                        Device ID: &nbsp;&nbsp;
                        <Chip label={data?.modbus?.deviceId ?? 'ID не вказано'} variant="combined" color="secondary" size="small" />
                    </Typography>
                </Grid>
                <Grid item lg={7} md={12} sm={12} xs={12}>
                    <Typography variant="h5" color="textSecondary" sx={{ mt: 1.4 }}>
                        Біти керування
                    </Typography>
                    <Divider sx={{ mt: 1.8 }} />
                    <Typography variant="h6" color="textSecondary" sx={{ mt: 1.4 }}>
                        Увімкнення: &nbsp;&nbsp;
                        <Chip
                            label={!data?.modbus?.commands?.turnOn?.bit ? 'NaN' : data?.modbus?.commands?.turnOn?.bit}
                            color="success"
                            variant="combined"
                            size="small"
                        />
                        &nbsp;&nbsp;
                        <Chip label={data?.modbus?.commands?.turnOn?.value ?? 'NaN'} color="secondary" variant="combined" size="small" />
                        &nbsp;&nbsp;
                        <Chip
                            label={
                                data?.modbus?.commands?.turnOn?.function
                                    ? processString(data?.modbus?.commands?.turnOn?.function)
                                    : 'NaN Func'
                            }
                            color="primary"
                            size="small"
                            variant="combined"
                        />
                    </Typography>
                    <Typography variant="h6" color="textSecondary" sx={{ mt: 1.4 }}>
                        Вимкнення: &nbsp;&nbsp;
                        <Chip
                            label={data?.modbus?.commands?.turnOff?.bit ? data?.modbus?.commands?.turnOff?.bit : 'NaN'}
                            color="error"
                            variant="combined"
                            size="small"
                        />
                        &nbsp;&nbsp;
                        <Chip label={data?.modbus?.commands?.turnOff?.value ?? 'NaN'} color="secondary" variant="combined" size="small" />
                        &nbsp;&nbsp;
                        <Chip
                            label={
                                data?.modbus?.commands?.turnOff?.function
                                    ? processString(data?.modbus?.commands?.turnOff?.function)
                                    : 'NaN Func'
                            }
                            color="primary"
                            size="small"
                            variant="combined"
                        />
                    </Typography>
                    <Typography variant="h6" color="textSecondary" sx={{ mt: 1.4 }}>
                        Скидання аварій: &nbsp;&nbsp;
                        <Chip
                            label={data?.modbus?.commands?.reset?.bit ? data?.modbus?.commands?.reset?.bit : 'NaN'}
                            color="warning"
                            variant="combined"
                            size="small"
                        />
                        &nbsp;&nbsp;
                        <Chip label={data?.modbus?.commands?.reset?.value ?? 'NaN'} color="secondary" variant="combined" size="small" />
                        &nbsp;&nbsp;
                        <Chip
                            label={
                                data?.modbus?.commands?.reset?.function
                                    ? processString(data?.modbus?.commands?.reset?.function)
                                    : 'NaN Func'
                            }
                            color="primary"
                            size="small"
                            variant="combined"
                        />
                    </Typography>
                </Grid>
            </Grid>
        </>
    );
};
export default React.memo(Modbus);
