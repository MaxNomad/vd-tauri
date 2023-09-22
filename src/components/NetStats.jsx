import TimeAgo from '@pages/counters/components/timeAgo';
import NumberWithAnimation from '@pages/kns/components/NumberWithAnimation';
import React, { useState, useEffect } from 'react';
//import { getMetrics } from '../api';
import { Typography } from '@mui/material';
import MainCard from './MainCard';

const NetworkStats = () => {
    const [metrics, setMetrics] = useState({});

    useEffect(() => {
        // Function to fetch metrics data and update state
        //const fetchMetricsData = () => {
        //    const metricsData = getMetrics();
        //    setMetrics(metricsData);
        //};
        // Fetch metrics on component mount and refresh every 5 seconds
        //fetchMetricsData();
        //const intervalId = setInterval(fetchMetricsData, 500);
        // Clear interval on component unmount
        //return () => clearInterval(intervalId);
    }, []);

    return (
        <MainCard>
            <Typography variant="h4" color="textSecondary" sx={{ mb: 1 }}>
                API Metrics
            </Typography>
            <Typography variant="h6" sx={{ mb: 1 }}>
                Здійснено запитів: {metrics?.totalRequests || 0}{' '}
                <Typography variant="h6" color="textSecondary" display={'inline'}>
                    ({metrics?.requestsPerSecond ? metrics?.requestsPerSecond.toFixed(2) : 'N/A'} per second)
                </Typography>
            </Typography>
            <Typography variant="h6" sx={{ mb: 1 }}>
                Затримка останнього запиту:{' '}
                {metrics?.lastPing ? (
                    <>
                        <NumberWithAnimation number={metrics.lastPing} rev /> ms{' '}
                        <Typography variant="h6" color="textSecondary" display={'inline'}>
                            (avg&nbsp;&nbsp;
                            {metrics?.averagePing ? (
                                <>
                                    <NumberWithAnimation number={metrics.averagePing} rev /> ms
                                </>
                            ) : (
                                'N/A'
                            )}
                            )
                        </Typography>
                    </>
                ) : (
                    'N/A'
                )}
            </Typography>
            <Typography variant="h6" sx={{ mb: 1 }}>
                Останній запит здійснено <TimeAgo targetTime={new Date(metrics.lastRequestDate)} />
            </Typography>
        </MainCard>
    );
};

export default NetworkStats;
