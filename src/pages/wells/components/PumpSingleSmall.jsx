import MainCard from '@components/MainCard';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Grid, Stack, Typography, Box, Divider, Tooltip, Chip, Badge } from '@mui/material';
import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';

const PumpSingleSmall = ({ data }) => {
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
            <Grid item xs={0.48} sm={0.48} md={0.48} lg={0.48} UWHD={0.48} sx={{ minWidth: 80 }}>
                <Tooltip
                    title={`Свердловина №${data?.pumpID}. Статус: ${data?.pump?.workingStatus ? 'В роботі' : 'Призупинено'}  `}
                    placement="bottom"
                >
                    <Link to={`/pump-single?id=${data?.pumpID}`} style={{ textDecoration: 'none' }}>
                        <MainCard contentSX={{ p: 1.25, borderColor: AlarmColor(), textAlign: 'center' }} hoverActive borderCustom>
                            <Badge
                                color={data?.pump?.workingStatus ? 'success' : 'primary'}
                                invisible={!data?.online}
                                variant="dot"
                                sx={{ display: 'inline-block', mb: -2, mt: -0.5 }}
                            >
                                <Typography
                                    variant="h5"
                                    noWrap
                                    color={data?.pumpID === searchParams.get('id') ? 'secondary' : 'textSecondary'}
                                >
                                    {data?.pumpID}
                                </Typography>
                            </Badge>
                        </MainCard>
                    </Link>
                </Tooltip>
            </Grid>
        </>
    );
};

PumpSingleSmall.propTypes = {
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
export default React.memo(PumpSingleSmall);
