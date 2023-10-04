import React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TimeAgo from '@pages/counters/components/timeAgo';
import { QuestionCircleOutlined } from '@ant-design/icons';
import { Grid, Tooltip, Typography, useMediaQuery } from '@mui/material';
import MainCard from '@components/MainCard';
import { api } from '../../../../api';
import { toastError, toastWarn } from '@pages/components-overview/toasts';
import { useSelector } from 'react-redux';
import permsCheck from '@pages/authentication/context/permsCheck';
import parseID from '@utils/getObjID';

const ClearTableModal = ({ wellID, data }) => {
    const matchDownSM = useMediaQuery((theme) => theme.breakpoints.down('md'));
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };
    const { userData } = useSelector((state) => state.user);
    const handleClose = () => {
        setOpen(false);
    };
    const clearTable = () => {
        api.delete(`/deleteClearWellTable?pumpID=${wellID}`)
            .then((response) => {
                if (response.status === 200) {
                    toastWarn('Таблицю очищено');
                    handleClose();
                } else {
                    toastError(response?.data?.message);
                    handleClose();
                }
            })
            .catch(() => {
                toastError('Помилка при очищені данних (500)');
            });
    };
    const intID = parseID(wellID);
    return (
        <>
            <MainCard sx={{ mt: 2 }}>
                <Typography variant="h6" color="secondary" sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    Очистити таблицю
                    <Grid sx={{ mt: -0.5 }}>
                        <Button
                            variant="contained"
                            color="error"
                            size="small"
                            onClick={handleClickOpen}
                            disabled={!permsCheck(['level_10'])}
                        >
                            Очистити
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
                        {data?.events?.clearTable?.date ? (
                            <>
                                Остання дія <TimeAgo targetTime={new Date(data?.events?.clearTable?.date)} />
                            </>
                        ) : (
                            'Дії відсутні'
                        )}
                    </Grid>
                    <Grid>{data?.events?.clearTable?.user ? `By ${data?.events?.clearTable?.user}` : null}</Grid>
                </Typography>
            </MainCard>
            <Dialog open={open} onClose={handleClose} maxWidth="sm" fullScreen={matchDownSM}>
                <DialogTitle>Ви впевнені, що хочете очистити дані таблиці WELL{intID}?</DialogTitle>
                <DialogContent dividers>
                    <DialogContentText>
                        <Typography variant="h6" color="secondary">
                            Усі дані, які в ній зберігаються, будуть безповоротно видалені, і цю дію не можна буде скасувати. Будь ласка,
                            підтвердьте своє рішення, натиснувши <b>{"'Очистити'"}</b>, або скасуйте операцію, натиснувши{' '}
                            <b>{"'Скасувати'"}</b>.
                        </Typography>
                    </DialogContentText>
                </DialogContent>
                <DialogActions sx={{ display: 'flex', justifyContent: 'space-between', p: 3 }}>
                    <Button variant="contained" color="primary" size="medium" onClick={handleClose}>
                        Скасувати
                    </Button>
                    <Button variant="contained" color="error" size="medium" onClick={clearTable}>
                        Очистити
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};
export default React.memo(ClearTableModal);
