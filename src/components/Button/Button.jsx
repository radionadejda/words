import styles from './Button.module.scss';

export const Button = (props) => {
    const buttonClass = `${styles.button} ${props.customClass || ''}`;

    const handleClick = () => {
        if (props.onClick) {
            props.onClick();
        }
    };

    return (
        <button
            className={buttonClass}
            onClick={handleClick}>
            {props.name}
        </button>
    );
};
