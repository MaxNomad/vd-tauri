import React, { useState, useEffect } from 'react';
import { useTheme } from '@mui/material/styles';
import { CSSTransition } from 'react-transition-group';
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

    return (
        <div className="number-container">
            <CSSTransition in={true} appear={true} classNames="number-change" timeout={500}>
                <div className="number" style={{ color: color }}>
                    {number}
                </div>
            </CSSTransition>
        </div>
    );
};

export default React.memo(NumberChangeAnimation);
