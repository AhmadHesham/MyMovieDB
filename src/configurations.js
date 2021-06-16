import { createStore, applyMiddleware, compose } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import thunk from 'redux-thunk'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web
import root from './reducers'

const persistConfig = {
  key: 'root',
  storage,
}

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const persistedReducer = persistReducer(persistConfig, root)
const config = () => {
    let store = createStore(persistedReducer, composeEnhancer(applyMiddleware(thunk)))
    let persistor = persistStore(store)
    return { store, persistor }
}

export default  config