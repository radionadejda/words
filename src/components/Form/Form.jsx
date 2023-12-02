import { useState } from 'react';
import styles from './Form.module.scss';

export const Form = ({ onClose, mode }) => {
    //also should have onSave (to save changes) and onClear (to clear all inputs)
    const [isOpen, setIsOpen] = useState(true);

    const handleClose = () => {
        setIsOpen(false);
        onClose();
    };

    const handleButtonClick = (event) => {
        event.preventDefault();
    };

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
            {isOpen && (
                <div>
                    <h2>{formTitle}</h2>
                    <form>
                        <button onClick={handleButtonClick}>{buttonText}</button>
                    </form>
                    <button onClick={handleClose}>Close</button>
                </div>
            )}
        </div>
    );
};
