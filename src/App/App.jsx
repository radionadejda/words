import { useState, useEffect, useContext } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { WordsAndLanguageContext } from '../context/WordsAndLanguageContext';
import { HomePage, CardsPage, ListPage, ErrorPage } from '../pages';
import { Header } from '../components/Header/Header';
import { Footer } from '../components/Footer/Footer';
import { Spinner } from '../components/Spinner/Spinner';
import styles from '../styles/App.module.scss';

function App() {
    const { getFilteredWords, words, setWords, language, setLanguage, loading } = useContext(WordsAndLanguageContext);
    const [noWords, setNoWords] = useState(false);

    useEffect(() => {
        setLanguage(language);
        if (!loading) {
            const filteredWords = getFilteredWords();

            if (filteredWords.length === 0) {
                setNoWords(true);
            } else {
                setNoWords(false);
            }
        }
    }, [language, loading, words]);

    const handleLanguageChange = (language) => {
        setLanguage(language);
        localStorage.setItem('language', language);
    };

    if (loading) {
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

    if (noWords) {
        return (
            <Router>
                <div className={styles.App}>
                    <Header onLanguageChange={handleLanguageChange} />
                    <ListPage noWords={noWords} />
                    <Footer />
                </div>
            </Router>
        );
    }

    if (noWords) {
        return (
            <Router>
                <div className={styles.App}>
                    <Header onLanguageChange={handleLanguageChange} />
                    <div className={styles.message}>we don't have words in {language}, but you can add them here</div>
                    <ListPage addFormOpen={noWords} />
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
