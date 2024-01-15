import { useState, useEffect } from 'react';
import { Button } from '../Button/Button';
import styles from './Row.module.scss';

export const Row = ({ selectedLanguage, word, isHeading = false }) => {
    const { id, transcription, russian, tags } = word;
    const foreignWord = word[selectedLanguage];

    const [action, setAction] = useState(null);

    const [formData, setFormData] = useState({
        word: foreignWord || '',
        transcription: transcription || '',
        translation: russian || '',
        tags: tags || ''
    });

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

    useEffect(() => {
        handleCancel();
    }, [selectedLanguage]);

    const handleCancel = () => {
        setFormData({
            word: foreignWord || '',
            transcription: transcription || '',
            translation: russian || '',
            tags: tags || ''
        });
        setAction(null);
    };

    const validateInputs = () => {
        if (action === 'remove') {
            setIsButtonDisabled(false);
            return true;
        }

        setInputValidations({
            isWordValid: formData.word.trim() !== '',
            isTranscriptionValid: formData.transcription.trim() !== '',
            isTranslationValid: formData.translation.trim() !== '',
            isTagsValid: formData.tags.trim() !== ''
        });
        const areInputsValid = action === 'remove' || (Object.values(inputValidations).every(Boolean) && Object.values(formData).every((value) => value.trim() !== ''));
        setIsButtonDisabled(!areInputsValid);
        return areInputsValid;
    };

    useEffect(() => {
        validateInputs();
    }, [action, formData]);

    const handleWord = () => {
        if (validateInputs()) {
            const wordObject = {
                id: id || 'noid', // generate a unique ID?
                selectedLanguage: formData.word,
                transcription: formData.transcription,
                russian: formData.translation,
                tags: formData.tags,
                tags_json: '["' + formData.tags + '"]'
            };

            switch (action) {
                case 'add':
                    console.log('word added', wordObject);
                    break;
                case 'edit':
                    console.log('word edited', wordObject);
                    break;
                case 'remove':
                    console.log(`word id ${id} ${foreignWord} removed`);
                    break;
                default:
                    break;
            }
            handleCancel();
        } else {
            console.error('Please fill in all required fields.');
        }
    };

    const renderFormFields = () => {
        const isActionAdd = action === 'add';
        const isActionRemove = action === 'remove';

        return (
            <div className={styles.row_container}>
                {isActionAdd && (
                    <div className={`${styles.row} ${styles.heading}`}>
                        <h2 className={styles.row_word}>{word.headingTitle}</h2>
                        <div className={styles.row_description}>
                            <div className={styles.transcription}>{word.headingTranscription}</div>
                            <div className={styles.translation}>{word.headingTranslation}</div>
                            <div className={styles.tags}>{word.headingTags}</div>
                        </div>
                    </div>
                )}
                <div className={styles.row_form}>
                    {isActionRemove ? (
                        <h2 className={styles.row_word}>{foreignWord}</h2>
                    ) : (
                        <input
                            type="text"
                            placeholder="add word"
                            required
                            name="wordInput"
                            value={formData.word}
                            onChange={(e) => setFormData({ ...formData, word: e.target.value })}
                            className={`${styles.row_word} ${styles.row_input} ${inputValidations.isWordValid ? '' : styles.error}`}
                        />
                    )}
                    {isActionRemove ? (
                        <div className={styles.row_remove}>are you sure, this can't be undone</div>
                    ) : (
                        <div className={styles.row_description}>
                            <input
                                type="text"
                                placeholder={`add transcription`}
                                required
                                name="transcriptionInput"
                                value={formData.transcription}
                                onChange={(e) => setFormData({ ...formData, transcription: e.target.value })}
                                className={`${styles.transcription} ${styles.row_input} ${inputValidations.isTranscriptionValid ? '' : styles.error}`}
                            />
                            <input
                                type="text"
                                placeholder={`add translation`}
                                required
                                name="translationInput"
                                value={formData.translation}
                                onChange={(e) => setFormData({ ...formData, translation: e.target.value })}
                                className={`${styles.translation} ${styles.row_input} ${inputValidations.isTranslationValid ? '' : styles.error}`}
                            />
                            <input
                                type="text"
                                placeholder={`add tags`}
                                required
                                name="tagsInput"
                                value={formData.tags}
                                onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                                className={`${styles.tags} ${styles.row_input} ${inputValidations.isTagsValid ? '' : styles.error}`}
                            />
                        </div>
                    )}
                    <div className={styles.row_buttons}>
                        <Button
                            name={isActionRemove ? 'remove' : isActionAdd ? 'add' : 'save edit'}
                            customClass={`${styles.row_button} ${isButtonDisabled ? styles.error : ''}`}
                            disabled={isButtonDisabled}
                            onClick={handleWord}
                        />
                        <Button
                            name="cancel + close"
                            customClass={styles.row_button}
                            onClick={handleCancel}
                        />
                    </div>
                </div>
                {isButtonDisabled && <p className={styles.error_message}>Please fill in all required fields.</p>}
            </div>
        );
    };

    const renderContent = () => {
        if (action !== null) {
            return renderFormFields();
        }

        return (
            <div className={`${styles.row} ${isHeading ? styles.heading : ''}`}>
                <h2 className={styles.row_word}>{isHeading ? word.headingTitle : foreignWord}</h2>
                <div className={styles.row_description}>
                    <div className={styles.transcription}>{isHeading ? word.headingTranscription : transcription}</div>
                    <div className={styles.translation}>{isHeading ? word.headingTranslation : russian}</div>
                    <div className={styles.tags}>{isHeading ? word.headingTags : tags}</div>
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
    };

    return <div className={styles.row_container}>{renderContent()}</div>;
};
