import { useState } from 'react';
import { Button } from '../Button/Button';
import styles from './Row.module.scss';

export function Row(props) {
    const { english, transcription, russian, tags } = props.word;
    const isHeading = props.isHeading || false;

    const [englishValue, setEnglishValue] = useState(english);
    const [transcriptionValue, setTranscriptionValue] = useState(transcription);
    const [russianValue, setRussianValue] = useState(russian);
    const [tagsValue, setTagsValue] = useState(tags);

    const [change, setChange] = useState(null);
    const handleChange = (type) => {
        if (change === type) {
            setChange((change) => (change = null));
        } else {
            setChange((change) => (change = type));
        }
    };

    const chooseSwitch = (change) => {
        let template;
        switch (change) {
            case 'add':
                template = `${change} word`;
                return template;
            case 'edit':
                template = `${change} word`;
                return template;
            case 'remove':
                template = `${change} word`;
                return template;
            default:
                console.log(change);
                break;
        }
    };

    return (
        <div className={styles.container}>
            <div className={`${styles.row} ${isHeading ? styles.heading : ''}`}>
                <h2 className={styles.word}>{englishValue}</h2>
                <div className={styles.description}>
                    <div className={styles.transcription}>{transcriptionValue}</div>
                    <div className={styles.answer}>{russianValue}</div>
                    <div className={styles.tags}>{tagsValue}</div>
                </div>
                {isHeading ? (
                    <div className={styles.edit}>
                        <Button
                            name="add"
                            onClick={() => handleChange('add')}
                        />
                    </div>
                ) : (
                    <div className={styles.edit}>
                        <Button
                            name="edit"
                            onClick={() => handleChange('edit')}
                        />
                        <Button
                            name="remove"
                            onClick={() => handleChange('remove')}
                        />
                    </div>
                )}
            </div>
            <div className={`${styles.change} ${change !== null ? '' : styles.hide}`}>{chooseSwitch(change)}</div>
        </div>
    );
}
