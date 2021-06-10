// export const signin = (userData, history) => {
//     return (dispatch, getState) => {
//         dispatch(setCreds(userData));
//         history.push('/home');
//     }
// };
export const signin = (userData) => {
    return (dispatch, getState) => {
        dispatch(setFlag(true));
        dispatch(setCreds(userData));
    }
};

const setFlag = (value) => {
    return {
        type: 'SET_FLAG',
        payload: value
    }
}

const setCreds = (userData) => {
    return {
        type: 'LOGIN_SUCCESS',
        payload: userData
    }
};