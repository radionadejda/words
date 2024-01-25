import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { observer, inject } from 'mobx-react';
import { HomePage, CardsPage, ListPage, ErrorPage } from '../pages';
import { Header } from '../components/Header/Header';
import { Footer } from '../components/Footer/Footer';
import { Spinner } from '../components/Spinner/Spinner';
import styles from '../styles/App.module.scss';

const App = inject('wordsStore')(
    observer(({ wordsStore }) => {
        const [noWords, setNoWords] = useState(false);

        useEffect(() => {
            wordsStore.getWordsFromApi();
        }, []);

        useEffect(() => {
            if (!wordsStore.loading) {
                if (wordsStore.filteredWords.length === 0) {
                    setNoWords(true);
                } else {
                    setNoWords(false);
                }
            }
        }, [wordsStore.language, wordsStore.loading, wordsStore.words, wordsStore.filteredWords]);

        const handleLanguageChange = (language) => {
            wordsStore.language = language;
            localStorage.setItem('language', language);
        };

        if (wordsStore.loading) {
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
    })
);

export default App;
