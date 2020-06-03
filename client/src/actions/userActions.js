import axios from '../config/axios'



export const startRegisterUser=(formData,redirect)=>{
    return(dispatch)=>{
       axios.post('/users/register',formData)
       .then((response)=>{
        if(response.data.hasOwnProperty('errors')){
            alert(response.data.message)
        }
        else{
            alert('you have successfully registered')
            redirect()
        }
       })
       .catch((err)=>{
           console.log(err)
       })
    }
}

export const setUser = (user) => {
    return {
        type:'SET_USER',
        payload:user
    }
}


export const startLoginUser = (formData,redirect) => {
    return(dispatch) => {
          axios.post('/users/login', formData,redirect)  
            .then((response) => {
                if(response.data.hasOwnProperty("errors")){
                    alert(response.data.message)
                }else{
                    alert("successfully logged in")
                    redirect()
                    console.log(response.data)
                    localStorage.setItem('authtoken',response.data)
                    axios.get('/users/account',{
                        headers:{
                            'x-auth':localStorage.getItem('authtoken')
                        }
                    })
                    .then((response) => {
                            const user= response.data
                            dispatch(setUser(user))
                           
                    })
                }
            })
    }
}


export const startUserLogout=()=>{
    return(dispatch)=>{
        axios.delete('/users/logout',{
            headers:{
                'x-auth':localStorage.getItem('authtoken')
            }
        })
        .then((response)=>{
            if(response.data.notice){
                alert(response.data.notice)
                localStorage.removeItem('authtoken')
                dispatch(setUser({}))
                window.location.href="/"
            }
        })
    }
}