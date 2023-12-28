import { useState } from 'react';
import { Button } from '../Button/Button';
import styles from './Form.module.scss';
const buttonTexts = {
    add: 'Add Word',
    edit: 'Edit Word',
    remove: 'Remove Word'
};

const formTitles = {
    add: 'Add Word Form',
    edit: 'Edit Word Form',
    remove: 'Remove Word Form'
};

export const Form = ({ onClose, mode }) => {
    const buttonText = buttonTexts[mode] || '';
    const formTitle = formTitles[mode] || '';

    return (
        <div>
            <div className={styles.form}>
                <h2>{formTitle}</h2>
                <form>
                    <div className={styles.form_footer}>
                        <Button
                            name={buttonText}
                            customClass={styles.submit_button}
                        />
                        <Button
                            name="cancel+close"
                            onClick={onClose}
                            customClass={styles.close_button}
                        />
                    </div>
                </form>
            </div>
        </div>
    );
};
