import { Grid, Typography, Tooltip } from '@mui/material';
import MainCard from '@components/MainCard';
import AlertsCount from '@pages/kns/items/AlertsCount';
import CheckOnline from '@pages/kns/items/CheckOnline';
import AlarmStatus from '@pages/kns/items/GetAlert';
import PropTypes from 'prop-types';
import Pressure from '../items/Pressure';
import React from 'react';
import TimeAgo from '@pages/counters/components/timeAgo';

const PumpHeader = ({ isOnline, Alarm, pressure, count, updateDate, address, id }) => {
    return (
        <Tooltip title={`Загальна інформація про свердловину № ${id}`} placement="bottom">
            <MainCard contentSX={{ p: 2.25 }}>
                <Grid container rowSpacing={4.5} columnSpacing={2.75}>
                    <Grid item xs={12} sm={6} md={6} lg={2.5}>
                        <Typography variant="h5" color="textSecondary" noWrap>
                            Свердловина № {id} - {address}
                        </Typography>
                    </Grid>
                    <Grid item xs={12} sm={6} md={6} lg={2}>
                        <Typography variant="h6" color="textSecondary" sx={{ mt: { lg: 0.1, xs: -4 } }}>
                            Оновлено <TimeAgo targetTime={new Date(updateDate)} />
                        </Typography>
                    </Grid>
                    <Grid
                        item
                        xs={6.8}
                        sm={3}
                        md={3}
                        lg={2}
                        sx={{ display: { lg: 'flex' }, justifyContent: { lg: 'flex-end' }, mt: { xs: -5, lg: 0 } }}
                    >
                        <Typography variant="h6" color="textSecondary">
                            Аварії за тиждень:&nbsp;&nbsp;
                            <AlertsCount count={count} />
                        </Typography>
                    </Grid>
                    <Grid
                        item
                        xs={5.2}
                        sm={3}
                        md={3}
                        lg={2}
                        sx={{
                            display: { lg: 'flex', xs: 'flex' },
                            justifyContent: { lg: 'flex-end', xs: 'flex-end' },
                            mt: { xs: -5, lg: 0 }
                        }}
                    >
                        <Typography variant="h6" color="textSecondary">
                            Аварії:&nbsp;&nbsp; <AlarmStatus current={Alarm} />
                        </Typography>
                    </Grid>
                    <Grid
                        item
                        xs={6}
                        sm={3}
                        md={3}
                        lg={2}
                        sx={{
                            display: { lg: 'flex', md: 'flex', sm: 'flex' },
                            justifyContent: { lg: 'flex-end', md: 'flex-end', sm: 'flex-end' },
                            mt: { xs: -3, lg: 0 }
                        }}
                    >
                        <Typography variant="h6" color="textSecondary">
                            Тиск:&nbsp;&nbsp;
                            <Pressure num={pressure === -1 ? 'NaN' : pressure} />
                            &nbsp;
                        </Typography>
                    </Grid>
                    <Grid item xs={6} sm={3} md={3} lg={1.5} sx={{ display: 'flex', justifyContent: 'flex-end', mt: { xs: -3, lg: 0 } }}>
                        <Typography variant="h6" color="textSecondary">
                            Статус:&nbsp;&nbsp; <CheckOnline isOnline={isOnline} />
                        </Typography>
                    </Grid>
                </Grid>
            </MainCard>
        </Tooltip>
    );
};
PumpHeader.propTypes = {
    isOnline: PropTypes.bool,
    Alarm: PropTypes.number,
    count: PropTypes.number,
    pressure: PropTypes.number,
    updateDate: PropTypes.string,
    address: PropTypes.string,
    id: PropTypes.string
};
export default PumpHeader;
