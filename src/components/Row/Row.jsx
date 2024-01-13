import { useState } from 'react';
import { Button } from '../Button/Button';
import { Form } from '../Form/Form';
import styles from './Row.module.scss';

export const Row = (props) => {
    const { english, transcription, russian, tags } = props.word;
    const isHeading = props.isHeading || false;

    // const [englishValue, setEnglishValue] = useState(english);
    // const [transcriptionValue, setTranscriptionValue] = useState(transcription);
    // const [russianValue, setRussianValue] = useState(russian);
    // const [tagsValue, setTagsValue] = useState(tags);

    const [change, setChange] = useState(null);
    const [showForm, setShowForm] = useState(false);

    const handleWordEdit = (type) => {
        if (change === type && showForm) {
            setShowForm(false);
        } else {
            setChange(type);
            setShowForm(true);
        }
    };

    const handleCloseForm = () => {
        setChange(null);
        setShowForm(false);
    };

    return (
        <div className={styles.row_container}>
            <div className={`${styles.row} ${isHeading ? styles.heading : ''}`}>
                <h2 className={styles.row_word}>{english}</h2>
                <div className={styles.row_description}>
                    <div className={styles.transcription}>{transcription}</div>
                    <div className={styles.answer}>{russian}</div>
                    <div className={styles.tags}>{tags}</div>
                </div>
                {isHeading ? (
                    <div className={styles.row_buttons}>
                        <Button
                            name="add"
                            customClass={styles.row_button}
                            onClick={() => handleWordEdit('add')}
                        />
                    </div>
                ) : (
                    <div className={styles.row_buttons}>
                        <Button
                            name="edit"
                            customClass={styles.row_button}
                            onClick={() => handleWordEdit('edit')}
                        />
                        <Button
                            name="remove"
                            customClass={styles.row_button}
                            onClick={() => handleWordEdit('remove')}
                        />
                    </div>
                )}
            </div>
            {showForm && (
                <Form
                    onClose={handleCloseForm}
                    mode={change}
                />
            )}
        </div>
    );
};
