// ==============================|| THEME CONFIG  ||============================== //

const config = {
    defaultPath: '/',
    fontFamily: `'Public Sans', sans-serif`,
    i18n: 'uk',
    miniDrawer: false,
    container: true,
    mode: localStorage.themeMode ? localStorage.themeMode : 'dark',
    presetColor: localStorage.presetColor ? localStorage.presetColor : 'default',
    defaultUpdateTime: 10000,
    defaultChartUpdateTime: 60000,
    liqChartsPreset: localStorage.liqChartsPreset ? localStorage.liqChartsPreset : true,
    themeDirection: 'ltr',
    apiUrl: 'http://localhost:8080/api/v1'
    //apiUrl: 'https://api.vd.lutsk.ua/api/v1'
};

export default config;
export const drawerWidth = 280;

export const twitterColor = '#1DA1F2';
export const facebookColor = '#3b5998';
export const linkedInColor = '#0e76a8';
