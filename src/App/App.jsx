import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

// пока не разобралась с роутингом, переключаем страницы за- и рас- комментированием
import { HomePage, CardsPage, ListPage, ErrorPage } from '../pages';
import { Header } from '../components/Header/Header';
import { Footer } from '../components/Footer/Footer';

import styles from '../styles/App.module.scss';

function App() {
    return (
        <Router>
            <div className={styles.App}>
                <Header />
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/list" element={<ListPage />} />
                    <Route path="/cards" element={<CardsPage />} />
                    <Route path="*" element={<ErrorPage />} />
                </Routes>
                <Footer />
            </div>
        </Router>
    );
}

export default App;
