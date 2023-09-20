import React, { useState, useEffect } from 'react';

// material-ui
import { Box, Button, Grid, Stack, Typography } from '@mui/material';

// project import
import { useDispatch, useSelector } from 'react-redux';
import MainCard from '@components/MainCard';
import AnalyticEcommerce from '@components/cards/statistics/AnalyticEcommerce';
import Status from '@components/cards/statistics/StatusMain';
import { LoadingButton } from '@mui/lab/index';
import ComponentSkeleton from '@pages/components-overview/ComponentSkeleton';
import WelcomeBanner from '@sections/dashboard/analytics/WelcomeBanner';
import { getRootGlobalData } from './redux/rootGlobalSlice';
import config from '../../config';
import NetworkStats from '@components/NetStats';
import GitHubStats from '@components/GitHubStats';
// ==============================|| DASHBOARD - DEFAULT ||============================== //

const DashboardDefault = () => {
    const dispatch = useDispatch();

    const { data, loading, error } = useSelector((state) => state.rootGlobal);
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
        dispatch(getRootGlobalData());
        setUpdateTime(new Date().toLocaleString());
        setInterval(() => setFirstLoad(true), 400);
    }, [dispatch, timer]);

    return (
        <ComponentSkeleton renderContent={firstLoad || (loading === 'idle' && firstLoad)}>
            <Grid container rowSpacing={4.5} columnSpacing={2.75}>
                <Grid item xs={12}>
                    <WelcomeBanner />
                </Grid>
                <Grid item xs={12} sx={{ mb: -2.25 }}>
                    <Typography variant="h5">Головна Панель</Typography>
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={3}>
                    <AnalyticEcommerce
                        title="Кількість аварій за сьогодні"
                        count={`${data?.alarms?.todayAlarms} аварій`}
                        percentage={data.alarms?.alarmsCountEverageYest}
                        isLoss={data?.alarms?.isLoss}
                        color={data?.levels.color}
                        extra={`${data?.alarms?.alarmsCountEverage}`}
                        extraText="Цього тижня на"
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={3}>
                    <AnalyticEcommerce title="Споживання" count="78,250 kW" percentage={70.5} extra="8,912 kW" color="error" />
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={3}>
                    <AnalyticEcommerce
                        title="Середній рівень резервуарів КНС"
                        count={`${data?.levels?.avarageLvl} см.`}
                        percentage={data.levels?.avarageLvlPers}
                        isLoss={data?.levels?.isLoss}
                        color={data?.levels.color}
                        extra={`${data?.levels?.avarageLvlPersLastWeek} %`}
                        extraText="Цього тижня середній рівень на"
                    />
                </Grid>

                <Grid item md={8} sx={{ display: { sm: 'none', md: 'block', lg: 'none' } }} />

                <Grid item xs={12} sx={{ mb: -2.25 }}>
                    <Typography variant="h5">Статус</Typography>
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={3}>
                    <Status title="Статус інфраструктури" text="В нормі" status extraText="Перевірено 24 об'єкти" />
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={3}>
                    <Status title="КНС" text="Аварія" extraText="Аварія на об'єкті №2" />
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={3}>
                    <Status title="Свердловини" text="В нормі" status extraText="Перевірено 6 об'єктів" />
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={3}>
                    <Status title="Насоси" text="В нормі" status extraText="Перевірено 16 об'єктів" />
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={3}>
                    <Status title="Сервіси" text="Аварія" extraText="Перевірено 8 об'єктів" />
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={3}>
                    <Status title="Інтернет" text="В нормі" status extraText="Перевірено 2 об'єкти" />
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={3}>
                    <Status title="Інше" text="В нормі" status extraText="Перевірено 16 об'єктів" />
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={3}>
                    <Status title="Інше" text="В нормі" status extraText="Перевірено 16 об'єктів" />
                </Grid>

                <Grid item xs={12} sm={6} md={4} lg={3} sx={{ mb: 0 }}>
                    <Typography variant="h5" sx={{ mb: 2.4 }}>
                        Дані GitHub
                    </Typography>

                    <GitHubStats />
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={3} sx={{ mb: 0 }}>
                    <Typography variant="h5" sx={{ mb: 2.4 }}>
                        Мережа
                    </Typography>
                    <NetworkStats />
                </Grid>
                <Grid item md={8} sx={{ display: { sm: 'none', md: 'block', lg: 'none' } }} />

                {/* row 3 */}
                <Grid item xs={12} md={12} lg={12}>
                    <Grid container alignItems="center" justifyContent="space-between">
                        <Grid item>
                            <Typography variant="h5">Останні аварії</Typography>
                        </Grid>
                        <Grid item />
                    </Grid>
                    <MainCard sx={{ mt: 2 }} content={false}></MainCard>
                </Grid>
                <Grid container spacing={0} direction="column" alignItems="center" justifyContent="center">
                    <LoadingButton variant="contained" color={'primary'} sx={{ mt: 2.25 }}>
                        Завантажити ще
                    </LoadingButton>
                </Grid>
            </Grid>
        </ComponentSkeleton>
    );
};

export default DashboardDefault;
