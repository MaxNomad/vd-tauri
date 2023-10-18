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
                const response = await client.request({
                    method: 'GET',
                    url: config.apiUrl + url,
                    options: { ...params },
                    headers: { Authorization: `Bearer ${getToken()}` },
                    type: ResponseType.JSON,
                    timeout: apiTimeout
                });
                if (response.status < 400) {
                    return response;
                }
                throw { response: response };
            },

            async post(url, payload = {}, params = {}) {
                const response = await client.request({
                    method: 'POST',
                    url: config.apiUrl + url,
                    body: Body.json(payload),
                    options: { ...params },
                    headers: { Authorization: `Bearer ${getToken()}` },
                    type: ResponseType.JSON,
                    timeout: apiTimeout
                });
                if (response.status < 400) {
                    return response;
                }
                throw { response: response };
            },

            async put(url, payload = {}, params = {}) {
                const response = await client.request({
                    method: 'PUT',
                    url: config.apiUrl + url,
                    body: Body.json(payload),
                    options: { ...params },
                    headers: { Authorization: `Bearer ${getToken()}` },
                    type: ResponseType.JSON,
                    timeout: apiTimeout
                });
                if (response.status < 400) {
                    return response;
                }
                throw { response: response };
            },

            async delete(url, payload = {}, params = {}) {
                const response = await client.request({
                    method: 'DELETE',
                    url: config.apiUrl + url,
                    body: Body.json(payload),
                    options: { ...params },
                    headers: { Authorization: `Bearer ${getToken()}` },
                    type: ResponseType.JSON,
                    timeout: apiTimeout
                });
                if (response.status < 400) {
                    return response;
                }
                throw { response: response };
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
