import styles from './Button.module.scss';

export function Button(props) {
    return <button className={`${styles.button} ${props.name}`}>{props.name}</button>;
}
