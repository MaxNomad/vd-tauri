import React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TimeAgo from '@pages/counters/components/timeAgo';
import { QuestionCircleOutlined } from '@ant-design/icons';
import { Alert, Chip, Divider, Grid, Tooltip, Typography, useMediaQuery } from '@mui/material';
import MainCard from '@components/MainCard';
import { api } from '../../../../api';
import { toastError, toastSuccess, toastWarn } from '@pages/components-overview/toasts';
import { useSelector } from 'react-redux';
import PumpStatusClear from '@pages/pumpStations/items/PumpStatusClear';
import Modbus from '../modbus';
import permsCheck from '@pages/authentication/context/permsCheck';
import parseID from '@utils/getObjID';

const SmallWellController = ({ wellID, data }) => {
    const matchDownSM = useMediaQuery((theme) => theme.breakpoints.down('md'));
    const [openControll, setOpenControll] = React.useState(false);
    const [openAlert, setOpenAlert] = React.useState(false);
    const wellData = useSelector((state) => state.wellModbus);
    const handleClickOpenControll = () => {
        setOpenControll(true);
    };

    const handleCloseControll = () => {
        setOpenControll(false);
    };
    const handleClickOpenAlert = () => {
        setOpenAlert(true);
    };

    const handleCloseAlert = () => {
        setOpenAlert(false);
    };

    const changeStatusControll = (method) => {
        api.post(`/modbusWellController`, { pumpID: data?.pumpID, method: method })
            .then((response) => {
                if (response.status === 200) {
                    if (method === 'turnOn') {
                        toastSuccess(`Свердловину №${data?.pumpID} ввімкнуто`);
                        handleCloseControll();
                    } else {
                        toastSuccess(`Свердловину №${data?.pumpID} вимкнуто`);
                        handleCloseControll();
                    }
                } else {
                    toastError(response?.data?.message);
                    handleCloseControll();
                }
            })
            .catch(() => {
                toastError('Неможливо виконати дію');
            });
    };
    const changeStatusWellControll = () => {
        data?.pump?.workingStatus ? changeStatusControll('turnOff') : changeStatusControll('turnOn');
    };

    const changeStatusAlert = (method) => {
        api.post(`/modbusWellController`, { pumpID: data?.pumpID, method: method })
            .then((response) => {
                if (response.status === 200) {
                    toastSuccess(`Аварії деактивовано`);
                    handleCloseAlert();
                } else {
                    toastError(response?.data?.message);
                    handleCloseAlert();
                }
            })
            .catch(() => {
                toastError('Неможливо виконати дію');
            });
    };
    const changeStatusWellAlert = () => {
        changeStatusAlert('reset');
    };
    const intID = parseID(wellID);
    const { userData } = useSelector((state) => state.user);
    return (
        <>
            <Divider />
            <Typography variant="h6" color="secondary" sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Grid sx={{ mt: 1.5 }}>
                    <Button

                        variant="contained"
                        color="error"
                        size="small"
                        onClick={handleClickOpenAlert}
                        disabled={
                            !permsCheck([
                                'level_10',
                                'level_9',
                                'level_8',
                                'dash_well_write_all',
                                'dash_well_control_all',
                                `dash_well_write_${intID}`,
                                `dash_well_control_${intID}`
                            ]) ||
                            data?.modbus?.ip === null ||
                            !data?.online
                        }
                    >
                        Деактивація аварій
                    </Button>
                </Grid>
                <Grid sx={{ mt: 1.5 }}>
                    <Button
                        variant="contained"
                        color={data?.pump?.workingStatus ? 'primary' : 'success'}
                        size="small"
                        onClick={handleClickOpenControll}
                        disabled={
                            !permsCheck([
                                'level_10',
                                'level_9',
                                'level_8',
                                'dash_well_write_all',
                                'dash_well_control_all',
                                `dash_well_write_${intID}`,
                                `dash_well_control_${intID}`
                            ]) ||
                            data?.modbus?.ip === null ||
                            !data?.online
                        }
                    >
                        {data?.pump?.workingStatus ? 'Вимкнути насос' : 'Увімкнути насос'}
                    </Button>
                </Grid>
            </Typography>

            <Dialog open={openControll} onClose={handleCloseControll} maxWidth="sm" fullScreen={matchDownSM}>
                <DialogTitle>
                    Контроль стану об`єкту <b>WELL{intID}</b>
                </DialogTitle>
                <DialogContent dividers>
                    <DialogContentText>
                        <Typography variant="h6" color="error" sx={{ mt: -0.5 }}>
                            Важливо наголосити на необхідності дотримання встановленого правила стосовно інтервалу в <b>30 секунд</b> між
                            змінами стану насосу. Це правило введене з метою уникнення можливого перенавантаження насосу та забезпечення
                            його стабільної та ефективної роботи.
                        </Typography>
                        <br />
                        <Typography variant="h6" color="secondary" sx={{ mt: -1.5 }}>
                            <Divider sx={{ mt: -1.5, mb: 0.3 }} />
                            <Grid container>
                                <Grid item lg={6} md={6} sm={12} xs={12}>
                                    <Typography variant="h6" color="secondary" sx={{ mt: 1.2 }}>
                                        Стан свердловини&nbsp;&nbsp;
                                        <PumpStatusClear isOnline={data?.pump?.workingStatus} />
                                    </Typography>
                                </Grid>
                                <Grid item lg={6} md={6} sm={12} xs={12}>
                                    <Typography variant="h6" color="secondary" sx={{ mt: 1.2 }}>
                                        Дата:&nbsp;&nbsp; {new Date().toLocaleString()}
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Typography>
                        <br />
                        <Divider sx={{ mt: -1.5, mb: 1.1 }} />

                        <Modbus data={data} />

                        <Divider sx={{ mt: 1.5 }} />
                        <Typography variant="h6" color="textSecondary" sx={{ mt: 1.4 }}>
                            <Grid container>
                                <Grid item lg={4.5} md={4.5} sm={12} xs={12}>
                                    До кінця інтервалу: <b>30</b> сек.
                                </Grid>
                                <Grid item lg={3.5} md={3.5} sm={12} xs={12}>
                                    Інтервал: <b>30</b> сек.
                                </Grid>
                                <Grid item lg={4} md={4} sm={12} xs={12}>
                                    Приблизний час відгуку: <b>8000</b> ms.
                                </Grid>
                            </Grid>
                        </Typography>
                        <Divider sx={{ mt: 1.5 }} />
                        <Typography variant="h6" color="secondary" sx={{ mt: 1.4 }}>
                            <Grid container>
                                <Grid item lg={6} md={6} sm={12} xs={12}>
                                    Користувач: <b>{`${userData?.first_name} ${userData?.last_name}`}</b>
                                </Grid>
                                <Grid item lg={6} md={6} sm={12} xs={12}>
                                    Username: <b>{userData?.user_login}</b>
                                </Grid>
                            </Grid>
                        </Typography>
                        <Divider sx={{ mt: 1.5 }} />
                        <Typography variant="h6" color="textSecondary" sx={{ mt: 1.5 }}>
                            Після перевірки і підтвердження, ви можете натиснути кнопку{' '}
                            <b>{data?.pump?.workingStatus ? `Вимкнути насос` : `Увімкнути насос`}</b>, щоб продовжити. Якщо у вас є сумніви
                            або питання, будь ласка, зверніться до адміністратора або інженера з для отримання додаткової інформації та
                            підтримки.
                        </Typography>
                        {wellData?.data?.status ? (
                            <Alert severity="success" sx={{ mt: 2 }}>
                                Пристрій в мережі, керування доступне
                            </Alert>
                        ) : (
                            <Alert severity="error" sx={{ mt: 2 }}>
                                Неможливе керування, оскільки об`єкт не в мережі
                            </Alert>
                        )}
                    </DialogContentText>
                </DialogContent>
                <DialogActions sx={{ display: 'flex', justifyContent: 'space-between', p: 3 }}>
                    <Button variant="contained" color="success" size="medium" onClick={handleCloseControll}>
                        Скасувати
                    </Button>
                    {wellData?.data?.status ? (
                        <Button
                            variant="contained"
                            color={data?.pump?.workingStatus ? 'primary' : 'success'}
                            size="medium"
                            onClick={changeStatusWellControll}
                        >
                            {data?.pump?.workingStatus ? `Вимкнути насос` : `Увімкнути насос`}
                        </Button>
                    ) : null}
                </DialogActions>
            </Dialog>
            <Dialog open={openAlert} onClose={handleCloseAlert} maxWidth="sm" fullScreen={matchDownSM}>
                <DialogTitle>
                    Контроль аварій <b>WELL{intID}</b>
                </DialogTitle>
                <DialogContent dividers>
                    <DialogContentText>
                        <Typography variant="h6" color="secondary" sx={{ mt: -1.5 }}>
                            <Grid container>
                                <Grid item lg={6} md={6} sm={12} xs={12}>
                                    <Typography variant="h6" color="secondary" sx={{ mt: 1.2 }}>
                                        Стан свердловини&nbsp;&nbsp;
                                        <PumpStatusClear isOnline={data?.pump?.workingStatus} />
                                    </Typography>
                                </Grid>
                                <Grid item lg={6} md={6} sm={12} xs={12}>
                                    <Typography variant="h6" color="secondary" sx={{ mt: 1.2 }}>
                                        Дата:&nbsp;&nbsp; {new Date().toLocaleString()}
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Typography>
                        <br />
                        <Divider sx={{ mt: -1.5, mb: 1.1 }} />

                        <Modbus data={data} />

                        <Divider sx={{ mt: 1.5 }} />
                        <Typography variant="h6" color="secondary" sx={{ mt: 1.4 }}>
                            <Grid container>
                                <Grid item lg={6} md={6} sm={12} xs={12}>
                                    Користувач: <b>{`${userData?.first_name} ${userData?.last_name}`}</b>
                                </Grid>
                                <Grid item lg={6} md={6} sm={12} xs={12}>
                                    Username: <b>{userData?.user_login}</b>
                                </Grid>
                            </Grid>
                        </Typography>
                        <Divider sx={{ mt: 1.5 }} />
                        <Typography variant="h6" color="textSecondary" sx={{ mt: 1.5 }}>
                            Після перевірки і підтвердження аварійної ситуації, ви можете натиснути кнопку <b>Скинути аварії</b>, щоб
                            відновити нормальний режим роботи. Проте, якщо у вас є сумніви або питання стосовно цієї аварійної ситуації,
                            будь ласка, негайно зверніться до адміністратора або інженера для отримання додаткової інформації та необхідної
                            підтримки. Ваша безпека та правильна реакція на аварійні ситуації - наш пріоритет.
                        </Typography>
                        {wellData?.data?.status ? (
                            <Alert severity="success" sx={{ mt: 2 }}>
                                Пристрій в мережі, керування доступне
                            </Alert>
                        ) : (
                            <Alert severity="error" sx={{ mt: 2 }}>
                                Неможливе керування, оскільки об`єкт не в мережі
                            </Alert>
                        )}
                    </DialogContentText>
                </DialogContent>
                <DialogActions sx={{ display: 'flex', justifyContent: 'space-between', p: 3 }}>
                    <Button variant="contained" color="success" size="medium" onClick={handleCloseAlert}>
                        Скасувати
                    </Button>
                    {wellData?.data?.status ? (
                        <Button variant="contained" color={'primary'} size="medium" onClick={changeStatusWellAlert}>
                            Скинути аварії
                        </Button>
                    ) : null}
                </DialogActions>
            </Dialog>
        </>
    );
};
export default React.memo(SmallWellController);
