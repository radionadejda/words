import { useState, useEffect } from 'react';
import { Button } from '../Button/Button';
import styles from './Form.module.scss';

export const Form = ({ selectedLanguage, word, formType, setFormType }) => {
    const { id, transcription, russian, tags } = word;
    const foreignWord = word[selectedLanguage];

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

    const [isButtonDisabled, setIsButtonDisabled] = useState(false); //send to form

    const handleCancel = () => {
        setFormData({
            word: foreignWord || '',
            transcription: transcription || '',
            translation: russian || '',
            tags: tags || ''
        });
        setFormType(null);
    };

    const validateAndSetInputs = () => {
        const validations = {
            isWordValid: formData.word.trim() !== '',
            isTranscriptionValid: formData.transcription.trim() !== '',
            isTranslationValid: formData.translation.trim() !== '',
            isTagsValid: formData.tags.trim() !== ''
        };

        setInputValidations(validations);

        const areInputsValid = formType === 'remove' || Object.values(validations).every(Boolean);
        setIsButtonDisabled(!areInputsValid);

        return areInputsValid;
    };

    useEffect(() => {
        validateAndSetInputs();
    }, [formType, formData]);

    const handleWord = () => {
        if (validateAndSetInputs()) {
            const wordObject = {
                id: id || 'noid', // generate an ID++ from words.length
                [selectedLanguage]: formData.word,
                transcription: formData.transcription,
                russian: formData.translation,
                tags: formData.tags,
                tags_json: '["' + formData.tags + '"]'
            };

            switch (formType) {
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

    return (
        <div className={styles.form_container}>
            {formType === 'add' && (
                <div className={`${styles.row} ${styles.heading}`}>
                    <h2 className={styles.row_word}>{word.headingTitle}</h2>
                    <div className={styles.row_description}>
                        <div className={styles.row_transcription}>{word.headingTranscription}</div>
                        <div className={styles.row_translation}>{word.headingTranslation}</div>
                        <div className={styles.row_tags}>{word.headingTags}</div>
                    </div>
                </div>
            )}
            <div className={styles.row_form}>
                {formType === 'remove' ? (
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
                {formType === 'remove' ? (
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
                            className={`${styles.row_transcription} ${styles.row_input} ${inputValidations.isTranscriptionValid ? '' : styles.error}`}
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
                        name={formType === 'remove' ? 'remove' : formType === 'add' ? 'add' : 'save edit'}
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
