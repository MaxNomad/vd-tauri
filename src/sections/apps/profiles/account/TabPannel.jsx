import React, { useState, useEffect } from 'react';

// material-ui
import {
    Button,
    Checkbox,
    Divider,
    Grid,
    List,
    ListItem,
    ListItemText,
    Stack,
    Switch,
    Typography,
    MenuItem,
    FormControl,
    Select
} from '@mui/material';

// project import
import MainCard from '@components/MainCard';

import config from '../../../../config';
import { toastError, toastSuccess } from '@pages/components-overview/toasts';
import useConfig from '@hooks/useConfig';
import { GlobalStore } from '@utils/storage';

// ==============================|| ACCOUNT PROFILE - SETTINGS ||============================== //

const TabPannel = () => {
    const { onChangePresetColor, onChangeMode } = useConfig();
    const [globaVal, setChangeGlobal] = useState(localStorage.apiUpdateTime ? localStorage.apiUpdateTime : config.defaultUpdateTime);
    const [chartsVal, setChangeCharts] = useState(
        localStorage.apiChartUpdateTime ? localStorage.apiChartUpdateTime : config.defaultChartUpdateTime
    );
    const [apiEnableVal, setCheckedApi] = useState(localStorage.apiUpdateEnable ? JSON.parse(localStorage.apiUpdateEnable) : true);
    const [themeMode, setThemeMode] = useState(localStorage.themeMode ? localStorage.themeMode : config.mode);
    const [useLight, setUseLight] = useState(themeMode === 'light' ? false : true);
    const [colorPreset, setColorPreset] = useState(localStorage.presetColor ? localStorage.presetColor : 'default');
    const [liqChartsPreset, setLiqChartsPreset] = useState(
        localStorage.liqChartsPreset ? JSON.parse(localStorage.liqChartsPreset) : config.liqChartsPreset
    );

    const handleChangeGlobal = (event) => {
        setChangeGlobal(event.target.value);
        toastSuccess('Global update set to ' + event.target.value / 1000 + ' sec.');
    };

    const handleChangeCharts = (event) => {
        setChangeCharts(event.target.value);
        toastSuccess('Chart update set to ' + event.target.value / 1000 + ' sec.');
    };

    const switchColorHandler = (event) => {
        setColorPreset(event.target.value);
        onChangePresetColor(event.target.value);
    };

    const liqChartsHandler = () => {
        setLiqChartsPreset(!liqChartsPreset);
        toastSuccess('Стиль змінено');
    };

    const switchModeHandler = (event) => {
        setUseLight(event.target.checked);
        if (event.target.checked) {
            setThemeMode('dark');
            onChangeMode('dark');
            toastSuccess('Увімкнено темну тему');
        } else {
            setThemeMode('light');
            onChangeMode('light');
            toastSuccess('Увімкнено світлу тему');
        }
    };

    const switchApiHandler = (event) => {
        setCheckedApi(event.target.checked);
        if (event.target.checked) {
            setChangeGlobal(config.defaultUpdateTime);
            setChangeCharts(config.defaultChartUpdateTime);
            toastSuccess('Life update enabled');
        } else {
            setChangeGlobal(10 ** 10);
            setChangeCharts(10 ** 10);
            toastError('Life update Disabled');
        }
    };

    useEffect(() => {
        localStorage.setItem('apiChartUpdateTime', chartsVal);
        localStorage.setItem('apiUpdateTime', globaVal);
        localStorage.setItem('apiUpdateEnable', apiEnableVal);
        localStorage.setItem('themeMode', themeMode);
        localStorage.setItem('presetColor', colorPreset);
        localStorage.setItem('liqChartsPreset', liqChartsPreset);
    }, [globaVal, chartsVal, apiEnableVal, themeMode, colorPreset, liqChartsPreset]);

    return (
        <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <MainCard title="Налаштування API">
                            <Stack spacing={2.5}>
                                <Typography variant="subtitle1">Період оновлення</Typography>

                                <List sx={{ p: 0, '& .MuiListItem-root': { p: 0, py: 0.25 } }}>
                                    <ListItem>
                                        <ListItemText
                                            id="switch-list-label-en"
                                            primary={<Typography color="secondary">Уввімкнути оновлення</Typography>}
                                        />
                                        <Switch
                                            edge="end"
                                            checked={!!apiEnableVal}
                                            onChange={switchApiHandler}
                                            inputProps={{ 'aria-label': 'controlled' }}
                                        />
                                    </ListItem>
                                    <ListItem>
                                        <ListItemText
                                            id="switch-list-label-en"
                                            primary={<Typography color="secondary">Період оновлення данних</Typography>}
                                        />
                                        <FormControl sx={{ minWidth: 140, mt: 1 }} size="small" disabled={!apiEnableVal}>
                                            <Select
                                                value={globaVal}
                                                onChange={handleChangeGlobal}
                                                displayEmpty
                                                inputProps={{ 'aria-label': 'Without label' }}
                                            >
                                                <MenuItem value={1000}>1 Сек</MenuItem>
                                                <MenuItem value={5000}>5 Сек</MenuItem>
                                                <MenuItem value={10000}>10 Сек</MenuItem>
                                                <MenuItem value={15000}>15 Сек</MenuItem>
                                                <MenuItem value={30000}>30 Сек</MenuItem>
                                                <MenuItem value={60000}>1 Хв</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </ListItem>
                                    <ListItem>
                                        <ListItemText
                                            id="switch-list-label-sctp"
                                            primary={<Typography color="secondary">Період оновлення графіків</Typography>}
                                        />
                                        <FormControl sx={{ minWidth: 140, mt: 1 }} size="small" disabled={!apiEnableVal}>
                                            <Select
                                                value={chartsVal}
                                                onChange={handleChangeCharts}
                                                displayEmpty
                                                inputProps={{ 'aria-label': 'Without label' }}
                                            >
                                                <MenuItem value={1000}>1 Сек</MenuItem>
                                                <MenuItem value={5000}>5 Сек</MenuItem>
                                                <MenuItem value={10000}>10 Сек</MenuItem>
                                                <MenuItem value={15000}>15 Сек</MenuItem>
                                                <MenuItem value={30000}>30 Сек</MenuItem>
                                                <MenuItem value={60000}>1 Хв</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </ListItem>
                                </List>
                            </Stack>
                        </MainCard>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={12} sm={6}>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <MainCard title="Вигляд">
                            <Stack spacing={2.5}>
                                <Typography variant="subtitle1">Налаштування теми</Typography>

                                <List sx={{ p: 0, '& .MuiListItem-root': { p: 0, py: 0.25 } }}>
                                    <ListItem>
                                        <ListItemText
                                            id="switch-list-label-en"
                                            primary={<Typography color="secondary">Увімкнути темну тему</Typography>}
                                        />
                                        <Switch
                                            edge="end"
                                            checked={useLight}
                                            onChange={switchModeHandler}
                                            inputProps={{ 'aria-label': 'controlled' }}
                                        />
                                    </ListItem>
                                    <ListItem>
                                        <ListItemText
                                            id="switch-list-label-sctp"
                                            primary={<Typography color="secondary">Кольорова гамма</Typography>}
                                        />
                                        <FormControl sx={{ minWidth: 140, mt: 1 }} size="small">
                                            <Select
                                                value={colorPreset}
                                                onChange={switchColorHandler}
                                                displayEmpty
                                                inputProps={{ 'aria-label': 'Without label' }}
                                            >
                                                <MenuItem value="default">Default</MenuItem>
                                                <MenuItem value="theme1">Theme №1</MenuItem>
                                                <MenuItem value="theme2">Theme №2</MenuItem>
                                                <MenuItem value="theme3">Theme №3</MenuItem>
                                                <MenuItem value="theme4">Theme №4</MenuItem>
                                                <MenuItem value="theme5">Theme №5</MenuItem>
                                                <MenuItem value="theme6">Theme №6</MenuItem>
                                                <MenuItem value="theme7">Theme №7</MenuItem>
                                                <MenuItem value="theme8">Theme №8</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </ListItem>
                                    <ListItem>
                                        <ListItemText
                                            id="switch-list-label-en"
                                            primary={<Typography color="secondary">Увімкнути Liqud Charts</Typography>}
                                        />
                                        <Switch
                                            edge="end"
                                            checked={liqChartsPreset}
                                            onChange={liqChartsHandler}
                                            inputProps={{ 'aria-label': 'controlled' }}
                                        />
                                    </ListItem>
                                </List>
                            </Stack>
                        </MainCard>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default TabPannel;
