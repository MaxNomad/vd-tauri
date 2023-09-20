import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import TablePagination from '@mui/material/TablePagination';
// material-ui
import {
    Box,
    Link,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
    Grid,
    Button,
    Alert,
} from '@mui/material';
import { CloseOutlined, CheckOutlined } from '@ant-design/icons';
// third-party

// project import
import { getPumpAlertsActive } from '../redux/pumpAlertsActiveSlice';
import { useDispatch, useSelector } from 'react-redux';
import { deleteKNSAlert } from '@pages/kns/redux/knsAlertDisableSlice';
import config from "../../../config"
import { useTheme } from '@mui/material/styles';
import ModalDissble from './ModalDissble';
import OrderStatus from './OrderStatus';
import ActiveStatus from './ActiveStatus';
import TimeAgo from '@pages/counters/components/timeAgo';

// ==============================|| ORDER TABLE - HEADER CELL ||============================== //

const headCells = [
    {
        id: 'date',
        align: 'left',
        disablePadding: false,
        label: 'Дата запису'
    },
    {
        id: 'errName',
        align: 'left',
        disablePadding: true,
        label: 'Тип аварії'
    },
    {
        id: 'object',
        align: 'left',
        disablePadding: false,
        label: 'Обє`кт'
    },
    {
        id: 'priority',
        align: 'left',
        disablePadding: false,

        label: 'Пріорітет'
    },
    {
        id: 'active',
        align: 'left',
        disablePadding: false,
        label: 'Активність'
    },
    {
        id: 'code',
        align: 'left',
        disablePadding: false,
        label: 'Код аварії'
    },
    {
        id: 'disable',
        align: 'right',
        disablePadding: true,
        label: 'Деактивуати'
    }
];

// ==============================|| ORDER TABLE - HEADER ||============================== //

