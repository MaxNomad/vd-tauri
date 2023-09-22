import React, { useRef, useState } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import {
    Avatar,
    Badge,
    Box,
    ClickAwayListener,
    Divider,
    IconButton,
    List,
    ListItemButton,
    ListItemAvatar,
    ListItemText,
    ListItemSecondaryAction,
    Paper,
    Popper,
    Typography,
    useMediaQuery,
    Button,
    Tooltip
} from '@mui/material';

// project import
import MainCard from '@components/MainCard';
import Transitions from '@components/@extended/Transitions';

// assets
import { BellOutlined, CloseOutlined, CloudSyncOutlined, GiftOutlined, MessageOutlined, SettingOutlined } from '@ant-design/icons';
import { isTauri } from '@utils/Tauri';
import { useDispatch } from 'react-redux';
import { openDialog } from '@store/reducers/dialogSlice';
import { negate } from 'lodash';
import { useSelector } from 'react-redux';

// sx styles
const avatarSX = {
    width: 36,
    height: 36,
    fontSize: '1rem'
};

const actionSX = {
    mt: '6px',
    ml: 1,
    top: 'auto',
    right: 'auto',
    alignSelf: 'flex-start',

    transform: 'none'
};

// ==============================|| HEADER CONTENT - NOTIFICATION ||============================== //

const UpdateNotification = () => {
    const theme = useTheme();
    const iconBackColorOpen = 'grey.300';
    const iconBackColor = 'grey.100';
    const dispatch = useDispatch();
    const needUpdate = useSelector((state) => state.updateDialog.needUpdate);
    const handlerOpen = () => dispatch(openDialog());
    return isTauri ? (
        <Box sx={{ flexShrink: 0, ml: 0.75, display: 'flex' }}>
            {needUpdate ? (
                <Button variant="contained" size="medium" onClick={handlerOpen}>
                    <Typography variant="h6" sx={{ mr: 1.2 }}>
                        Доступне оновлення
                    </Typography>
                    <Badge variant="dot" color={'warning'} size="xs">
                        <CloudSyncOutlined style={{ fontSize: '18px' }} />
                    </Badge>
                </Button>
            ) : (
                <Tooltip title={`Встановлена остання версія`} placement="top">
                    <Badge variant="dot" color={'success'} size="xs" sx={{ mr: 1.2 }}>
                        <CloudSyncOutlined style={{ fontSize: '18px' }} />
                    </Badge>
                </Tooltip>
            )}
        </Box>
    ) : null;
};

export default UpdateNotification;
