import { Model, Effect } from "dva-core-ts";
import { Reducer } from "redux";
import axios from 'axios';

// 轮播图
const CAROUSEL_URL = '/carousel';
// 猜你喜欢
const GUESS_URL = '/guess';

export interface ICarousel {
    id: string;
    image: string;
    colors: [string, string]
}

export interface IGuess {
    id: string;
    title: string;
    image: string;
}

export interface HomeState {
    carousels: ICarousel[];
    guess: IGuess[];
}

interface HomeModel extends Model {
    namespace: 'home';
    state: HomeState
    reducers: {
        setState: Reducer<HomeState>;
    };
    effects: {
        fetchCarousels: Effect;
        fetchGuess: Effect;
    }
}

const initialState = {
    carousels: [],
    guess: [],
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
        },
        *fetchGuess(_, { call, put }) {
            const {data} = yield call(axios.get, GUESS_URL);
            yield put({
                type: 'setState',
                payload: {
                    guess: data
                }
            });
        }
    }
};

export default homeModel;