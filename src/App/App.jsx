import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import { HomePage, CardsPage, ListPage, ErrorPage } from '../pages';
import { Header } from '../components/Header/Header';
import { Footer } from '../components/Footer/Footer';
import { Spinner } from '../components/Spinner/Spinner';

import english from '../data/english.json';
import german from '../data/german.json';
import styles from '../styles/App.module.scss';

const languages = {
    english,
    german
};

function App() {
    const storedLanguage = localStorage.getItem('language');
    const defaultLanguage = storedLanguage && languages[storedLanguage] ? storedLanguage : 'english';

    const [words, setWords] = useState(languages[defaultLanguage]);
    const [selectedLanguage, setSelectedLanguage] = useState(defaultLanguage);

    useEffect(() => {
        if (storedLanguage && languages[storedLanguage]) {
            setWords(languages[storedLanguage]);
            setSelectedLanguage(storedLanguage);
        }
    }, [storedLanguage]);

    const handleLanguageChange = (language) => {
        if (languages[language]) {
            setWords(languages[language]);
            setSelectedLanguage(language);
            localStorage.setItem('language', language);
        }
    };

    const stateWords = { words, setWords };
    if (!words) {
        return (
            <Router>
                <div className={styles.App}>
                    <Header />
                    <Spinner />
                    <Footer />
                </div>
            </Router>
        );
    }

    return (
        <Router>
            <div className={styles.App}>
                <Header
                    onLanguageChange={handleLanguageChange}
                    selectedLanguage={selectedLanguage}
                />
                <Routes>
                    <Route
                        path="/"
                        element={<HomePage />}
                    />
                    <Route
                        path="/list"
                        element={<ListPage stateWords={stateWords} />}
                    />
                    <Route
                        path="/cards"
                        element={
                            <CardsPage
                                stateWords={stateWords}
                                selectedLanguage={selectedLanguage}
                            />
                        }
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
