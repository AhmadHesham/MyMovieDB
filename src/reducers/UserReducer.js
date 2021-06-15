export const favoritesReducer = (state = [], action) => {
    switch(action.type) {
        case 'ADD_FAVORITES': {
            state.push(action.payload);
            return state;
        }
        case 'REMOVE_FAVORITES': {
            state.splice(state.indexOf(action.payload), 1);
            return state;
        }
        default: 
            return state;
    }
}