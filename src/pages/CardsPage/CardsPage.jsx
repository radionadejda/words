import { useState } from 'react';
import { Card } from '../../components/Card/Card.jsx';
// import { FlipCard } from '../../components/FlipCard/FlipCard.jsx';
// FlipCard looks better but doesn't use state as required.
// To see also need to change Card into FlipCard in return
import styles from '../../styles/CardsPage.module.scss';
import { Spinner } from '../../components/Spinner/Spinner.jsx';

export const CardsPage = ({ stateWords }) => {
    const [currentWordIndex, setCurrentWordIndex] = useState(0);
    const wordsCount = stateWords.words.length;

    const goToPreviousCard = () => {
        setCurrentWordIndex((prevIndex) => (prevIndex - 1 + wordsCount) % wordsCount);
    };

    const goToNextCard = () => {
        setCurrentWordIndex((prevIndex) => (prevIndex + 1) % wordsCount);
    };

    if (wordsCount === 0) {
        return <Spinner message="No words available" />;
    }

    const currentWord = stateWords.words[currentWordIndex];
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
                    key={currentWordIndex}
                    word={currentWord}
                />
                <button
                    id="nextButton"
                    className={styles.arrow}
                    onClick={goToNextCard}>
                    ›
                </button>
            </div>
        </main>
    );
};
