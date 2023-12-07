import { NavLink } from 'react-router-dom';
import styles from './Header.module.scss';

export const Header = ({ onLanguageChange }) => {
    const changeLanguage = (language) => {
        onLanguageChange(language);
    };

    return (
        <header className={styles.header}>
            <NavLink
                to="/"
                className={styles.header__link}>
                <h1 className={styles.title}>another learning app</h1>
            </NavLink>
            <div>
                <select onChange={(e) => changeLanguage(e.target.value)}>
                    <option
                        value=""
                        disabled>
                        pick language
                    </option>
                    <option value="english">English</option>
                    <option value="german">German</option>
                </select>
            </div>
            <nav className={styles.header__nav}>
                <NavLink
                    to="/cards"
                    className={styles.nav__item}>
                    cards
                </NavLink>
                <NavLink
                    to="/list"
                    className={styles.nav__item}>
                    word list
                </NavLink>
            </nav>
        </header>
    );
};
