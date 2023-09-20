import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Typography } from '@mui/material';
import { toastSuccess } from '@pages/components-overview/toasts';
import { checkUpdate, installUpdate } from '@tauri-apps/api/updater';
import parse from 'html-react-parser';
import React from 'react';

const isTauri = () => (window.__TAURI__ ? true : false);

const AppUpdateNotification = () => {
    const [open, setOpen] = React.useState(false);
    const [update, setUpdate] = React.useState({});

    const dispatchUpdate = () => {
        checkUpdate()
            .then((data) => setUpdate(data))
            .catch((err) => {
                console.log(err);
            });
        //toastSuccess("Check completed successfully")
    };

    React.useEffect(() => {
        dispatchUpdate();
        const intervalId = setInterval(dispatchUpdate, 5 * 60000);
        return () => clearInterval(intervalId);
    }, []);

    React.useEffect(() => {
        setOpen(update?.shouldUpdate || false);
    }, [update]);

    const handleClickOpen = () => {
        setOpen(true);
    };

    console.log(update);

    const handleClose = () => {
        installUpdate()
            .then((data) => console.log(data))
            .catch((err) => console.log(err));
    };
    return (
        <>
            <Dialog open={open} maxWidth="xs">
                <DialogTitle>Доступне оновлення {update?.manifest?.version}</DialogTitle>
                <DialogContent dividers>
                    <DialogContentText>
                        <Typography variant="h6" color="textSecondary">
                            {parse((update?.manifest?.body || '').toString())}
                        </Typography>
                    </DialogContentText>
                </DialogContent>
                <DialogActions sx={{ display: 'flex', justifyContent: 'space-between', p: 3 }}>
                    <Button variant="contained" color="success" size="medium" onClick={handleClose}>
                        <Typography variant="h6" color="secondary">
                            Оновити та перезапустити
                        </Typography>
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export { AppUpdateNotification, isTauri };
