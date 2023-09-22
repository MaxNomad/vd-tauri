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

const UpdateDBModal = ({ wellID, scheme, data }) => {
    const matchDownSM = useMediaQuery((theme) => theme.breakpoints.down('md'));
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const clearTable = () => {
        api.post(`/postUpdateWellTrigger`, { pumpID: wellID, schema: scheme })
            .then((response) => {
                if (response.status === 200) {
                    toastSuccess('Схему оновлено');
                    handleClose();
                } else {
                    toastError('Помилка при оновленні');
                    handleClose();
                }
            })
            .catch(() => {
                toastError('Помилка при оновленні трігера (500)');
            });
    };
    const intID = parseID(wellID);
    const { userData } = useSelector((state) => state.user);
    return (
        <>
            <MainCard sx={{ mt: 2 }}>
                <Typography variant="h6" color="secondary" sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    Обновити схеми БД
                    <Grid sx={{ mt: -0.5 }}>
                        <Button
                            variant="contained"
                            color="error"
                            size="small"
                            disabled={!permsCheck(['level_10'])}
                            onClick={handleClickOpen}
                        >
                            Оновити
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
                                Остання дія <TimeAgo targetTime={new Date(data?.events?.updateSchem?.date)} />
                            </>
                        ) : (
                            'Дії відсутні'
                        )}
                    </Grid>
                    <Grid>{data?.events?.updateSchem?.user ? `By ${data?.events?.updateSchem?.user}` : null}</Grid>
                </Typography>
            </MainCard>
            <Dialog open={open} onClose={handleClose} maxWidth="sm" fullScreen={matchDownSM}>
                <DialogTitle>
                    Оновлення схеми тригерів бази даних <b>WELL{intID}</b>
                </DialogTitle>
                <DialogContent dividers>
                    <DialogContentText>
                        <Typography variant="h6" color="error" sx={{ mt: -0.5 }}>
                            Ви плануєте внести зміни в схему тригерів бази даних. Будь ласка, ретельно перевірте та підтвердьте ці зміни
                            перед їх виконанням.
                        </Typography>
                        <br />
                        <Typography variant="h6" color="secondary" sx={{ mt: -1.5 }}>
                            Список тригерів, які будуть оновлені:
                            <Typography variant="h6" color="warning" sx={{ mt: -1.5 }}>
                                <br />
                                1. <b>trg_CheckDuplicateKeys_WELL{intID}</b> (Основний трігер для обробки данних)
                                <br />
                                2. <b>trg_CheckDuplicateKeys_ALARMSWELL{intID}</b> (Основний трігер для обробки аварій)
                            </Typography>
                            <br />
                            <Typography variant="h6" color="secondary">
                                Версія схеми&nbsp;&nbsp;
                                <Chip label={scheme ?? 'default'} variant="combined" color="success" size="small" />
                            </Typography>
                        </Typography>
                        <br />
                        <Divider sx={{ mt: -1.5 }} />
                        <Typography variant="h6" color="textSecondary" sx={{ mt: 1.5 }}>
                            Переконайтесь, що ви розумієте призначення цих тригерів та наслідки їх оновлення. Будь ласка, також зверніть
                            увагу на те, що внесені зміни можуть вплинути на роботу бази даних та додатків, які її використовують.
                            <br />
                            <br />
                            Після перевірки і підтвердження, ви можете натиснути кнопку <b>{"'Оновити схему'"}</b>, щоб продовжити. Якщо у
                            вас є сумніви або питання, будь ласка, зверніться до адміністратора бази даних або інженера з баз даних для
                            отримання додаткової інформації та підтримки.
                        </Typography>
                    </DialogContentText>
                </DialogContent>
                <DialogActions sx={{ display: 'flex', justifyContent: 'space-between', p: 3 }}>
                    <Button variant="contained" color="primary" size="medium" onClick={handleClose}>
                        Скасувати
                    </Button>
                    <Button variant="contained" color="error" size="medium" onClick={clearTable}>
                        Оновити схему
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};
export default React.memo(UpdateDBModal);
