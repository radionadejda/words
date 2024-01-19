export const GetAllWords = async () => {
    try {
        const res = await fetch('/api/words');
        return res.json();
    } catch (e) {
        console.error(e);
    }
};
