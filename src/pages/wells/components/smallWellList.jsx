import { Grid, Typography, Box } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState, useMemo } from 'react';
import config from '../../../config';
import { getPumpRoot } from '../redux/pumpListSlice';
import React from 'react';
import PumpSingleSmall from './PumpSingleSmall';
import permsCheck from '@pages/authentication/context/permsCheck';
import parseID from '@utils/getObjID';

const SmallWellsList = () => {
    const dispatch = useDispatch();

    const { data, loading, error } = useSelector((state) => state.PumpRoot);
    const [updateTime, setUpdateTime] = useState();
    const [timer, setTimer] = useState(Date.now());

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
        dispatch(getPumpRoot());
        setUpdateTime(new Date().toLocaleString());
    }, [timer]);

    const permsArray = data?.filter((obj) =>
        permsCheck(['level_10', 'level_9', 'level_8', 'dash_well_read_all', `dash_well_read_${parseID(obj?.pumpID)}`])
    );
    const renderPumps = useMemo(
        () =>
            permsArray?.map((pump) => {
                return pump?.visible ? <PumpSingleSmall data={pump} lastUpdate={pump?.timeStamp} key={pump.pumpID} /> : '';
            }),
        [updateTime, data]
    );
    return (
        <>
            <Box sx={{ width: '100%', overflowX: 'auto', pb: 2, mb: { md: -1, sm: 2 }, mt: -1 }}>
                <Grid container rowSpacing={4.5} columnSpacing={2.75} sx={{ display: 'inline-flex!important', width: 80 * data.length }}>
                    {renderPumps}
                </Grid>
            </Box>
        </>
    );
};
export default React.memo(SmallWellsList);
