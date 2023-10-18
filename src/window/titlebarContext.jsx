import { isTauri } from '@utils/Tauri';
import { appWindow } from '@tauri-apps/api/window';

const tauriWindow = isTauri ? appWindow : null;

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
    zoom_in() {},
    zoom_out() {},
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
    open_url(url) {},
    force_clear_cache() {
        caches.keys().then((list) => list.map((key) => caches.delete(key)));
        window.gc()
        localStorage.clear();
        window.location.reload(true);
    },
    clear_cache() {
        localStorage.clear();
        window.gc()
        window.location.reload(true);
    },
    clear_gc() {
        window.gc()
    }
};

export default titlebarContext;
