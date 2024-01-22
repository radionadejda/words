export const addWord = async newWord => {
    try {
        console.log('word added', newWord);
    } catch (error) {
        console.error('Error adding word:', error);
        throw error;
    }
};
