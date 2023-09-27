import { Tooltip } from '@mui/material';
import React, { useState, useEffect } from 'react';

const TimeAgo = ({ targetTime, text = '' }) => {
    const [target, setTarget] = useState(targetTime);
    const [difference, setIime] = useState(new Date() - target);

    useEffect(() => {
        const intervalId = setInterval(() => {
            // Update state or perform any action you want here
            setTarget(targetTime);
            setIime(new Date() - targetTime);
        }, 1000); // 1000 milliseconds = 1 second

        // Clean up the interval when the component unmounts
        return () => clearInterval(intervalId);
    }, [targetTime]);

    if (difference < 2 * 1000) {
        return `${text} щойно`;
    } else if (difference < 60 * 1000) {
        const seconds = Math.floor(difference / 1000);
        return `${text} ${seconds} секунд${seconds < 5 ? (seconds !== 1 ? 'и' : 'у') : ''} тому`;
    } else if (difference < 60 * 60 * 1000) {
        const minutes = Math.floor(difference / (60 * 1000));
        return `${text} ${minutes} хвилин${minutes < 5 ? (minutes !== 1 ? 'и' : 'у') : ''} тому`;
    } else if (difference < 24 * 60 * 60 * 1000) {
        if (new Date().getDate() - targetTime.getDate() === 1) {
            const formattedTime = `${text} вчора о ${targetTime.toLocaleString('uk-UA', {
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit'
            })}`;
            return (
                <Tooltip title={formattedTime} placement="bottom">
                    <span>{`${text} вчора`}</span>
                </Tooltip>
            );
        } else if (new Date().getDate() === targetTime.getDate()) {
            const formattedTime = targetTime.toLocaleString('uk-UA', { hour: '2-digit', minute: '2-digit' });
            return `${text} сьогодні о ${formattedTime}`;
        } else {
            const hours = Math.floor(difference / (60 * 60 * 1000));
            return `${text} ${hours} годин${hours < 5 ? (hours !== 1 ? 'и' : 'у') : ''} тому`;
        }
    } else {
        const formattedTime = `${text} ${targetTime.toLocaleString('uk-UA', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        })}`;
        const formattedTimeShort = `${text} ${targetTime.toLocaleString('uk-UA', { year: 'numeric', month: 'long', day: 'numeric' })}`;
        return (
            <Tooltip title={formattedTime} placement="bottom">
                <span>{formattedTimeShort}</span>
            </Tooltip>
        );
    }
};

export default React.memo(TimeAgo);
