import { getVersion } from '@tauri-apps/api/app';
import { invoke } from '@tauri-apps/api/tauri';

export const isTauri = (window.__TAURI__ ? true : false);

export const appVersion = isTauri ? `${getVersion()}-Tauri` : 'v1.234.1-Front';




isTauri && document.addEventListener('contextmenu', event => event.preventDefault());

document.addEventListener('DOMContentLoaded', () => {
    invoke('dom_started');
});