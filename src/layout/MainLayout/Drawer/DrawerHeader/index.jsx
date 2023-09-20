import PropTypes from 'prop-types';
import React from 'react';
// material-ui
import { useTheme } from '@mui/material/styles';
import { Stack, Chip } from '@mui/material';

// project import
import DrawerHeaderStyled from './DrawerHeaderStyled';
import Logo from '@components/Logo';
import { getVersion } from '@tauri-apps/api/app';
import { isTauri } from '@utils/TauriUpdater';

// ==============================|| DRAWER HEADER ||============================== //

const DrawerHeader = ({ open }) => {
    const theme = useTheme();
    const [appVersion, setAppVersion] = React.useState("");
    
    if(isTauri()){
        getVersion().then((data) => {
            setAppVersion(`${data}-Tauri`)
        })
        
    } else {
        setAppVersion("v1.234.1-Front")
    }
    
    return (
        // only available in paid version
        <DrawerHeaderStyled theme={theme} open={open} className={'drawlerVD'}>
            <Stack direction="row" spacing={1} alignItems="center">
                <Logo />
                <Chip
                    label={appVersion}
                    size="small"
                    sx={{ height: 16, '& .MuiChip-label': { fontSize: '0.625rem', py: 0.25 } }}
                    component="a"
                    href="https://github.com/MaxNomad/vdControl"
                    target="_blank"
                    clickable
                />
            </Stack>
        </DrawerHeaderStyled>
    );
};

DrawerHeader.propTypes = {
    open: PropTypes.bool
};

export default DrawerHeader;
