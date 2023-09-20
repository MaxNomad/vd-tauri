import { Box, Typography, Grid, Button, Modal, Tooltip } from '@mui/material';
import { QuestionCircleOutlined } from '@ant-design/icons';
import React from 'react';
import OrderStatus from './OrderStatus';
import AlertStatus from './AlertStatus';
import { useTheme } from '@mui/material/styles';

const ModalDelete = ({ props, disableSingleAlert, handleClose }) => {
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
        <Modal
            open={props?.open}
            onClose={() => handleClose()}
            aria-labelledby="child-modal-title"
            aria-describedby="child-modal-description"
        >
            <Box sx={{ ...style, width: { lg: 600, md: 520, xs: 360 } }}>
                <Grid container>
                    <Grid item lg={12} md={12} xs={12}>
                        <Typography variant="h5">Деактивація аварії</Typography>
                        <Typography variant="h6" color="secondary" sx={{ pt: 1, pb: 2 }}>
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
                    </Grid>
                    <Grid item lg={6} md={6} xs={6}>
                        <Button
                            variant="contained"
                            onClick={() => disableSingleAlert()}
                            color="error"
                            disabled={props?.tableAlertPrority === 2}
                        >
                            Прийняти
                        </Button>

                        <Tooltip
                            title="Деактивація аварій з високим пріорітетом неможлива при аварійному статусі об'єкту."
                            placement="bottom"
                        >
                            <Button sx={{ p: 0, minWidth: 0, ml: 2 }}>
                                <QuestionCircleOutlined style={{ fontSize: '24px', color: 'rgb(255 212 0)' }} />
                            </Button>
                        </Tooltip>
                    </Grid>
                    <Grid item lg={6} md={6} xs={6} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <Button variant="contained" onClick={() => handleClose()} color="success">
                            Скасувати
                        </Button>
                    </Grid>
                </Grid>
            </Box>
        </Modal>
    );
};

export default React.memo(ModalDelete);
