import React, { useState } from 'react';
import styles from './Card.module.scss';
import { Button } from '../Button/Button';

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
                {showTranslation && <div className={styles.text}>{russian}</div>}
                <Button name={showTranslation ? 'hide' : 'translate'} onClick={toggleTranslation} />
            </div>
        </div>
    );
}
