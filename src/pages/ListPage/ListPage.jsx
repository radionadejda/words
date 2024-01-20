import { useContext } from 'react';
import { WordsAndLanguageContext } from '../../context/WordsAndLanguageContext';
import { Row } from '../../components/Row/Row';
import styles from '../../styles/ListPage.module.scss';

export const ListPage = ({ noWords }) => {
    const { words, language } = useContext(WordsAndLanguageContext);
    const heading = { headingTitle: 'word', headingTranscription: 'transcription', headingTranslation: 'translation', headingTags: 'tags' };

    return (
        <main className={styles.main}>
            {noWords && <div className={styles.message}>we don't have words in {language}, but you can add them here</div>}
            <div className={styles.list}>
                <Row
                    word={heading}
                    isHeading={true}
                    selectedLanguage={language}
                />
                {words?.map((word, id) => (
                    <Row
                        key={id}
                        word={word}
                        selectedLanguage={language}
                    />
                ))}
            </div>
        </main>
    );
};
