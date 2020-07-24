function loginReducers(state = {username: ''}, action) {
    switch(action.type) {
        case 'login':
            return {
                username: action.user.username
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