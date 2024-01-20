import { getWords } from './getWords';

export const addWord = async newWord => {
    try {
        const response = await fetch('/api/words/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newWord)
        });

        if (!response.ok) {
            throw new Error(`Failed to add word. Status: ${response.status}`);
        }
        await getWords();
    } catch (error) {
        console.error('Error adding word:', error);
        throw error;
    }
};
