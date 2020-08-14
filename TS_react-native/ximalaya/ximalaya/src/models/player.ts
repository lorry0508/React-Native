import { Effect, Model, EffectWithType, EffectsCommandMap } from 'dva-core-ts';
import { Reducer } from 'redux';
import axios from 'axios';
import { play, init, pause, getCurrentTime, getDuration } from '@/config/sound';
import { call } from 'react-native-reanimated';

const SHOW_URL = '/show';

export interface PlayerModelState {
    id: string;
    soundUrl: string;
    playState: string;
    currentTime: number;
    duration: number;
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
        pause: Effect;
        watchCurrentTime: EffectWithType
    }
}

const initialState: PlayerModelState = {
    id: '',
    soundUrl: '',
    playState: '',
    currentTime: 0,
    duration: 0
};

const delay = (timeout: number) => new Promise(resolve => setTimeout(resolve, timeout))

function* currentTime({ call, put }: EffectsCommandMap) {
    while (true) {
        yield call(delay, 1000);
        const currentTime = yield call(getCurrentTime);
        yield put({
            type: 'setState',
            payload: {
                currentTime
            }
        })
    }
}

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
            yield call(init, data.soundUrl);
            yield put({
                type: 'setState',
                payload: {
                    id: data.id,
                    soundUrl: data.soundUrl,
                    duration: getDuration()
                }
            });
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
        },
        *pause({ payload }, { call, put }) {
            yield call(pause);
            yield put({
                type: 'setState',
                payload: {
                    playState: 'paused'
                }
            })
        },
        watchCurrentTime: [function* (sagaEffects) {
            const { call, take, race } = sagaEffects;
            while (true) {
                yield take('play');
                yield race([call(currentTime, sagaEffects), take('pause')]);
            }
        }, { type: 'watcher' }]
    }
};

export default playerModel;