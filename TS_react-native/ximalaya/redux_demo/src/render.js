function render() {
    const div = document.createElement('div');
    const button = document.createElement('button');
    const span = document.createElement('span');

    button.innerHTML = '登录';
    span.innerHTML = '用户名';

    div.appendChild(button);
    div.appendChild(span);

    document.getElementById('root').innerHTML = '';
    document.getElementById('root').appendChild(div);
}

export default render;