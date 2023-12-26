import { useState, useEffect } from 'react';
import { Card } from '../../components/Card/Card.jsx';
// import { FlipCard } from '../../components/FlipCard/FlipCard.jsx';
// FlipCard looks better but doesn't use state as required.
// To see also need to change Card into FlipCard in return
import styles from '../../styles/CardsPage.module.scss';
import { Spinner } from '../../components/Spinner/Spinner.jsx';

export const CardsPage = ({ stateWords }) => {
    const [currentWordIndex, setCurrentWordIndex] = useState(0);
    const [isFinished, setIsFinished] = useState(false);
    const [learnedWords, setLearnedWords] = useState(0);
    const wordsCount = stateWords.words.length;

    if (wordsCount === 0) {
        return <Spinner message="No words available" />;
    }

    const currentWord = stateWords.words[currentWordIndex];
    if (!currentWord || typeof currentWord !== 'object') {
        return <Spinner message="Invalid word data" />;
    }

    const goToPreviousCard = () => {
        setCurrentWordIndex((prevIndex) => (prevIndex - 1 + wordsCount) % wordsCount);
    };

    const goToNextCard = () => {
        setCurrentWordIndex((prevIndex) => (prevIndex + 1) % wordsCount);
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

    useEffect(() => {
        setCurrentWordIndex(0);
        setLearnedWords(0);
        setIsFinished(false);
    }, [stateWords]);

    const countLearnedWords = () => {
        if (learnedWords === wordsCount - 1) {
            setIsFinished(true);
        } else {
            setLearnedWords((learnedWords) => learnedWords + 1);
        }
    };

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
                    key={currentWordIndex}
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
            <div className={styles.counter}>{isFinished ? `Congratulations, you've learned all ${wordsCount} words in this set` : `You've learned ${learnedWords} ${learnedWords === 1 ? 'word' : 'words'} out of ${wordsCount}`}</div>
        </main>
    );
};
