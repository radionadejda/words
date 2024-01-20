export const getWords = async () => {
    try {
        const response = await fetch('/api/words');
        if (!response.ok) {
            throw new Error(`Failed to get words. Status: ${response.status}`);
        }
        return response.json();
    } catch (error) {
        console.error('Error getting words:', error);
        throw error;
    }
};
