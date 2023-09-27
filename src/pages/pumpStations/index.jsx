import ComponentSkeleton from '@pages/components-overview/ComponentSkeleton';
import { Grid, Typography, Box } from '@mui/material';
import Status from '../../components/cards/statistics/StatusMain';

import PumpStationSingle from './components/PumpStationSingle';
import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect, useState, useMemo } from 'react';
import config from '../../config';
import { getRootPumpStation } from './redux/PumpStationListSlice';
import permsCheck from '@pages/authentication/context/permsCheck';
import parseID from '@utils/getObjID';

const PumpStationsRoot = () => {
    const dispatch = useDispatch();

    const { data, loading, error } = useSelector((state) => state.RootPumpStation);
    const [updateTime, setUpdateTime] = useState();
    const [timer, setTimer] = useState(Date.now());
    const [firstLoad, setFirstLoad] = useState(false);

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
        setUpdateTime(new Date().toLocaleString());
        setInterval(() => setFirstLoad(true), 400);
    }, [dispatch, timer]);
    const objectsWithErrors = Array.isArray(data) ? data?.filter((obj) => obj.alarmStatus > 0) : [];
    const objectsWithoutErrors = Array.isArray(data) ? data?.filter((obj) => obj.alarmStatus <= 0 || obj.alarmStatus == null) : [];

    const sortedArray = [...objectsWithErrors, ...objectsWithoutErrors];
    const permsArray = Array.isArray(data)
        ? sortedArray.filter((obj) =>
              permsCheck(['level_10', 'level_9', 'level_8', 'dash_ns_read_all', `dash_ns_read_${parseID(obj?.nsID)}`])
          )
        : [];

    const renderPns = useMemo(
        () =>
            permsArray.map((ns) => {
                return ns?.visible ? <PumpStationSingle data={ns} lastUpdate={ns?.timeStamp} key={ns?.nsID} /> : '';
            }),
        [updateTime, data]
    );
    return (
        <>
            <ComponentSkeleton renderContent={firstLoad || (loading === 'idle' && firstLoad)}>
                {firstLoad && permsArray.length !== 0 ? (
                    <Grid container rowSpacing={4.5} columnSpacing={2.75}>
                        <Grid item xs={12} sx={{ mb: -2.25 }}>
                            <Typography variant="h5">Об`єкти</Typography>
                        </Grid>
                        {renderPns}
                    </Grid>
                ) : (
                    <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" sx={{ mt: '30vh' }}>
                        <Typography variant="h1" color="primary" gutterBottom>
                            404
                        </Typography>
                        <Typography variant="h4" color="textPrimary" align="center" gutterBottom>
                            Об`єкти НС відсутні
                        </Typography>
                        <Typography variant="body1" color="textSecondary" align="center" sx={{ mb: 3 }}>
                            Перевірте налаштування панелі
                        </Typography>
                    </Box>
                )}
            </ComponentSkeleton>
        </>
    );
};

export default PumpStationsRoot;
