import ComponentSkeleton from '@pages/components-overview/ComponentSkeleton';
import { Grid, Typography, Box } from '@mui/material';
import PumpSingle from './components/PumpSingle';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState, useMemo } from 'react';
import config from '../../config';
import { getPumpRoot } from './redux/pumpListSlice';
import React from 'react';
import SmallWellListProps from './components/smallWellListProps';
import permsCheck from '@pages/authentication/context/permsCheck';
import parseID from '@utils/getObjID';
import ComponentSkeletonKns from '@pages/components-overview/ComponentSkeletonKNS';
import NotFound from '@pages/notFound';

const WellsRoot = () => {
    const dispatch = useDispatch();

    const { data, loading, error, empty } = useSelector((state) => state.PumpRoot);
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
        dispatch(getPumpRoot());
        setUpdateTime(new Date().toLocaleString());
        setInterval(() => setFirstLoad(true), 400);
    }, [dispatch, timer]);

    const objectsWithErrors = Array.isArray(data) ? data?.filter((obj) => obj.alarmStatus > 0) : [];
    const objectsWithoutErrors = Array.isArray(data) ? data?.filter((obj) => obj.alarmStatus <= 0 || obj.alarmStatus == null) : [];
    const objectsSortedPerms = Array.isArray(data)
        ? data?.filter((obj) =>
              permsCheck(['level_10', 'level_9', 'level_8', 'dash_well_read_all', `dash_well_read_${parseID(obj?.pumpID)}`])
          )
        : [];
    const sortedArray = [...objectsWithErrors, ...objectsWithoutErrors];
    const permsArray = Array.isArray(data)
        ? data?.filter((obj) =>
              permsCheck(['level_10', 'level_9', 'level_8', 'dash_well_read_all', `dash_well_read_${parseID(obj?.pumpID)}`])
          )
        : [];
    const renderPumps = useMemo(
        () =>
            permsArray?.map((pump) => {
                return pump?.visible ? <PumpSingle data={pump} lastUpdate={pump?.timeStamp} key={pump.pumpID} /> : '';
            }),
        [updateTime, data]
    );

    return (
        <>
            <ComponentSkeletonKns renderContent={firstLoad || (loading === 'idle' && firstLoad)}>
                {!empty && permsArray.length !== 0 ? (
                    <>
                        <Grid item xs={12} md={12} lg={12} sx={{ mt: 1, mb: 2 }}>
                            <SmallWellListProps data={objectsSortedPerms} />
                        </Grid>

                        {firstLoad ? (
                            <>
                                <Grid container rowSpacing={4.5} columnSpacing={2.75}>
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
                    <NotFound code={400} text="Доступ заборонено" subText={'У вас немає прав на перегляд строніки'} />
                )}
            </ComponentSkeletonKns>
        </>
    );
};

export default WellsRoot;
