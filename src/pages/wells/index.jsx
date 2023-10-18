import ComponentSkeleton from '@pages/components-overview/ComponentSkeleton';
import { Grid, Typography, Box } from '@mui/material';
import PumpSingle from './components/PumpSingle';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState, useMemo } from 'react';
import config from '../../config';
import { getPumpRoot } from './redux/pumpListSlice';
import React from 'react';
import SmallWellListProps from './components/smallWellListProps';
import parseID from '@utils/getObjID';
import ComponentSkeletonKns from '@pages/components-overview/ComponentSkeletonKNS';
import NotFound from '@pages/notFound';
import { ErrorBoundary } from 'react-error-boundary';
import SmallPumpStationsList from './components/smallPumpStationsList';

const WellsRoot = () => {
    const dispatch = useDispatch();

    const { data, loading, error } = useSelector((state) => state.PumpRoot);
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
        dispatch(getPumpRoot()).then(() => setInterval(() => setFirstLoad(true), config.delay));
    }, [timer]);

    const renderPumps = useMemo(
        () =>
            data?.map((pump) => {
                return pump?.visible ? <PumpSingle data={pump} lastUpdate={pump?.timeStamp} key={pump.pumpID} /> : '';
            }),
        [data]
    );
    return (
        <>
            <ComponentSkeletonKns renderContent={firstLoad || (loading === 'idle' && firstLoad)}>
                {firstLoad && !error ? (
                    <>
                        <Grid item xs={12} md={12} lg={12} sx={{ mt: 1, mb: 2 }}>
                            <SmallWellListProps data={data} />
                        </Grid>

                        {firstLoad && data.length > 0 && !error ? (
                            <>
                                <Grid container rowSpacing={4.5} columnSpacing={2.75}>
                                <Grid item xs={12} sx={{ mb: -2.25 }}>
                                        <Typography variant="h5">Насосні станції</Typography>
                                    </Grid>
                                    <SmallPumpStationsList/>
                                    <Grid item xs={12} sx={{ mb: -2.25 }}>
                                        <Typography variant="h5">Об`єкти</Typography>
                                    </Grid>
                                    {renderPumps}
                                </Grid>
                            </>
                        ) : (
                            <NotFound />
                        )}
                    </>
                ) : (
                    <NotFound code={''} text={error?.name} subText={error?.message} />
                )}
            </ComponentSkeletonKns>
        </>
    );
};

export default WellsRoot;