function OrderTableHead({ order, orderBy }) {
    return (
        <TableHead>
            <TableRow>
                {headCells?.map((headCell) => (
                    <TableCell
                        key={headCell.id}
                        align={headCell.align}
                        padding={headCell.disablePadding ? 'none' : 'normal'}
                        sortDirection={orderBy === headCell.id ? order : false}
                    >
                        {headCell.label}
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}

OrderTableHead.propTypes = {
    order: PropTypes.string,
    orderBy: PropTypes.string
};

// ==============================|| ORDER TABLE ||============================== //

const AlertsTableActive = ({ pumpID, status }) => {
    const dispatch = useDispatch();
    const { data, loading } = useSelector((state) => state.pumpAlertsActive);
    const { reqData } = useSelector((state) => state.knsAlertDisable);
    const [order] = useState('asc');
    const [orderBy] = useState('active');
    const [selected] = useState([]);
    const isSelected = (active) => selected.indexOf(active) !== -1;
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [timer, setTimer] = useState(Date.now());
    const [firstLoad, setFirstLoad] = useState(false);
    const [open, setOpen] = useState(false);
    const [tableAlertID, setTableAlertID] = useState('');
    const [tableDate, setTableDate] = useState('');
    const [tableAlertName, setTableAlertName] = useState('');
    const [tableAlertPrority, setTableAlertPriority] = useState(0);
    const [delCounter, SetdelCounter] = useState(0);
    const theme = useTheme();

    useEffect(() => {
        const interval = setInterval(() => setTimer(Date.now()), localStorage.apiUpdateTime ? localStorage.apiUpdateTime : config.defaultUpdateTime);
        return () => {
            clearInterval(interval);
        };
    }, []);

    useEffect(() => {
        dispatch(getPumpAlertsActive({ id: pumpID, page: page, perPage: rowsPerPage }));
        setFirstLoad(true);
    }, [page, rowsPerPage, timer, delCounter, reqData]);

    useEffect(() => {
        if(data.activeAlarmsListTotal !== 0 && data.activeAlarmsList.length === 0){
            setPage(p => p> 0 ? p - 1 : 0);
        }
    }, [data]);

    const handleOpen = (props) => {
        setTableAlertName(props.name);
        setTableDate(props.date);
        setTableAlertID(props.id);
        setTableAlertPriority(props.priority);
        setOpen(true);
    };

    handleOpen.propTypes = {
        name: PropTypes.string,
        date: PropTypes.string,
        id: PropTypes.string,
        priority: PropTypes.number,
    };

    const handleClose = () => {
        setOpen(false);
        setTableAlertName('');
        setTableDate('');
        setTableAlertID('');
        setTableAlertPriority(0);
    };

    const disableSingleAlert = () => {
    dispatch(deleteKNSAlert({ tag: tableAlertID, date: tableDate }));
    SetdelCounter(x=> x > 0 ? x + 1: 0);
    handleClose();
        
    };
    
    const handleChangePage = (event, newPage) => {
        setPage(parseInt(newPage));
        
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };



    return (
        <Box>
            <ModalDissble props={{open: open, status:status , tableAlertPrority: tableAlertPrority,tableDate: tableDate, tableAlertName:tableAlertName, tableAlertID: tableAlertID}} disableSingleAlert={disableSingleAlert} handleClose={handleClose} />
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
                {data.activeAlarmsList.length !== 0 ? (
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
                        <OrderTableHead order={order} orderBy={orderBy} />
                        <TableBody>
                            {data.activeAlarmsList.map((row, index) => {
                                const isItemSelected = isSelected(row.active);
                                const labelId = `enhanced-table-checkbox-${index}`;

                                return (
                                    <TableRow
                                        hover
                                        role="checkbox"
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        aria-checked={isItemSelected}
                                        tabIndex={-1}
                                        key={row?.date + row?.code + row?.priority}
                                        selected={isItemSelected}
                                    >
                                        <TableCell component="th" id={labelId} scope="row" align="left">
                                                <TimeAgo targetTime={new Date(row?.date)} />
                                        </TableCell>
                                        <TableCell align="left">{row?.errName}</TableCell>
                                        <TableCell align="left">{row?.object}</TableCell>
                                        <TableCell align="left">
                                            <OrderStatus status={row?.priority} />
                                        </TableCell>
                                        <TableCell align="left">
                                            <ActiveStatus active={row?.active} />
                                        </TableCell>
                                        <TableCell align="left">{row?.code}</TableCell>
                                        <TableCell align="right" sx={{ p: 0 }}>
                                            <Button
                                                variant="contained"
                                                onClick={() =>
                                                    handleOpen({
                                                        name: row?.errName,
                                                        id: row?.code,
                                                        date: row?.dateUTC,
                                                        priority: row?.priority
                                                    })
                                                }
                                                sx={{ p: 0.7, minWidth: 20 }}
                                                color="error"
                                            >
                                                <CloseOutlined style={{ fontSize: '12px', color: 'white'}} />
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                        </TableBody>{' '}
                    </Table>
                ) : (
                    <Grid item lg={12} style={{ textAlign: 'center' }}>
                        <Typography variant="h5" color="textSecondary" sx={{ p: 5 }}>
                            Активних аварій не виявлено <CheckOutlined style={{ fontSize: '24px', color: theme.palette.success.main }}/>
                        </Typography>
                    </Grid>
                )}
            </TableContainer>
            {data.activeAlarmsListTotal !== 0 ? (
                <Grid container spacing={0} direction="column" alignItems="center" justifyContent="center">
                    <TablePagination
                        component="div"
                        count={data.activeAlarmsListTotal}
                        page={page}
                        onPageChange={handleChangePage}
                        rowsPerPage={rowsPerPage}
                        rowsPerPageOptions={[5, 10, 15, 20]}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                        sx={{ mt: 2.25 }}
                    />
                </Grid>
            ) : null}
        </Box>
    );
};
export default React.memo(AlertsTableActive);

AlertsTableActive.propTypes = {
    pumpID: PropTypes.string,
    status: PropTypes.string,
};
