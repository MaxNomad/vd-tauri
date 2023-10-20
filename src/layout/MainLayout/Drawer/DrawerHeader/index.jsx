import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
// material-ui
import { useTheme } from '@mui/material/styles';
import { Stack, Chip, Dialog, DialogTitle, DialogContent, DialogContentText, Typography, Grid, Divider } from '@mui/material';

// project import
import DrawerHeaderStyled from './DrawerHeaderStyled';
import Logo from '@components/Logo';
import { appVersion, isTauri, tauriVersion } from '@utils/Tauri';
// ==============================|| DRAWER HEADER ||============================== //

import { allSysInfo, AllSystemInfo, refreshAll } from 'tauri-plugin-system-info-api';
import { invoke } from '@tauri-apps/api/tauri';
import TimeAgo from '@pages/counters/components/timeAgo';
import NumberWithAnimation from '@pages/kns/components/NumberWithAnimation';
import config from '@config';

const DrawerHeader = ({ open }) => {
    const theme = useTheme();
    const [openDialog, setOpen] = React.useState(false);
    const [sysInfo, setSysInfo] = React.useState({});
    const [sysPID, setSysPID] = React.useState(0);
    const [appData, setAppData] = React.useState({});
    const [memoryInfo, setMemoryInfo] = React.useState(performance.memory);

    const totalMemoryMB = memoryInfo?.jsHeapSizeLimit / (1024 * 1024) || 0;
    const usedMemoryMB = memoryInfo?.usedJSHeapSize / (1024 * 1024) || 0;
    const memoryUsagePercentage = (usedMemoryMB / totalMemoryMB) * 100;
    useEffect(() => {
        const fetchData = async () => {
            if (isTauri && openDialog) {
                try {
                    refreshAll();
                    const data = await allSysInfo();
                    setSysInfo(data);
                    setMemoryInfo(performance.memory)
                    const pidData = await invoke('get_current_pid');
                    setSysPID(pidData);
                } catch (error) {
                    // Handle errors here
                    console.error(error);
                }
            }
        };
        // Initial fetch
        fetchData();

        // Fetch data every second
        const intervalId = setInterval(fetchData, localStorage.apiUpdateTime ? localStorage.apiUpdateTime : config.defaultUpdateTime);

        // Cleanup interval on unmount
        return () => clearInterval(intervalId);
    }, [openDialog]);

    useEffect(() => {
        if (sysInfo?.processes && sysPID) {
            const processes = sysInfo?.processes;
            const filteredProcess = processes?.find((process) => process?.pid === sysPID);
            setAppData(filteredProcess || null);
        }
    }, [sysInfo, sysPID]);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const appSystems = React.useMemo(
        () => (
            <>
                <Grid item xs={8}>
                    <Typography variant="h5" color="secondary" sx={{ mb: 1.4 }}>
                        System
                    </Typography>
                    <Divider sx={{ mb: 1.4 }} />
                    <Grid container>
                        <Grid item xs={4}>
                            <Typography variant="h6" color="textSecondary" sx={{ mb: 1.5 }}>
                                Ім`я пристрою
                            </Typography>
                        </Grid>
                        <Grid item xs={8}>
                            <Typography variant="h6" color="textSecondary" sx={{ mb: 1.5 }}>
                                {sysInfo?.hostname}
                            </Typography>
                        </Grid>
                        <Grid item xs={4}>
                            <Typography variant="h6" color="textSecondary" sx={{ mb: 1.5 }}>
                                Операційна система
                            </Typography>
                        </Grid>
                        <Grid item xs={8}>
                            <Typography variant="h6" color="textSecondary" sx={{ mb: 1.5 }}>
                                {sysInfo?.name} ver {sysInfo?.os_version}
                            </Typography>
                        </Grid>
                        <Grid item xs={4}>
                            <Typography variant="h6" color="textSecondary" sx={{ mb: 1.5 }}>
                                Процесор
                            </Typography>
                        </Grid>
                        <Grid item xs={8}>
                            <Typography variant="h6" color="textSecondary" sx={{ mb: 1.5 }}>
                                {sysInfo?.cpus?.[0]?.brand}
                            </Typography>
                        </Grid>
                        <Grid item xs={4}>
                            <Typography variant="h6" color="textSecondary" sx={{ mb: 1.5 }}>
                                Кількість потоків
                            </Typography>
                        </Grid>
                        <Grid item xs={8}>
                            <Typography variant="h6" color="textSecondary" sx={{ mb: 1.5 }}>
                                x{sysInfo?.cpu_count} ({sysInfo?.cpus?.[0]?.frequency / 1000} GHz)
                            </Typography>
                        </Grid>
                        <Grid item xs={4}>
                            <Typography variant="h6" color="textSecondary" sx={{ mb: 1.5 }}>
                                Оперативна пам`ять
                            </Typography>
                        </Grid>
                        <Grid item xs={8}>
                            <Typography variant="h6" color="textSecondary" sx={{ mb: 1.5 }}>
                                {Math.round(sysInfo?.total_memory / 1024 ** 3)} GB
                            </Typography>
                        </Grid>
                    </Grid>
                    <Typography variant="h5" color="secondary" sx={{ mb: 1.4, mt: 1.4 }}>
                        App Performance
                    </Typography>
                    <Divider sx={{ mb: 1.4 }} />
                    <Grid container>
                        <Grid item xs={12}>
                            <Typography variant="h6" color="textSecondary" sx={{ mb: 1.5 }}>
                                Стан &nbsp;&nbsp;{' '}
                                <Chip
                                    label={appData?.status} // Додано версію React
                                    size="small"
                                    color={appData?.status === 'Run' ? 'success' : 'warning'}
                                />
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="h6" color="textSecondary" sx={{ mb: 1.5 }}>
                                <TimeAgo targetTime={new Date(appData?.start_time * 1000)} text={'Запущено'} />
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="h6" color="textSecondary" sx={{ mb: 1.5 }}>
                                Навантаження на ЦП <NumberWithAnimation number={(appData?.cpu_usage || 0).toFixed(2)} rev /> %
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="h6" color="textSecondary" sx={{ mb: 1.5 }}>
                            Використання пам`яті  <NumberWithAnimation number={(Math.round(appData?.memory / 1024 ** 2) + usedMemoryMB).toFixed(2)} one /> Mb
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="h6" color="textSecondary" sx={{ mb: 1.5 }}>
                                JavaScript Heap <NumberWithAnimation number={(usedMemoryMB).toFixed(2)} rev /> Mb / {totalMemoryMB} Mb (<NumberWithAnimation number={(memoryUsagePercentage).toFixed(2)} rev /> %)
                            </Typography>
                        </Grid>
                        
                    </Grid>
                </Grid>
            </>
        ),
        [appData]
    );
    return (
        // only available in paid version
        <DrawerHeaderStyled theme={theme} open={open}>
            <Stack direction="row" spacing={1} alignItems="center">
                <Logo />
                <Chip
                    label={appVersion} // Додано версію React
                    size="small"
                    sx={{ height: 16, '& .MuiChip-label': { fontSize: '0.625rem', py: 0.25 } }}
                    clickable
                    onClick={handleClickOpen}
                />
            </Stack>
            <Dialog
                open={openDialog}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                fullWidth
                maxWidth={isTauri ? 'sm' : 'xs'}
            >
                <DialogContent>
                    <Grid container rowSpacing={4.5} columnSpacing={2.75}>
                        <Grid item xs={isTauri ? 4 : 12}>
                            <Typography variant="h5" color="secondary" sx={{ mb: 1.4 }}>
                                App Info
                            </Typography>
                            <Divider sx={{ mb: 1.4 }} />

                            <Typography variant="h6" color="textSecondary" sx={{ mb: 1.4 }}>
                                React&nbsp;&nbsp;{' '}
                                <Chip
                                    label={React.version} // Додано версію React
                                    color="primary"
                                    size="small"
                                />
                            </Typography>
                            {isTauri ? (
                                <Typography variant="h6" color="textSecondary" sx={{ mb: 1.4 }}>
                                    Tauri&nbsp;&nbsp;{' '}
                                    <Chip
                                        label={tauriVersion} // Додано версію React
                                        size="small"
                                        color="warning"
                                    />
                                </Typography>
                            ) : null}
                            <Typography variant="h6" color="textSecondary" sx={{ mb: 1.4 }}>
                                Http engine &nbsp;&nbsp;{' '}
                                <Chip
                                    label={isTauri ? 'Hyper' : 'Axios'} // Додано версію React
                                    size="small"
                                    color="secondary"
                                />
                            </Typography>
                            <Typography variant="h6" color="textSecondary" sx={{ mb: 1.4 }}>
                                Access Type &nbsp;&nbsp;{' '}
                                <Chip
                                    label={'Enterprise'} // Додано версію React
                                    size="small"
                                    color="error"
                                />
                            </Typography>
                            <Typography variant="h6" color="textSecondary" sx={{ mb: 1.4 }}>
                                Lisence <b>MIT</b>
                            </Typography>
                            <Typography variant="h6" color="textSecondary" sx={{ mb: 1.4 }}>
                                Version&nbsp; <b>{appVersion}</b>
                            </Typography>
                            <Typography variant="h6" color="textSecondary" sx={{ mb: 1.4 }}>
                                Author MaxNomad
                            </Typography>
                        </Grid>
                        {isTauri && appSystems}
                    </Grid>
                </DialogContent>
            </Dialog>
        </DrawerHeaderStyled>
    );
};

DrawerHeader.propTypes = {
    open: PropTypes.bool
};

export default DrawerHeader;
