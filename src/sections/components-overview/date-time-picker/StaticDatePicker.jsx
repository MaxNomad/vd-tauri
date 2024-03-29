import React, { useState } from 'react';

// material-ui
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { Stack, TextField } from '@mui/material';
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';

// project import
import MainCard from '@components/MainCard';

// ==============================|| DATE PICKER - STATIC ||============================== //

export default function ComponentStaticDatePicker() {
    const [value, setValue] = useState(new Date());

    return (
        <MainCard title="Static Mode">
            <Stack spacing={3}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <StaticDatePicker
                        displayStaticWrapperAs="desktop"
                        openTo="year"
                        value={value}
                        onChange={(newValue) => {
                            setValue(newValue);
                        }}
                        renderInput={(params) => <TextField {...params} />}
                    />
                </LocalizationProvider>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <StaticDatePicker
                        displayStaticWrapperAs="desktop"
                        openTo="day"
                        value={value}
                        onChange={(newValue) => {
                            setValue(newValue);
                        }}
                        renderInput={(params) => <TextField {...params} />}
                    />
                </LocalizationProvider>
            </Stack>
        </MainCard>
    );
}
