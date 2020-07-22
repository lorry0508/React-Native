import {Effect, Model, EffectWithType, EffectsCommandMap} from 'dva-core-ts';
import {Reducer} from 'redux';
import axios from 'axios';
import {
  play,
  init,
  pause,
  getCurrentTime,
  getDuration,
  stop,
} from '@/config/sound';
import {RootState} from '.';
import {saveProgram} from '@/config/realm';

const SHOW_URL = '/show';

export interface PlayerModelState {
  id: string;
  title: string;
  thumbnailUrl: string;
  soundUrl: string;
  playState: string;
  currentTime: number;
  duration: number;
  previousId: string;
  nextId: string;
  sounds: {id: string; title: string}[];
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
    watcherCurrentTime: EffectWithType;
    previous: Effect;
    next: Effect;
  };
}

const initialState: PlayerModelState = {
  id: '',
  title: '',
  thumbnailUrl: '',
  soundUrl: '',
  playState: 'paused',
  currentTime: 0,
  duration: 0,
  previousId: '',
  nextId: '',
  sounds: [],
};

const delay = (timeout: number) =>
  new Promise(resolve => setTimeout(resolve, timeout));

function* currentTime({call, put}: EffectsCommandMap) {
  while (true) {
    yield call(delay, 1000);
    const currentTime = yield call(getCurrentTime);
    yield put({
      type: 'setState',
      payload: {
        currentTime,
      },
    });
  }
}

const playerModel: PlayerModel = {
  namespace: 'player',
  state: initialState,
  reducers: {
    setState(state, {payload}) {
      return {
        ...state,
        ...payload,
      };
    },
  },
  effects: {
    *fetchShow({payload}, {call, put, select}) {
      yield call(stop);
      const {data} = yield call(axios.get, SHOW_URL, {
        params: {id: payload.id},
      });
      yield call(init, data.soundUrl);
      yield put({
        type: 'setState',
        payload: {
          id: payload.id,
          soundUrl: data.soundUrl,
          duration: getDuration(),
        },
      });

      yield put({
        type: 'play',
      });
      const {
        id,
        title,
        thumbnailUrl,
        currentTime,
      }: PlayerModelState = yield select(({player}: RootState) => player);
      saveProgram({
        id,
        title,
        thumbnailUrl,
        currentTime,
        duration: getDuration(),
      });
    },
    *play({payload}, {call, put}) {
      yield put({
        type: 'setState',
        payload: {
          playState: 'playing',
        },
      });
      try {
        yield call(play);
      } catch (e) {
        console.log('播放音频失败', e);
      }

      yield put({
        type: 'setState',
        payload: {
          playState: 'paused',
        },
      });
    },
    *pause({payload}, {call, put, select}) {
      yield call(pause);
      yield put({
        type: 'setState',
        payload: {
          playState: 'paused',
        },
      });
      const {id, currentTime}: PlayerModelState = yield select(
        ({player}: RootState) => player,
      );
      saveProgram({id, currentTime});
    },
    watcherCurrentTime: [
      function*(sagaEffects) {
        const {call, take, race} = sagaEffects;
        while (true) {
          yield take('play');
          yield race([call(currentTime, sagaEffects), take('pause')]);
        }
      },
      {type: 'watcher'},
    ],
    *previous({payload}, {call, put, select}) {
      const {id, sounds}: PlayerModelState = yield select(
        ({player}: RootState) => player,
      );
      const index = sounds.findIndex(item => item.id === id);
      const currentIndex = index - 1;
      const currentItem = sounds[currentIndex];
      const previousItem = sounds[currentIndex - 1];
      yield put({
        type: 'setState',
        payload: {
          playState: 'paused',
          id: currentItem.id,
          title: currentItem.title,
          previousId: previousItem ? previousItem.id : '',
          nextId: id,
        },
      });
      yield put({
        type: 'fetchShow',
        payload: {
          id: currentItem.id,
        },
      });
    },
    *next({payload}, {call, put, select}) {
      const {id, sounds}: PlayerModelState = yield select(
        ({player}: RootState) => player,
      );
      const index = sounds.findIndex(item => item.id === id);
      const currentIndex = index + 1;
      const currentItem = sounds[currentIndex];
      const nextItem = sounds[currentIndex + 1];
      yield put({
        type: 'setState',
        payload: {
          playState: 'paused',
          id: currentItem.id,
          title: currentItem.title,
          previousId: id,
          nextId: nextItem ? nextItem.id : '',
        },
      });
      yield put({
        type: 'fetchShow',
        payload: {
          id: currentItem.id,
        },
      });
    },
  },
};

export default playerModel;
