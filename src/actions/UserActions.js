export const addToFavorites = (movie) => {
    return {
        type: 'ADD_FAVORITES',
        payload: movie
    }
};