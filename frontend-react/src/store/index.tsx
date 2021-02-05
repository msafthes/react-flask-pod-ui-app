import { createStore, applyMiddleware, compose, combineReducers, Store } from 'redux';
import thunk from 'redux-thunk';
import { persistReducer } from 'redux-persist'
// defaults to localStorage for web
import storage from 'redux-persist/lib/storage'

// Reducers
import imagesReducer from './reducers/images';
import containersReducer from './reducers/containers';
import volumesReducer from './reducers/volumes';


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
    images: imagesReducer,
    containers: containersReducer,
    volumes: volumesReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer)

export type AppState = ReturnType<typeof rootReducer>;

export function configureStore(): Store<AppState> {
    const store = createStore(persistedReducer, composeEnhancers(
        applyMiddleware(thunk)
    ));

    return store;
}
