import { createStore, applyMiddleware, compose, combineReducers, Store } from 'redux';
import thunk from 'redux-thunk';
import { persistReducer } from 'redux-persist';
// defaults to localStorage for web
import storage from 'redux-persist/lib/storage';
// Connected React Router
import { connectRouter } from 'connected-react-router';
import { createBrowserHistory } from 'history';
import { routerMiddleware } from 'connected-react-router';

// Reducers
import imagesReducer from './reducers/images';
import containersReducer from './reducers/containers';
import volumesReducer from './reducers/volumes';
import connectionsReducer from './reducers/connections';


// For more details about the whole Redux setup, check the Documentation in README.md

declare global {
    interface Window {
        __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
    }
}

const composeEnhancers = process.env.NODE_ENV === 'development' ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ as typeof compose : null || compose;

const persistConfig = {
    key: 'root',
    storage,
}

const rootReducer = (history) => combineReducers({
    images: imagesReducer,
    containers: containersReducer,
    volumes: volumesReducer,
    connections: connectionsReducer,
    router: connectRouter(history),
});

export const history = createBrowserHistory();

const persistedReducer = persistReducer(persistConfig, rootReducer(history));

export type AppState = any;

export function configureStore(): Store<AppState> {
    const store = createStore(persistedReducer, composeEnhancers(
        applyMiddleware(
            routerMiddleware(history),
            thunk
        )
    ));

    return store;
}
