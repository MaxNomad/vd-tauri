import React, { useState, useEffect } from 'react';
import { useTheme } from '@mui/material/styles';
import { CSSTransition } from 'react-transition-group';
import Tooltip from '@mui/material/Tooltip'; // Add this import
import './NumberWithAnimation.scss';

const NumberChangeAnimation = ({ number, rev, one }) => {
    const theme = useTheme();
    const [prevNumber, setPrevNumber] = useState(number);
    const [color, setColor] = useState('inherit');
    
    useEffect(() => {
        if (number > prevNumber) {
            setColor(!one ? (!rev ? theme.palette.success.main : theme.palette.error.main) : theme.palette.primary.main);
        } else if (number < prevNumber) {
            setColor(!one ? (rev ? theme.palette.success.main : theme.palette.error.main) : theme.palette.primary.main);
        }
        const timeoutId = setTimeout(() => {
            setColor('inherit');
        }, 700);
        return () => clearTimeout(timeoutId);
    }, [number, prevNumber]);
    
    useEffect(() => {
        setPrevNumber(number);
    }, [number]);

    const getTooltipTitle = (num) => {
        if (num >= 1000000000) {
            return `${(num/1000000000 ?? 0).toFixed(1)} B`;
        } else if (num >= 1000000) {
            return `${(num/1000000 ?? 0).toFixed(1)} M`;
        } else if (num > 10000) {
            return `${(num/1000 ?? 0).toFixed(1)} K`;
        }
        return num;
    };

    return (
        <div className="number-container">
            <CSSTransition in={true} appear={true} classNames="number-change" timeout={500}>
                <Tooltip title={`${number} м³`}>
                    <div className="number" style={{ color: color }}>
                    {getTooltipTitle(number)}
                    </div>
                </Tooltip>
            </CSSTransition>
        </div>
    );
};

export default React.memo(NumberChangeAnimation);
