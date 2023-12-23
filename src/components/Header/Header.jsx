import { NavLink } from 'react-router-dom';
import styles from './Header.module.scss';

export const Header = ({ onLanguageChange, selectedLanguage }) => {
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
                <select
                    className={styles.header__select}
                    onChange={(e) => changeLanguage(e.target.value)}
                    value={selectedLanguage}>
                    <option
                        value=""
                        disabled
                        className={styles.select__option}>
                        pick language
                    </option>
                    <option
                        value="english"
                        className={styles.select__option}>
                        English
                    </option>
                    <option
                        value="german"
                        className={styles.select__option}>
                        German
                    </option>
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
