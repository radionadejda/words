import React, { createContext, useState, useEffect } from 'react';
import { getWords } from '../services/getWords';

export const WordsAndLanguageContext = createContext();

export const WordsAndLanguageContextComponent = ({ children }) => {
    const storedLanguage = localStorage.getItem('language');
    const defaultLanguage = storedLanguage || 'english';

    const [words, setWords] = useState([]);
    const [allWords, setAllWords] = useState([]);
    const [language, setLanguage] = useState(defaultLanguage);
    const [loading, setLoading] = useState(true);

    const getWordsFromApi = async () => {
        setLoading(true);
        try {
            const newWords = await getWords();
            setWords(newWords);
            setAllWords(newWords);
        } catch (error) {
            console.error('Error fetching words:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getWordsFromApi();
    }, []);

    useEffect(() => {
        console.log('Updated allWords:', allWords);
    }, [allWords]);

    const getFilteredWords = () => {
        return words.filter((word) => word[language]);
    };

    const value = {
        words: getFilteredWords(),
        setWords,
        allWords,
        setAllWords,
        language,
        setLanguage,
        loading,
        getFilteredWords
    };
    return <WordsAndLanguageContext.Provider value={value}>{children}</WordsAndLanguageContext.Provider>;
};
