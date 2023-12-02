import { useState } from 'react';
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
            <div>
                <h2>{formTitle}</h2>
                <form>
                    <button>{buttonText}</button>
                </form>
                <button onClick={onClose}>Close</button>
            </div>
        </div>
    );
};
