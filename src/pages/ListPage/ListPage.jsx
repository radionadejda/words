import { Row } from '../../components/Row/Row';
import words from '../../data/data.json';
import styles from '../../styles/ListPage.module.scss';

export function ListPage() {
    const heading = { english: 'word', transcription: 'transcription', russian: 'translation', tags: 'tags' };

    return (
        <div className={styles.WordList}>
            <Row word={heading} isHeading={true} />
            {words.map((word, id) => (
                <Row key={id} word={word} />
            ))}
        </div>
    );
}
