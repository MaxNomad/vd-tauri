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

const WellControllModal = ({ wellID, data }) => {
    const matchDownSM = useMediaQuery((theme) => theme.breakpoints.down('md'));
    const [open, setOpen] = React.useState(false);
    const wellData = useSelector((state) => state.wellModbus);
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const changeStatus = (method) => {
        api.post(`/modbusWellController`, { pumpID: data?.pumpID, method: method })
            .then((response) => {
                if (response.status === 200) {
                    if (method === 'turnOn') {
                        toastSuccess(`Свердловину №${data?.pumpID} ввімкнуто`);
                        handleClose();
                    } else {
                        toastSuccess(`Свердловину №${data?.pumpID} вимкнуто`);
                        handleClose();
                    }
                } else {
                    toastError('Error: ' + response.status);
                    handleClose();
                }
            })
            .catch(() => {
                toastError('Неможливо виконати дію');
            });
    };
    const changeStatusWell = () => {
        data?.pump?.workingStatus ? changeStatus('turnOff') : changeStatus('turnOn');
    };
    const intID = parseID(wellID);
    const { userData } = useSelector((state) => state.user);
    return (
        <>
            <MainCard sx={{ mt: 2 }}>
                <Typography variant="h6" color="secondary" sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    Контроль стану
                    <Grid sx={{ mt: -0.5 }}>
                        <Button
                            variant="contained"
                            color={data?.pump?.workingStatus ? 'primary' : 'success'}
                            size="small"
                            onClick={handleClickOpen}
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
                        <Tooltip
                            title="Важливо наголосити на необхідності дотримання встановленого правила стосовно інтервалу в 30 секунд між змінами стану насосу. Це правило введене з метою уникнення можливого перенавантаження насосу та забезпечення його стабільної та ефективної роботи."
                            placement="bottom"
                        >
                            <Button sx={{ p: 0, minWidth: 0, ml: 2 }}>
                                <QuestionCircleOutlined style={{ fontSize: '24px', color: 'rgb(255 212 0)' }} />
                            </Button>
                        </Tooltip>
                    </Grid>
                </Typography>
                <Typography
                    variant="h6"
                    noWrap
                    color="textSecondary"
                    sx={{ mt: 1.5, mb: -1, display: 'flex', justifyContent: 'space-between' }}
                >
                    <Grid xs={9}>
                        {data?.events?.wellControll?.date ? (
                            <>
                                Остання дія <TimeAgo targetTime={new Date(data?.events?.wellControll?.date)} />
                            </>
                        ) : (
                            'Дії відсутні'
                        )}
                    </Grid>
                    <Grid>{data?.events?.wellControll?.user ? `By ${data?.events?.wellControll?.user}` : null}</Grid>
                </Typography>
            </MainCard>
            <Dialog open={open} onClose={handleClose} maxWidth="sm" fullScreen={matchDownSM}>
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
                    <Button variant="contained" color="success" size="medium" onClick={handleClose}>
                        Скасувати
                    </Button>
                    {wellData?.data?.status ? (
                        <Button
                            variant="contained"
                            color={data?.pump?.workingStatus ? 'primary' : 'success'}
                            size="medium"
                            onClick={changeStatusWell}
                        >
                            {data?.pump?.workingStatus ? `Вимкнути насос` : `Увімкнути насос`}
                        </Button>
                    ) : null}
                </DialogActions>
            </Dialog>
        </>
    );
};
export default React.memo(WellControllModal);
