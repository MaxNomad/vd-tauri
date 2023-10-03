import ComponentSkeleton from '@pages/components-overview/ComponentSkeleton';
import { Grid, Typography, Box } from '@mui/material';
import Status from '../../components/cards/statistics/StatusMain';

import PnsSingle from './components/PnsSingle';
import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect, useState, useMemo } from 'react';
import config from '../../config';
import { getPnsRoot } from './redux/pnsListSlice';
import permsCheck from '@pages/authentication/context/permsCheck';
import parseID from '@utils/getObjID';
import ComponentSkeletonKns from '@pages/components-overview/ComponentSkeletonKNS';
import NotFound from '@pages/notFound';

const UpstationsRoot = () => {
    const dispatch = useDispatch();

    const { data, loading, error, empty } = useSelector((state) => state.PnsRoot);
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
        dispatch(getPnsRoot());
        setUpdateTime(new Date().toLocaleString());
        setInterval(() => setFirstLoad(true), 400);
    }, [dispatch, timer]);

    const objectsWithErrors = Array.isArray(data) ? data?.filter((obj) => obj.alarmStatus > 0) : [];
    const objectsWithoutErrors = Array.isArray(data) ? data?.filter((obj) => obj.alarmStatus <= 0 || obj.alarmStatus == null) : [];

    const sortedArray = [...objectsWithErrors, ...objectsWithoutErrors];
    const permsArray = Array.isArray(data)
        ? sortedArray.filter((obj) =>
              permsCheck(['level_10', 'level_9', 'level_8', 'dash_pns_read_all', `dash_pns_read_${parseID(obj?.pnsID)}`])
          )
        : [];
    const renderPns = useMemo(
        () =>
            permsArray?.map((pns) => {
                return pns?.visible ? <PnsSingle data={pns} lastUpdate={new Date(pns.timeStamp)} key={pns.pnsID} /> : '';
            }),
        [updateTime, data]
    );
    return (
        <>{!empty && permsArray.length !== 0 ? 
            <>
            <ComponentSkeletonKns renderContent={firstLoad || (loading === 'idle' && firstLoad)}>
                {firstLoad ? (
                    <Grid container rowSpacing={4.5} columnSpacing={2.75}>
                        <Grid item xs={12} sx={{ mb: -2.25 }}>
                            <Typography variant="h5">Об`єкти</Typography>
                        </Grid>
                        {renderPns}
                    </Grid>
                ) : (
                    <NotFound/>
                )}
            </ComponentSkeletonKns>
        </>
        : <NotFound code={400} text="Доступ заборонено" subText={'У вас немає прав на перегляд строніки'} />}
    </>);
};

export default UpstationsRoot;
