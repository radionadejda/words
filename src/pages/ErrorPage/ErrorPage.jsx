import styles from '../../styles/ErrorPage.module.scss';

export const ErrorPage = () => {
    return (
        <main className={styles.main}>
            <div className={styles.div}>
                <p>sry we don't have a page like this</p>
                <img
                    src="../../../public/error.gif"
                    alt="cat-erroring"
                />
            </div>
        </main>
    );
};
