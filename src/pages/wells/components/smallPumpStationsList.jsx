import { Grid, Typography, Box } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState, useMemo } from 'react';
import config from '../../../config';
import { getPumpRoot } from '../redux/pumpListSlice';
import React from 'react';
import PumpSingleSmall from './PumpSingleSmall';
import parseID from '@utils/getObjID';
import { getRootPumpStation } from '@pages/pumpStations/redux/PumpStationListSlice';
import PumpStationSingleSmall from './PumpStationSingleSmall';

const SmallPumpStationsList = () => {
    const dispatch = useDispatch();

    const { data, loading, error } = useSelector((state) => state.RootPumpStation);
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
        dispatch(getRootPumpStation());
    }, [timer]);

    const renderPumps = useMemo(
        () =>
            data?.map((pump) => {
                console.log(pump)
                return pump?.visible ? <PumpStationSingleSmall data={pump} lastUpdate={pump?.timeStamp} key={pump.nsID} /> : '';
            }),
        [data]
    );
    return (
        <>
            {renderPumps}
        </>
    );
};
export default React.memo(SmallPumpStationsList);
