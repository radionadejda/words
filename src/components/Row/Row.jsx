import { useState } from 'react';
import { Button } from '../Button/Button';
import styles from './Row.module.scss';

export const Row = ({ word, isHeading = false }) => {
    const { english, transcription, russian, tags } = word;

    const [action, setAction] = useState(null);

    const [newWord, setNewWord] = useState(english || '');
    const [newTranscription, setNewTranscription] = useState(transcription || '');
    const [newTranslation, setNewTranslation] = useState(russian || '');
    const [newTags, setNewTags] = useState(tags || '');

    const [inputValidations, setInputValidations] = useState({
        isWordValid: true,
        isTranscriptionValid: true,
        isTranslationValid: true,
        isTagsValid: true
    });

    const [isButtonDisabled, setIsButtonDisabled] = useState(false);

    const handleFormSwitch = (newAction) => {
        setAction(newAction);
    };

    const handleCancel = () => {
        setNewWord(english || '');
        setNewTranscription(transcription || '');
        setNewTranslation(russian || '');
        setNewTags(tags || '');
        setAction(null);
    };

    const validateInputs = () => {
        setInputValidations({
            isWordValid: newWord.trim() !== '',
            isTranscriptionValid: newTranscription.trim() !== '',
            isTranslationValid: newTranslation.trim() !== '',
            isTagsValid: newTags.trim() !== ''
        });

        const areInputsValid = Object.values(inputValidations).every(Boolean);
        setIsButtonDisabled(!areInputsValid);

        return areInputsValid;
    };

    const removeWord = () => {
        console.log('word removed');
    };

    const handleAddEdit = (action) => {
        if (validateInputs()) {
            const wordObject = {
                id: '14836', // how to generate a unique ID?
                english: newWord,
                transcription: newTranscription,
                russian: newTranslation,
                tags: newTags,
                tags_json: '["' + newTags + '"]'
            };

            switch (action) {
                case 'add':
                    console.log('word added', wordObject);
                    break;
                case 'edit':
                    console.log('word edited', wordObject);
                    break;
                default:
                    break;
            }
        } else {
            console.error('Please fill in all required fields.');
        }
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
                            <input
                                type="text"
                                placeholder="ADD WORD"
                                required
                                name="wordInput"
                                value={newWord}
                                onChange={(e) => setNewWord(e.target.value)}
                                className={`${styles.row_word} ${styles.row_input}`}></input>
                            <div className={styles.row_description}>
                                <input
                                    type="text"
                                    placeholder="add transcription"
                                    required
                                    name="transcriptionInput"
                                    value={newTranscription}
                                    onChange={(e) => setNewTranscription(e.target.value)}
                                    className={`${styles.transcription} ${styles.row_input}`}></input>
                                <input
                                    type="text"
                                    placeholder="add translation"
                                    required
                                    name="translationInput"
                                    value={newTranslation}
                                    onChange={(e) => setNewTranslation(e.target.value)}
                                    className={`${styles.translation} ${styles.row_input}`}></input>
                                <input
                                    type="text"
                                    placeholder="add tags"
                                    required
                                    name="tagsInput"
                                    value={newTags}
                                    onChange={(e) => setNewTags(e.target.value)}
                                    className={`${styles.tags} ${styles.row_input}`}></input>
                            </div>
                            <div className={styles.row_buttons}>
                                <Button
                                    type="submit"
                                    name="add"
                                    customClass={styles.row_button}
                                    disabled={isButtonDisabled}
                                    onClick={() => {
                                        handleAddEdit();
                                    }}
                                />
                                <Button
                                    name="cancel + close"
                                    customClass={styles.row_button}
                                    onClick={handleCancel}
                                />
                            </div>
                        </div>
                    </div>
                );
            case 'edit':
                return (
                    <div className={styles.row_form}>
                        <input
                            type="text"
                            placeholder={english ? english : 'add word'}
                            required
                            name="wordInput"
                            value={newWord}
                            onChange={(e) => setNewWord(e.target.value)}
                            className={`${styles.row_word} ${styles.row_input}`}></input>
                        <div className={styles.row_description}>
                            <input
                                type="text"
                                placeholder={transcription ? transcription : 'add transcription'}
                                required
                                name="transcriptionInput"
                                value={newTranscription}
                                onChange={(e) => setNewTranscription(e.target.value)}
                                className={`${styles.transcription} ${styles.row_input}`}></input>
                            <input
                                type="text"
                                placeholder={russian ? russian : 'add translation'}
                                required
                                name="translationInput"
                                value={newTranslation}
                                onChange={(e) => setNewTranslation(e.target.value)}
                                className={`${styles.translation} ${styles.row_input}`}></input>
                            <input
                                type="text"
                                placeholder={tags ? tags : 'add tags'}
                                required
                                name="tagsInput"
                                value={newTags}
                                onChange={(e) => setNewTags(e.target.value)}
                                className={`${styles.tags} ${styles.row_input}`}></input>
                        </div>
                        <div className={styles.row_buttons}>
                            <Button
                                name="save edit"
                                customClass={styles.row_button}
                                disabled={isButtonDisabled}
                                onClick={() => {
                                    handleAddEdit();
                                }}
                            />
                            <Button
                                name="cancel + close"
                                customClass={styles.row_button}
                                onClick={handleCancel}
                            />
                        </div>
                    </div>
                );
            case 'remove':
                return (
                    <div className={styles.row_form}>
                        <h2 className={styles.row_word}>{english}</h2>
                        <div className={styles.row_message}>Are you sure you want to remove this word?</div>
                        <div className={styles.row_buttons}>
                            <Button
                                name="remove word"
                                customClass={styles.row_button}
                                onClick={() => {
                                    removeWord();
                                }}
                            />
                            <Button
                                name="cancel + close"
                                customClass={styles.row_button}
                                onClick={handleCancel}
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
