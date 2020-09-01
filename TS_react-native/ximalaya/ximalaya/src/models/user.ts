import { Model, Effect } from "dva-core-ts";
import { Reducer } from "redux";
import axios from "axios";

const USER_URL = '/login';

export interface IUser {
    name: string;
    avator: string;
}

export interface UserModelState {
    user?: IUser;
}

export interface UserModel extends Model {
    namespace: 'user';
    state: UserModelState;
    effects: {
        login: Effect;
        logout: Effect;
    };
    reducers: {
        setState: Reducer<UserModelState>
    }
}

const initalState = {
    user: undefined,
};

const userModel: UserModel = {
    namespace: 'user',
    state: initalState,
    reducers: {
        setState(state, { payload }) {
            return {
                ...state,
                ...payload
            }
        }
    },
    effects: {
        *login({ payload }, { call, put }) {
            const { data, status, msg } = yield call(axios.post, USER_URL, payload);
            if (status) {
                yield put({
                    type: 'setState',
                    payload: {
                        user: data,
                    }
                })
            } else {
                console.error(msg);
            }
        },
        *logout(_, { put }) {
            yield put({
                type: 'setState',
                payload: {
                    user: undefined
                }
            })
        }
    }
};

export default userModel;