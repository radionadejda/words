import { getWords } from './getWords';

export const deleteWord = async id => {
    try {
        console.log(`word id ${id} removed`);
    } catch (err) {
        setError(err.message || 'error deleting');
    }
};
