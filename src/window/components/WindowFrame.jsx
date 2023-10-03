import React, { useEffect, useRef, useState } from 'react';
import Titlebar from './Titlebar';
import logo from '@assets/index.svg';
import logoDark from '@assets/indexDark.svg';
import { useTheme } from '@mui/material';

export const WindowContext = React.createContext({
    platform: 'windows'
});

const WindowFrame = (props) => {
    const itsRef = useRef(null);
    const [useLight, setUseLight] = useState(false);
    const theme = useTheme()
    useEffect(() => {
        const { parentElement } = itsRef.current;
        parentElement.classList.add('has-electron-window');
        parentElement.classList.add('has-border');

        // Apply border color if prop given
        if (props.borderColor) {
            parentElement.style.borderColor = props.borderColor;
        }
        
       
    }, []);
    useEffect(() => {
        // Function to check if the 'dark-mode' class is present on document.body
        const checkDarkMode = () => {
          setUseLight(!document.body.classList.contains('dark-mode'));
        };
    
        // Initial check when the component is mounted
        checkDarkMode();
    
        // Create a MutationObserver to watch for changes in document.body
        const observer = new MutationObserver(checkDarkMode);
    
        // Start observing changes to attributes and child list of document.body
        observer.observe(document.body, { attributes: true, childList: true });
    
        // Cleanup the observer when the component unmounts
        return () => {
          observer.disconnect();
        };
      }, []);

    return (
        <WindowContext.Provider value={{ platform: props.platform }}>
            {/* Reference creator */}
            <div className="start-window" ref={itsRef}></div>
            {/* Window Titlebar */}
            <Titlebar title={props.title ?? 'Electron Window'} mode="centered-title" icon={useLight ? logoDark : logo} />
            {/* Window Content (Application to render) */}
            <div className="window-content">{props.children}</div>
        </WindowContext.Provider>
    );
};

export default WindowFrame;
