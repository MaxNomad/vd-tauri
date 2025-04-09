// Imports
import React, { useEffect, useRef, useState } from 'react';
import {
    Grid,
    Typography,
    Button,
    TableHead,
    TableRow,
    TableCell,
    TableContainer,
    Table,
    TableBody,
    Tooltip,
    Skeleton,
    Chip,
    Checkbox,
    Select,
    MenuItem,
    Box,
    Divider
} from '@mui/material';
import { useReactToPrint } from 'react-to-print';
import { DateRangePicker } from 'react-date-range';
import MainCard from '@components/MainCard';
import ComponentSkeleton from '@pages/components-overview/ComponentSkeleton';
import { useDispatch, useSelector } from 'react-redux';
import { getReport } from './redux/reportSlice';
import { subDays, addDays, startOfWeek, endOfWeek } from 'date-fns';
import uk from 'date-fns/locale/uk';
import { styled } from '@mui/material/styles';
import CopyToClipboard from 'react-copy-to-clipboard';
import { toastSuccess } from '@pages/components-overview/toasts';
import ReportPdfGenerator from './ReportPdfGenerator';
// Стилізовані компоненти
const SmallUnit = styled('span')({
    fontSize: '0.75rem',
    marginLeft: '4px'
});

const GreenText = styled('span')({
    color: 'green',
    display: 'flex',
    alignItems: 'center',
});

const OrangeText = styled('span')({
    color: 'orange',
    display: 'flex',
    alignItems: 'center',
});

const RedText = styled('span')({
    color: 'red',
    display: 'flex',
    alignItems: 'center',
});

// Поріг для аномальної різниці
const ABNORMAL_THRESHOLD = 20000; // Встановіть свій поріг

// Заголовки таблиці
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
        label: 'Різниця'
    }
];

const headKNSCells = [
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
        id: 'minmaxValue1',
        align: 'left',
        disablePadding: false,
        label: '№1 - Мін. / Макс.'
    },
    {
        id: 'diff1',
        align: 'left',
        disablePadding: false,
        label: '№1 - Різниця'
    },
    {
        id: 'minmaxValue2',
        align: 'left',
        disablePadding: false,
        label: '№2 - Мін. / Макс.'
    },
    {
        id: 'diff2',
        align: 'left',
        disablePadding: false,
        label: '№2 - Різниця'
    },
    {
        id: 'diff',
        align: 'left',
        disablePadding: false,
        label: 'Загальна різниця'
    }
];

// Компонент заголовка таблиці
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

