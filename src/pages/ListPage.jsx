import styles from '../styles/ListPage.module.scss';
import stylesRow from '../components/Row/Row.module.scss';

import { Row } from '../components/Row/Row.jsx';
import { Button } from '../components/Button/Button.jsx';

import words from '../data/data.json';

// export function ListPage() {
//     return (
//         <div className={styles.WordList}>
//             <div className={`${stylesRow.row} ${stylesRow.nohover}`}>
//                 <h2 className={stylesRow.word}>слово</h2>
//                 <div className={stylesRow.description}>
//                     <div className={stylesRow.text}>транскрипция</div>
//                     <div className={stylesRow.text}>перевод</div>
//                     <div className={stylesRow.text}>теги</div>
//                 </div>
//                 <div className={stylesRow.edit}>
//                     <Button name="Add" />
//                 </div>
//             </div>
//             {words.map((word, id) => (
//                 <Row key={id} word={word} />
//             ))}
//         </div>
//     );
// }

export function ListPage() {
    const heading = { id: 'heading', english: 'слово', transcription: 'транскрипция', russian: 'перевод', tags: 'теги' };

    return (
        <div className={styles.WordList}>
            <Row word={heading} isHeading={true} />
            {words.map((word, id) => (
                <Row key={id} word={word} />
            ))}
        </div>
    );
}
