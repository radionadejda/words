import styles from './Card.module.scss';
import { Button } from '../Button/Button';

export function Card(props) {
    const { english, transcription, russian } = props.word;
    return (
        <div className={styles.card}>
            <h2 className={styles.word}>{english}</h2>
            <div className={styles.text}>{transcription}</div>
            <div className={styles.answer}>
                <Button name="Translate" />
                <div className={styles.text}>{russian}</div>
                <Button name="Hide" />
            </div>
        </div>
    );
}
