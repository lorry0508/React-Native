import { Model, Effect } from 'dva-core-ts';
import axios from 'axios';

const FOUND_URL = '/found/list';

interface FoundModel extends Model {
    namespace: 'found';
    effects: {
        fetchList: Effect;
    }
}

const foundModel: FoundModel = {
    namespace: 'found',
    state: {},
    effects: {
        *fetchList({ callback }, { call }) {
            const { data } = yield call(axios.get, FOUND_URL);
            if(typeof callback === 'function') {
                callback(data);
            }
        }
    }
}

export default foundModel;