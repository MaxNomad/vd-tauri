import React, { useState } from 'react';

// material-ui
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TextField, ToggleButton, ToggleButtonGroup } from '@mui/material';

// third-party
import frLocale from 'date-fns/locale/fr';
import ruLocale from 'date-fns/locale/ru';
import deLocale from 'date-fns/locale/de';
import enLocale from 'date-fns/locale/en-US';

// project import
import MainCard from '@components/MainCard';

const localeMap = {
    en: enLocale,
    fr: frLocale,
    ru: ruLocale,
    de: deLocale
};

const maskMap = {
    fr: '__/__/____',
    en: '__/__/____',
    ru: '__.__.____',
    de: '__.__.____'
};

// ==============================|| DATE PICKER - LOCALIZED ||============================== //

export default function LocalizedPicker() {
    const [locale, setLocale] = useState('ru');
    const [value, setValue] = useState(new Date());

    const selectLocale = (newLocale) => {
        setLocale(newLocale);
    };

    return (
        <MainCard title="Localization Picker">
            <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={localeMap[locale]}>
                <div>
                    <ToggleButtonGroup value={locale} exclusive sx={{ mb: 2, display: 'block' }}>
                        {Object.keys(localeMap).map((localeItem) => (
                            <ToggleButton key={localeItem} value={localeItem} onClick={() => selectLocale(localeItem)}>
                                {localeItem}
                            </ToggleButton>
                        ))}
                    </ToggleButtonGroup>
                    <DatePicker
                        mask={maskMap[locale]}
                        value={value}
                        onChange={(newValue) => setValue(newValue)}
                        renderInput={(params) => <TextField {...params} />}
                    />
                </div>
            </LocalizationProvider>
        </MainCard>
    );
}
