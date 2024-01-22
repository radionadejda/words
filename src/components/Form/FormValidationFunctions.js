export const isWordUnique = (word, words, selectedLanguage) => {
    return !words.some(existingWord => existingWord[selectedLanguage].trim().toLowerCase() === word.trim().toLowerCase());
};

export const isTranslationInRussian = translation => {
    return /^[а-яА-ЯёЁ\s,.:;"'-/!?]+$/u.test(translation.trim());
};

export const isTranscriptionValidFormat = transcription => {
    return /^\[(?![а-яА-ЯёЁ])[^\[\]]+\]$/u.test(transcription.trim());
};

export const validateAndSetInputs = parameters => {
    const { formType, formData, words, selectedLanguage, setInputValidations, setIsButtonDisabled } = parameters;
    if (formType === 'remove') {
        setIsButtonDisabled(false);
        return true;
    }

    let isWordValid = true;
    if (formType === 'add') {
        isWordValid = formData.word.trim() !== '' && isWordUnique(formData.word, words, selectedLanguage);
    }
    const isTranscriptionValid = formData.transcription.trim() !== '' && isTranscriptionValidFormat(formData.transcription);
    const isTranslationValid = formData.translation.trim() !== '' && isTranslationInRussian(formData.translation);
    const isTagsValid = formData.tags.trim() !== '';

    const validations = {
        isWordValid,
        isTranscriptionValid,
        isTranslationValid,
        isTagsValid
    };

    setInputValidations(validations);

    const areInputsValid = Object.values(validations).every(Boolean);
    setIsButtonDisabled(!areInputsValid);

    return areInputsValid;
};

export const generateErrorMessage = (inputValidations, formData) => {
    const invalidFields = Object.entries(inputValidations).filter(([field, isValid]) => !isValid).map(([field]) => field);

    if (invalidFields.length === 1) {
        const invalidField = invalidFields[0];
        switch (invalidField) {
            case 'isWordValid':
                if (formData.word.trim() === '') {
                    return 'Word cannot be empty. Please enter a word.';
                }
                return formType === 'add' ? 'Word must be unique. Please choose a different word.' : '';
            case 'isTranscriptionValid':
                if (formData.transcription.trim() === '') {
                    return 'Please fill in the transcription field.';
                }
                return 'Transcription must be in square brackets [] and contain no russian letters';
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
        return 'Please fill in all required fields properly.';
    }

    return 'Please fill in all required fields properly.';
};
