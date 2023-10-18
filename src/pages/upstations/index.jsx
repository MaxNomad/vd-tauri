import ComponentSkeleton from '@pages/components-overview/ComponentSkeleton';
import { Grid, Typography, Box } from '@mui/material';
import Status from '../../components/cards/statistics/StatusMain';

import PnsSingle from './components/PnsSingle';
import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect, useState, useMemo } from 'react';
import config from '../../config';
import { getPnsRoot } from './redux/pnsListSlice';
import parseID from '@utils/getObjID';
import ComponentSkeletonKns from '@pages/components-overview/ComponentSkeletonKNS';
import NotFound from '@pages/notFound';

const UpstationsRoot = () => {
    const dispatch = useDispatch();
    const { data, loading, error } = useSelector((state) => state.PnsRoot);
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
        dispatch(getPnsRoot()).then(() => setInterval(() => setFirstLoad(true), config.delay));
    }, [timer]);

    const renderPns = useMemo(
        () =>
            data?.map((pns) => {
                return pns?.visible ? <PnsSingle data={pns} lastUpdate={new Date(pns.timeStamp)} key={pns.pnsID} /> : '';
            }),
        [data]
    );
    return (
        <ComponentSkeletonKns renderContent={firstLoad || (loading === 'idle' && firstLoad)}>
            {firstLoad && !error ? (
                <>
                    {firstLoad && data.length > 0 && !error ? (
                        <>
                            <Grid container rowSpacing={4.5} columnSpacing={2.75}>
                                <Grid item xs={12} sx={{ mb: -2.25 }}>
                                    <Typography variant="h5">Об`єкти</Typography>
                                </Grid>
                                {renderPns}
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
    );
};

export default UpstationsRoot;
