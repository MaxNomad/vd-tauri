import ComponentSkeleton from '@pages/components-overview/ComponentSkeleton';
import { DateRangePicker, DateRange } from 'react-date-range';
import * as locales from 'react-date-range/dist/locale';
import { addDays, subDays, subYears } from 'date-fns';
import React, { useState } from 'react';
import { isMobile, isTablet } from 'react-device-detect';
import { Grid, Typography, Box, MenuItem, Select, InputLabel, FormHelperText, FormControl, Button } from '@mui/material';
import MainCard from '@components/MainCard';

const ReportsRoot = () => {
    const [state, setState] = useState([
        {
            startDate: subDays(new Date(), 0),
            endDate: addDays(new Date(), 0),
            key: 'selection'
        }
    ]);
    const [typeReport, setTypeReport] = useState(1);
    const [nameObject, setNameObject] = useState(1);
    const [numObject, setNumObject] = useState(1);

    const handleChangeType = (event) => {
        setTypeReport(event.target.value);
    };
    const handleChangeName = (event) => {
        setNameObject(event.target.value);
    };
    const handleChangeNum = (event) => {
        setNumObject(event.target.value);
    };
    const handleOnChange = (ranges) => {
        const { selection } = ranges;
        //onChange(selection);
        setState([selection]);
    };
    return (
        <ComponentSkeleton renderContent>
            <Grid container rowSpacing={4.5} columnSpacing={2.75}>
                <Grid item xs={12} sx={{ mb: -2.25 }}>
                    <Typography variant="h5">Генерація звітів</Typography>
                </Grid>
                <Grid item lg={7}>
                    <MainCard>
                        <Typography variant="h6" sx={{ m: -2.5 }}>
                            {!isMobile || !isTablet ? (
                                <DateRangePicker
                                    onChange={handleOnChange}
                                    showSelectionPreview={true}
                                    moveRangeOnFirstSelection={false}
                                    months={2}
                                    fixedHeight
                                    locale={locales[{ uk: 'Ukrainian' }]}
                                    ranges={state}
                                    direction="horizontal"
                                    maxDate={new Date()}
                                    startDatePlaceholder="Early"
                                    minDate={subYears(new Date(), 1)}
                                />
                            ) : (
                                <DateRange
                                    onChange={handleOnChange}
                                    showSelectionPreview={true}
                                    moveRangeOnFirstSelection={false}
                                    months={1}
                                    fixedHeight
                                    locale={locales[{ uk: 'Ukrainian' }]}
                                    ranges={state}
                                    direction="horizontal"
                                    maxDate={new Date()}
                                    startDatePlaceholder="Early"
                                    minDate={subYears(new Date(), 1)}
                                />
                            )}
                        </Typography>
                    </MainCard>
                </Grid>
                <Grid item lg={5}>
                    <MainCard>
                        <Grid container rowSpacing={4.5} columnSpacing={2.75}>
                            <Grid item lg={12}>
                                <Typography variant="h5" color="textSecondary">
                                    Налаштування та експорт
                                </Typography>
                            </Grid>
                            <Grid item lg={6}>
                                <Typography variant="h6" color="textSecondary" sx={{ mt: -1.5 }}>
                                    Проміжок часу: {Math.round((state[0].endDate - state[0].startDate) / (1000 * 3600 * 24) + 1)} днів
                                </Typography>
                                <Typography variant="h6" color="textSecondary" sx={{ mt: 1.5 }}>
                                    Початок: {state[0].startDate.toLocaleString().slice(0, -10)}
                                </Typography>
                                <Typography variant="h6" color="textSecondary" sx={{ mt: 1.5 }}>
                                    Кінець: {state[0].endDate.toLocaleString().slice(0, -10)}
                                </Typography>
                                <Typography variant="h6" color="textSecondary" sx={{ mt: 1.5 }}>
                                    Бібліотека: 321 звіти
                                </Typography>
                            </Grid>
                            <Grid item lg={6}>
                                <Typography variant="h6" color="textSecondary" sx={{ mt: -1.5 }}>
                                    Тип звіту:&nbsp;&nbsp;
                                    <FormControl sx={{ minWidth: 140, mt: -1 }} size="small">
                                        <Select
                                            value={typeReport}
                                            onChange={handleChangeType}
                                            displayEmpty
                                            inputProps={{ 'aria-label': 'Without label' }}
                                        >
                                            <MenuItem value={1}>Глобальний</MenuItem>
                                            <MenuItem value={2}>Комбінований</MenuItem>
                                            <MenuItem value={3}>Базовний</MenuItem>
                                            <MenuItem value={4}>Короткий</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Typography>
                                <Typography variant="h6" color="textSecondary" sx={{ mt: 3 }}>
                                    Назва об&apos;єкту:&nbsp;&nbsp;
                                    <FormControl sx={{ minWidth: 140, mt: -1 }} size="small">
                                        <Select
                                            value={nameObject}
                                            onChange={handleChangeName}
                                            displayEmpty
                                            inputProps={{ 'aria-label': 'Without label' }}
                                        >
                                            <MenuItem value={1}>Комбінований</MenuItem>
                                            <MenuItem value={2}>КНС</MenuItem>
                                            <MenuItem value={3}>Свердловини</MenuItem>
                                            <MenuItem value={4}>Офіс</MenuItem>
                                            <MenuItem value={5}>Свердловини</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Typography>
                                <Typography variant="h6" color="textSecondary" sx={{ mt: 3 }}>
                                    Номер об&apos;єкту:&nbsp;&nbsp;
                                    <FormControl sx={{ minWidth: 140, mt: -1 }} size="small">
                                        <Select
                                            value={numObject}
                                            onChange={handleChangeNum}
                                            displayEmpty
                                            inputProps={{ 'aria-label': 'Without label' }}
                                        >
                                            <MenuItem value={1}>КНС №1</MenuItem>
                                            <MenuItem value={2}>КНС №2</MenuItem>
                                            <MenuItem value={3}>КНС №3</MenuItem>
                                            <MenuItem value={4}>КНС №4</MenuItem>
                                            <MenuItem value={5}>КНС №5</MenuItem>
                                            <MenuItem value={6}>КНС №6</MenuItem>
                                            <MenuItem value={7}>КНС №7</MenuItem>
                                            <MenuItem value={8}>КНС №8</MenuItem>
                                            <MenuItem value={9}>КНС №9</MenuItem>
                                            <MenuItem value={10}>КНС №10</MenuItem>
                                            <MenuItem value={11}>КНС №11</MenuItem>
                                            <MenuItem value={12}>КНС №12</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Typography>
                            </Grid>
                            <Grid item lg={12}>
                                <Button variant="outlined" color="success">
                                    Завантажити звіт
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
