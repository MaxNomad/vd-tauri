import { InfoCircleOutlined, CheckCircleOutlined } from '@ant-design/icons';
import { Typography, Tooltip } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import React from 'react';

// project import

// ==============================|| LOADABLE - LAZY LOADING ||============================== //

// eslint-disable-next-line react/display-name
const CheckSettings = ({ ok }) => {
    const theme = useTheme();
    return (
        <Tooltip title={`Статус налаштування о'єкту: ${ok? "в нормі" : "потребує діагностики"}`} placement="top">
            <span>
            <Typography sx={{ mr: 1, mt: 0.4 }}>
                <>
                {ok ? (
                    <CheckCircleOutlined style={{ fontSize: 18, color: theme.palette.success.main }} />
                ) : (
                    <InfoCircleOutlined style={{ fontSize: 18, color: theme.palette.warning.main }} />
                )}
                </>
            </Typography>
            </span>
        </Tooltip>
    );
};

export default CheckSettings;
