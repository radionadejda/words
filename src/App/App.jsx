import { useState, useEffect, useContext } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AllWordsAndSelectedLanguageContext } from '../context/AllWordsAndSelectedLanguageContext';
import { HomePage, CardsPage, ListPage, ErrorPage } from '../pages';
import { Header } from '../components/Header/Header';
import { Footer } from '../components/Footer/Footer';
import { Spinner } from '../components/Spinner/Spinner';
import styles from '../styles/App.module.scss';

function App() {
    const { allWords, setAllWords, selectedLanguage, setSelectedLanguage } = useContext(AllWordsAndSelectedLanguageContext);

    useEffect(() => {
        setSelectedLanguage(selectedLanguage);
    }, [selectedLanguage]);

    const handleLanguageChange = (language) => {
        setSelectedLanguage(language);
        localStorage.setItem('language', language);
    };

    const filteredWords = allWords.filter((word) => word[selectedLanguage]);
    const stateWords = { words: filteredWords, setWords: setAllWords };

    if (!allWords.length) {
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
