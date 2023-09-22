import { Button, Chip, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Typography } from '@mui/material';
import { toastSuccess } from '@pages/components-overview/toasts';
import { checkUpdate, installUpdate } from '@tauri-apps/api/updater';
import { marked } from 'marked';
import { useDispatch, useSelector } from 'react-redux';
import React, { useState, useEffect } from 'react';
import { appVersion, isTauri } from './Tauri';
import { closeDialog, openDialog, setNeedUpdate, setUpdated } from '@store/reducers/dialogSlice';

const AppUpdateNotification = () => {
    const open = useSelector((state) => state.updateDialog.open);
    const [update, setUpdate] = useState({});
    const [terminated, setTerminated] = useState(true);
    const dispatch = useDispatch();

    const dispatchUpdate = () => {
        checkUpdate()
            .then((data) => setUpdate(data))
            .catch((err) => {
                console.log(err);
            });
    };
    const dispatchTerminated = () => {
        const terminateDate = localStorage.getItem('terminateDate');
        if (terminateDate) {
            const lastTerminateDate = new Date(terminateDate);
            const oneDayInMilliseconds = 24 * 60 * 60 * 1000; // One day in milliseconds
            const currentDate = new Date();

            if (currentDate - lastTerminateDate >= oneDayInMilliseconds) {
                setTerminated(false);
                localStorage.removeItem('terminateDate');
            } else {
                setTerminated(true);
            }
        } else {
            setTerminated(false);
        }
    };

    useEffect(() => {
        dispatchTerminated();
        const intervalId = setInterval(dispatchTerminated, 10000);
        return () => clearInterval(intervalId);
    }, []);

    useEffect(() => {
        dispatchUpdate();
        if (isTauri && !terminated) {
            const intervalId = setInterval(dispatchUpdate, 5000);
            return () => clearInterval(intervalId);
        }
    }, [terminated, isTauri]);

    useEffect(() => {
        if (!terminated) {
            if (update?.shouldUpdate || false) {
                dispatch(openDialog());
            } else {
                dispatch(closeDialog());
            }
        }
    }, [update]);

    useEffect(() => {
        if (update?.shouldUpdate) {
            dispatch(setNeedUpdate());
        }
    }, [update]);

    const handleUpdate = () => {
        installUpdate()
            .then((data) => console.log(data))
            .catch((err) => console.log(err));
    };

    const handleTerminate = () => {
        dispatch(closeDialog());
        setTerminated(true);
        toastSuccess('Оновлення відкладено на 24 години.');
        const now = new Date();
        localStorage.setItem('terminateDate', now.toISOString());
    };
    const html = marked.parse(update?.manifest?.body || '');

    const handlerOpen = () => dispatch(openDialog());

    const handleClose = () => dispatch(closeDialog());
    return (
        <>
            <Dialog open={open} maxWidth="md">
                <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', p: 3 }}>
                    <div>Доступне оновлення {update?.manifest?.version}</div>
                    <Chip color="secondary" variant="outlined" size="small" label={appVersion} />
                </DialogTitle>
                <DialogContent dividers>
                    <DialogContentText>
                        <Typography variant="caption" color="textSecondary" className="updateDialogText">
                            <div dangerouslySetInnerHTML={{ __html: html }} />
                        </Typography>
                    </DialogContentText>
                </DialogContent>
                <DialogActions sx={{ display: 'flex', justifyContent: 'space-between', p: 3 }}>
                    <Button variant="contained" color="success" size="medium" onClick={handleUpdate}>
                        <Typography variant="h6" color="secondary">
                            Оновити та перезапустити
                        </Typography>
                    </Button>
                    {!terminated ? (
                        <Button variant="contained" color="warning" size="medium" onClick={handleTerminate}>
                            <Typography variant="h6" color="secondary">
                                Нагадати пізніше
                            </Typography>
                        </Button>
                    ) : (
                        <Button variant="contained" color="primary" size="medium" onClick={handleClose}>
                            <Typography variant="h6" color="secondary">
                                закрити
                            </Typography>
                        </Button>
                    )}
                </DialogActions>
            </Dialog>
        </>
    );
};

export default AppUpdateNotification;
