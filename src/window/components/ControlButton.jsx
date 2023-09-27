/* eslint-disable jsx-a11y/no-static-element-interactions */
import classNames from 'classnames';
import React from 'react';

const ControlButton = (props) => {
    const { name, path, title, ...rest } = props;
    const { onClick } = rest;

    const className = classNames('control', name);

    return (
        // eslint-disable-next-line jsx-a11y/click-events-have-key-events
        <div aria-label={name} className={className} onClick={onClick} title={title} {...rest}>
            <svg aria-hidden="true" version="1.1" width="10" height="10">
                <path fill="currentColor" d={path} />
            </svg>
        </div>
    );
};

export default ControlButton;
