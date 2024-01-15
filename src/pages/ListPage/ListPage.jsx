import { Row } from '../../components/Row/Row';
import styles from '../../styles/ListPage.module.scss';

export const ListPage = ({ stateWords, selectedLanguage }) => {
    const heading = { headingTitle: 'word', headingTranscription: 'transcription', headingTranslation: 'translation', headingTags: 'tags' };

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
                        selectedLanguage={selectedLanguage}
                    />
                ))}
            </div>
        </main>
    );
};
