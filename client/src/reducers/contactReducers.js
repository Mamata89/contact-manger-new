const contactInitialState = []
const contactReducer = (state = contactInitialState, action) => {
    switch (action.type) {
        case 'SET_CATEGORIES': {
            return [...action.payload]
        }
        case 'ADD_CATEGORY': {
            return [...state, action.payload]
        }
        case 'UPDATE_CATEGORY': {
            return state.map(category => {
                if (category._id == action.payload.id) {
                    return { ...category, ...action.paylaod }
                } else {
                    return { ...category }
                }
            })
        }
        case 'REMOVE_CATEGORY': {
            return state.filter(category => category._id !== action.payload)
        }
        default: {
            return [...state]
        }
    }
}
export default contactReducer