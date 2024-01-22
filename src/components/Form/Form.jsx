import { useState, useEffect, useContext } from 'react';
import { WordsAndLanguageContext } from '../../context/WordsAndLanguageContext';
import { addWord, editWord, deleteWord } from '../../services';
import { handleWord } from './handleWordFunction';
import { validateAndSetInputs, generateErrorMessage } from './FormValidationFunctions';
import { handleCancel } from './handleCancelFunction';
import { Button } from '../Button/Button';
import styles from './Form.module.scss';

export const Form = ({ selectedLanguage, word, formType, setFormType }) => {
    const { words, setWords, allWords, setAllWords } = useContext(WordsAndLanguageContext);
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

    const [isButtonDisabled, setIsButtonDisabled] = useState(false);

    const parameters = {
        formType,
        setFormType,
        formData,
        setFormData,
        words,
        setWords,
        allWords,
        setAllWords,
        selectedLanguage,
        setInputValidations,
        setIsButtonDisabled,
        id,
        foreignWord,
        transcription,
        russian,
        tags
    };

    useEffect(() => {
        validateAndSetInputs(parameters);
    }, [formType, formData]);

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
                            placeholder={`add russian translation`}
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
                        onClick={() => handleWord(parameters)}
                    />
                    <Button
                        name="cancel + close"
                        customClass={styles.row_button}
                        onClick={() => handleCancel(parameters)}
                    />
                </div>
            </div>
            {isButtonDisabled && <p className={styles.error_message}>{generateErrorMessage(inputValidations, formData)}</p>}
        </div>
    );
};
