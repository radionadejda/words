import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App/App';
import { AllWordsAndSelectedLanguageContextComponent } from './context/AllWordsAndSelectedLanguageContext';
import './styles/index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <AllWordsAndSelectedLanguageContextComponent>
            <App />
        </AllWordsAndSelectedLanguageContextComponent>
    </React.StrictMode>
);
