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

    const getWordsFromApi = async () => {
        //add async here to use API
        try {
            const newWords = await GetWords(); //uncomment to use API
            // const newWords = data; //remove to use API
            const filteredWords = newWords.filter((word) => word[language]);
            setWords(filteredWords);
        } catch (error) {
            console.error('Error fetching words:', error);
        }
    };

    useEffect(() => {
        getWordsFromApi();
    }, [language]);

    const value = { words, setWords, language, setLanguage };

    return <WordsAndLanguageContext.Provider value={value}>{children}</WordsAndLanguageContext.Provider>;
};
