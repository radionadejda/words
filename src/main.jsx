import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App/App';
import { WordsAndLanguageContextComponent } from './context/WordsAndLanguageContext';
import './styles/index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <WordsAndLanguageContextComponent>
            <App />
        </WordsAndLanguageContextComponent>
    </React.StrictMode>
);
