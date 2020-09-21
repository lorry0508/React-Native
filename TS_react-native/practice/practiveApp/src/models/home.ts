import { Model, Effect } from "dva-core-ts";
import { Reducer } from "redux";

interface HomeState {
    num: number;
}

interface HomeModel extends Model {
    namespace: 'home';
    state: {
        num: number
    };
    reducers: {
        add: Reducer<HomeState>
    };
    // effects: {
    //     asyncAdd: Effect
    // }
}

const initialState = {
    num: 0
};

const homeModel: HomeModel = {
    namespace: 'home',
    state: initialState,
    reducers: {
        add(state = initialState, { payload }) {
            return {
                ...state,
                num: state.num + payload.num
            };
        }
    },
};

export default homeModel;