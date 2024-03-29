import { Row } from '../../components/Row/Row';
import styles from '../../styles/ListPage.module.scss';

export const ListPage = ({ words, setWords, allWords, setAllWords, selectedLanguage }) => {
    const heading = { headingTitle: 'word', headingTranscription: 'transcription', headingTranslation: 'translation', headingTags: 'tags' };

    return (
        <main className={styles.main}>
            <div className={styles.list}>
                <Row
                    word={heading}
                    isHeading={true}
                    selectedLanguage={selectedLanguage}
                    words={words}
                    setWords={setWords}
                    allWords={allWords}
                    setAllWords={setAllWords}
                />
                {words.map((word, id) => (
                    <Row
                        key={id}
                        word={word}
                        selectedLanguage={selectedLanguage}
                        words={words}
                        setWords={setWords}
                        allWords={allWords}
                        setAllWords={setAllWords}
                    />
                ))}
            </div>
        </main>
    );
};
