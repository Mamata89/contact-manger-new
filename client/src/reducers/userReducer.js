const UserInitialState = {}

const userReducer = (state=UserInitialState, action) => {
        switch(action.type){
            case 'SET_USER': {
                return {...action.payload}
            }

          
            default:{
                return {...state}
            }
        }
}

export default userReducer