import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const initialState = {
    totalLearnersCount: 0,
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'UPDATE_TOTAL_LEARNERS_COUNT':
            return { ...state, totalLearnersCount: action.payload };
        default:
            return state;
    }
};

const persistConfig = {
    key: 'root',
    storage,
};

const persistedReducer = persistReducer(persistConfig, reducer);

const store = configureStore({
    reducer: persistedReducer,
});

const persistor = persistStore(store);

export { store, persistor };
