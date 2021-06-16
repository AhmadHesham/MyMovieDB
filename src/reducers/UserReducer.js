export const favoritesReducer = (state = [], action) => {
    switch(action.type) {
        case 'ADD_FAVORITES': {
            state = state.slice()
            state.push(action.payload);
            return state;
        }
        default:
            return state;
    }
}