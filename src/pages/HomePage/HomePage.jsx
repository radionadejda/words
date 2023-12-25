import { NavLink } from 'react-router-dom';

import styles from '../../styles/HomePage.module.scss';

export const HomePage = () => {
    return (
        <main className={styles.main}>
            <h2 className={styles.title}>pick type of training</h2>
            <div className={styles.blocks}>
                <NavLink
                    to="/cards"
                    className={styles.block}>
                    learn with cards
                </NavLink>
                <NavLink
                    to="/list"
                    className={styles.block}>
                    check word list
                </NavLink>
            </div>
        </main>
    );
};
