import PropTypes from 'prop-types';
import React from 'react';
// material-ui
import { useTheme } from '@mui/material/styles';
import { Stack, Chip, Dialog, DialogTitle, DialogContent, DialogContentText, Typography } from '@mui/material';

// project import
import DrawerHeaderStyled from './DrawerHeaderStyled';
import Logo from '@components/Logo';
import { appVersion, isTauri, tauriVersion } from '@utils/Tauri';

// ==============================|| DRAWER HEADER ||============================== //

const DrawerHeader = ({ open }) => {
    const theme = useTheme();
    const [openDialog, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    return (
        // only available in paid version
        <DrawerHeaderStyled theme={theme} open={open} className={'drawlerVD'}>
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
            >
                <DialogTitle id="alert-dialog-title">
                    VD Control Alpha {appVersion}
                </DialogTitle>
                <DialogContent dividers>
                    <Typography variant="h6" color="textSecondary" sx={{ mb: 1.4 }}>
                        React&nbsp;&nbsp; <Chip
                            label={React.version} // Додано версію React
                            color="primary"
                            size="small"
                        />
                    </Typography>
                     {isTauri ? <Typography variant="h6" color="textSecondary" sx={{ mb: 1.4 }}>
                        Tauri&nbsp;&nbsp; <Chip
                            label={tauriVersion} // Додано версію React
                            size="small"
                            color="warning"
                        />
                    </Typography> : null}
                    <Typography variant="h6" color="textSecondary" sx={{ mb: 1.4 }}>
                        Http engine &nbsp;&nbsp; <Chip
                            label={isTauri ? "Hyperium" : "Axios"} // Додано версію React
                            size="small"
                            color="secondary"
                        />
                    </Typography>

                    <Typography variant="h6" color="textSecondary" sx={{ mb: 1.4 }}>
                        Lisence <b>MIT</b>
                    </Typography>
                    <Typography variant="h6" color="textSecondary" sx={{ mb: 1.4 }}>
                        Author: MaxNomad
                    </Typography>

                </DialogContent>
            </Dialog>
        </DrawerHeaderStyled>
    );
};

DrawerHeader.propTypes = {
    open: PropTypes.bool
};

export default DrawerHeader;