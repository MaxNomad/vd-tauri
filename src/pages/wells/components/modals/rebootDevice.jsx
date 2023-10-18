import React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TimeAgo from '@pages/counters/components/timeAgo';
import { QuestionCircleOutlined } from '@ant-design/icons';
import { Chip, Divider, Grid, Tooltip, Typography, useMediaQuery } from '@mui/material';
import MainCard from '@components/MainCard';
import { api } from '../../../../api';
import { toastError, toastSuccess, toastWarn } from '@pages/components-overview/toasts';
import { useSelector } from 'react-redux';
import permsCheck from '@pages/authentication/context/permsCheck';
import parseID from '@utils/getObjID';

const RebootDeviceModal = ({ wellID, scheme, data }) => {
    const matchDownSM = useMediaQuery((theme) => theme.breakpoints.down('md'));
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const clearTable = () => {
        api.post(`/rebootDevice`, { pumpID: wellID, schema: scheme })
            .then((response) => {
                if (response.status === 200) {
                    toastSuccess('Дію виконано');
                    handleClose();
                } else {
                    toastError(response?.data?.message);
                    handleClose();
                }
            })
            .catch(() => {
                toastError('Помилка при оновленні трігера (500)');
            });
    };
    const intID = parseID(wellID);
    const { userData } = useSelector((state) => state.user);
    console.log(data)
    return (
        <>
            <MainCard sx={{ mt: 2 }}>
                <Typography variant="h6" color="secondary" sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    Перезавантаження контроллеру
                    <Grid sx={{ mt: -0.5 }}>
                        <Button
                            variant="contained"
                            color="error"
                            size="small"
                            disabled={
                                !permsCheck([
                                    'level_10',
                                    'level_9',
                                    'level_8',
                                    'dash_well_write_all',
                                    'dash_well_control_all',
                                    'dash_well_reboot_all',
                                    `dash_well_reboot_${intID}`,
                                    `dash_well_write_${intID}`,
                                    `dash_well_control_${intID}`
                                ])}
                            onClick={handleClickOpen}
                        >
                            Reboot
                        </Button>
                        <Tooltip title="" placement="bottom">
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
                        {data?.events?.updateSchem?.date ? (
                            <>
                                Остання дія <TimeAgo targetTime={new Date(data?.events?.rebootDevice?.date)} />
                            </>
                        ) : (
                            'Дії відсутні'
                        )}
                    </Grid>
                    <Grid>{data?.events?.updateSchem?.user ? `By ${data?.events?.rebootDevice?.user}` : null}</Grid>
                </Typography>
            </MainCard>
            <Dialog open={open} onClose={handleClose} maxWidth="sm" fullScreen={matchDownSM}>
                <DialogTitle>
                    Перезавантаження контроллера <b>WELL{intID}</b>
                </DialogTitle>
                <DialogContent dividers>
                    <DialogContentText>
                        <Typography variant="h6" color="error" sx={{ mt: -0.5 }}>
                            Ви плануєте перезавантажити контроллер. Будь ласка, ретельно перевірте та підтвердьте ці зміни
                            перед їх виконанням.
                        </Typography>
                      
                        <Typography variant="h6" color="secondary" sx={{ mt: -1.5 }}>
                            <br />
                            <Typography variant="h6" color="secondary">
                                Версія схеми&nbsp;&nbsp;
                                <Chip label={scheme ?? 'default'} variant="combined" color="success" size="small" />
                            </Typography>
                        </Typography>
                        <br />
                        <Divider sx={{ mt: -1.5 }} />
                        <Typography variant="h6" color="textSecondary" sx={{ mt: 1.5 }}>
                            Після перевірки і підтвердження, ви можете натиснути кнопку <b>{"'Reboot'"}</b>, щоб продовжити. Якщо у
                            вас є сумніви або питання, будь ласка, зверніться до адміністратора або інженера для
                            отримання додаткової інформації та підтримки.
                        </Typography>
                    </DialogContentText>
                </DialogContent>
                <DialogActions sx={{ display: 'flex', justifyContent: 'space-between', p: 3 }}>
                    <Button variant="contained" color="success" size="medium" onClick={handleClose}>
                        Скасувати
                    </Button>
                    <Button variant="contained" color="error" size="medium" onClick={clearTable}>
                        Reboot
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};
export default React.memo(RebootDeviceModal);
