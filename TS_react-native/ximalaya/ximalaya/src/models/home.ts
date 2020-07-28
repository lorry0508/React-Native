import { Model, Effect } from "dva-core-ts";
import { Reducer } from "redux";
import axios from 'axios';

const CAROUSEL_URL = '/carousel';

export interface ICarousel {
    id: string;
    image: string;
    colors: [string, string]
}

export interface HomeState {
    carousels: ICarousel[];
}

interface HomeModel extends Model {
    namespace: 'home';
    state: HomeState
    reducers: {
        setState: Reducer<HomeState>
    };
    effects: {
        fetchCarousels: Effect;
    }
}

const initialState = {
    carousels: [],
};

const homeModel: HomeModel = {
    namespace: 'home',
    state: initialState,
    reducers: {
        setState(state = initialState, { payload }) {
            return {
                ...state,
                ...payload
            };
        },
    },
    effects: {
        *fetchCarousels(_, { call, put }) {
            const {data} = yield call(axios.get, CAROUSEL_URL);
            console.log(data, "轮播图数据");
            yield put({
                type: 'setState',
                payload: {
                    carousels: data
                }
            });
        }
    }
};

export default homeModel;