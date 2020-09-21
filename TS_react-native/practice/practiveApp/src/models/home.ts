import { Model, Effect } from "dva-core-ts";
import { Reducer } from "redux";

interface HomeState {
    num: number;
}

interface HomeModel extends Model {
    [x: string]: any;
    namespace: 'home';
    state: {
        num: number
    };
    reducers: {
        add: Reducer<HomeState>
    };
    effects: {
        asyncAdd: Effect
    }
}

const initialState = {
    num: 1
};

function delay(timeout: number) {
    return new Promise(reslove => {
        setTimeout(reslove, timeout);
    });
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
        }
    },
    effects: {
        *asyncAdd({ payload }, { call, put }) {
            yield call(delay, 3000);
            yield put({
                type: 'add',
                payload
            });
        }
    }
};

export default homeModel;