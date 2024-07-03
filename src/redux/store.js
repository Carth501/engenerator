import { configureStore } from '@reduxjs/toolkit';
import seedReducer from './reducers/seeds';

export default configureStore({
    reducer: { seed: seedReducer }
})