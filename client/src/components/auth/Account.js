import React from 'react'
import {connect} from 'react-redux'
function Account(props) {
    console.log(props)
    return(
        <>
                <h1>Account Page</h1>
                <h6>Name:{props.users.username}</h6> 
                <h6>Emai:{props.users.email}</h6>
                
        </> 
    )
}

const mapStateToProps = (state) => {
        return {
            users:state.users
        }
}   

export default connect(mapStateToProps)(Account) 