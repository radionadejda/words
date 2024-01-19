import { useState, useEffect, useContext } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { WordsAndLanguageContext } from '../context/WordsAndLanguageContext';
import { HomePage, CardsPage, ListPage, ErrorPage } from '../pages';
import { Header } from '../components/Header/Header';
import { Footer } from '../components/Footer/Footer';
import { Spinner } from '../components/Spinner/Spinner';
import styles from '../styles/App.module.scss';

function App() {
    const { words, setWords, language, setLanguage } = useContext(WordsAndLanguageContext);

    console.log('im words from APP');
    console.log(words);
    console.log('im lang from APP');
    console.log(language);

    useEffect(() => {
        setLanguage(language);
    }, [language]);

    const handleLanguageChange = (language) => {
        setLanguage(language);
        localStorage.setItem('language', language);
    };

    if (!words.length) {
        return (
            <Router>
                <div className={styles.App}>
                    <Header onLanguageChange={handleLanguageChange} />
                    <Spinner />
                    <Footer />
                </div>
            </Router>
        );
    }

    return (
        <Router>
            <div className={styles.App}>
                <Header onLanguageChange={handleLanguageChange} />
                <Routes>
                    <Route
                        path="/"
                        element={<HomePage />}
                    />
                    <Route
                        path="/list"
                        element={<ListPage />}
                    />
                    <Route
                        path="/cards"
                        element={<CardsPage />}
                    />
                    <Route
                        path="*"
                        element={<ErrorPage />}
                    />
                </Routes>
                <Footer />
            </div>
        </Router>
    );
}

export default App;
