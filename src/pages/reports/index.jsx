import React, { useEffect, useState } from 'react';
import { subDays, addDays, startOfWeek, endOfWeek } from 'date-fns';
import uk from 'date-fns/locale/uk'; // Import Ukrainian locale
import {
    Grid,
    Typography,
    Button,
    TableHead,
    TableRow,
    TableCell,
    TableContainer,
    Table,
    TableBody
} from '@mui/material';
import { DateRangePicker } from 'react-date-range';
import MainCard from '@components/MainCard';
import ComponentSkeleton from '@pages/components-overview/ComponentSkeleton';
import { useDispatch, useSelector } from 'react-redux';
import { getReport } from './redux/reportSlice';

// ==============================|| ORDER TABLE - HEADER CELL ||============================== //

const headCells = [
    {
        id: 'num',
        align: 'left',
        disablePadding: false,
        label: '№'
    },
    {
        id: 'name',
        align: 'left',
        disablePadding: true,
        label: 'Назва'
    },
    {
        id: 'minValue',
        align: 'left',
        disablePadding: false,
        label: 'Мін. значення'
    },
    {
        id: 'maxValue',
        align: 'left',
        disablePadding: false,
        label: 'Макс. значення'
    },
    {
        id: 'diff',
        align: 'left',
        disablePadding: false,
        label: 'Показник'
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

const ReportsRoot = () => {
    const today = new Date();
    const [state, setState] = useState([
        {
            startDate: startOfWeek(today, { weekStartsOn: 1 }),
            endDate: endOfWeek(today, { weekStartsOn: 1 }),
            key: 'selection'
        }
    ]);
    const { data } = useSelector((state) => state.report);
    const [order] = useState('asc');
    const [orderBy] = useState('active');
    const [selected] = useState([]);
    const isSelected = (active) => selected.indexOf(active) !== -1;
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getReport());
    }, [dispatch]);

    const handleOnChange = (ranges) => {
        const { selection } = ranges;
        setState([selection]);
    };

    const handleGenerateReport = () => {
        const params = {
            PNSNumber: null, // Replace with the actual value or add an input
            StartDate: state[0].startDate.toISOString().split('T')[0],
            EndDate: state[0].endDate.toISOString().split('T')[0],
            IgnoreZeroReading: 1 // Or add an option for the user
        };
        dispatch(getReport(params));
    };

    const handleClearDate = () => {
        const today = new Date();
        const start = startOfWeek(today, { weekStartsOn: 1 }); // Monday as the first day of the week
        const end = endOfWeek(today, { weekStartsOn: 1 });
        setState([
            {
                startDate: start,
                endDate: end,
                key: 'selection'
            }
        ]);
    };

    return (
        <ComponentSkeleton renderContent>
            <Grid container rowSpacing={4.5} columnSpacing={2.75}>
                <Grid item xs={12} sx={{ mb: -2.25 }}>
                    <Typography variant="h5">Генерація звітів ПНС</Typography>
                </Grid>
                <Grid item lg={6}>
                    <MainCard>
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
                            {data.length !== 0 ? (
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
                                        {data.map((row, index) => {
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
                                                        {row.PNSNumber}
                                                    </TableCell>
                                                    <TableCell align="left">{row.PNSName}</TableCell>
                                                    <TableCell align="left">{row.MinReading}</TableCell>
                                                    <TableCell align="left">{row.MaxReading}</TableCell>
                                                    <TableCell align="left">{row.Difference}</TableCell>
                                                </TableRow>
                                            );
                                        })}
                                    </TableBody>
                                </Table>
                            ) : (
                                <Grid item lg={12}>
                                    <Typography
                                        variant="h5"
                                        color="textSecondary"
                                        sx={{ textAlign: 'center', fontWeight: 300, mt: 2, mb: 2 }}
                                    >
                                        Період не внесено
                                    </Typography>
                                </Grid>
                            )}
                        </TableContainer>
                    </MainCard>
                </Grid>
                <Grid item lg={6}>
                    <MainCard>
                        <Grid container rowSpacing={4.5} columnSpacing={2.75}>
                            <Grid item lg={12}>
                                <Typography variant="h5" color="textSecondary">
                                    Налаштування та експорт
                                </Typography>
                            </Grid>
                            <Grid item lg={3}>
                                <Typography variant="h6" color="textSecondary" sx={{ mt: -1.5 }}>
                                    Проміжок часу:{' '}
                                    {Math.round((state[0].endDate - state[0].startDate) / (1000 * 3600 * 24))} днів
                                </Typography>
                                <Typography variant="h6" color="textSecondary" sx={{ mt: 1.5 }}>
                                    Початок: {state[0].startDate.toLocaleDateString()}
                                </Typography>
                                <Typography variant="h6" color="textSecondary" sx={{ mt: 1.5 }}>
                                    Кінець: {state[0].endDate.toLocaleDateString()}
                                </Typography>
                            </Grid>
                            <Grid item lg={4}>
                                <DateRangePicker
                                    ranges={state}
                                    onChange={handleOnChange}
                                    maxDate={new Date()}
                                    minDate={new Date(2022, 0, 1)} // January 1, 2022
                                    locale={uk} // Set the locale to Ukrainian
                                />
                            </Grid>
                            <Grid
                                item
                                lg={12}
                                sx={{ display: 'flex', justifyContent: 'space-between' }}
                            >
                                <Button variant="outlined" color="success" onClick={handleGenerateReport}>
                                    Згенерувати звіт
                                </Button>
                                <Button variant="outlined" color="primary">
                                    Завантажити звіт
                                </Button>
                                <Button variant="outlined" color="secondary" onClick={handleClearDate}>
                                    Стерти дату
                                </Button>
                            </Grid>
                        </Grid>
                    </MainCard>
                </Grid>
            </Grid>
        </ComponentSkeleton>
    );
};

export default ReportsRoot;
