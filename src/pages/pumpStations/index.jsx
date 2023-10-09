import { Grid, Typography, Box } from '@mui/material';
import Status from '../../components/cards/statistics/StatusMain';

import PumpStationSingle from './components/PumpStationSingle';
import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect, useState, useMemo } from 'react';
import config from '../../config';
import { getRootPumpStation } from './redux/PumpStationListSlice';
import parseID from '@utils/getObjID';
import NotFound from '@pages/notFound';
import ComponentSkeleton from '@pages/components-overview/ComponentSkeleton';

const PumpStationsRoot = () => {
    const dispatch = useDispatch();
    const { data, loading, error } = useSelector((state) => state.RootPumpStation);
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
        dispatch(getRootPumpStation()).then(() => setInterval(() => setFirstLoad(true), config.delay));
    }, [timer]);

    const renderNs = useMemo(
        () =>
            data.map((ns) => {
                return ns?.visible ? <PumpStationSingle data={ns} lastUpdate={ns?.timeStamp} key={ns?.nsID} /> : '';
            }),
        [data]
    );
    return (
        <>
            <ComponentSkeleton renderContent={firstLoad || (loading === 'idle' && firstLoad)}>
                {firstLoad && !error ? (
                    <>
                        {firstLoad && data.length > 0 && !error ? (
                            <>
                                <Grid container rowSpacing={4.5} columnSpacing={2.75}>
                                    <Grid item xs={12} sx={{ mb: -2.25 }}>
                                        <Typography variant="h5">Об`єкти</Typography>
                                    </Grid>
                                    {renderNs}
                                </Grid>
                            </>
                        ) : (
                            <NotFound />
                        )}
                    </>
                ) : (
                    <NotFound code={''} text={error?.name} subText={error?.message} />
                )}
            </ComponentSkeleton>
        </>
    );
};

export default PumpStationsRoot;
