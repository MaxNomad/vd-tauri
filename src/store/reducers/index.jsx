// third-party
import { combineReducers } from 'redux';

// project import
import menu from './menu';
import kns from '@pages/kns/redux/knsSlice';
import knsRoot from '@pages/kns/redux/knsListSlice';
import knsAlertsActive from '@pages/kns/redux/knsAlertsActiveSlice';
import knsAlertsAll from '@pages/kns/redux/knsAlertsAllSlice';
import knsAlertDisable from '@pages/kns/redux/knsAlertDisableSlice';
import knsFoundAlertList from '@pages/kns/redux/knsAlertDataListSlice';
import knsChartData from '@pages/kns/redux/knsDataChartSlice';
import PumpRoot from '@pages/wells/redux/pumpListSlice';
import PnsRoot from '@pages/upstations/redux/pnsListSlice';
import rootGlobal from '@pages/dashboard/redux/rootGlobalSlice';
import pump from '@pages/wells/redux/pumpSlice';
import pumpAlertsActive from '@pages/wells/redux/pumpAlertsActiveSlice';
import pumpAlertsAll from '@pages/wells/redux/pumpAlertsAllSlice';
import authReducer from '@pages/authentication/redux/authSlise';
import userReducer from '@pages/authentication/redux/userSlise';
import CountersRoot from '@pages/counters/redux/countersListSlice';
import PumpStation from '@pages/pumpStations/redux/PumpStationListSlice';
import wellModbus from '@pages/wells/redux/modbusSlice';
import pumpWellEvents from '@pages/wells/redux/pumpEventsListSlice';
import rootGithub from '@pages/dashboard/redux/gitstatusSlice';
import dialogSlice from '@store/reducers/dialogSlice';
import snackbar from './snackbar';
import report from '@pages/reports/redux/reportSlice';
// ==============================|| COMBINE REDUCERS ||============================== //

const reducers = combineReducers({
    menu: menu,
    kns: kns,
    pump: pump,
    knsRoot: knsRoot,
    knsAlertsActive: knsAlertsActive,
    knsAlertsAll: knsAlertsAll,
    knsAlertDisable: knsAlertDisable,
    knsFoundAlertList: knsFoundAlertList,
    knsChartData: knsChartData,
    PumpRoot: PumpRoot,
    pumpAlertsActive: pumpAlertsActive,
    pumpAlertsAll: pumpAlertsAll,
    auth: authReducer,
    user: userReducer,
    PnsRoot: PnsRoot,
    rootGlobal: rootGlobal,
    CountersRoot: CountersRoot,
    RootPumpStation: PumpStation,
    wellModbus: wellModbus,
    pumpWellEvents: pumpWellEvents,
    rootGithub: rootGithub,
    updateDialog: dialogSlice,
    report: report,
    snackbar: snackbar
});

export default reducers;
