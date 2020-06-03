import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';

import {Provider} from 'react-redux'
import {setUser} from  './actions/userActions'
import { setContacts} from './actions/contactActions'
import configurreStore from  './store/configureStore'
import axios from './config/axios';


const store = configurreStore()

store.subscribe( () => {
    console.log(store.getState())
})

if(localStorage.getItem('authtoken')) {
    axios.get('/users/account',{
        headers :{
            'x-auth':localStorage.getItem('authtoken')
        }
    })
    .then((response) => {
            //console.log(response.data)
            const user= response.data
            store.dispatch(setUser(user))
            store.dispatch(setContacts())
    })
}

const jsx = (
    <Provider store={store}>
        <App/>
    </Provider>
)








ReactDOM.render(jsx,document.getElementById('root')
);

