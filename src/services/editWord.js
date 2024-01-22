import { getWords } from './getWords';

export const editWord = async wordToChange => {
    try {
        console.log('word edited', wordToChange);
    } catch (err) {
        console.error('Error editing word:', err);
    }
};
