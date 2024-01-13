import { useState } from 'react';
import { Button } from '../Button/Button';
import styles from './Row.module.scss';

export const Row = (props) => {
    const { english, transcription, russian, tags } = props.word;
    const isHeading = props.isHeading || false;

    const [action, setAction] = useState(null);

    const handleFormSwitch = (newAction) => {
        setAction(newAction);
    };

    const handleWordEdit = (type) => {
        console.log(type);
    };

    const renderContent = () => {
        switch (action) {
            case 'add':
                return (
                    <div>
                        <div className={`${styles.row} ${styles.heading}`}>
                            <h2 className={styles.row_word}>{english}</h2>
                            <div className={styles.row_description}>
                                <div className={styles.transcription}>{transcription}</div>
                                <div className={styles.answer}>{russian}</div>
                                <div className={styles.tags}>{tags}</div>
                            </div>
                            <div className={styles.row_buttons}></div>
                        </div>
                        <div className={styles.row_form}>
                            <h2 className={styles.row_word}>ADD WORD</h2>
                            <div className={styles.row_description}>
                                <div className={styles.transcription}>add transcription</div>
                                <div className={styles.answer}>add translation</div>
                                <div className={styles.tags}>add tags</div>
                            </div>
                            <div className={styles.row_buttons}>
                                <Button
                                    name="add"
                                    customClass={styles.row_button}
                                    onClick={() => handleWordEdit('add')}
                                />
                                <Button
                                    name="cancel + close"
                                    customClass={styles.row_button}
                                    onClick={() => setAction(null)}
                                />
                            </div>
                        </div>
                    </div>
                );
            case 'edit':
                return (
                    <div className={styles.row_form}>
                        <h2 className={styles.row_word}>edit {english}</h2>
                        <div className={styles.row_description}>
                            <div className={styles.transcription}> edit {transcription}</div>
                            <div className={styles.answer}>edit {russian}</div>
                            <div className={styles.tags}>edit {tags}</div>
                        </div>
                        <div className={styles.row_buttons}>
                            <Button
                                name="save edit"
                                customClass={styles.row_button}
                                onClick={() => handleWordEdit('edit')}
                            />
                            <Button
                                name="cancel + close"
                                customClass={styles.row_button}
                                onClick={() => setAction(null)}
                            />
                        </div>
                    </div>
                );
            case 'remove':
                return (
                    <div className={styles.row_form}>
                        <h2 className={styles.row_word}>{english}</h2>
                        <div className={styles.row_description}>Are u sure u want to remove this word?</div>
                        <div className={styles.row_buttons}>
                            <Button
                                name="remove word"
                                customClass={styles.row_button}
                                onClick={() => handleWordEdit('remove')}
                            />
                            <Button
                                name="cancel + close"
                                customClass={styles.row_button}
                                onClick={() => setAction(null)}
                            />
                        </div>
                    </div>
                );
            default:
                return (
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
                                    onClick={() => handleFormSwitch('add')}
                                />
                            </div>
                        ) : (
                            <div className={styles.row_buttons}>
                                <Button
                                    name="edit"
                                    customClass={styles.row_button}
                                    onClick={() => handleFormSwitch('edit')}
                                />
                                <Button
                                    name="remove"
                                    customClass={styles.row_button}
                                    onClick={() => handleFormSwitch('remove')}
                                />
                            </div>
                        )}
                    </div>
                );
        }
    };

    return <div className={styles.row_container}>{renderContent()}</div>;
};
