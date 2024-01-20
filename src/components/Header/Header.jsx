import { NavLink } from 'react-router-dom';
import { useContext } from 'react';
import { WordsAndLanguageContext } from '../../context/WordsAndLanguageContext';

import styles from './Header.module.scss';

export const Header = ({ onLanguageChange }) => {
    const { words, language, setLanguage } = useContext(WordsAndLanguageContext);

    const changeLanguage = (language) => {
        onLanguageChange(language);
        setLanguage(language);
    };

    // uncomment to filter unique languages available in API
    //     const getUniqueLanguages = () => {
    //         const keysToFilterOut = ['id', 'transcription', 'russian', 'tags', 'tags_json'];
    // const uniqueLanguagesSet = new Set(words.flatMap((word) => Object.keys(word).filter((key) => !keysToFilterOut.includes(key))));
    //         return [...uniqueLanguagesSet];
    //     };
    //     const uniqueLanguages = getUniqueLanguages();
    //     const languages = [{ value: '', label: 'Pick Language', className: styles.select__option, disabled: true }, ...uniqueLanguages.map((lang) => ({ value: lang, label: lang, className: styles.select__option }))];

    // remove if using languages available in API
    const languages = [
        { value: '', label: 'Pick Language', className: styles.select__option, disabled: true },
        { value: 'english', label: 'english', className: styles.select__option },
        { value: 'german', label: 'german', className: styles.select__option },
        { value: 'french', label: 'french', className: styles.select__option },
        { value: 'spanish', label: 'spanish', className: styles.select__option }
    ];

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
                    value={language}>
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
