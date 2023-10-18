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
    Modal,
    Chip,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    DialogContentText
} from '@mui/material';

import React from 'react';
import ActiveStatus from './ActiveStatus';
import OrderStatus from './OrderStatus';
import { useTheme } from '@mui/material/styles';

const ModalInfo = ({ props, handleClose }) => {
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
        <Dialog open={props?.openModal} onClose={() => handleClose()} maxWidth="lg">
            <DialogTitle>
                <Typography variant="h5">{props?.tableAlertName}</Typography>
            </DialogTitle>
            <DialogContent dividers>
                <DialogContentText>
                    <Typography variant="h6">
                        Детальна інформація про аварію {props?.tableAlertID} за {new Date(props?.tableDate).toLocaleString()}
                    </Typography>
                    <Typography variant="h6" color="secondary" sx={{ pt: 2, pb: 2 }}>
                        <ActiveStatus active={props?.tableAlertState} />
                        <OrderStatus status={props?.tableAlertPrority} />
                        <Box sx={{ mt: 2, mb: -4 }}>
                            <TableContainer
                                sx={{
                                    width: '100%',
                                    overflowX: 'auto',
                                    position: 'relative',
                                    display: 'block',
                                    maxWidth: '100%',
                                    '& td, & th': { whiteSpace: 'nowrap' }
                                }}
                            >
                                <Table
                                    aria-labelledby="tableTitle"
                                    sx={{
                                        '& .MuiTableCell-root:first-child': {
                                            pl: 2
                                        },
                                        '& .MuiTableCell-root:last-child': {
                                            pr: 3
                                        }
                                    }}
                                >
                                    <TableHead>
                                        <TableRow>
                                            <TableCell align="left">Назва</TableCell>
                                            <TableCell align="left">Стан</TableCell>
                                            <TableCell align="left">Дата перегляду</TableCell>
                                            <TableCell align="left">Дата нормалізації</TableCell>
                                            <TableCell align="right">Дата запису</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {props?.reqListData.map((row) => (
                                            <TableRow key={row.id} sx={{ border: 0 }}>
                                                <TableCell component="th" scope="row">
                                                    {row.Al_Tag}
                                                </TableCell>
                                                <TableCell align="left">
                                                    <ActiveStatus active={row.Al_Active} />
                                                </TableCell>
                                                <TableCell align="left">
                                                    {row.Al_Ack_Time ? (
                                                        new Date(row.Al_Ack_Time).toLocaleString()
                                                    ) : (
                                                        <Chip label="Запис відсутній" size="small" color="primary" />
                                                    )}
                                                </TableCell>
                                                <TableCell align="left">
                                                    {row.Al_Norm_Time ? (
                                                        new Date(row.Al_Norm_Time).toLocaleString()
                                                    ) : (
                                                        <Chip label="Запис відсутній" size="small" color="primary" />
                                                    )}
                                                </TableCell>
                                                <TableCell align="right">
                                                    {row.Al_Event_Time ? (
                                                        new Date(row.Al_Event_Time).toLocaleString()
                                                    ) : (
                                                        <Chip label="Запис відсутній" size="small" color="primary" />
                                                    )}
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Box>
                    </Typography>
                </DialogContentText>
            </DialogContent>
            <DialogActions sx={{ display: 'flex', justifyContent: 'space-between', p: 3 }}>
                <Button variant="contained" onClick={() => handleClose()} color="success">
                    Скасувати
                </Button>

                <Button variant="contained" onClick={() => handleClose()} color="primary" disabled={props?.tableAlertPrority === 2}>
                    Прийняти
                </Button>
            </DialogActions>
        </Dialog>
    );
};
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '1px solid #7a7a7a',
    borderRadius: 2,
    boxShadow: 24,
    pt: 2,
    px: 2,
    pb: 2
};

export default React.memo(ModalInfo);
