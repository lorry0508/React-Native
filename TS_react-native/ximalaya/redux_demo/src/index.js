import {createStore, applyMiddleware} from 'redux';
import createSagaMiddleware from 'redux-saga';
import render from './render';
import reducers from './reducers';
import effects from './effects';

const sagaMiddleware = createSagaMiddleware();
const store = createStore(reducers, applyMiddleware(sagaMiddleware));
const state = store.getState();
sagaMiddleware.run(effects);

// 订阅
store.subscribe(() => {
    render({state: store.getState(), dispatch: store.dispatch});
})

render({state: store.getState(), dispatch: store.dispatch});
