import { Effect, Model } from 'dva-core-ts';
import { Reducer } from 'redux';
import axios from 'axios';
import { play, init } from '@/config/sound';

const SHOW_URL = '/show';

export interface PlayerModelState {
    id: string;
    soundUrl: string;
    playState: string;
}

export interface PlayerModel extends Model {
    namespace: 'player';
    state: PlayerModelState;
    reducers: {
        setState: Reducer<PlayerModelState>;
    };
    effects: {
        fetchShow: Effect;
        play: Effect;
    }
}

const initialState: PlayerModelState = {
    id: '',
    soundUrl: '',
    playState: ''
};

const playerModel: PlayerModel = {
    namespace: 'player',
    state: initialState,
    reducers: {
        setState(state, { payload }) {
            return {
                ...state,
                ...payload,
            };
        },
    },
    effects: {
        *fetchShow({ payload }, { call, put }) {
            const { data } = yield call(axios.get, SHOW_URL, { params: { id: payload.id } });
            yield put({
                type: 'setState',
                payload: {
                    id: data.id,
                    soundUrl: data.soundUrl
                }
            });
            yield call(init, data.soundUrl);
            yield put({
                type: 'play'
            });
        },
        *play({ payload }, { call, put }) {
            yield put({
                type: 'setState',
                payload: {
                    playState: 'playing'
                }
            });
            yield call(play);
            yield put({
                type: 'setState',
                payload: {
                    playState: 'paused'
                }
            })
        }
    }
};

export default playerModel;