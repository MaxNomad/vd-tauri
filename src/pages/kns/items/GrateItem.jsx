import { Grid, Typography } from '@mui/material';
import MainCard from '@components/MainCard';
import CheckOnline from '@pages/kns/items/CheckOnline';
import AlarmStatus from '@pages/kns/items/GetAlert';
import PumpShortStatus from '@pages/kns/items/PumpShortStatus';
import WorkStatus from '@pages/kns/items/WorkSatatus';
import PropTypes from 'prop-types';
import React from 'react';

const GrateItem = ({ props }) => {
    return (
        <Grid item xs={12} sm={6} md={3} lg={3} xl={2}>
            <MainCard>
                <Grid container rowSpacing={4.5} columnSpacing={2.75}>
                    <Grid item xs={7} sm={7} md={7} lg={7}>
                        <Typography variant="h5" color="textSecondary" sx={{ mb: 2 }}>
                            Решітка №{props?.id}
                        </Typography>
                    </Grid>
                    <Grid item xs={5} sm={5} md={5} lg={5} display="flex" justifyContent="flex-end">
                        <CheckOnline isOnline={props?.online} />
                    </Grid>
                </Grid>

                <Typography variant="h6" color="textSecondary">
                    Статус:&nbsp;&nbsp;
                    <PumpShortStatus isWorking={props?.statusWorking} />
                </Typography>
                <Typography variant="h6" color="textSecondary" sx={{ mt: 1.4 }}>
                    Режим:&nbsp;&nbsp;
                    <WorkStatus current={props?.mode} />
                </Typography>
                <Typography variant="h6" color="textSecondary" sx={{ mt: 1.4 }}>
                    Аварія:&nbsp;&nbsp;
                    <AlarmStatus current={props?.alarmsStatus} />
                </Typography>
            </MainCard>
        </Grid>
    );
};
GrateItem.propTypes = {
    props: PropTypes.object,
    id: PropTypes.number,
    online: PropTypes.bool,
    Alert: PropTypes.number,
    workType: PropTypes.number,
    statusWorking: PropTypes.number,
    mode: PropTypes.number,
    alarmsStatus: PropTypes.number
};
export default React.memo(GrateItem);
