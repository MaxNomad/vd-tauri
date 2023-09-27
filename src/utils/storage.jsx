import { Store } from 'tauri-plugin-store-api';
import { isTauri } from './Tauri';

let GlobalStore;

if (isTauri) {
    const tauristorage = new Store('.settings.dat');
    GlobalStore = {
        setItem: (key, value) => {
            try {
                tauristorage.set(key, value).then(() => {
                    tauristorage.save();
                });
            } catch (error) {
                console.error('Error setting tauristorage:', error);
            }
        },

        getItem: (key) => {
            try {
                let item = null;
                tauristorage.get(key).then((data) => (data = item));
                return item ? JSON.parse(item) : null;
            } catch (error) {
                console.error('Error getting tauristorage:', error);
                return null;
            }
        },
        clear: () => {
            try {
                tauristorage.clear().then(() => tauristorage.save());
            } catch (error) {
                console.error('Error clearing tauristorage:', error);
                return null;
            }
        },
        removeItem: (key) => {
            try {
                tauristorage.delete(key).then(() => tauristorage.save());
            } catch (error) {
                console.error('Error removing tauristorage:', error);
                return null;
            }
        }
    };
} else {
    GlobalStore = {
        setItem: (key, value) => {
            try {
                localStorage.setItem(key, JSON.stringify(value));
            } catch (error) {
                console.error('Error setting localStorage:', error);
            }
        },
        getItem: (key) => {
            try {
                const item = localStorage.getItem(key);
                return item ? JSON.parse(item) : null;
            } catch (error) {
                console.error('Error getting localStorage:', error);
                return null;
            }
        },
        clear: () => {
            try {
                localStorage.clear();
            } catch (error) {
                console.error('Error clearing localStorage:', error);
                return null;
            }
        },
        removeItem: (key) => {
            try {
                localStorage.removeItem(key);
            } catch (error) {
                console.error('Error removing localStorage:', error);
                return null;
            }
        }
    };
}

export { GlobalStore };
