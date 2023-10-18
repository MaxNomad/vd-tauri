import { Button, Chip, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Typography, useTheme } from '@mui/material';
import { toastSuccess } from '@pages/components-overview/toasts';
import { checkUpdate, installUpdate } from '@tauri-apps/api/updater';
import { marked } from 'marked';
import { useDispatch, useSelector } from 'react-redux';
import React, { useState, useEffect } from 'react';
import { appVersion, isTauri } from './Tauri';
import { closeDialog, openDialog, setNeedUpdate, setUpdated } from '@store/reducers/dialogSlice';
import { Console, Hook, Unhook } from 'console-feed';
import { inProdMode } from '@config';

const AppConsole = () => {
    const [open, setOpen] = useState(false);
    const [logs, setLogs] = useState([]);
    const theme = useTheme();
    useEffect(() => {
        const hookedConsole = Hook(window.console, (log) => setLogs((currLogs) => [...currLogs, log]), false);
        return () => Unhook(hookedConsole);
    }, []);

    const handleClose = () => setOpen(false);
    return (
        <>
            <Dialog open={open} maxWidth="md" onClose={handleClose}>
                <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', p: 3 }}>App console</DialogTitle>
                <DialogContent dividers>
                    {logs.length > 0 ? (
                        <Console logs={logs} variant={theme.palette.mode} />
                    ) : (
                        <Typography variant="h6" align="center">
                            Таблиця записів пуста
                        </Typography>
                    )}
                </DialogContent>
            </Dialog>
        </>
    );
};

export default AppConsole;
