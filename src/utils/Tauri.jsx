import { getVersion } from '@tauri-apps/api/app';
import { invoke } from '@tauri-apps/api/tauri';
import { checkUpdate } from '@tauri-apps/api/updater';

export const isTauri = window?.__TAURI__ ? false : false;

export let appVersion;

isTauri && document.addEventListener('contextmenu', (event) => event.preventDefault());

(async () => {
    appVersion = isTauri ? `${await getVersion()}-Tauri` : 'v1.234.1-Front';
})();

if (isTauri) {
    document.addEventListener('DOMContentLoaded', () => {
        invoke('dom_started');
    });
}
