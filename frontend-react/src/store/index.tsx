import { createStore, applyMiddleware, compose, combineReducers, Store } from 'redux';
import thunk from 'redux-thunk';
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web

import imagesReducer from './reducers/images';


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

const rootReducer = combineReducers({
    images: imagesReducer
});

const persistedReducer = persistReducer(persistConfig, rootReducer)

export type AppState = ReturnType<typeof rootReducer>;

export function configureStore(): Store<AppState> {
    const store = createStore(persistedReducer, composeEnhancers(
        applyMiddleware(thunk)
    ));

    return store;
}
