import { useState } from 'react';
import { Button } from '../Button/Button';
import styles from './Form.module.scss';
const buttonTexts = {
    add: 'Save Word',
    edit: 'Save Word',
    remove: 'Remove Word'
};

const formTitles = {
    add: 'Add Word',
    edit: 'Edit Word',
    remove: 'Remove Word'
};

export const Form = ({ onClose, mode }) => {
    const buttonText = buttonTexts[mode] || '';
    const formTitle = formTitles[mode] || '';

    return (
        <div className={styles.form_container}>
            <h2 className={styles.formTitle}>{formTitle}</h2>
            <form className={styles.form}>
                <h2 className={styles.form_word}>word</h2>
                {mode !== 'remove' ? (
                    <div className={styles.form_description}>
                        <div className={styles.transcription}>transcription</div>
                        <div className={styles.answer}>russian</div>
                        <div className={styles.tags}>tags</div>
                    </div>
                ) : (
                    <div className={styles.form_remove}>
                        <p>Are you sure you want to remove this word?</p>
                    </div>
                )}
                <div className={styles.form_buttons}>
                    <Button
                        name={buttonText}
                        customClass={styles.submit_button}
                    />
                    <Button
                        name="cancel + close"
                        onClick={onClose}
                        customClass={styles.close_button}
                    />
                </div>
            </form>
        </div>
    );
};
