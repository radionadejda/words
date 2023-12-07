import styles from './Spinner.module.scss';

import React from 'react';

export const Spinner = (props) => {
    const defaultMessage = "we're waiting for data";
    return (
        <main className={styles.spinner}>
            <p>{props.message || defaultMessage}, here's a cat</p>
            <img
                src="../../../public/cat_roll.gif"
                alt="cat-rolling-around"
                className={styles.img}
            />
        </main>
    );
};

//
