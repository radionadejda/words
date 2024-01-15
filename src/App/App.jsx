import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import { HomePage, CardsPage, ListPage, ErrorPage } from '../pages';
import { Header } from '../components/Header/Header';
import { Footer } from '../components/Footer/Footer';
import { Spinner } from '../components/Spinner/Spinner';

import wordsData from '../data/words.json';
import styles from '../styles/App.module.scss';

function App() {
    const storedLanguage = localStorage.getItem('language');
    const defaultLanguage = storedLanguage ? storedLanguage : 'english';

    const [allWords, setAllWords] = useState(wordsData);
    const [selectedLanguage, setSelectedLanguage] = useState(defaultLanguage);

    useEffect(() => {
        setSelectedLanguage(storedLanguage);
    }, [storedLanguage]);

    const handleLanguageChange = (language) => {
        setSelectedLanguage(language);
        localStorage.setItem('language', language);
    };

    const filteredWords = allWords.filter((word) => word[selectedLanguage]);

    const stateWords = { words: filteredWords, setWords: setAllWords };

    if (!filteredWords.length) {
        return (
            <Router>
                <div className={styles.App}>
                    <Header
                        onLanguageChange={handleLanguageChange}
                        selectedLanguage={selectedLanguage}
                        allWords={allWords}
                    />
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
                    allWords={allWords}
                />
                <Routes>
                    <Route
                        path="/"
                        element={<HomePage />}
                    />
                    <Route
                        path="/list"
                        element={
                            <ListPage
                                stateWords={stateWords}
                                selectedLanguage={selectedLanguage}
                            />
                        }
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
