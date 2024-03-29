/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { createRef, useContext, useEffect, useRef, useState } from 'react';
import titlebarMenus from '../titlebarMenus';
import classNames from 'classnames';
import WindowControls from './WindowControls';
import context from '../titlebarContext';
import { WindowContext } from './WindowFrame';
import { isTauri } from '@utils/Tauri';
import './Titlebar.scss';

const Titlebar = (props) => {
    const activeMenuIndex = useRef(null);
    const menusRef = titlebarMenus.map(() => createRef());
    const [menusVisible, setMenusVisible] = useState(true);
    const windowContext = useContext(WindowContext);

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.repeat) return; // Prevent repeatation of toggle when key holding
            if (e.altKey) {
                // Hiding menus? close active menu popup
                if (menusVisible) {
                    closeActiveMenu();
                }
                setMenusVisible(!menusVisible);
            }
        };

        document.addEventListener('keydown', handleKeyDown);

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [menusVisible, menusRef]);

    useEffect(() => {
        function handleClickOutside(event) {
            if (activeMenuIndex.current != null) {
                if (menusRef[activeMenuIndex.current].current && !menusRef[activeMenuIndex.current].current?.contains(event.target)) {
                    // console.log('You clicked outside of me!');
                    closeActiveMenu();
                }
            }
        }

        if (activeMenuIndex != null) {
            document.addEventListener('mousedown', handleClickOutside);
            // console.log('added event');
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            // console.log('remove event');
        };
    }, [activeMenuIndex, menusRef]);

    function showMenu(index, e) {
        e.stopPropagation();
        e.preventDefault();

        if (menusRef[index].current?.classList.contains('active')) {
            // close..
            closeActiveMenu();
        } else {
            // open..
            menusRef[index].current?.classList.add('active');
            activeMenuIndex.current = index;
            menusRef[index].current?.parentElement?.classList.add('active');
        }
    }

    function onMenuHover(index) {
        if (activeMenuIndex.current != null) {
            menusRef[activeMenuIndex.current].current?.classList.toggle('active');
            menusRef[index].current?.classList.toggle('active');
            menusRef[index].current?.parentElement?.classList.toggle('active');
            menusRef[activeMenuIndex.current].current?.parentElement?.classList.toggle('active');

            activeMenuIndex.current = index;
        }
    }

    function closeActiveMenu() {
        if (activeMenuIndex.current != null) {
            menusRef[activeMenuIndex.current].current?.classList.remove('active');
            menusRef[activeMenuIndex.current]?.current?.parentElement?.classList.remove('active');
            activeMenuIndex.current = null;
        }
    }

    function handleAction(action, value) {
        closeActiveMenu();
        const c = context;
        if (action) {
            if (typeof c[action] === 'function') {
                c[action](value);
            } else {
                console.log(`action [${action}] is not available in titlebar context`);
            }
        }
    }
    if (isTauri) {
        return (
            <div className="window-titlebar">
                {props.icon ? (
                    <section className="window-titlebar-icon">
                        <img src={props.icon} alt="titlebar icon" />
                    </section>
                ) : (
                    ''
                )}

                <section
                    data-tauri-drag-region
                    className={classNames('window-titlebar-content', {
                        centered: props.mode === 'centered-title'
                    })}
                >
                    {menusVisible ? (
                        <div className="window-title" data-tauri-drag-region>
                            {props.title}
                        </div>
                    ) : (
                        ''
                    )}
                </section>

                <section
                    className={classNames('window-titlebar-menu', {
                        hidden: !menusVisible
                    })}
                >
                    {titlebarMenus.map((item, menuIndex) => {
                        return (
                            <div className="menu-item" key={`menu_${menuIndex}`}>
                                <div
                                    className="menu-title"
                                    onClick={(e) => showMenu(menuIndex, e)}
                                    onMouseEnter={() => onMenuHover(menuIndex)}
                                    onMouseDown={(e) => e.preventDefault()}
                                >
                                    {item.name}
                                </div>
                                <div className="menu-popup" ref={menusRef[menuIndex]}>
                                    {item.items?.map((menuItem, menuItemIndex) => {
                                        if (menuItem.name === '__') {
                                            return (
                                                <div
                                                    key={`menu_${menuIndex}_popup_item_${menuItemIndex}`}
                                                    className="popup-item-separator"
                                                ></div>
                                            );
                                        }

                                        return (
                                            <div
                                                key={`menu_${menuIndex}_popup_item_${menuItemIndex}`}
                                                className="menu-popup-item"
                                                onClick={() => handleAction(menuItem.action, menuItem.value)}
                                                onMouseDown={(e) => e.preventDefault()}
                                            >
                                                <div className="popup-item-name">{menuItem.name}</div>
                                                <div className="popup-item-shortcut">{menuItem.shortcut}</div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        );
                    })}
                </section>

                <WindowControls platform={windowContext.platform} tooltips={true} />
            </div>
        );
    } else {
        return;
    }
};

export default Titlebar;
