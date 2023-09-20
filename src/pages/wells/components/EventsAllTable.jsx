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
    Grid
} from '@mui/material';

import { useDispatch, useSelector } from 'react-redux';
import config from '../../../config';
import ActiveStatus from './ActiveStatus';
import OrderStatus from './OrderStatus';
import { getPumpEventsList } from '../redux/pumpEventsListSlice';
import TimeAgo from '@pages/counters/components/timeAgo';

// ==============================|| ORDER TABLE - HEADER CELL ||============================== //

const headCells = [
    {
        id: 'Time_Stamp',
        align: 'left',
        disablePadding: false,
        label: 'Дата запису'
    },
    {
        id: 'GlobalUser',
        align: 'left',
        disablePadding: false,
        label: 'Користувач'
    },
    {
        id: 'NickName',
        align: 'left',
        disablePadding: false,
        label: 'Nickname'
    },
    {
        id: 'GlobalEmail',
        align: 'left',
        disablePadding: false,
        label: 'Емейл'
    },
    {
        id: 'IpAdress',
        align: 'left',
        disablePadding: false,
        label: 'IP'
    },
    {
        id: 'Object',
        align: 'left',
        disablePadding: false,

        label: 'Об`єкт'
    },
    {
        id: 'Event',
        align: 'left',
        disablePadding: false,
        label: 'Дія'
    },
    {
        id: 'EventMes',
        align: 'right',
        disablePadding: false,
        label: 'Повідомлення'
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

const subtractHours = (date, hours)=> {
    date.setHours(date.getHours() - hours);
  
    return date;
  }

// ==============================|| ORDER TABLE ||============================== //

const EventsAllTable = ({ pumpID , update }) => {
    const dispatch = useDispatch();
    const { data, loading } = useSelector((state) => state.pumpWellEvents);
    const [order] = useState('asc');
    const [orderBy] = useState('active');
    const [selected] = useState([]);
    const isSelected = (active) => selected.indexOf(active) !== -1;
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [timer, setTimer] = useState(Date.now());

    useEffect(() => {
        const interval = setInterval(
            () => setTimer(Date.now()),
            localStorage.apiUpdateTime ? localStorage.apiUpdateTime : config.defaultUpdateTime
        );
        return () => {
            clearInterval(interval);
        };
    }, []);

    useEffect(() => {
        dispatch(getPumpEventsList({ id: pumpID, page: page, perPage: rowsPerPage }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page, rowsPerPage, timer, update]);

    const handleChangePage = (event, newPage) => {
        setPage(parseInt(newPage));
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    return (
        <Box>
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
                {data?.eventsTotal !== 0 ? (
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
                            {data?.events?.map((row, index) => {
                                const isItemSelected = isSelected(row.active);
                                const labelId = `enhanced-table-checkbox-${index}`;

                                return (
                                    <TableRow
                                        hover
                                        role="checkbox"
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        aria-checked={isItemSelected}
                                        tabIndex={-1}
                                        key={row?.Time_Stamp + row?.GlobalEmail + row?.Object}
                                        selected={isItemSelected}
                                    >
                                        <TableCell component="th" id={labelId} scope="row" align="left">
                                            
                                                <TimeAgo targetTime={subtractHours(new Date(row.Time_Stamp), 3)} text="Виконано"/>
                                           
                                        </TableCell>
                                        <TableCell component="th" align="left" scope="row">{row.GlobalUser}</TableCell>
                                        <TableCell component="th" align="left" scope="row">{row.NickName}</TableCell>
                                        <TableCell component="th" align="left" scope="row">{row.GlobalEmail}</TableCell>
                                        <TableCell component="th" align="left" scope="row">{row.IpAdress}</TableCell>
                                        <TableCell component="th" align="left" scope="row">{row.Object}</TableCell>
                                        <TableCell component="th" align="left" scope="row">{row.Event}</TableCell>
                                        <TableCell component="th" align="right" scope="row">{row.EventMes}</TableCell>
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                ) : (
                    <Grid item lg={12} style={{ textAlign: 'center' }}>
                        <Typography variant="h5" color="textSecondary" sx={{ p: 5 }}>
                            Данних не знайдено
                        </Typography>
                    </Grid>
                )}
            </TableContainer>
            {data?.events?.length !== 0 ? (
                <Grid container spacing={0} direction="column" alignItems="center" justifyContent="center" disabled={true}>
                    <TablePagination
                        component="div"
                        count={data?.eventsTotal}
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
export default React.memo(EventsAllTable);

EventsAllTable.propTypes = {
    pumpID: PropTypes.string
};
