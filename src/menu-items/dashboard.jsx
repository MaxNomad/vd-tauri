// assets
import { DashboardOutlined, RadarChartOutlined, NodeCollapseOutlined } from '@ant-design/icons';

// icons
const icons = {
    DashboardOutlined,
    RadarChartOutlined,
    NodeCollapseOutlined
};

// ==============================|| MENU ITEMS - DASHBOARD ||============================== //

const dashboard = {
    id: 'group-dashboard',
    title: '',
    type: 'group',
    children: [
        {
            id: 'dashboard',
            title: 'Головна',
            type: 'item',
            url: '/dash',
            icon: icons.DashboardOutlined,
            breadcrumbs: false
        },
        {
            id: 'map',
            title: 'Карта',
            type: 'item',
            url: '/map',
            icon: icons.RadarChartOutlined,
            breadcrumbs: false
        },
        {
            id: 'opc',
            title: 'OPC',
            type: 'item',
            url: '/opc',
            icon: icons.NodeCollapseOutlined,
            breadcrumbs: false
        }
    ]
};

export default dashboard;
