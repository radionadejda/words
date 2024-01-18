import { useState, useEffect } from 'react';
import { Button } from '../Button/Button';
import { Form } from '../Form/Form';
import styles from './Row.module.scss';

export const Row = ({ selectedLanguage, word, isHeading = false }) => {
    const { id, transcription, russian, tags } = word;

    const foreignWord = word[selectedLanguage];

    const [formType, setFormType] = useState(null);

    const handleOpenForm = (type) => {
        setFormType(type);
    };

    useEffect(() => {
        setFormType(null);
    }, [selectedLanguage]);

    return (
        <div className={styles.row_container}>
            {formType !== null ? (
                <Form
                    formType={formType}
                    setFormType={setFormType}
                    selectedLanguage={selectedLanguage}
                    word={word}
                />
            ) : (
                <div className={`${styles.row} ${isHeading ? styles.heading : ''}`}>
                    <h2 className={styles.row_word}>{isHeading ? word.headingTitle : foreignWord}</h2>
                    <div className={styles.row_description}>
                        <div className={styles.row_transcription}>{isHeading ? word.headingTranscription : transcription}</div>
                        <div className={styles.answer}>{isHeading ? word.headingTranslation : russian}</div>
                        <div className={styles.tags}>{isHeading ? word.headingTags : tags}</div>
                    </div>
                    {isHeading ? (
                        <div className={styles.row_buttons}>
                            <Button
                                name="add"
                                customClass={styles.row_button}
                                onClick={() => handleOpenForm('add')}
                            />
                        </div>
                    ) : (
                        <div className={styles.row_buttons}>
                            <Button
                                name="edit"
                                customClass={styles.row_button}
                                onClick={() => handleOpenForm('edit')}
                            />
                            <Button
                                name="remove"
                                customClass={styles.row_button}
                                onClick={() => handleOpenForm('remove')}
                            />
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};
