import { useState, useEffect } from 'react';
import { Card } from '../../components/Card/Card.jsx';
// import { FlipCard } from '../../components/FlipCard/FlipCard.jsx';
// FlipCard looks better but doesn't use state as required.
// To see also need to change Card into FlipCard in return
import styles from '../../styles/CardsPage.module.scss';
import { Spinner } from '../../components/Spinner/Spinner.jsx';
import { Button } from '../../components/Button/Button.jsx';

export const CardsPage = ({ stateWords, selectedLanguage }) => {
    const [currentWordId, setCurrentWordId] = useState('');
    const [learnedWords, setLearnedWords] = useState([]);
    const [restartCounter, setRestartCounter] = useState(false);

    const wordsCount = stateWords.words.length;
    const learnedWordsKey = `learnedWords_${selectedLanguage}`;
    const learnedWordsForLanguage = parseInt(localStorage.getItem(learnedWordsKey)) || 0;

    if (wordsCount === 0) {
        return <Spinner message="No words available" />;
    }

    const getCurrentWordById = (wordId) => {
        return stateWords.words.find((word) => word.id === wordId) || {};
    };
    const currentWord = getCurrentWordById(currentWordId);

    useEffect(() => {
        setCurrentWordId(stateWords.words[0]?.id || '');
        setLearnedWords([]);
    }, [stateWords]);

    const goToPreviousCard = () => {
        const currentIndex = stateWords.words.findIndex((word) => word.id === currentWordId);
        const prevIndex = (currentIndex - 1 + wordsCount) % wordsCount;
        setCurrentWordId(stateWords.words[prevIndex].id);
    };

    const goToNextCard = () => {
        const currentIndex = stateWords.words.findIndex((word) => word.id === currentWordId);
        const nextIndex = (currentIndex + 1) % wordsCount;
        setCurrentWordId(stateWords.words[nextIndex].id);
    };

    const countLearnedWords = () => {
        if (!learnedWords.includes(currentWordId)) {
            const updatedLearnedWords = [...learnedWords, currentWordId];

            if (updatedLearnedWords.length <= wordsCount) {
                setLearnedWords(updatedLearnedWords);

                const learnedWordsForLanguage = parseInt(localStorage.getItem(learnedWordsKey)) || 0;
                const newLearnedWordsCount = Math.min(learnedWordsForLanguage + 1, wordsCount);
                localStorage.setItem(learnedWordsKey, newLearnedWordsCount.toString());
            }
        }
    };

    useEffect(() => {
        const handleKeyPress = (event) => {
            if (event.code === 'ArrowLeft') {
                goToPreviousCard();
            } else if (event.code === 'ArrowRight') {
                goToNextCard();
            }
        };
        window.addEventListener('keydown', handleKeyPress);
        return () => {
            window.removeEventListener('keydown', handleKeyPress);
        };
    }, [goToPreviousCard, goToNextCard]);

    const resetWordsCount = () => {
        localStorage.setItem(learnedWordsKey, 0);
        setRestartCounter((prevState) => !prevState);
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
                    countLearnedWords={() => countLearnedWords()}
                />
                <button
                    id="nextButton"
                    className={styles.arrow}
                    onClick={goToNextCard}>
                    ›
                </button>
            </div>
            <div className={styles.counter}>{learnedWordsForLanguage === wordsCount ? `Congratulations, you've learned all ${wordsCount} words in this set` : `You've learned ${learnedWordsForLanguage} ${learnedWordsForLanguage === 1 ? 'word' : 'words'} out of ${wordsCount}`}</div>
            <Button
                customClass={styles.restart_button}
                name="start over"
                onClick={() => resetWordsCount()}
            />
        </main>
    );
};
