import { useState } from 'react';
import styles from '../styles/CardPage.module.scss';
import { Card } from '../components/Card/Card';
import { Button } from '../components/Button/Button.jsx';
import words from '../data/data.json';

export function CardPage() {
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
            <Card key={currentWordIndex} word={currentWord} />
            <div className={styles.buttons}>
                <Button id="prevButton" name="prev" onClick={goToPreviousCard} />
                <Button id="nextButton" name="next" onClick={goToNextCard} />
            </div>
        </div>
    );
}
