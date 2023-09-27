import { getVersion, getTauriVersion } from '@tauri-apps/api/app';
import { checkUpdate } from '@tauri-apps/api/updater';
import { invoke } from '@tauri-apps/api/tauri';

export const isTauri = window?.__TAURI__ ? true : false;

export let appVersion;
export let tauriVersion;

isTauri && document.addEventListener('contextmenu', (event) => event.preventDefault());

(async () => {
    appVersion = isTauri ? `${await getVersion()}-Tauri` : 'v1.234.1-Front';
    tauriVersion = isTauri ? await getTauriVersion() : null;
})();

document.addEventListener('DOMContentLoaded', () => {
    isTauri ? invoke('dom_started') : null;
});
