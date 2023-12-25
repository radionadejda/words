import styles from './Footer.module.scss';

export const Footer = () => {
    return (
        <footer className={styles.footer}>
            <p>
                <a
                    href="https://github.com/radionadejda"
                    className={styles.footer__link}>
                    radionadejda
                </a>{' '}
                made me
            </p>{' '}
        </footer>
    );
};
