export const credsReducer = (state = {}, action) => {
    switch(action.type) {
        case 'LOGIN_SUCCESS':
            return action.payload;
        case 'LOGIN_FAIL':
            return {};
        default:
            return state;
    }
}

export const flagReducer = (state = false, action) => {
    switch(action.type) {
        case 'SET_FLAG':
            return action.payload;
        case 'UNSET_FLAG':
            return false;
        default:
            return state;
    }
}