import styles from './Button.module.scss';

export function Button(props) {
    const handleClick = () => {
        if (props.onClick) {
            props.onClick();
        }
    };

    return (
        <button className={`${styles.button} ${props.name}`} onClick={handleClick}>
            {props.name}
        </button>
    );
}
