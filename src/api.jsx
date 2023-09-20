import axios from 'axios';
import config from './config';

const api = axios.create({
    baseURL: config.apiUrl,
    timeout: 10000
});
let totalPing = 0;
let lastPing = 0;
let totalTime = 0;
let totalRequests = 0;
let lastRequestDate = null;
let requestsPerSecond = 0;

api.interceptors.request.use((config) => {
    // Record the start time for the request
    config.metadata = { startTime: new Date() };
    return config;
});

api.interceptors.response.use(
    (response) => {
        // Calculate ping time (time from request to response)
        const endTime = new Date();
        const startTime = response.config.metadata.startTime;
        const pingTime = endTime - startTime;
        lastPing = pingTime
        totalPing += pingTime;

        // Increment the total number of requests
        totalRequests++;

        // Update the last request date
        lastRequestDate = endTime.toISOString();

        // Calculate requests per second
        const totalTimeInSeconds = (endTime - startTime) ;
        totalTime += totalTimeInSeconds
        requestsPerSecond = totalRequests /  totalTime * 100;

        return response;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Function to get the average ping, download, upload, request status, last request date, upload speed (KB/s), download speed (KB/s), and requests per second
const getMetrics = () => {
    const averagePing = Math.round(totalPing / totalRequests);
    return {
        averagePing,
        totalRequests,
        lastRequestDate,
        requestsPerSecond,
        lastPing
    };
};
export { api, getMetrics };
