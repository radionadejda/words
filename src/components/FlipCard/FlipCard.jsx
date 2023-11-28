import { useState } from 'react';
import ReactCardFlip from 'react-card-flip';
import styles from './FlipCard.module.scss';

export function FlipCard(props) {
    const { english, transcription, russian } = props.word;
    const [showTranslation, setShowTranslation] = useState(false);

    const [flip, setFlip] = useState(false);

    const toggleTranslation = () => {
        setShowTranslation(!showTranslation);
    };

    return (
        <ReactCardFlip isFlipped={flip} flipDirection="vertical">
            <div className={styles.card} onClick={() => setFlip(!flip)}>
                <h2 className={styles.word}>{english}</h2>
                <div className={styles.text}>{transcription}</div>
                <div className={styles.hint}>click card to see answer</div>
            </div>
            <div className={`${styles.card} ${styles.card_back}`} onClick={() => setFlip(!flip)}>
                <h2 className={styles.word}>{english}</h2>
                <div className={styles.text}>{transcription}</div>
                <div className={styles.answer}>
                    <div className={styles.answer_text}>{russian}</div>
                    <div className={styles.hint}>click card to hide answer</div>
                </div>
            </div>
        </ReactCardFlip>
    );
}
