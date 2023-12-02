import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import { HomePage, CardsPage, ListPage, ErrorPage } from '../pages';
import { Header } from '../components/Header/Header';
import { Footer } from '../components/Footer/Footer';
import { Spinner } from '../components/Spinner/Spinner';

// import data from '../data/data.json';
import styles from '../styles/App.module.scss';

function App() {
    const data = false;
    const [words, setWords] = useState(() => data || false);
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
                <Header />
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
                        element={<CardsPage stateWords={stateWords} />}
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
