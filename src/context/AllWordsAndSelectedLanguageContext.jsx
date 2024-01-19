import React, { createContext, useState, useEffect } from 'react';
import { GetAllWords } from '../services/GET';

export const AllWordsAndSelectedLanguageContext = createContext();

export const AllWordsAndSelectedLanguageContextComponent = ({ children }) => {
    const storedLanguage = localStorage.getItem('language');
    const defaultLanguage = storedLanguage || 'english';

    const [allWords, setAllWords] = useState([]);
    const [selectedLanguage, setSelectedLanguage] = useState(defaultLanguage);

    const getWordsFromApi = async () => {
        try {
            const words = await GetAllWords();
            setAllWords(words);
        } catch (error) {
            console.error('Error fetching words:', error);
        }
    };

    useEffect(() => {
        getWordsFromApi();
    }, []);

    const value = { allWords, setAllWords, selectedLanguage, setSelectedLanguage };

    return <AllWordsAndSelectedLanguageContext.Provider value={value}>{children}</AllWordsAndSelectedLanguageContext.Provider>;
};
