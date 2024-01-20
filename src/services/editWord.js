import { getWords } from './getWords';

export const editWord = async wordToChange => {
    try {
        await fetch(`/api/words/${wordToChange.id}/update`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(wordToChange)
        });
        await getWords();
    } catch (err) {
        console.error('Error editing word:', err);
    }
};
