export const credsReducer = (state = {}, action) => {
    switch(action.type) {
        case 'LOGIN_SUCCESS':
            return action.payload;
        case 'LOGIN_FAIL':
            return {};
        case 'LOGOUT_SUCCESS':
            return action.payload;
        default:
            return state;
    }
}

export const flagReducer = (state = false, action) => {
    switch(action.type) {
        case 'SET_FLAG':
            return action.payload;
        default:
            return state;
    }
}