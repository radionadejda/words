import React, { forwardRef } from 'react';
import styles from './Button.module.scss';

export const Button = forwardRef((props, ref) => {
    const buttonClass = `${styles.button} ${props.customClass || ''}`;

    const handleClick = () => {
        if (props.onClick) {
            props.onClick();
        }
    };

    return (
        <button
            ref={ref}
            className={buttonClass}
            onClick={handleClick}>
            {props.name}
        </button>
    );
});
