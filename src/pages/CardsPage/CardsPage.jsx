import { useState, useEffect } from 'react';
import { Card } from '../../components/Card/Card.jsx';
// import { FlipCard } from '../../components/FlipCard/FlipCard.jsx';
// FlipCard looks better but doesn't use state as required.
// To see also need to change Card into FlipCard in return
import styles from '../../styles/CardsPage.module.scss';
import { Spinner } from '../../components/Spinner/Spinner.jsx';

export const CardsPage = ({ stateWords }) => {
    const [currentWordId, setCurrentWordId] = useState('');
    const [isFinished, setIsFinished] = useState(false);
    const [learnedWords, setLearnedWords] = useState(0);
    const [learnedWordsList, setLearnedWordsList] = useState([]);
    const wordsCount = stateWords.words.length;

    if (wordsCount === 0) {
        return <Spinner message="No words available" />;
    }

    const getCurrentWordById = (wordId) => {
        return stateWords.words.find((word) => word.id === wordId) || {};
    };

    useEffect(() => {
        setCurrentWordId(stateWords.words[0]?.id || '');
        setLearnedWordsList([]);
        setLearnedWords(0);
        setIsFinished(false);
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
        if (!learnedWordsList.includes(currentWordId)) {
            const updatedLearnedWordsList = [...learnedWordsList, currentWordId];
            setLearnedWordsList(updatedLearnedWordsList);

            if (updatedLearnedWordsList.length === wordsCount) {
                setIsFinished(true);
            } else {
                setLearnedWords(learnedWords + 1);
                localStorage.setItem('learnedWords', (learnedWords + 1).toString());
            }
        }
    };

    const currentWord = getCurrentWordById(currentWordId);

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
            <div className={styles.counter}>{isFinished ? `Congratulations, you've learned all ${wordsCount} words in this set` : `You've learned ${learnedWords} ${learnedWords === 1 ? 'word' : 'words'} out of ${wordsCount}`}</div>
        </main>
    );
};
