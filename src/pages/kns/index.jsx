import Status from '@components/cards/statistics/StatusMain';
import { Grid, Typography, Box } from '@mui/material';
import KnsSingle from './components/KnsSingle';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getKNSRoot } from './redux/knsListSlice';
import config from '../../config';
import ComponentSkeletonKns from '@pages/components-overview/ComponentSkeletonKNS';
import Search from '@layout/MainLayout/Header/HeaderContent/Search';
import parseID from '@utils/getObjID';
import permsCheck from '@pages/authentication/context/permsCheck';
import NotFound from '@pages/notFound';

const KnsMain = () => {
    const dispatch = useDispatch();

    const { data, loading, error, empty } = useSelector((state) => state.knsRoot);
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
        dispatch(getKNSRoot()).then(() => setInterval(() => setFirstLoad(true), 400))
    }, [dispatch, timer]);



    const renderKns = data.map((kns) => {
        return kns?.visible ? (
            <KnsSingle
                isOnline={kns?.online}
                id={kns?.knsID}
                Alarm={kns?.alarmStatus}
                levels={kns?.levels}
                workers={kns?.pumps}
                location={kns?.address}
                lastUpdate={kns?.timeStamp}
                exist={kns?.exist}
                maintenance={kns?.maintenance}
                key={kns?.knsID}
                count={kns?.alarmsAmount}
            />
        ) : (
            ''
        );
    });
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
                            {renderKns}
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
export default KnsMain;
