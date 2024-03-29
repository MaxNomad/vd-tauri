import React, { useState } from 'react';

// material-ui
import { Box, Stack, TextField, Typography } from '@mui/material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { DateRangePicker } from '@mui/x-date-pickers-pro/DateRangePicker';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';

// project import
import MainCard from '@components/MainCard';

// ==============================|| DATE PICKER - DISABLED ||============================== //

export default function DisabledPickers() {
    const [value, setValue] = useState(null);
    const [valueRange, setValueRange] = useState([null, null]);

    return (
        <MainCard title="Disabled Pickers">
            <Stack spacing={3}>
                <Typography variant="h6">Date Picker</Typography>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DatePicker
                        disabled
                        value={value}
                        onChange={(newValue) => {
                            setValue(newValue);
                        }}
                        renderInput={(params) => <TextField {...params} placeholder="disabled" />}
                    />
                    <DatePicker
                        readOnly
                        value={value}
                        onChange={(newValue) => {
                            setValue(newValue);
                        }}
                        renderInput={(params) => <TextField {...params} placeholder="read-only" />}
                    />
                </LocalizationProvider>

                <Typography variant="h6">Date Range Picker</Typography>
                <LocalizationProvider dateAdapter={AdapterDateFns} localeText={{ start: 'disabled start', end: 'disabled end' }}>
                    <DateRangePicker
                        disabled
                        value={valueRange}
                        onChange={(newValue) => {
                            setValueRange(newValue);
                        }}
                        renderInput={(startProps, endProps) => (
                            <>
                                <TextField {...startProps} />
                                <Box sx={{ mx: 2 }}> to </Box>
                                <TextField {...endProps} />
                            </>
                        )}
                    />
                </LocalizationProvider>
                <LocalizationProvider dateAdapter={AdapterDateFns} localeText={{ start: 'read-only start', end: 'read-only end' }}>
                    <DateRangePicker
                        readOnly
                        value={valueRange}
                        onChange={(newValue) => {
                            setValueRange(newValue);
                        }}
                        renderInput={(startProps, endProps) => (
                            <>
                                <TextField {...startProps} />
                                <Box sx={{ mx: 2 }}> to </Box>
                                <TextField {...endProps} />
                            </>
                        )}
                    />
                </LocalizationProvider>

                <Typography variant="h6">Date Time Picker</Typography>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DateTimePicker
                        disabled
                        value={value}
                        onChange={(newValue) => {
                            setValue(newValue);
                        }}
                        renderInput={(params) => <TextField {...params} placeholder="disabled" />}
                    />
                    <DateTimePicker
                        readOnly
                        value={value}
                        onChange={(newValue) => {
                            setValue(newValue);
                        }}
                        renderInput={(params) => <TextField {...params} placeholder="read-only" />}
                    />

                    <Typography variant="h6">Time Picker</Typography>
                    <TimePicker
                        disabled
                        value={value}
                        onChange={(newValue) => {
                            setValue(newValue);
                        }}
                        renderInput={(params) => <TextField {...params} placeholder="disabled" />}
                    />
                    <TimePicker
                        readOnly
                        value={value}
                        onChange={(newValue) => {
                            setValue(newValue);
                        }}
                        renderInput={(params) => <TextField {...params} placeholder="read-only" />}
                    />
                </LocalizationProvider>
            </Stack>
        </MainCard>
    );
}
