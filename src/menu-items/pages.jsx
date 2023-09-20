// assets
import { LoginOutlined, ProfileOutlined, HomeOutlined, ProjectOutlined, AimOutlined, UpCircleOutlined, MergeCellsOutlined } from '@ant-design/icons';

// icons
const icons = {
    LoginOutlined,
    ProfileOutlined,
    HomeOutlined,
    ProjectOutlined,
    AimOutlined,
    MergeCellsOutlined,
    UpCircleOutlined 
};

// ==============================|| MENU ITEMS - EXTRA PAGES ||============================== //

const pages = {
    id: 'objects',
    title: 'Об`єкти',
    type: 'group',
    children: [
        {
            id: 'wells',
            title: 'Свердловини',
            type: 'item',
            url: '/wells',
            icon: icons.AimOutlined,
            target: false,
            breadcrumbs: false
        },
        {
            id: 'upstations',
            title: 'Підвищуючі насосні станції',
            type: 'item',
            url: '/upstations',
            icon: icons.UpCircleOutlined,
            target: false,
            breadcrumbs: false
        },
        {
            id: 'kns',
            title: 'Каналізаційні насосні станції',
            type: 'item',
            url: '/kns',
            icon: icons.ProjectOutlined,
            target: false,
            breadcrumbs: false
        }
        ,
        {
            id: 'pumpStations',
            title: 'Насосні станції',
            type: 'item',
            url: '/pumpStations',
            icon: icons.MergeCellsOutlined,
            target: false,
            breadcrumbs: false
        }
    ]
};
const test = {
    id: 'offices',
    title: 'Офіси',
    type: 'item',
    url: '/offices',
    icon: icons.HomeOutlined,
    target: false,
    breadcrumbs: false
}

export default pages;
