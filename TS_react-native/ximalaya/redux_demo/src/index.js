import {createStore} from 'redux';
import render from './render';
import reducers from './reducers';

const store = createStore(reducers);

const state = store.getState();

// 订阅
store.subscribe(() => {
    render({state: store.getState(), dispatch: store.dispatch});
})

render({state: store.getState(), dispatch: store.dispatch});
