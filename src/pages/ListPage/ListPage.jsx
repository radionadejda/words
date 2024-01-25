import { observer, inject } from 'mobx-react';
import { Row } from '../../components/Row/Row';
import styles from '../../styles/ListPage.module.scss';

export const ListPage = inject('wordsStore')(
    observer(({ wordsStore, noWords }) => {
        const heading = { headingTitle: 'word', headingTranscription: 'transcription', headingTranslation: 'translation', headingTags: 'tags' };

        return (
            <main className={styles.main}>
                {noWords && <div className={styles.message}>we don't have words in {wordsStore.language}, but you can add them here</div>}
                <div className={styles.list}>
                    <Row
                        word={heading}
                        isHeading={true}
                        selectedLanguage={wordsStore.language}
                    />
                    {wordsStore.filteredWords?.map((word, id) => (
                        <Row
                            key={id}
                            word={word}
                            selectedLanguage={wordsStore.language}
                        />
                    ))}
                </div>
            </main>
        );
    })
);
