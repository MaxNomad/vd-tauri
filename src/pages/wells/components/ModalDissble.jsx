import {
    Box,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
    Grid,
    Button,
    Chip,
    Tooltip,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    DialogContentText
} from '@mui/material';
import { QuestionCircleOutlined } from '@ant-design/icons';
import React from 'react';
import OrderStatus from './OrderStatus';
import AlertStatus from './AlertStatus';
import { useTheme } from '@mui/material/styles';

const ModalDelete = ({ props, disableSingleAlert, handleClose }) => {
    console.log(props);
    const theme = useTheme();
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: `1px solid ${theme.palette.mode === 'dark' ? theme.palette.divider : theme.palette.grey.A800}`,
        borderRadius: 2,
        boxShadow: 24,
        pt: 2,
        px: 2,
        pb: 2
    };
    return (
        <Dialog
            open={props?.open}
            onClose={() => handleClose()}
            aria-labelledby="child-modal-title"
            aria-describedby="child-modal-description"
        >
            <DialogTitle>
                <Typography variant="h5">Деактивація аварії</Typography>
            </DialogTitle>
            <DialogContent dividers>
                <DialogContentText>
                    <Typography variant="h6" color="secondary">
                        <OrderStatus status={props?.tableAlertPrority} />
                        <Box sx={{ mt: 1, mb: 1 }}>
                            <p />
                            <b>Назва: </b>
                            {props?.tableAlertName}
                            <p />
                            <b>ID: </b>
                            {props?.tableAlertID}
                            <p />
                            <b>Дата запису: </b>
                            {new Date(props?.tableDate).toLocaleString()}
                        </Box>
                        <AlertStatus status={props?.tableAlertPrority} />
                    </Typography>
                </DialogContentText>
            </DialogContent>
            <DialogActions sx={{ display: 'flex', justifyContent: 'space-between', p: 3 }}>
                <Button variant="contained" onClick={() => handleClose()} color="success">
                    Скасувати
                </Button>
                <div>
                    <Tooltip title="Деактивація аварій з високим пріорітетом неможлива при аварійному статусі об'єкту." placement="bottom">
                        <Button sx={{ p: 0, minWidth: 0, mr: 2 }}>
                            <QuestionCircleOutlined style={{ fontSize: '24px', color: 'rgb(255 212 0)' }} />
                        </Button>
                    </Tooltip>
                    <Button
                        variant="contained"
                        onClick={() => disableSingleAlert()}
                        color="error"
                        // disabled={props?.tableAlertPrority === 0}
                    >
                        Прийняти
                    </Button>
                </div>
            </DialogActions>
        </Dialog>
    );
};

export default React.memo(ModalDelete);
