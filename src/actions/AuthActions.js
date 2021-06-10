// export const signin = (userData, history) => {
//     return (dispatch, getState) => {
//         dispatch(setCreds(userData));
//         history.push('/home');
//     }
// };
export const signin = (userData, history) => {
    return (dispatch, getState) => {
        dispatch(setFlag(true));
        dispatch(setCreds(userData));
        history.push("/home");
    }
};

export const signout = (history) => {
    return (dispatch ,getState) => {
        dispatch(setFlag(false));
        dispatch(unsetCreds({}));
        history.push('/login');
    }
}

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

const unsetCreds = (userData) => {
    return {
        type: 'LOGOUT_SUCCESS',
        payload: userData
    }
};