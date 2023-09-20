import Status from '@components/cards/statistics/StatusMain';
import { Divider, Grid, Typography } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Chip, Stack, Avatar, Box, Tooltip, Button } from '@mui/material';
import config from '../../config';
import ComponentSkeletonKns from '@pages/components-overview/ComponentSkeletonKNS';
import { getCountersRoot } from './redux/countersListSlice';
import CounterItem from './components/counterItem';
import Search from '@layout/MainLayout/Header/HeaderContent/Search';
import CounterScada from './components/counterScada';
import MainCard from '@components/MainCard';
import { QuestionCircleOutlined, RedoOutlined } from '@ant-design/icons';

const CountersMain = () => {
    const dispatch = useDispatch();

    const { data, loading, error } = useSelector((state) => state.CountersRoot);
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
        dispatch(getCountersRoot());
        setUpdateTime(new Date().toLocaleString());
        setInterval(() => setFirstLoad(true), 400);
    }, [dispatch, timer]);

    const renderCounters = data.map((counter) => {
        return <CounterItem props={counter} key={counter?.number} />;
    });
    const mocData = [
        {
            number: 1,
            provider: 'scada-serv',
            requestUpdate: new Date(Date.now()),
            counterValue: 3124,
            counterValueOld: 123,
            link: '/pump-single?id=3',
            name: 'Свердловина №1'
        }
    ];
    const renderCountersScada = mocData.map((counter) => {
        return <CounterScada props={counter} key={counter?.number} />;
    });
    return (
        <>
            <ComponentSkeletonKns renderContent={firstLoad || (loading === 'idle' && firstLoad)}>
                <Grid container rowSpacing={4.5} columnSpacing={2.75}>
                    <Grid item xs={12} sx={{ mb: -2.25 }}>
                        <Typography variant="h5">Лічильники IOT Sota</Typography>
                    </Grid>
                    <Grid container sx={{ mt: 3.25, ml: { lg: 2, xs: 3, md: 2 }, mb: -3.25 }}>
                        <Grid item xs={8.5} sm={6} md={6} lg={6}>
                            <Search />
                        </Grid>
                        <Grid item xs={3.5} sm={6} md={6} lg={6} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                            <Typography variant="h6" color="secondary">
                                <Button variant="contained" color="warning" size="small">
                                    Оновити &nbsp;
                                    <RedoOutlined />
                                </Button>
                            </Typography>
                        </Grid>
                    </Grid>
                    <Grid item xs={12} sx={{ mb: -2.25 }}>
                        <Divider />
                    </Grid>
                    {renderCounters}
                    <Grid item xs={12} sx={{ mb: -2.25 }}>
                        <Typography variant="h5">Лічильники SCADA</Typography>
                    </Grid>
                    <Grid item xs={12} sx={{ mb: -3.25, ml: -1, mt: -1.25 }}>
                        <Search />
                    </Grid>
                    <Grid item xs={12} sx={{ mb: -2.25 }}>
                        <Divider />
                    </Grid>
                    {renderCountersScada}
                </Grid>
            </ComponentSkeletonKns>
        </>
    );
};

export default CountersMain;
