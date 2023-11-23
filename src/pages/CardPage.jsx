// import '../styles/_App.scss';
import styles from '../styles/CardPage.module.scss';
import { Card } from '../components/Card/Card';
// import { Button } from '../components/Button/Button.jsx';
import words from '../data/data.json';

export function CardPage() {
    return (
        <div className={styles.gallery}>
            {words.map((word, id) => (
                <Card key={id} word={word} />
            ))}
        </div>
    );
}
