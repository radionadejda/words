import React, { useState, useEffect, useRef } from 'react';
import { Button } from '../Button/Button';
import styles from './Card.module.scss';

export const Card = ({ selectedLanguage, word, countLearnedWords, showTranslation, setShowTranslation }) => {
    const { transcription, russian } = word;
    const foreignWord = word[selectedLanguage];
    const [isLearned, setIsLearned] = useState(false);

    const toggleTranslation = () => {
        setShowTranslation((prevShowTranslation) => !prevShowTranslation);
        if (!isLearned) {
            countLearnedWords();
            setIsLearned(true);
        }
    };

    const translateButtonRef = useRef(null);
    useEffect(() => {
        translateButtonRef.current.focus();
    }, [word]);

    return (
        <div className={styles.card}>
            <h2 className={styles.word}>{foreignWord}</h2>
            <div className={styles.transcription}>{transcription}</div>
            <Button
                name={showTranslation ? 'hide' : 'translate'}
                ref={translateButtonRef}
                onClick={toggleTranslation}
                customClass={styles.translate_button}
            />
            <div className={`${styles.translation} ${showTranslation ? '' : styles.hide}`}>{russian}</div>
        </div>
    );
};
