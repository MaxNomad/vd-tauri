import React, { lazy } from 'react';

import Loadable from '@components/Loadable';
import MainLayout from '@layout/MainLayout';
import PumpSinglePage from '@pages/wells/PumpSinglePage';
import CountersMain from '@pages/counters';
import PumpStationsRoot from '@pages/pumpStations';

const DashboardDefault = Loadable(lazy(() => import('@pages/dashboard')));

const SamplePage = Loadable(lazy(() => import('@pages/extra-pages/SamplePage')));

const Typography = Loadable(lazy(() => import('@pages/components-overview/Typography')));
const Color = Loadable(lazy(() => import('@pages/components-overview/Color')));
const Shadow = Loadable(lazy(() => import('@pages/components-overview/Shadow')));
const AntIcons = Loadable(lazy(() => import('@pages/components-overview/AntIcons')));

const MainOffice = Loadable(lazy(() => import('@pages/offices')));
const WellsMain = Loadable(lazy(() => import('@pages/wells')));
const KnsMain = Loadable(lazy(() => import('@pages/kns')));
const MapMain = Loadable(lazy(() => import('@pages/map')));
const KnsSinglePage = Loadable(lazy(() => import('@pages/kns/knsSinglePage')));
const ReportsPage = Loadable(lazy(() => import('@pages/reports/')));
const UpstationsPage = Loadable(lazy(() => import('@pages/upstations/')));
const NotFound = Loadable(lazy(() => import('@pages/notFound')));
const User = Loadable(lazy(() => import('@pages/profiles/user')));
const Account = Loadable(lazy(() => import('@pages/profiles/account')));


// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
    path: '/',
    element: <MainLayout />,
    children: [
        {
            path: '/dash',
            element: <DashboardDefault />
        },
        {
            path: '*',
            element: <NotFound />
        },
        {
            path: 'map',
            element: <MapMain />
        },
        {
            path: 'upstations',
            element: <UpstationsPage />,
        },
        {
            path: '/',
            children: [
                {
                    path: '/',
                    element: <DashboardDefault />
                }
            ]
        },
        {
            path: 'kns',
            element: <KnsMain />,
        },
        {
            path: 'kns-single',
            element: <KnsSinglePage />
        },
        {
            path: 'pump-single',
            element: <PumpSinglePage />
        },

        {
            path: 'wells',
            element: <WellsMain />
        },
        {
            path: 'offices',
            element: <MainOffice />
        },
        {
            path: 'sample-page',
            element: <SamplePage />
        },
        {
            path: 'shadow',
            element: <Shadow />
        },
        {
            path: 'typography',
            element: <Typography />
        },
        {
            path: 'icons',
            element: <AntIcons />
        },
        {
            path: 'color',
            element: <Color />
        },
        {
            path: 'reportsRoot',
            element: <ReportsPage />
        },
        {
            path: 'profile',
            element: <Account />
        },
        {
            path: 'profile/edit',
            element: <User  />
        },
        {
            path: 'countersRoot',
            element: <CountersMain />
        },
        {
            path: 'pumpStations',
            element: <PumpStationsRoot />
        },
        
    ]
};

export default MainRoutes;
