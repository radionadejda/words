import { getWords } from './getWords';

export const deleteWord = async id => {
    try {
        await fetch(`/api/words/${id}/delete`, {
            method: 'POST'
        });
        await getWords();
    } catch (err) {
        setError(err.message || 'error deleting');
    }
};
