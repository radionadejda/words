import { useState } from 'react';
import { Card } from '../../components/Card/Card.jsx';
// import { FlipCard } from '../../components/FlipCard/FlipCard.jsx';
// FlipCard looks better but doesn't use state as required.
// To see also need to change Card into FlipCard in return
import words from '../../data/data.json';
import styles from '../../styles/CardsPage.module.scss';

export const CardsPage = ({ stateWords }) => {
    const [currentWordIndex, setCurrentWordIndex] = useState(0);
    const wordsCount = words.length;

    const goToPreviousCard = () => {
        setCurrentWordIndex((prevIndex) => (prevIndex - 1 + wordsCount) % wordsCount);
    };

    const goToNextCard = () => {
        setCurrentWordIndex((prevIndex) => (prevIndex + 1) % wordsCount);
    };

    const currentWord = words[currentWordIndex];
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
                    word={stateWords.words[currentWordIndex]}
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
