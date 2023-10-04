const titlebarMenus = [
    {
        name: 'Edit',
        items: [
            {
                name: 'Undo',
                action: 'undo',
                shortcut: 'Ctrl+Z'
            },
            {
                name: 'Redo',
                action: 'redo',
                shortcut: 'Ctrl+Y'
            },
            {
                name: '__'
            },
            {
                name: 'Cut',
                action: 'cut',
                shortcut: 'Ctrl+X'
            },
            {
                name: 'Copy',
                action: 'copy',
                shortcut: 'Ctrl+C'
            },
            {
                name: 'Paste',
                action: 'paste',
                shortcut: 'Ctrl+V'
            },
            {
                name: 'Delete',
                action: 'delete'
            },
            {
                name: '__'
            },
            {
                name: 'Select All',
                action: 'select_all',
                shortcut: 'Ctrl+A'
            }
        ]
    },
    {
        name: 'App',
        items: [
            {
                name: 'Reload',
                action: 'reload',
                shortcut: 'Ctrl+R'
            },
            {
                name: 'Force Reload',
                action: 'force_reload',
                shortcut: 'Ctrl+Shift+R'
            },
            {
                name: 'Open console',
                action: 'toggle_devtools',
                shortcut: 'Ctrl+Shift+I'
            },
            {
                name: '__'
            },
            {
                name: 'Clear webwiev cache',
                action: 'clear_cache',
                shortcut: 'Ctrl+Shift+C'
            },
            {
                name: 'Force delete data',
                action: 'force_clear_cache',
                shortcut: 'Ctrl+Shift+D'
            }
        ]
    },
    {
        name: 'Window',
        items: [
            {
                name: 'Minimize',
                action: 'minimize',
                shortcut: 'Ctrl+M'
            },
            {
                name: 'Close',
                action: 'exit',
                shortcut: 'Ctrl+W'
            },
            {
                name: '__'
            },
            {
                name: 'Toggle Fullscreen',
                action: 'toggle_fullscreen',
                shortcut: 'F11'
            }
        ]
    }
];

export default titlebarMenus;
