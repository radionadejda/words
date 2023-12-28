import { useState, useEffect } from 'react';

export const useWordById = (words, soughtId) => {
    const [currentWord, setCurrentWord] = useState({});

    useEffect(
        () => {
            const soughtWord = words.find(word => word.id === soughtId) || {};
            setCurrentWord(soughtWord);
        },
        [words, soughtId]
    );

    return currentWord;
};
