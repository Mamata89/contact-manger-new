import {createStore, combineReducers,  applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import userReducer from '../reducers/userReducer'
import contactReducer from '../reducers/contactReducers'

const configurreStore = () => {
    const store = createStore(combineReducers({
        users: userReducer,
        contacts:  contactReducer
    }),applyMiddleware(thunk))
    return store
}


export default configurreStore