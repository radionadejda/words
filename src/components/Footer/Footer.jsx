import styles from './Footer.module.scss';

export function Footer() {
    return (
        <div className={styles.footer}>
            <p>
                <a href="https://github.com/radionadejda" className={styles.footer__link}>
                    radionadejda
                </a>{' '}
                made me
            </p>{' '}
            <br />
            <p>to hurt people's eyes apparently</p>
        </div>
    );
}
