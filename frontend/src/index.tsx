import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';

import { ConnectedRouter } from 'connected-react-router';

import { configureStore, history } from './store';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import WebSocketProvider from './WebSocket';
import { ViewportProvider } from './Viewport';


// Configure Redux Store
const store = configureStore();
// Stores Redux state in browser's Local Storage to prevent loss of data on page refresh
const persistor = persistStore(store)

// Applies the Redux Store, Local Storage, WebSocket, Viewport and Routing functionality to the main App component
const app = (
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
            <WebSocketProvider>
                <ViewportProvider>
                    <ConnectedRouter history={history}>
                        <App />
                    </ConnectedRouter>
                </ViewportProvider>
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
