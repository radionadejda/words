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
                    <div>learn with cards</div>
                </NavLink>
                <NavLink
                    to="/list"
                    className={styles.block}>
                    <div>check word list</div>
                </NavLink>
            </div>
        </main>
    );
};
