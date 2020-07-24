function render({state, dispatch}) {
    const div = document.createElement('div');
    const button = document.createElement('button');
    const span = document.createElement('span');

    if(state.username) {
        button.innerHTML = '登出';
        button.addEventListener('click', function() {
            dispatch({type: 'logout'})
        });
    } else {
        button.innerHTML = '登录';
        button.addEventListener('click', function() {
            dispatch({type: 'login'})
        });
    }

    span.innerHTML = '用户名：' + state.username;

    div.appendChild(button);
    div.appendChild(span);

    document.getElementById('root').innerHTML = '';
    document.getElementById('root').appendChild(div);
}

export default render;