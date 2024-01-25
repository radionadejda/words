import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App/App';
import { Provider } from 'mobx-react';
import wordsStore from './store/wordsStore';
import './styles/index.css';

const words = wordsStore;

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <Provider wordsStore={words}>
            <App />
        </Provider>
    </React.StrictMode>
);
