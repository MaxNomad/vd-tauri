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

const KnsMain = () => {
    const dispatch = useDispatch();

    const { data, loading, error } = useSelector((state) => state.knsRoot);
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
        dispatch(getKNSRoot());
        setUpdateTime(new Date());
        setInterval(() => setFirstLoad(true), 400);
    }, [dispatch, timer]);
    const objectsWithErrors = data.filter(obj => obj.alarmStatus > 0);
    const objectsWithoutErrors = data.filter(obj => obj.alarmStatus <= 0 || obj.alarmStatus == null);
    
    const sortedArray = [...objectsWithErrors, ...objectsWithoutErrors];
    const permsArray  = sortedArray.filter((obj) => permsCheck(["level_10", "level_9","level_8","dash_kns_read_all",`dash_kns_read_${parseID(obj?.knsID)}`]) );

    const renderKns = permsArray.map((kns) => {
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
        <>
            <ComponentSkeletonKns renderContent={firstLoad || (loading === 'idle' && firstLoad)}>
                {firstLoad && permsArray.length !== 0 ? (
                    <Grid container rowSpacing={4.5} columnSpacing={2.75}>
                        <Grid item xs={12} sx={{ mb: -2.25 }}>
                            <Typography variant="h5">Об`єкти</Typography>
                            
                           
                        </Grid>
                       
                        {renderKns}
                    </Grid>
                ) : (
                    <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" sx={{ mt: '30vh' }}>
                        <Typography variant="h1" color="primary" gutterBottom>
                            404
                        </Typography>
                        <Typography variant="h4" color="textPrimary" align="center" gutterBottom>
                            Об`єкти КНС відсутні
                        </Typography>
                        <Typography variant="body1" color="textSecondary" align="center" sx={{ mb: 3 }}>
                            Перевірте налаштування панелі
                        </Typography>
                    </Box>
                )}
            </ComponentSkeletonKns>
        </>
    );
};

export default KnsMain;
