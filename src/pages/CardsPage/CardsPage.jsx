import { useState } from 'react';
import styles from '../../styles/CardsPage.module.scss';
import { Card } from '../../components/Card/Card.jsx';
import { Button } from '../../components/Button/Button.jsx';
import words from '../../data/data.json';

export function CardsPage() {
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
        <div className={styles.gallery}>
            <button id="prevButton" className={styles.arrow} onClick={goToPreviousCard}>
                ‹
            </button>
            {/* <Button id="prevButton" name="prev" onClick={goToPreviousCard} /> */}
            <Card key={currentWordIndex} word={currentWord} />
            {/* <Button id="nextButton" name="next" onClick={goToNextCard} /> */}
            <button id="nextButton" className={styles.arrow} onClick={goToNextCard}>
                ›
            </button>
        </div>
    );
}
