import styles from '../../styles/HomePage.module.scss';

// import { Button } from '../components/Button/Button.jsx';
// import { words } from '../data/data.js';

export function MainPage() {
    return (
        <div className={styles.main}>
            <h2 className={styles.title}>pick type of training</h2>
            <div className={styles.blocks}>
                <a href="./CardPage.js" className={styles.block}>
                    <div>learn with cards</div>
                </a>
                <a href="./ListPage.js" className={styles.block}>
                    <div>check word list</div>
                </a>
            </div>
        </div>
    );
}
