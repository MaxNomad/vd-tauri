// assets
import {
    AppstoreAddOutlined,
    AntDesignOutlined,
    BarcodeOutlined,
    BgColorsOutlined,
    FontSizeOutlined,
    LoadingOutlined,
    CopyOutlined,
    SettingOutlined,
    ChromeOutlined,
    FormOutlined
} from '@ant-design/icons';

// icons
const icons = {
    FontSizeOutlined,
    BgColorsOutlined,
    BarcodeOutlined,
    AntDesignOutlined,
    LoadingOutlined,
    AppstoreAddOutlined,
    CopyOutlined,
    SettingOutlined,
    FormOutlined,
    ChromeOutlined
};

// ==============================|| MENU ITEMS - UTILITIES ||============================== //

const utilities = {
    id: 'utilities',
    title: 'Додатково',
    type: 'group',
    children: [
        {
            id: 'reportsRoot',
            title: 'Звіти',
            type: 'item',
            url: '/reportsRoot',
            icon: icons.FormOutlined,
            target: false,
            breadcrumbs: false
        },
        {
            id: 'countersRoot',
            title: 'Лічильники',
            type: 'item',
            url: '/countersRoot',
            icon: icons.ChromeOutlined,
            target: false,
            breadcrumbs: false
        }
    ]
};

export default utilities;
