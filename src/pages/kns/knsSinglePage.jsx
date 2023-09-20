import ComponentSkeleton from '@pages/components-overview/ComponentSkeleton';
import MainCard from '@components/MainCard';
import { Chip, Grid, Stack, Typography, Avatar, Box, Divider, Tooltip, Button } from '@mui/material';
import React, { useState, useEffect } from 'react';
import IncomeAreaChart from '@pages/kns/components/IncomeAreaChart';
import GrateItem from './items/GrateItem';
import KNSHeader from './components/KNSHeader';
import TankItem from './components/TankItem';
import PumpItem from './components/PumpItem';
import { useDispatch, useSelector } from 'react-redux';
import { getKNS } from './redux/knsSlice';
import { useSearchParams } from 'react-router-dom';
import Status from '@components/cards/statistics/StatusMain';
import AlertsTableActive from '@pages/kns/components/AlertsActiveTable';
import AlertsTableAll from '@pages/kns/components/AlertsAllTable';
import { QuestionCircleOutlined } from '@ant-design/icons';
import config from '../../config';
import permsCheck from '@pages/authentication/context/permsCheck';
import parseID from '@utils/getObjID';
import NotFound from '@pages/notFound';

const KnsSinglePage = () => {
    const dispatch = useDispatch();

    const [slot, setSlot] = useState(4);
    const [firstLoad, setFirstLoad] = useState(false);
    const [searchParams] = useSearchParams();
    const { data, loading, error } = useSelector((state) => state.kns);
    const knsActive = useSelector((state) => state.knsAlertsActive);
    const [timer, setTimer] = useState(Date.now());
    const glID = searchParams.get('id')
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
        dispatch(getKNS(glID));
        setInterval(() => setFirstLoad(true), 400);


    }, [timer, glID]);
    const userAccess = permsCheck(["level_10","level_9", "level_8"])
    const pageAccess = permsCheck(["level_10","level_9", "level_8","dash_kns_read_all",`dash_kns_read_${parseID(glID)}`])
    const renderPumps = data.pumps.map((pump) => {
        return <PumpItem props={pump} key={pump?.pumpID} />;
    });
    const renderGrids = data.grids.map((grid) => {
        return <GrateItem props={grid} key={grid.id} />;
    });
    return (
        <>{pageAccess? <>
        <ComponentSkeleton renderContent={firstLoad || (loading === 'idle' && firstLoad)}>
            {(data?.exist ?? firstLoad)? <><KNSHeader
                levels={data?.levels}
                Alarm={data?.alarmStatus}
                isOnline={data?.online}
                updateDate={data?.timeStamp}
                address={data?.address}
                id={data?.knsID}
                count={data?.alarmsAmount}
            />
            <Grid container rowSpacing={4.5} columnSpacing={2.75}>
                <Grid item xs={12} md={5} lg={5} sx={{ mt: 4 }}>
                    <Typography variant="h5">Резервуар</Typography>
                    <TankItem levels={data?.levels} />
                </Grid>
                <Grid item xs={12} md={7} lg={7} sx={{ mt: 4 }}>
                    <Typography variant="h5">Насоси</Typography>
                    <MainCard sx={{ mt: 2 }}>
                        <Grid container rowSpacing={4.5} columnSpacing={2.75}>
                            {renderPumps}
                        </Grid>
                    </MainCard>
                </Grid>
            </Grid>
            {data.grids.length > 0 ? (
                <Grid item xs={12} md={12} lg={12} sx={{ mt: 4 }}>
                    <Grid container alignItems="center" justifyContent="space-between">
                        <Grid item>
                            <Typography variant="h5">Статус рашіток</Typography>
                        </Grid>
                        <Grid item />
                    </Grid>
                    <Grid container rowSpacing={4.5} columnSpacing={2.75} sx={{ mt: -2 }}>
                        {renderGrids}
                    </Grid>
                </Grid>
            ) : null}
            <Grid container rowSpacing={4.5} columnSpacing={2.75} sx={{ mt: 0.2 }}>
                <Grid item xs={12} md={12} lg={12} sx={{ mb: -2 }}>
                    <Typography variant="h5">Статус Аварій</Typography>
                </Grid>
                <Grid item xs={12} md={4} lg={4}>
                    <Status
                        title={'Глобальний статус КНС'}
                        text={!data?.alarms?.globalAlarm ? 'В нормі' : 'Виявлено несправності в роботі'}
                        status={!data?.alarms?.globalAlarm}
                        extraText={!data?.alarms?.globalAlarm ? 'Всі системи працюють в штатному режимі' : 'Збій систем КНС'}
                    />
                </Grid>
                <Grid item xs={12} md={4} lg={4}>
                    <Status
                        title={'Статус електропостачання'}
                        text={!data?.alarms?.powerAlarm ? 'В нормі' : 'Збій електропостачання'}
                        status={!data?.alarms?.powerAlarm}
                        extraText={!data?.alarms?.powerAlarm ? 'Енергосистеми працюють в штатному режимі' : 'Збій систем електропостачання'}
                    />
                </Grid>
                <Grid item xs={12} md={4} lg={4}>
                    <Status
                        title={'Режим роботи насосів'}
                        text={!data?.warnings?.allManual ? 'В нормі' : 'Всі насоси в ручному режимі'}
                        status={!data?.warnings?.allManual}
                        extraText={
                            !data?.warnings?.allManual
                                ? 'Один або кілька насосів в режимі АВТО'
                                : 'Ручний режим ввімкнено на насосах №1, №2, №3'
                        }
                    />
                </Grid>
                <Grid item xs={12} md={4} lg={4}>
                    <Status
                        title={'Рівень - Перелив'}
                        text={!data?.alarms?.overflowAlarm ? 'Нижче встановленого значення' : 'Вище встановленого значення'}
                        status={!data?.alarms?.overflowAlarm}
                        extraText={
                            !data?.alarms?.overflowAlarm
                                ? `На ${Math.abs((data?.levels?.max - data?.levels?.current).toFixed(2))} см. нижче встановленого значення`
                                : `На ${Math.abs((data?.levels?.current - data?.levels?.max).toFixed(2))} см. вище встановленого значення`
                        }
                    />
                </Grid>
                <Grid item xs={12} md={4} lg={4}>
                    <Status
                        title={'Рівень - Сухий хід'}
                        text={!data?.warnings?.dryRun ? 'Вище встановленого значення' : 'Нижче встановленого значення'}
                        status={!data?.warnings?.dryRun}
                        extraText={
                            !data?.warnings?.dryRun
                                ? `На ${(Math.abs(data?.levels?.current - data?.levels?.min).toFixed(2))} см. вище встановленого значення`
                                : `На ${(Math.abs(data?.levels?.min - data?.levels?.current).toFixed(2))} см. нижче встановленого значення`
                        }
                    />
                </Grid>
                <Grid item xs={12} md={4} lg={4}>
                    <Status
                        title={'Підтоплення'}
                        text={!data?.alarms?.floodingAlarm ? 'Рівень вологості нормі' : 'Критичний рівень вологості'}
                        status={!data?.alarms?.floodingAlarm}
                        extraText={!data?.alarms?.floodingAlarm ? 'Проблем не виявлено' : 'Вода в робочому секторі'}
                    />
                </Grid>
                <Grid item xs={12} md={4} lg={4}>
                    <Status
                        title={'Статус зонду'}
                        text={!data?.alarms?.zondAlarm ? 'В нормі' : 'Критична аварія'}
                        status={!data?.alarms?.zondAlarm}
                        extraText={!data?.alarms?.zondAlarm ? 'Проблем не виявлено' : 'Виявлено збої в роботі зонду'}
                    />
                </Grid>
                <Grid item xs={12} md={4} lg={4}>
                    <Status
                        title={'Статус поплавків'}
                        text={!data?.alarms?.floatAlarm ? 'В нормі' : 'Критична аварія'}
                        status={!data?.alarms?.floatAlarm}
                        extraText={!data?.alarms?.floatAlarm ? 'Проблем не виявлено' : 'Виявлено збої в роботі поплавків'}
                    />
                </Grid>
                <Grid item xs={12} md={4} lg={4}>
                    <Status
                        title={'Статус дверей'}
                        text={!data?.warnings?.doorIsOpen ? 'Закриті' : 'Відкриті'}
                        status={!data?.warnings?.doorIsOpen}
                        extraText={!data?.warnings?.doorIsOpen ? 'Вхідні двері зачинено' : 'Вхідні двері відчинено'}
                    />
                </Grid>
            </Grid>
            {null && <Grid item xs={12} md={12} lg={12} sx={{ mt: 4 }}>
                <Grid container alignItems="center" justifyContent="space-between">
                    <Grid item>
                        <Typography variant="h5">Графік подій</Typography>
                    </Grid>
                    <Grid item>
                        <Stack direction="row" alignItems="center" spacing={0}>
                            <Button size="small" onClick={() => setSlot(0)} disabled={slot === 0 ? true : false}>
                                Місяць
                            </Button>
                            <Button size="small" onClick={() => setSlot(1)} disabled={slot === 1 ? true : false}>
                                Тиждень
                            </Button>
                            <Button size="small" onClick={() => setSlot(2)} disabled={slot === 2 ? true : false}>
                                Години
                            </Button>
                            <Button size="small" onClick={() => setSlot(3)} disabled={slot === 3 ? true : false}>
                                Хвилини
                            </Button>
                            <Button size="small" onClick={() => setSlot(4)} disabled={slot === 4 ? true : false}>
                                Секунди
                            </Button>
                        </Stack>
                    </Grid>
                </Grid>
                <MainCard content={false} sx={{ mt: 1.5 }}>
                    <Box sx={{ pt: 1, pr: 2, pl: 3 }}>
                        <IncomeAreaChart props={{ slot: slot, knsID: glID }} />
                    </Box>
                </MainCard>
            </Grid>}
            <Grid item xs={12} sx={{ mt: 4 }}>
                <Grid container alignItems="center" justifyContent="space-between">
                    <Grid item>
                        <Typography variant="h5">Управління аваріями</Typography>
                    </Grid>
                    <Grid item />

                </Grid>
                <Grid container>
                    <MainCard sx={{ mt: 2 }}>

                        <Typography variant="h6" color="secondary">Деактивація усіх аварій ({knsActive?.data?.activeAlarmsListTotal ?? 0})&nbsp;&nbsp;&nbsp;
                            <Button variant="contained" color="error" size="small" disabled={knsActive?.data?.activeAlarmsListTotal === 0 || null}>Деактивація</Button>
                            <Tooltip title="Деактивація аварій з високим пріорітетом неможлива при аварійному статусі об'єкту." placement="bottom">
                                <Button sx={{ p: 0, minWidth: 0, ml: 2 }}>
                                    <QuestionCircleOutlined style={{ fontSize: '24px', color: 'rgb(255 212 0)' }} />
                                </Button>
                            </Tooltip>
                        </Typography>

                    </MainCard>
                </Grid>
            </Grid>
            <Grid item xs={12} md={12} lg={12} sx={{ mt: 4 }}>
                <Grid container alignItems="center" justifyContent="space-between">
                    <Grid item>
                        <Typography variant="h5">Активні аварії</Typography>
                    </Grid>
                    <Grid item />
                </Grid>
                <MainCard sx={{ mt: 2 }} content={false}>
                    <AlertsTableActive knsID={glID} status={data?.statusOk} />
                </MainCard>
            </Grid>
            <Grid item xs={12} md={12} lg={12} sx={{ mt: 4 }}>
                <Grid container alignItems="center" justifyContent="space-between">
                    <Grid item>
                        <Typography variant="h5">Список останніх аварій</Typography>
                    </Grid>
                    <Grid item />
                </Grid>
                <MainCard sx={{ mt: 2 }} content={false}>
                    <AlertsTableAll knsID={glID} />
                </MainCard>
                </Grid></> : <NotFound text={"Об`єкт не знайдено."} subText={"Перевірте налаштування панелі"}/>}
            </ComponentSkeleton>
        </> : <NotFound text={"Доступ заборонено"} subText={"Ви не маєте доступу до даної сторінки"} code="400"/>} </>
    );
};

export default KnsSinglePage;
