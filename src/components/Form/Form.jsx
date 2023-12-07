import { useState } from 'react';
import { Button } from '../Button/Button';
import styles from './Form.module.scss';

export const Form = ({ onClose, mode }) => {
    let buttonText = '';
    let formTitle = '';

    switch (mode) {
        case 'add':
            buttonText = 'Add Word';
            formTitle = 'Add Word Form';
            break;
        case 'edit':
            buttonText = 'Edit Word';
            formTitle = 'Edit Word Form';
            break;
        case 'remove':
            buttonText = 'Remove Word';
            formTitle = 'Remove Word Form';
            break;
        default:
            break;
    }

    return (
        <div>
            <div className={styles.form}>
                <h2>{formTitle}</h2>
                <form>
                    <Button
                        name={buttonText}
                        customClass={styles.submit_button}
                    />
                </form>
                <Button
                    name={'close'}
                    onClick={onClose}
                    customClass={styles.close_button}
                />
            </div>
        </div>
    );
};
