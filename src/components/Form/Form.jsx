import { useState, useEffect, useContext } from 'react';
import { WordsAndLanguageContext } from '../../context/WordsAndLanguageContext';
import { Button } from '../Button/Button';
import styles from './Form.module.scss';

export const Form = ({ selectedLanguage, word, formType, setFormType }) => {
    const { words, setWords } = useContext(WordsAndLanguageContext);
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
        if (formType === 'remove') {
            setIsButtonDisabled(false);
            return true;
        }

        let isWordUnique = true;
        if (formType === 'add') {
            isWordUnique = !words.some((word) => word[selectedLanguage].trim().toLowerCase() === formData.word.trim().toLowerCase());
        }
        const isTranslationInRussian = /^[а-яА-ЯёЁ\s,.:;"'-/!?]+$/u.test(formData.translation.trim());

        const validations = {
            isWordValid: formData.word.trim() !== '' && isWordUnique,
            isTranscriptionValid: formData.transcription.trim() !== '',
            isTranslationValid: formData.translation.trim() !== '' && isTranslationInRussian,
            isTagsValid: formData.tags.trim() !== ''
        };

        setInputValidations(validations);

        const areInputsValid = Object.values(validations).every(Boolean);
        setIsButtonDisabled(!areInputsValid);

        return areInputsValid;
    };

    const generateErrorMessage = () => {
        const invalidFields = Object.entries(inputValidations)
            .filter(([field, isValid]) => !isValid)
            .map(([field]) => field);

        if (invalidFields.length === 1) {
            const invalidField = invalidFields[0];
            switch (invalidField) {
                case 'isWordValid':
                    if (formData.word.trim() === '') {
                        return 'Word cannot be empty. Please enter a word.';
                    }
                    return 'Word must be unique. Please choose a different word.';
                case 'isTranscriptionValid':
                    return 'Please fill in the transcription field.';
                case 'isTranslationValid':
                    if (formData.translation.trim() === '') {
                        return 'Translation cannot be empty. Please enter a translation.';
                    } else {
                        return 'Translation must be in Russian.';
                    }
                case 'isTagsValid':
                    return 'Please fill in the tags field.';
                default:
                    return '';
            }
        }

        if (invalidFields.includes('isWordValid')) {
            if (formData.word.trim() === '') {
                return 'Word cannot be empty. Please enter a word.';
            }
            return 'Word must be unique. Please choose a different word.';
        }

        if (invalidFields.length > 1) {
            return 'Please fill in all required fields.';
        }

        return 'Please fill in all required fields.';
    };

    useEffect(() => {
        validateAndSetInputs();
    }, [formType, formData]);

    const handleWord = () => {
        if (validateAndSetInputs()) {
            const lastIdNumber = words.length > 0 ? parseInt(words[words.length - 1].id, 10) : 0;
            const newIdNumber = id ? parseInt(id, 10) : lastIdNumber + 1;
            const newIdString = String(newIdNumber);

            const wordObject = {
                id: newIdString,
                [selectedLanguage]: formData.word.toLowerCase(),
                transcription: formData.transcription,
                russian: formData.translation,
                tags: formData.tags,
                tags_json: '["' + formData.tags + '"]'
            };

            switch (formType) {
                case 'add':
                    setWords((prevWords) => [...prevWords, wordObject]);
                    console.log('word added', wordObject);
                    console.log(words);
                    break;
                case 'edit':
                    setWords((prevWords) => prevWords.map((word) => (word.id === id ? { ...wordObject } : word)));
                    console.log('word edited', wordObject);
                    console.log(words);
                    break;
                case 'remove':
                    setWords((prevWords) => prevWords.filter((word) => word.id !== id));
                    console.log(`word id ${id} ${foreignWord} removed`);
                    break;
                default:
                    break;
            }
            handleCancel();
        } else {
            console.error('Please fill in all required fields properly.');
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
                        onClick={handleWord}
                    />
                    <Button
                        name="cancel + close"
                        customClass={styles.row_button}
                        onClick={handleCancel}
                    />
                </div>
            </div>
            {isButtonDisabled && <p className={styles.error_message}>{generateErrorMessage()}</p>}
        </div>
    );
};

const word = { id: '15836', english: 'Morning', EnglishTranscription: '[ ˈmɔːrnɪŋ ]', spanish: 'mañana', SpanishTranscription: '[ maˈɲaɲa ]', german: 'Morgen', GermanTranscription: '[ ˈmɔːɡ(ə)n ]', russian: 'утро', RussianTranscription: '[ utro ]', french: 'matin', FrenchTranscription: '[ ma.tɛ̃ ]', tags: '', tags_json: '[""]' };
