import '../styles/_ListPage.scss';

import { WordList } from '../components/WordList/WordList.jsx';
import { Button } from '../components/Button/Button.jsx';

import { words } from '../data/data.js';

export function ListPage() {
    return (
        <div className="WordList">
            <div className="row nohover">
                <h2 className="word">слово</h2>
                <div className="description">
                    <div className="text">транскрипция</div>
                    <div className="text">перевод</div>
                    <div className="text">теги</div>
                </div>
                <div className="edit">
                    <Button name="Add" />
                </div>
            </div>
            {words.map((word, id) => (
                <WordList key={id} word={word} />
            ))}
        </div>
    );
}
