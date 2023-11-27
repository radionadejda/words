import styles from '../styles/App.module.scss';

// пока не разобралась с роутингом, переключаем страницы за- и рас- комментированием
import { MainPage } from '../pages/HomePage/HomePage';
import { ListPage } from '../pages/ListPage/ListPage';
import { CardsPage } from '../pages/CardsPage/CardsPage';
import { ErrorPage } from '../pages/ErrorPage/ErrorPage';

import { Header } from '../components/Header/Header';
import { Footer } from '../components/Footer/Footer';

function App() {
    return (
        <div className={styles.App}>
            <Header />
            {/* <MainPage /> */}
            {/* <ListPage /> */}
            <CardsPage />
            {/* <ErrorPage /> */}
            <Footer />
        </div>
    );
}

export default App;
