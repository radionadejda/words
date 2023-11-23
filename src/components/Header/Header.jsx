import styles from './Header.module.scss';

// maybe add theme switcher into header__nav

// maybe add topic picker to change laguages into header__nav
/* <li>
    <select name="topicPicker" id="topicPicker">
        <option value="">pick a topic</option>
        <option value="english">english</option>
        <option value="spanish">spanish</option>
    </select>
</li> */

export function Header() {
    return (
        <div className={styles.header}>
            <a href="../../pages/MainPage.jsx" className={styles.header__link}>
                <h1 className={styles.title}>another learning app</h1>
            </a>
            <ul className={styles.header__nav}>
                <li className={styles.nav__item}>cards</li>
                <li className={styles.nav__item}>word list</li>
            </ul>
        </div>
    );
}
