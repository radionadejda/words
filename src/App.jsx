import { useState } from 'react';
// Что должно быть в результате (через 8 недель):
// - список всех существующих слов. У каждого слова есть основное значение, транскрипция, перевод, тема. У каждого слова должна быть возможность его удаления и редактирования.
// Также должна быть возможность добавления слов; *сделать добавление с любого места в приложении (вроме редактирования и удаления слова)
// - карточка слова, у которой есть основное значение, транскрипция, перевод, тема; *неплохо сделать не только англо-русский. так, чтобы при добавлении указывать язык и записывать его либо в новое слово, либо если есть совпадение в массиве - в новое поле к имеющемуся.
// - главная страница, где отображаются списки слов и карточек.
// Три основных страницы, главная, с таблицей и с игрой(это уже финальный вариант). Вы же будете делать все постепенно, сначала структуру, затем что-то еще и далее.

//будет главная, на ней пока только англ, и выбор переход к карточкам или к таблице. когда-нибудь мб сделать выбор разных языков, мб карточки и таблица будут на одной странице и сделать по странице для каждого языка. совсем эпик было бы сделать чтобы страница с тренингом была одна и отрисовывалась по массиву в зависимости от того, что выбрано на главной (или в переключателе в хедере). как сделать передачу вбранного с одной страницы на другую?

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
