import { Model, Effect } from "dva-core-ts";
import { Reducer } from "redux";

interface HomeState {
    num: number;
    loading: boolean;
}

interface HomeModel extends Model {
    namespace: 'home';
    state: {
        num: number,
        loading: boolean;
    };
    reducers: {
        add: Reducer<HomeState>,
        setStatus: Reducer<HomeState>,
    };
    effects: {
        asyncAdd: Effect
    }
}

const initialState = {
    num: 1,
    loading: false
};

function delay(timeout: number) {
    return new Promise(resolve => {
        setTimeout(resolve, timeout)
    })
}

const homeModel: HomeModel = {
    namespace: 'home',
    state: initialState,
    reducers: {
        add(state = initialState, { type, payload }) {
            return {
                ...state,
                num: state.num + payload.num
            };
        },
        setStatus(state = initialState, {payload}) {
            return {
                ...state,
                loading: payload.loading
            };
        }
    },
    effects: {
        *asyncAdd({payload}, {call, put}) {
            yield put({
                type: 'setStatus',
                payload: {
                    loading: true
                },
            });
            yield call(delay, 3000);
            yield put({
                type: 'add',
                payload
            });
            yield put({
                type: 'setStatus',
                payload: {
                    loading: false
                },
            });
        }
    }
};

export default homeModel;