import React, { createContext, useState, useEffect } from 'react';
import { GetWords } from '../services/Get';
// import data from '../data/words.json'; //remove to use API

export const WordsAndLanguageContext = createContext();

export const WordsAndLanguageContextComponent = ({ children }) => {
    const storedLanguage = localStorage.getItem('language');
    const defaultLanguage = storedLanguage || 'english';

    // const [words, setWords] = useState(data); //remove to use API

    const [words, setWords] = useState([]); //uncomment to use API
    const [language, setLanguage] = useState(defaultLanguage);
    const [loading, setLoading] = useState(true);

    const getWordsFromApi = async () => {
        //add async here to use API
        setLoading(true);
        try {
            const newWords = await GetWords(); //uncomment to use API
            // const newWords = data; //remove to use API
            setWords(newWords);
        } catch (error) {
            console.error('Error fetching words:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getWordsFromApi();
    }, [language]);

    const getFilteredWords = () => {
        return words.filter((word) => word[language]);
    };

    const value = {
        words: getFilteredWords(),
        setWords,
        language,
        setLanguage,
        loading,
        getFilteredWords
    };
    return <WordsAndLanguageContext.Provider value={value}>{children}</WordsAndLanguageContext.Provider>;
};