// Компонент заголовка таблиці
function OrderTableKNSHead({ order, orderBy }) {
    return (
        <TableHead>
            <TableRow>
                {headKNSCells.map((headCell) => (
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



const CopyComponent = ({ serial }) => {
    return <Typography variant="h6" color="textSecondary" sx={{ mt: 0.3 }}>
        Серійний номер:&nbsp;&nbsp;
        {serial ? <CopyToClipboard
            text={serial}
            onCopy={() => toastSuccess('Серійний номер скопійовано')}
        >
            <Tooltip title="Скопіювати серійний номер" placement="right-end">
                <Chip label={serial} size="small" />
            </Tooltip>
        </CopyToClipboard> : <Chip label={"Не вказано"} size="small" color='primary' />}
    </Typography>
}
// Компонент рядка таблиці з логікою відображення
const DataRow = ({ row }) => {
    // Визначення умов

    const diff = row?.Difference
    const isDifferenceNegative = diff < 0;
    const isDifferenceAbnormal = Math.abs(diff) > ABNORMAL_THRESHOLD;
    const isMissing = row.MinReading == null || row.MaxReading == null;

    // Визначення стилю та іконки
    let ContentWrapper;
    let icon = null;

    if (isMissing) {
        ContentWrapper = RedText;
        icon = (
            <></>
        );
    } else if (isDifferenceNegative || isDifferenceAbnormal) {
        ContentWrapper = OrangeText;
        icon = (
            <></>
        );
    } else {
        ContentWrapper = GreenText;
        icon = (
            <></>
        );
    }

    return (
        <>
            <TableCell align="left">
                {row.MinReading !== null ? (
                    <span>
                        {row.MinReading}
                        <SmallUnit>м³</SmallUnit>
                        <Typography color="textSecondary" sx={{ fontSize: 10 }}> ({row.MinReadingTime})</Typography>
                    </span>
                ) : (
                    <ContentWrapper>— {icon}</ContentWrapper>
                )}
            </TableCell>
            <TableCell align="left">
                {row.MaxReading !== null ? (
                    <span>
                        {row.MaxReading}
                        <SmallUnit>м³</SmallUnit>
                        <Typography color="textSecondary" sx={{ fontSize: 10 }}> ({row.MaxReadingTime})</Typography>
                    </span>
                ) : (
                    <ContentWrapper>—</ContentWrapper>
                )}
            </TableCell>
            <TableCell align="left">
                {diff !== null ? (
                    <ContentWrapper>
                        {diff}
                        <SmallUnit>м³</SmallUnit>
                        {icon}
                    </ContentWrapper>
                ) : (
                    <RedText>
                        —
                    </RedText>
                )}
            </TableCell>
        </>
    );
};

// Компонент рядка таблиці з логікою відображення
const DataKNSRow = ({ row }) => {
    // Визначення умов

    const diff = row?.OverallDifference
    const isDifferenceNegative = diff < 0;
    const isDifferenceAbnormal = Math.abs(diff) > 60000 && Math.abs(diff) <= 0;
    const isMissing = row.MinReading1 == null || row.MaxReading1 == null || row.MinReading2 == null || row.MaxReading2 == null;

    // Визначення стилю та іконки
    let ContentWrapper;
    let icon = null;

    if (isMissing) {
        ContentWrapper = RedText;
        icon = (
            <></>
        );
    } else if (isDifferenceNegative || isDifferenceAbnormal) {
        ContentWrapper = OrangeText;
        icon = (
            <></>
        );
    } else {
        ContentWrapper = GreenText;
        icon = (
            <></>
        );
    }

    return (
        <>
            <TableCell align="left">
                {row.MinReading1 !== null ? (
                    <span>
                        {row.MinReading1}
                        <SmallUnit>м³</SmallUnit>
                        <Typography color="textSecondary" sx={{ fontSize: 10 }}> ({row.MinReadingTime1})</Typography>
                    </span>
                ) : (
                    <ContentWrapper>— {icon}</ContentWrapper>
                )}
            <Divider sx={{my:1}}/>
                {row.MaxReading1 !== null ? (
                    <span>
                        {row.MaxReading1}
                        <SmallUnit>м³</SmallUnit>
                        <Typography color="textSecondary" sx={{ fontSize: 10 }}> ({row.MaxReadingTime1})</Typography>
                    </span>
                ) : (
                    <ContentWrapper>—</ContentWrapper>
                )}
            </TableCell>
            <TableCell align="left">
                {row?.Difference1 !== null ? (
                    <ContentWrapper>
                        {row?.Difference1}
                        <SmallUnit>м³</SmallUnit>
                        {icon}
                    </ContentWrapper>
                ) : (
                    <RedText>
                        —
                    </RedText>
                )}
            </TableCell>
            <TableCell align="left">
                {row.MinReading2 !== null ? (
                    <span>
                        {row.MinReading2}
                        <SmallUnit>м³</SmallUnit>
                        <Typography color="textSecondary" sx={{ fontSize: 10 }}> ({row.MinReadingTime2})</Typography>
                    </span>
                ) : (
                    <ContentWrapper>— {icon}</ContentWrapper>
                )}
                 <Divider sx={{my:1}}/>
                {row.MaxReading2 !== null ? (
                    <span>
                        {row.MaxReading2}
                        <SmallUnit>м³</SmallUnit>
                        <Typography color="textSecondary" sx={{ fontSize: 10 }}> ({row.MaxReadingTime2})</Typography>
                    </span>
                ) : (
                    <ContentWrapper>—</ContentWrapper>
                )}
            </TableCell>
            <TableCell align="left">
                {row?.Difference2 !== null ? (
                    <ContentWrapper>
                        {row?.Difference2}
                        <SmallUnit>м³</SmallUnit>
                        {icon}
                    </ContentWrapper>
                ) : (
                    <RedText>
                        —
                    </RedText>
                )}
            </TableCell>
            <TableCell align="left">
                {diff !== null ? (
                    <ContentWrapper>
                        {diff}
                        <SmallUnit>м³</SmallUnit>
                        {icon}
                    </ContentWrapper>
                ) : (
                    <RedText>
                        —
                    </RedText>
                )}
            </TableCell>
        </>
    );
};


// Головний компонент
const ReportsRoot = () => {
    const today = new Date();
    const [state, setState] = useState([
        {
            startDate: startOfWeek(today, { weekStartsOn: 1 }),
            endDate: today,
            key: 'selection'
        }
    ]);
    const dispatch = useDispatch();
    const [ignoreZeroReading, setIgnoreZeroReading] = useState(true);
    const [fullRange, setFullDataRange] = useState(true);
    const [hourRange, setHourDataRange] = useState(false);
    const [objectType, setObjectType] = useState('PNS');
    // Використовуємо useSelector для отримання даних та стану завантаження
    const { data, loading } = useSelector((state) => state.report);

    const [order] = useState('asc');
    const [orderBy] = useState('active');
    const [selected] = useState([]);
    const isSelected = (active) => selected.indexOf(active) !== -1;
    const tableRef = useRef();

    const handlePrint = useReactToPrint({
        documentTitle: 'Title',
        contentRef: tableRef,
    })

    useEffect(() => {
        // Початковий виклик звіту з новим параметром типу
        dispatch(getReport({ type: objectType, IgnoreZeroReading: ignoreZeroReading ? 1 : 0, FullRange: fullRange ? 1 : 0 }));
    }, [dispatch, objectType, ignoreZeroReading, fullRange]);

    const handleOnChange = (ranges) => {
        const { selection } = ranges;
        // Встановлюємо максимальну дату як поточний час
        const now = new Date();
        if (selection.endDate > now) {
            selection.endDate = now;
        }
        setState([selection]);
    };
    const handleObjectTypeChange = (event) => {
        setObjectType(event.target.value);
    };
    const handleGenerateReport = () => {
        const formatDate = (date) => {
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const day = String(date.getDate()).padStart(2, '0');
            return `${year}-${month}-${day}`;
        };

        const params = {
            PNSNumber: null,
            type: objectType,
            StartDate: formatDate(state[0].startDate),
            EndDate: formatDate(state[0].endDate),
            IgnoreZeroReading: ignoreZeroReading ? 1 : 0,
            FullRange: fullRange ? 1 : 0
        };
        dispatch(getReport(params));
    };

    const handleIgnoreZeroChange = (event) => {
        setIgnoreZeroReading(event.target.checked);
    };

    const handleFullDataRange = (event) => {
        setFullDataRange(event.target.checked);
    };
    const handleHourDataRange = (event) => {
        setHourDataRange(event.target.checked);
    };
    const calculateDays = (start, end) => {
        const msInDay = 24 * 60 * 60 * 1000;

        // Клонуємо дати, щоб не змінювати оригінальні
        const startDate = new Date(start);
        const endDate = new Date(end);

        // Нормалізуємо дати до півночі
        startDate.setHours(0, 0, 0, 0);
        endDate.setHours(0, 0, 0, 0);

        // Розраховуємо різницю в днях
        const diff = (endDate - startDate) / msInDay;

        // Включаємо обидві дати в підрахунок
        return Math.floor(diff) + 1;
    };


    const handleClearDate = () => {
        const today = new Date();
        const start = startOfWeek(today, { weekStartsOn: 1 }); // Понеділок як перший день тижня
        const end = today;
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
                    <Typography variant="h5">Генерація звітів</Typography>
                    <Select
                        id="object-type-select"

                        value={objectType}
                        onChange={handleObjectTypeChange}
                        sx={{ '& .MuiSelect-select': { py: 0.75, px: 1.25 } }}
                    >
                        <MenuItem value="PNS">PNS</MenuItem>
                        <MenuItem value="KNS">KNS</MenuItem>
                        <MenuItem value="WELL">WELL</MenuItem>
                    </Select>
                </Grid>
                <Grid item lg={6}>
                    <div ref={tableRef}>
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
                                {loading === "pending" ? (
                                    // Skeleton для таблиці
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
                                        {objectType === "KNS" ? <OrderTableKNSHead order={order} orderBy={orderBy} /> : <OrderTableHead order={order} orderBy={orderBy} />}
                                        <TableBody>
                                            {Array.from(new Array(20)).map((_, index) => (
                                                <TableRow key={index}>
                                                    <TableCell>
                                                        <Skeleton variant="text" height={50} />
                                                    </TableCell>
                                                    <TableCell>
                                                        <Skeleton variant="text" height={50} />
                                                    </TableCell>
                                                    <TableCell>
                                                        <Skeleton variant="text" height={50} />
                                                    </TableCell>
                                                    <TableCell>
                                                        <Skeleton variant="text" height={50} />
                                                    </TableCell>
                                                    <TableCell>
                                                        <Skeleton variant="text" height={50} />
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                ) : data.length !== 0 ? (
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
                                        {objectType === "KNS" ? <OrderTableKNSHead order={order} orderBy={orderBy} /> : <OrderTableHead order={order} orderBy={orderBy} />}
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
                                                        key={row?.PNSNumber || row?.WellIdentifier || row?.KNSNumber}
                                                        selected={isItemSelected}
                                                    >
                                                        {
                                                            objectType === "KNS" ? <>
                                                                <TableCell component="th" id={labelId} scope="row" align="left">
                                                                    {row?.KNSNumber}
                                                                </TableCell>

                                                                <TableCell align="left">{row?.KNSName}
                                                                        <Box>
                                                                            <CopyComponent serial={row?.SerialNumber1} />
                                                                            <CopyComponent serial={row?.SerialNumber2} />
                                                                        </Box>
                                                                </TableCell>
                                                                <DataKNSRow row={row}/>
                                                            </> : <>
                                                                <TableCell component="th" id={labelId} scope="row" align="left">
                                                                    {row.PNSNumber || row?.WellIdentifier}
                                                                </TableCell>
                                                                <TableCell align="left">{row.PNSName || row?.WellName}
                                                                    <CopyComponent serial={row?.PNSCounterSerial || row?.WellCounterSerial} />
                                                                </TableCell>
                                                                <DataRow row={row} />

                                                            </>
                                                        }

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
                    </div>
                </Grid>
                <Grid item lg={6} sx={{ position: "fixed", right: 25, top: 107, width: { lg: 810, UWHD: 980 } }}>
                    <MainCard>
                        <Grid container rowSpacing={4.5} columnSpacing={2.75}>
                            <Grid item lg={12}>
                                <Typography variant="h5" color="textSecondary">
                                    Налаштування та експорт
                                </Typography>
                            </Grid>
                            <Grid item lg={2.8}>
                                <Typography variant="h6" color="textSecondary" sx={{ mt: -1.5 }}>
                                    Проміжок часу:{' '}
                                    {calculateDays(state[0].startDate, state[0].endDate)} днів
                                </Typography>
                                <Typography variant="h6" color="textSecondary" sx={{ mt: 1.5 }}>
                                    Початок: {state[0].startDate.toLocaleDateString()}
                                </Typography>
                                <Typography variant="h6" color="textSecondary" sx={{ mt: 1.5 }}>
                                    Кінець: {state[0].endDate.toLocaleDateString()}
                                </Typography>
                                <Typography variant="h6" color="textSecondary" sx={{ mt: 1.5, ml: -1.1 }}>
                                    <Checkbox defaultChecked checked={ignoreZeroReading}
                                        onChange={handleIgnoreZeroChange} /> Ігнорування нулів
                                </Typography>
                                <Typography variant="h6" color="textSecondary" sx={{ mt: 1.5, ml: -1.1 }}>
                                    <Checkbox defaultChecked checked={fullRange}
                                        onChange={handleFullDataRange} /> Дані за весь період
                                </Typography>
                                <Typography variant="h6" color="textSecondary" sx={{ mt: 1.5, ml: -1.1 }}>
                                    <Checkbox defaultChecked checked={hourRange}
                                        onChange={handleHourDataRange} /> Дані погодинно
                                </Typography>

                            </Grid>
                            <Grid item lg={4} sx={{ mt: -3 }}>
                                <DateRangePicker
                                    ranges={state}
                                    onChange={handleOnChange}
                                    weekStartsOn={1}
                                    maxDate={new Date()}
                                    minDate={new Date(2022, 0, 1)} // Січень 1, 2022
                                    locale={uk} // Встановлення локалі української
                                />
                            </Grid>
                            <Grid
                                item
                                lg={12}
                                sx={{ display: 'flex', justifyContent: 'space-between' }}
                            >
                                <ReportPdfGenerator data={data} user={"maxnomad"} />
                                <Button variant="outlined" color="success" onClick={handlePrint}>
                                    Роздрукувати таблицю
                                </Button>

                                <Button variant="outlined" color="warning" onClick={handleGenerateReport}>
                                    Оновити звіт
                                </Button>

                                <Button variant="outlined" color="error" onClick={handleClearDate}>
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
