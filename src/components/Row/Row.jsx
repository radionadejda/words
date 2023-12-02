import { Button } from '../Button/Button';
import styles from './Row.module.scss';

export function Row(props) {
    const { english, transcription, russian, tags } = props.word;
    const isHeading = props.isHeading || false;

    return (
        <div className={`${styles.row} ${isHeading ? styles.heading : ''}`}>
            <h2 className={styles.word}>{english}</h2>
            <div className={styles.description}>
                <div className={styles.text}>{transcription}</div>
                <div className={styles.text}>{russian}</div>
                <div className={styles.text}>{tags}</div>
            </div>
            {isHeading ? (
                <div className={styles.edit}>
                    <Button name="add" />
                </div>
            ) : (
                <div className={styles.edit}>
                    <Button name="edit" />
                    <Button name="delete" />
                </div>
            )}
        </div>
    );
}
