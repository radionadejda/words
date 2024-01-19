import React, { createContext, useState, useEffect } from 'react';
import { GetWords } from '../services/Get';

export const WordsAndLanguageContext = createContext();

export const WordsAndLanguageContextComponent = ({ children }) => {
    const storedLanguage = localStorage.getItem('language');
    const defaultLanguage = storedLanguage || 'english';

    const [words, setWords] = useState([]);
    const [language, setLanguage] = useState(defaultLanguage);

    const getWordsFromApi = async () => {
        try {
            const newWords = await GetWords();
            const filteredWords = newWords.filter((word) => word[language]);
            setWords(filteredWords);
            console.log('im words in getwordsfromapi');
            console.log(words);
            console.log('language in getwordsfromapi' + language);
            console.log('defaultLanguage getwordsfromapi' + defaultLanguage);
        } catch (error) {
            console.error('Error fetching words:', error);
        }
    };

    useEffect(() => {
        getWordsFromApi();
        console.log('language on mount' + language);
        console.log('language on mount' + defaultLanguage);
    }, []);

    const value = { words, setWords, language, setLanguage };

    return <WordsAndLanguageContext.Provider value={value}>{children}</WordsAndLanguageContext.Provider>;
};
