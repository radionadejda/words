import { addWord, editWord, deleteWord } from '../../services';
import { validateAndSetInputs } from './FormValidationFunctions';
import { handleCancel } from './handleCancelFunction';

export const handleWord = parameters => {
    const { formType, formData, setWords, allWords, setAllWords, selectedLanguage, id } = parameters;
    if (validateAndSetInputs(parameters)) {
        const lastIdNumber = parseInt(allWords[allWords.length - 1].id, 10);
        const newIdNumber = id ? parseInt(id, 10) : lastIdNumber + 1;
        const newIdString = String(newIdNumber);

        const wordObject = {
            id: id || newIdString,
            [selectedLanguage]: formData.word.toLowerCase(),
            transcription: formData.transcription,
            russian: formData.translation,
            tags: formData.tags,
            tags_json: '["' + formData.tags + '"]'
        };

        switch (formType) {
            case 'add':
                setAllWords(prevWords => [...prevWords, wordObject]);
                setWords(prevWords => [...prevWords, wordObject]);
                addWord(wordObject);
                break;
            case 'edit':
                setWords(prevWords => prevWords.map(word => (word.id === id ? { ...wordObject } : word)));
                setAllWords(prevWords => prevWords.map(word => (word.id === id ? { ...wordObject } : word)));
                editWord(wordObject);
                break;
            case 'remove':
                setWords(prevWords => prevWords.filter(word => word.id !== id));
                setAllWords(prevWords => prevWords.filter(word => word.id !== id));
                deleteWord(id);
                break;
            default:
                break;
        }
        handleCancel(parameters);
    } else {
        console.error('Please fill in all required fields properly.');
    }
};
