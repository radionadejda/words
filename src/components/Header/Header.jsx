import { NavLink } from 'react-router-dom';
import styles from './Header.module.scss';
import { useEffect } from 'react';

export const Header = ({ onLanguageChange, selectedLanguage, allWords }) => {
    const changeLanguage = (language) => {
        onLanguageChange(language);
    };

    const keysToFilterOut = ['id', 'transcription', 'russian', 'tags', 'tags_json'];

    const getUniqueLanguages = () => {
        const uniqueLanguagesSet = new Set(allWords.flatMap((word) => Object.keys(word).filter((key) => !keysToFilterOut.includes(key))));

        return [...uniqueLanguagesSet];
    };

    const uniqueLanguages = getUniqueLanguages();

    const languages = [{ value: '', label: 'Pick Language', className: styles.select__option, disabled: true }, ...uniqueLanguages.map((lang) => ({ value: lang, label: lang, className: styles.select__option }))];

    return (
        <header className={styles.header}>
            <NavLink
                to="/"
                className={styles.header__link}>
                <h1 className={styles.title}>another learning app</h1>
            </NavLink>
            <div className={styles.container}>
                <select
                    className={styles.header__select}
                    onChange={(e) => changeLanguage(e.target.value)}
                    value={selectedLanguage}>
                    {languages.map((lang) => (
                        <option
                            key={lang.value}
                            value={lang.value}
                            className={lang.className}
                            disabled={lang.disabled}>
                            {lang.label}
                        </option>
                    ))}
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
