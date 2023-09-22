import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import TablePagination from '@mui/material/TablePagination';
// material-ui
import {
    Box,
    Link,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
    Grid,
    Button
} from '@mui/material';

// third-party

// project import
import { getKNSAlertsAll } from '@pages/kns/redux/knsAlertsAllSlice';
import { useDispatch, useSelector } from 'react-redux';
import config from '../../../config';
import { InfoCircleOutlined } from '@ant-design/icons';
import { getFoundAlertList } from '@pages/kns/redux/knsAlertDataListSlice';
import { useTheme } from '@mui/material/styles';
import ModalInfo from './ModalInfo';
import ActiveStatus from './ActiveStatus';
import OrderStatus from './OrderStatus';
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
        id: 'edit',
        align: 'right',
        disablePadding: false,
        label: 'Докладно'
    }
];

// ==============================|| ORDER TABLE - HEADER ||============================== //

function OrderTableHead({ order, orderBy }) {
    return (
        <TableHead>
            <TableRow>
                {headCells.map((headCell) => (
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

const AlertsTableAll = ({ knsID }) => {
    const dispatch = useDispatch();
    const { data, loading, error } = useSelector((state) => state.knsAlertsAll);
    const { reqData } = useSelector((state) => state.knsAlertDisable);
    const { reqListData, reqListLoading, reqListError } = useSelector((state) => state.knsFoundAlertList);
    const [order] = useState('asc');
    const [orderBy] = useState('active');
    const [selected] = useState([]);
    const isSelected = (active) => selected.indexOf(active) !== -1;
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [timer, setTimer] = useState(Date.now());
    const [firstLoad, setFirstLoad] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    const [tableAlertID, setTableAlertID] = useState('');
    const [tableDate, setTableDate] = useState('');
    const [tableAlertState, setTableAlertState] = useState(false);
    const [tableAlertPrority, setTableAlertPriority] = useState(0);
    const [tableAlertName, setTableAlertName] = useState('');
    const [counter, setCounter] = useState(0);
    const theme = useTheme();

    useEffect(() => {
        const interval = setInterval(
            () => setTimer(Date.now()),
            localStorage.apiUpdateTime ? localStorage.apiUpdateTime : config.defaultUpdateTime
        );
        return () => {
            clearInterval(interval);
        };
    }, []);

    const openGet = () => {
        if (tableAlertID !== '' && tableDate !== '') {
            dispatch(getFoundAlertList({ tag: tableAlertID, date: tableDate }));
            if (!openModal) {
                setOpenModal(true);
            }
        }
    };

    useEffect(() => {
        setTimeout(openGet, 120);
    }, [tableAlertID, counter]);

    useEffect(() => {
        if (!openModal) {
            dispatch(getKNSAlertsAll({ id: knsID, page: page, perPage: rowsPerPage }));
            setFirstLoad(true);
        }
    }, [page, rowsPerPage, timer, reqData]);

    const handleChangePage = (event, newPage) => {
        setPage(parseInt(newPage));
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleOpen = (props) => {
        setTableDate(props.date);
        setTableAlertID(props.id);
        setTableAlertName(props.name);
        setTableAlertPriority(props.priority);
        setTableAlertState(props.state);
        setCounter(counter + 1);
    };

    handleOpen.propTypes = {
        name: PropTypes.string,
        date: PropTypes.string,
        id: PropTypes.string,
        priority: PropTypes.number,
        state: PropTypes.number
    };
    const handleClose = () => {
        setTableAlertName('');
        setTableDate('');
        setTableAlertID('');
        setTableAlertPriority(0);
        setTableAlertState(false);
        setOpenModal(false);
    };

    return (
        <Box>
            <ModalInfo
                props={{
                    status: status,
                    tableAlertPrority: tableAlertPrority,
                    tableDate: tableDate,
                    tableAlertName: tableAlertName,
                    tableAlertID: tableAlertID,
                    reqListData: reqListData,
                    openModal: openModal,
                    tableAlertState: tableAlertState
                }}
                handleClose={handleClose}
            />
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
                {data.allAlarmsListTotal !== 0 ? (
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
                            {data.allAlarmsList.map((row, index) => {
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
                                            <TimeAgo targetTime={row?.date} />
                                        </TableCell>
                                        <TableCell align="left">{row.errName}</TableCell>
                                        <TableCell align="left">{row.object}</TableCell>
                                        <TableCell align="left">
                                            <OrderStatus status={row.priority} />
                                        </TableCell>
                                        <TableCell align="left">
                                            <ActiveStatus active={row.active} />
                                        </TableCell>
                                        <TableCell align="left">{row.code}</TableCell>
                                        <TableCell align="right">
                                            <Button
                                                variant="contained"
                                                sx={{ p: 0.7, minWidth: 20 }}
                                                onClick={() =>
                                                    handleOpen({
                                                        name: row?.errName,
                                                        id: row?.code,
                                                        date: row?.dateUTC,
                                                        priority: row?.priority,
                                                        state: row?.active
                                                    })
                                                }
                                                color="warning"
                                            >
                                                <InfoCircleOutlined style={{ fontSize: '12px', color: theme.palette.secondary[800] }} />
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                ) : (
                    <Grid item lg={12} style={{ textAlign: 'center' }}>
                        <Typography variant="h5" color="textSecondary" sx={{ p: 5 }}>
                            Записів не знайдено
                        </Typography>
                    </Grid>
                )}
            </TableContainer>
            {data.allAlarmsList.length !== 0 ? (
                <Grid container spacing={0} direction="column" alignItems="center" justifyContent="center" disabled={true}>
                    <TablePagination
                        component="div"
                        count={data.allAlarmsListTotal}
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
export default React.memo(AlertsTableAll);

AlertsTableAll.propTypes = {
    knsID: PropTypes.string
};
