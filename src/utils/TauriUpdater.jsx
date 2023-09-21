import { Button, Chip, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Typography } from '@mui/material';
import { toastSuccess } from '@pages/components-overview/toasts';
import { checkUpdate, installUpdate } from '@tauri-apps/api/updater';
import { marked } from 'marked';
import React from 'react';
import { appVersion, isTauri } from './Tauri';

const AppUpdateNotification = () => {
    const [open, setOpen] = React.useState(false);
    const [update, setUpdate] = React.useState({});
    const [terminated, setTerminated] = React.useState(false);
    
    const dispatchUpdate = () => {
        checkUpdate()
            .then((data) => setUpdate(data))
            .catch((err) => {
                console.log(err);
            });
    };

    React.useEffect(() => {
        if(isTauri && !terminated) {
            dispatchUpdate();
            const intervalId = setInterval(dispatchUpdate, 5000);
            return () => clearInterval(intervalId);
        }
    }, []);

    React.useEffect(() => {
        setOpen(update?.shouldUpdate || false);
    }, [update]);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const handleUpdate = () => {
        installUpdate()
            .then((data) => console.log(data))
            .catch((err) => console.log(err));
    };

    const html = marked.parse((update?.manifest?.body || '').toString());
    
    return (
        <>
            <Dialog open={open} maxWidth="md">
                <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', p: 3 }}>
                    <div>Доступне оновлення {update?.manifest?.version}</div><Chip color="secondary" variant="outlined" size="small" label={appVersion} />
                </DialogTitle>
                <DialogContent dividers>
                    <DialogContentText>
                        <Typography variant="caption" color="textSecondary" className='updateDialogText'>
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
                    <Button variant="contained" color="warning" size="medium" onClick={handleClose}>
                        <Typography variant="h6" color="secondary">
                            Нагадати пізніше
                        </Typography>
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default AppUpdateNotification;
