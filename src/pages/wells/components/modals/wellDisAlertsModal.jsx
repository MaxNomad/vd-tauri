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

const WellDisAlrtsModal = ({ wellID, data }) => {
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
                    toastSuccess(`Аварії деактивовано`);
                    handleClose();
                } else {
                    toastError(response?.data?.message);
                    handleClose();
                }
            })
            .catch(() => {
                toastError('Неможливо виконати дію');
            });
    };
    const changeStatusWell = () => {
        changeStatus('reset');
    };
    const intID = parseID(wellID);
    const { userData } = useSelector((state) => state.user);
    return (
        <>
            <MainCard sx={{ mt: 2 }}>
                <Typography variant="h6" color="secondary" sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    Деактивація аварій
                    <Grid sx={{ mt: -0.5 }}>
                        <Button
                            variant="contained"
                            color="error"
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
                            Деактивація
                        </Button>

                        <Tooltip
                            title="Деактивація аварій з високим пріорітетом неможлива при аварійному статусі об'єкту."
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
                    <Grid item xs={9}>
                        {data?.events?.resetAlerts?.date ? (
                            <>
                                Остання дія <TimeAgo targetTime={new Date(data?.events?.resetAlerts?.date)} />
                            </>
                        ) : (
                            'Дії відсутні'
                        )}
                    </Grid>
                    <Grid>{data?.events?.resetAlerts?.user ? `By ${data?.events?.resetAlerts?.user}` : null}</Grid>
                </Typography>
            </MainCard>
            <Dialog open={open} onClose={handleClose} maxWidth="sm" fullScreen={matchDownSM}>
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
                    <Button variant="contained" color="success" size="medium" onClick={handleClose}>
                        Скасувати
                    </Button>
                    {wellData?.data?.status ? (
                        <Button variant="contained" color={'primary'} size="medium" onClick={changeStatusWell}>
                            Скинути аварії
                        </Button>
                    ) : null}
                </DialogActions>
            </Dialog>
        </>
    );
};
export default React.memo(WellDisAlrtsModal);
