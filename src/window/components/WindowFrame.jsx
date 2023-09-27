import React, { useEffect, useRef } from 'react';
import Titlebar from './Titlebar';
import logo from '@assets/tauri.svg';

export const WindowContext = React.createContext({
    platform: 'windows'
});

const WindowFrame = (props) => {
    const itsRef = useRef(null);

    useEffect(() => {
        const { parentElement } = itsRef.current;
        parentElement.classList.add('has-electron-window');
        parentElement.classList.add('has-border');

        // Apply border color if prop given
        if (props.borderColor) {
            parentElement.style.borderColor = props.borderColor;
        }
    }, []);

    return (
        <WindowContext.Provider value={{ platform: props.platform }}>
            {/* Reference creator */}
            <div className="start-window" ref={itsRef}></div>
            {/* Window Titlebar */}
            <Titlebar title={props.title ?? 'Electron Window'} mode="centered-title" icon={logo} />
            {/* Window Content (Application to render) */}
            <div className="window-content">{props.children}</div>
        </WindowContext.Provider>
    );
};

export default WindowFrame;
