import axios from 'axios';
import config from './config';

import { getToken } from '@pages/authentication/helper/token';
import { toastError } from '@pages/components-overview/toasts';
import { isTauri } from '@utils/Tauri';
import { getClient, Body, ResponseType } from '@tauri-apps/api/http';

let api;
// Timeout in seconds
const apiTimeout = 5;

if (isTauri) {
    getClient().then((client) => {
        api = {
            async get(url, params = {}) {
                try {
                    const response = client.request({
                        method: 'GET',
                        url: config.apiUrl + url,
                        options: { ...params },
                        headers: { Authorization: `Bearer ${getToken()}` },
                        type: ResponseType.JSON,
                        timeout: apiTimeout
                    });
                    return response;
                } catch (e) {
                    console.log(e);
                    toastError('Get request failed');
                }
            },

            async post(url, payload = {}, params = {}) {
                try {
                    const response = await client.request({
                        method: 'POST',
                        url: config.apiUrl + url,
                        body: Body.json(payload),
                        options: { ...params },
                        headers: { Authorization: `Bearer ${getToken()}` },
                        type: ResponseType.JSON,
                        timeout: apiTimeout
                    });
                    return response;
                } catch (e) {
                    console.log(e);
                    toastError('Post request failed');
                }
            },

            async put(url, payload = {}, params = {}) {
                try {
                    const response = await client.request({
                        method: 'PUT',
                        url: config.apiUrl + url,
                        body: Body.json(payload),
                        options: { ...params },
                        headers: { Authorization: `Bearer ${getToken()}` },
                        type: ResponseType.JSON,
                        timeout: apiTimeout
                    });
                    return response;
                } catch (e) {
                    console.log(e);
                    toastError('Put request failed');
                }
            },

            async delete(url, payload = {}, params = {}) {
                try {
                    const response = await client.request({
                        method: 'DELETE',
                        url: config.apiUrl + url,
                        body: Body.json(payload),
                        options: { ...params },
                        headers: { Authorization: `Bearer ${getToken()}` },
                        type: ResponseType.JSON,
                        timeout: apiTimeout
                    });
                    return response;
                } catch (e) {
                    console.log(e);
                    toastError('Delete request failed');
                }
            }
        };
    });
} else {
    api = axios.create({
        baseURL: config.apiUrl,
        timeout: apiTimeout * 1000,
        headers: {
            Authorization: `Bearer ${getToken()}`,
            'Content-Type': 'application/json'
        }
    });
    api.interceptors.request.use((config) => {
        config.headers['Authorization'] = `Bearer ${getToken()}`;
        return config;
    });
}

export { api };
