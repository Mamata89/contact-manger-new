import React from 'react'
import {connect} from 'react-redux'

function ContactsList() {
    return(
        <>
                <h1>Contact List Page</h1>

        </> 
    )
}

const mapStateToProps = (state) => {
    return{
        users:state.users
    }
}

export default connect(mapStateToProps)(ContactsList)