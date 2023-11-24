import styles from './styles/App.module.scss';

// пока не разобралась с роутингом, переключаем страницы за- и рас- комментированием
import { MainPage } from './pages/MainPage';
import { ListPage } from './pages/ListPage';
import { CardPage } from './pages/CardPage';
import { NotFoundPage } from './pages/NotFoundPage';

import { Header } from './components/Header/Header';
import { Footer } from './components/Footer/Footer';

function App() {
    return (
        <div className={styles.App}>
            <Header />
            {/* <MainPage /> */}
            {/* <ListPage /> */}
            <CardPage />
            {/* <NotFoundPage /> */}
            <Footer />
        </div>
    );
}

export default App;
