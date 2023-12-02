import { Row } from '../../components/Row/Row';
import styles from '../../styles/ListPage.module.scss';

export const ListPage = ({ stateWords }) => {
    const heading = { english: 'word', transcription: 'transcription', russian: 'translation', tags: 'tags' };

    return (
        <main className={styles.main}>
            <div className={styles.list}>
                <Row
                    word={heading}
                    isHeading={true}
                />
                {stateWords.words.map((word, id) => (
                    <Row
                        key={id}
                        word={word}
                    />
                ))}
            </div>
        </main>
    );
};
