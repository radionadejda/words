import { addWord, editWord, deleteWord } from '../../services';
import { validateAndSetInputs } from './FormValidationFunctions';
import { handleCancel } from './handleCancelFunction';

export const handleWord = async parameters => {
    const { formType, formData, wordsStore, id } = parameters;
    const selectedLanguage = wordsStore.language;
    if (validateAndSetInputs(parameters)) {
        const lastIdNumber = parseInt(wordsStore.words[wordsStore.words.length - 1].id, 10);
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
                await addWord(wordObject);
                break;
            case 'edit':
                await editWord(wordObject);
                break;
            case 'remove':
                await deleteWord(id);
                break;
            default:
                break;
        }
        handleCancel(parameters);
        await wordsStore.getWordsFromApi();
    } else {
        console.error('Please fill in all required fields properly.');
    }
};
