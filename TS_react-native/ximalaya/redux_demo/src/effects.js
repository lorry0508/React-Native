import {call, put, takeEvery} from 'redux-saga/effects';

function mockAjax(method, url, data) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(data);
        }, 1000);
    });
}

function* ajaxLogin() {
    // 1.请求后台接口
    const user = yield call(mockAjax, 'POST', '/api/login', {username: '李四'})
    // 2.执行action login
    yield put({type: 'login', user});
}

// 每次执行 action.type = ajaxLogin, 调用 ajaxLogin 函数
function* mySaga() {
    yield takeEvery('ajaxLogin', ajaxLogin);
}

export default mySaga;