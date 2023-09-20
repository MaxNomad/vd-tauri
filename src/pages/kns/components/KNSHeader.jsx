import { Chip, Grid, Stack, Typography, Tooltip } from '@mui/material';
import MainCard from '@components/MainCard';
import AlertsCount from '@pages/kns/items/AlertsCount';
import CheckOnline from '@pages/kns/items/CheckOnline';
import AlarmStatus from '@pages/kns/items/GetAlert';
import GetPers from '@pages/kns/items/GetPers';
import PropTypes from 'prop-types';
import React from 'react';
import TimeAgo from '@pages/counters/components/timeAgo';

const KNSHeader = ({ isOnline, Alarm, levels, count, updateDate, address, id}) => {
    return (
        <Tooltip title={`Загальна інформація про КНС № ${id}`} placement="top">
            <MainCard contentSX={{ p: 2.25 }}>
                    <Grid container rowSpacing={4.5} columnSpacing={2.75}>
                        <Grid item xs={12} sm={6} md={6} lg={2.5}>
                            <Typography variant="h5" color="textSecondary">
                                КНС № {id} - {address}
                            </Typography>
                        </Grid>
                        <Grid
                            item
                            xs={12}
                            sm={6}
                            md={6}
                            lg={2}
                            
                        >
                            <Typography variant="h6" color="textSecondary" sx={{mt: {lg: 0.1,  xs: -4}}}>
                                <TimeAgo targetTime={new Date(updateDate)} text="Оновлено"/>
                            </Typography>
                        </Grid>
                        <Grid
                            item
                            xs={7}
                            sm={3}
                            md={3}
                            lg={2}
                            sx={{ display: { lg: 'flex' }, justifyContent: { lg: 'flex-end' }, mt: { xs: -5, lg: 0 } }}
                        >
                            <Typography variant="h6" color="textSecondary">
                                Аварії за тиждень:&nbsp;&nbsp;<AlertsCount count={count} />
                            </Typography>
                        </Grid>
                        <Grid
                            item
                            xs={5}
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
                            xs={6.7}
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
                                Резервуар:&nbsp;&nbsp; <GetPers levels={levels} />
                            </Typography>
                        </Grid>
                        <Grid item xs={5.3} sm={3} md={3} lg={1.5} sx={{ display: 'flex', justifyContent: 'flex-end', mt: { xs: -3, lg: 0 } }}>
                            <Typography variant="h6" color="textSecondary">
                                Статус:&nbsp;&nbsp; <CheckOnline isOnline={isOnline} />
                            </Typography>
                        </Grid>
                    </Grid>
            </MainCard>
        </Tooltip>
    );
};
KNSHeader.propTypes = {
    isOnline: PropTypes.bool,
    Alarm: PropTypes.number,
    count: PropTypes.number,
    levels: PropTypes.object,
    updateDate: PropTypes.string,
    address: PropTypes.string,
    id: PropTypes.string

};
export default KNSHeader;
