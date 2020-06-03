import axios from '../config/axios'


export const setContacts = (contacts) => {
    return {
        type:'SET_CONTACTS',
        payload: contacts
    }
}

export const StartSetContacts = () => {
    return(dispatch) => {
        axios.get('/', {
            headers:{
                'x-auth' : localStorage.getItem('authtoken')
            }
        })
        .then((response) => {
            const contact = response.data
            dispatch(setContacts(contact))
        })
    }
}