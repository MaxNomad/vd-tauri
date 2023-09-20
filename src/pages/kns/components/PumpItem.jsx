import PropTypes from 'prop-types';
import MainCard from '@components/MainCard';
import { Grid, Typography, Box, Divider } from '@mui/material';
import React from 'react';
import WorkStatus from '@pages/kns/items/WorkSatatus';
import PumpShortStatus from '@pages/kns/items/PumpShortStatus';
import CheckOnline from '@pages/kns/items/CheckOnline';
import AlarmStatus from '@pages/kns/items/GetAlert';
import BlockAlert from '@pages/kns/items/BlockAlert';

const PumpItem = ({ props }) => {
    return (
        <>
            <Grid item xs={12} md={4} lg={4}>
                <MainCard>
                    <Grid container>
                        <Grid item lg={6} xs={6} md={6}>
                            <Typography variant="h5" color="textSecondary">
                                Насос №{props?.pumpID}{' '}
                            </Typography>
                        </Grid>
                        <Grid item lg={6} xs={6} md={6} display="flex" justifyContent="flex-end">
                            <CheckOnline isOnline />
                        </Grid>
                        <Grid item lg={12}>
                            <p />
                            <Typography variant="h6" color="textSecondary" sx={{ mt: 2 }}>
                                Статус:&nbsp;&nbsp;
                                <PumpShortStatus isWorking={props?.workingStatus} />
                            </Typography>
                            <p />
                            <Typography variant="h6" color="textSecondary" sx={{ mt: 1 }}>
                                Режим роботи:&nbsp;&nbsp;
                                <WorkStatus current={props?.mode} />
                            </Typography>
                            <p />
                            <Typography variant="h6" color="textSecondary" sx={{ mt: 1 }}>
                                Аварії:&nbsp;&nbsp;
                                <AlarmStatus current={props?.alarmIndex} />
                            </Typography>
                            <p />
                            <Typography variant="h6" color="textSecondary" sx={{ mt: 1 }}>
                                Блокування:&nbsp;&nbsp;
                                <BlockAlert current={props?.blockAlarm} />
                            </Typography>
                            <p />
                            <Typography variant="h6" color="textSecondary" sx={{ mt: 1 }}>
                                Черга запуку:&nbsp;&nbsp;<b>{props?.queueIndex}</b>
                            </Typography>
                            <p />
                            <Typography variant="h6" color="textSecondary" sx={{ mt: 1 }}>
                                Напрацьовано:&nbsp;&nbsp;<b>{props?.engineHours} год.</b>
                            </Typography>
                            <Divider sx={{ mt: 2.4 }} />
                            <p />
                            <Typography variant="h6" color="textSecondary" sx={{ mt: 1 }}>
                                Споживання:&nbsp;&nbsp;<b>NaN Кв/год.</b> (0.00%)
                            </Typography>
                            <p />
                            <Typography variant="h6" color="textSecondary" sx={{ mt: 1 }}>
                                Напруга:&nbsp;&nbsp;<b>NaN В.</b>
                            </Typography>
                            <p />
                            <Typography variant="h6" color="textSecondary" sx={{ mt: 0.9 }}>
                                <b>L1:</b> NaN A | <b>L2:</b> NaN A | <b>L3:</b> NaN A
                            </Typography>
                        </Grid>
                    </Grid>
                </MainCard>
            </Grid>
        </>
    );
};

PumpItem.propTypes = {
    props: PropTypes.object,
    pumpID: PropTypes.number,
    workingStatus: PropTypes.bool,
    mode: PropTypes.number,
    alarmIndex: PropTypes.number,
    queueIndex: PropTypes.number,
    engineHours: PropTypes.number,
    blockAlarm: PropTypes.bool
};
export default React.memo(PumpItem);
