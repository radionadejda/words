import styles from './Spinner.module.scss';

import React from 'react';

export function Spinner() {
    return (
        <main className={styles.spinner}>
            <p>we're waiting for data, here's a cat</p>
            <img
                src="../../../public/cat_roll.gif"
                alt="cat-rolling-around"
                className={styles.img}
            />
        </main>
    );
}
