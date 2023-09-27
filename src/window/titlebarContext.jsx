import { isTauri } from '@utils/Tauri';
//import { appWindow } from '@tauri-apps/api/window';

const tauriWindow = isTauri ? null : null;

const titlebarContext = {
    exit() {
        tauriWindow.close();
    },
    undo() {},
    redo() {},
    cut() {},
    copy() {},
    paste() {},
    delete() {},
    select_all() {},
    reload() {
        window.location.reload();
    },
    force_reload() {
        window.location.reload(true);
    },
    toggle_devtools() {},
    actual_size() {},
    zoom_in() {
        tauriWindow.setZoomLevel(tauriWindow.getZoomLevel() + 1);
    },
    zoom_out() {
        tauriWindow.setZoomLevel(tauriWindow.getZoomLevel() + 1);
    },
    toggle_fullscreen() {
        tauriWindow.isFullscreen().then((data) => {
            tauriWindow.setFullscreen(!data);
        });
    },
    minimize() {
        tauriWindow.minimize();
    },
    toggle_maximize() {
        tauriWindow.isMaximized().then((data) => (data ? tauriWindow.unmaximize() : tauriWindow.maximize()));
    },
    open_url(url) {}
};

export default titlebarContext;
