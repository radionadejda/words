import React, { useState } from 'react';
import { Button } from '../Button/Button';
import styles from './Card.module.scss';

export function Card(props) {
    const { english, transcription, russian } = props.word;
    const [showTranslation, setShowTranslation] = useState(false);

    const toggleTranslation = () => {
        setShowTranslation(!showTranslation);
    };

    return (
        <div className={styles.card}>
            <h2 className={styles.word}>{english}</h2>
            <div className={styles.text}>{transcription}</div>
            <div className={styles.answer}>
                <Button name={showTranslation ? 'hide' : 'translate'} onClick={toggleTranslation} customClass={styles.answer_button} />
                <div className={`${styles.answer_text} ${showTranslation ? '' : styles.hide}`}>{russian}</div>
            </div>
        </div>
    );
}
