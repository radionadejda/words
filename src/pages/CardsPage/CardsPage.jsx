import { useState, useEffect } from 'react';
import { useWordById } from '../../hooks/useWordById.js';
import { Card } from '../../components/Card/Card.jsx';
import { Spinner } from '../../components/Spinner/Spinner.jsx';
import { Button } from '../../components/Button/Button.jsx';
import styles from '../../styles/CardsPage.module.scss';

export const CardsPage = ({ stateWords, selectedLanguage }) => {
    const [currentWordId, setCurrentWordId] = useState('');
    const [learnedWords, setLearnedWords] = useState([]);
    const [restartCounter, setRestartCounter] = useState(false);
    const [showTranslation, setShowTranslation] = useState(false);

    const wordsCount = stateWords.words.length;
    const learnedWordsKey = `learnedWords_${selectedLanguage}`;

    if (wordsCount === 0) {
        return <Spinner message="No words available" />;
    }

    useEffect(() => {
        const initialWordId = stateWords.words[0]?.id || '';
        setCurrentWordId(initialWordId);
        setShowTranslation(false);
    }, [stateWords, restartCounter, selectedLanguage]);

    const currentWord = useWordById(stateWords.words, currentWordId);

    const goToPreviousCard = () => {
        const currentIndex = stateWords.words.findIndex((word) => word.id === currentWordId);
        const prevIndex = (currentIndex - 1 + wordsCount) % wordsCount;
        setCurrentWordId(stateWords.words[prevIndex].id);
        setShowTranslation(false);
    };

    const goToNextCard = () => {
        const currentIndex = stateWords.words.findIndex((word) => word.id === currentWordId);
        const nextIndex = (currentIndex + 1) % wordsCount;
        setCurrentWordId(stateWords.words[nextIndex].id);
        setShowTranslation(false);
    };

    const countLearnedWords = () => {
        if (!learnedWords.includes(currentWordId)) {
            const updatedLearnedWords = [...learnedWords, currentWordId];
            setLearnedWords(updatedLearnedWords);
            localStorage.setItem(learnedWordsKey, JSON.stringify(updatedLearnedWords));
        }
    };

    useEffect(() => {
        const storedLearnedWords = localStorage.getItem(learnedWordsKey);
        if (storedLearnedWords) {
            setLearnedWords(JSON.parse(storedLearnedWords));
        }
    }, [learnedWordsKey]);

    const handleKeyPress = (event) => {
        if (event.code === 'ArrowLeft') {
            goToPreviousCard();
        } else if (event.code === 'ArrowRight') {
            goToNextCard();
        }
    };

    useEffect(() => {
        window.addEventListener('keydown', handleKeyPress);
        return () => {
            window.removeEventListener('keydown', handleKeyPress);
        };
    }, [handleKeyPress]);

    const resetWordsCount = () => {
        localStorage.removeItem(learnedWordsKey);
        setLearnedWords([]);
        setRestartCounter((prevState) => !prevState);
        setShowTranslation(false);
    };

    const learnedWordsMessage = () => {
        const learnedWordsCount = learnedWords.length;
        if (learnedWordsCount === wordsCount) {
            return `Congratulations, you've learned all ${wordsCount} words in this set`;
        } else {
            return `You've learned ${learnedWordsCount} ${learnedWordsCount === 1 ? 'word' : 'words'} out of ${wordsCount}`;
        }
    };

    if (!currentWord || typeof currentWord !== 'object') {
        return <Spinner message="Invalid word data" />;
    }

    return (
        <main className={styles.main}>
            <div className={styles.gallery}>
                <button
                    id="prevButton"
                    className={styles.arrow}
                    onClick={goToPreviousCard}>
                    ‹
                </button>
                <Card
                    key={currentWordId}
                    word={currentWord}
                    showTranslation={showTranslation}
                    setShowTranslation={setShowTranslation}
                    countLearnedWords={() => countLearnedWords()}
                    selectedLanguage={selectedLanguage}
                />
                <button
                    id="nextButton"
                    className={styles.arrow}
                    onClick={goToNextCard}>
                    ›
                </button>
            </div>
            <div className={styles.counter}>{learnedWordsMessage()}</div>
            <Button
                customClass={styles.restart_button}
                name="start over"
                onClick={() => resetWordsCount()}
            />
        </main>
    );
};
