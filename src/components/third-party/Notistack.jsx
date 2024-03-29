import PropTypes from 'prop-types';
//material-ui
import { styled } from '@mui/material/styles';
import React from 'react';
// third-party
import { SnackbarProvider } from 'notistack';

// project import

import { SnackbarUtilsConfigurator } from '@utils/ToastNotistack';

// assets
import { CheckCircleOutlined, CloseCircleOutlined, InfoCircleOutlined, WarningOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';

// custom styles
const StyledSnackbarProvider = styled(SnackbarProvider)(({ theme }) => ({
    '&.SnackbarItem-variantError': {
        backgroundColor: theme.palette.error.main
    },
    '&.SnackbarItem-variantSuccess': {
        backgroundColor: theme.palette.success.main
    },
    '&.SnackbarItem-variant': {
        backgroundColor: theme.palette.success.main
    },
    '&.SnackbarItem-variantInfo': {
        backgroundColor: theme.palette.info.main
    },
    '&.SnackbarItem-variantWarning': {
        backgroundColor: theme.palette.warning.light
    }
}));

// ===========================|| SNACKBAR - NOTISTACK ||=========================== //

const Notistack = ({ children }) => {
    const snackbar = useSelector((state) => state.snackbar);
    const iconSX = { marginRight: 8, fontSize: '1.15rem' };

    return (
        <StyledSnackbarProvider
            maxSnack={snackbar.maxStack}
            dense={snackbar.dense}
            iconVariant={
                snackbar.iconVariant === 'useemojis'
                    ? {
                          success: <CheckCircleOutlined style={iconSX} />,
                          error: <CloseCircleOutlined style={iconSX} />,
                          warning: <WarningOutlined style={iconSX} />,
                          info: <InfoCircleOutlined style={iconSX} />
                      }
                    : undefined
            }
            hideIconVariant={snackbar.iconVariant === 'hide' ? true : false}
        >
            <SnackbarUtilsConfigurator />
            {children}
        </StyledSnackbarProvider>
    );
};

Notistack.propTypes = {
    children: PropTypes.node
};

export default Notistack;
