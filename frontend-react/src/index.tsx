import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { persistStore } from 'redux-persist'
import { PersistGate } from 'redux-persist/integration/react'

import { configureStore } from './store';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import WebSocketProvider from './WebSocket';


const store = configureStore();
const persistor = persistStore(store)

const app = (
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
            <WebSocketProvider>
                <BrowserRouter>
                    <App />
                </BrowserRouter>
            </WebSocketProvider>
        </PersistGate>
    </Provider>
);

ReactDOM.render(
    <React.StrictMode>
        {app}
    </React.StrictMode>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
