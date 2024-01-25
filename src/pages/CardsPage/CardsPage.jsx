import { useState, useEffect, useContext } from 'react';
import { observer, inject } from 'mobx-react';
import { useWordById } from '../../hooks/useWordById.js';
import { Card } from '../../components/Card/Card.jsx';
import { Spinner } from '../../components/Spinner/Spinner.jsx';
import { Button } from '../../components/Button/Button.jsx';
import styles from '../../styles/CardsPage.module.scss';

export const CardsPage = inject('wordsStore')(
    observer(({ wordsStore }) => {
        const [currentWordId, setCurrentWordId] = useState('');
        const [learnedWords, setLearnedWords] = useState([]);
        const [restartCounter, setRestartCounter] = useState(false);
        const [showTranslation, setShowTranslation] = useState(false);

        const wordsCount = wordsStore.words.length;
        const learnedWordsKey = `learnedWords_${wordsStore.language}`;

        useEffect(() => {
            const initialWordId = wordsStore.words[0]?.id || '';
            setCurrentWordId(initialWordId);
            setShowTranslation(false);
        }, [wordsStore.words, restartCounter, wordsStore.language]);

        const currentWord = useWordById(wordsStore.words, currentWordId);

        const goToPreviousCard = () => {
            const currentIndex = wordsStore.words.findIndex((word) => word.id === currentWordId);
            const prevIndex = (currentIndex - 1 + wordsCount) % wordsCount;
            setCurrentWordId(wordsStore.words[prevIndex].id);
            setShowTranslation(false);
        };

        const goToNextCard = () => {
            const currentIndex = wordsStore.words.findIndex((word) => word.id === currentWordId);
            const nextIndex = (currentIndex + 1) % wordsCount;
            setCurrentWordId(wordsStore.words[nextIndex].id);
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
            if (wordsStore.words.length === 0) {
                localStorage.removeItem(learnedWordsKey);
            } else if (storedLearnedWords) {
                setLearnedWords(JSON.parse(storedLearnedWords));
            }
        }, [wordsStore.language, learnedWordsKey, wordsStore.words]);

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
    })
);
