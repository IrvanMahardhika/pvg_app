import createSagaMiddleware from 'redux-saga';
import {all, fork} from 'redux-saga/effects';
import {AnyAction, combineReducers} from 'redux';
import {configureStore, EnhancedStore} from '@reduxjs/toolkit';
import reducers from './reducers';
import sagas from './sagas/index';

const sagaMiddleware = createSagaMiddleware();

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

function* rootSaga() {
  yield all([fork(sagas)]);
}

export const rootReducer = (
  state: ReturnType<typeof store.getState> | undefined,
  action: AnyAction,
) => {
  return combineReducers(reducers)(state, action);
};

export const store: EnhancedStore = configureStore({
  reducer: rootReducer,
  middleware: [sagaMiddleware],
});

sagaMiddleware.run(rootSaga);
