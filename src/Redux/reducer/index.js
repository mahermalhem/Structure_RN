import {combineReducers} from 'redux';
import userReducer from './user/reducer';
import { pokemonApi } from '@src/Services/pokemon';

const rootReducer = combineReducers({
  userReducer,
  [pokemonApi.reducerPath]: pokemonApi.reducer,
});

export default rootReducer;
