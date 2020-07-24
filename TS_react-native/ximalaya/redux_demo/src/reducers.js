function loginReducers(state = {username: ''}, action) {
    switch(action.type) {
        case 'login':
            return {
                username: 'chen'
            }
        case 'logout':
            return {
                username: ''
            }
        default: 
            return state;
    }
}

export default loginReducers;