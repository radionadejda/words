import React, { useState, useEffect, useRef } from 'react';
import { Button } from '../Button/Button';
import styles from './Card.module.scss';

export const Card = ({ word, countLearnedWords, showTranslation, setShowTranslation }) => {
    const { english, transcription, russian } = word;
    // const [showTranslation, setShowTranslation] = useState(false);
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
    }, [word]); // тут мог быть пустой массив, чтобы обновление фокуса происходило при каждом рендере, но тогда фокус не переставляется при смене набора слов. удалю коммент после проверки

    return (
        <div className={styles.card}>
            <h2 className={styles.word}>{english}</h2>
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
