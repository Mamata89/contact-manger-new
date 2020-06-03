import React from 'react'
import axios from '../../config/axios'
import jwtdecode from 'jwt-decode'
import {connect} from 'react-redux'
import {setUser} from '../../actions/userActions'
import isEmail from 'validator/lib/isEmail'


class Login extends React.Component{
    constructor(props){
        super(props)
         this.state={
                email:"",
                password:"",
                loginFail: false ,
                redirect:false,
                emailError:"",
                passwordError:""
                
         }
    }


    handleChange = (e) => {
        e.preventDefault()
        this.setState({
            [e.target.name] : e.target.value,
            loginFail: false 
        })
      
    }

    validate = () => {
        let isError = false
        const error = {
            emailError: "",
            passwordError : ""
        }

        if(this.state.email.length === 0){
            isError = true
            error.emailError = "Please provide email"
        }

        if(this.state.email.length > 0) {
            if(!isEmail(this.state.email)){
                isError = true
                error.emailError = "Please provide valid email"
            }
        }

        if(this.state.password.length === 0){
            isError = true
            error.passwordError = "Please provide Password"
        }


        this.setState({
            ...this.state,
            ...error
        })
        return isError


    }

    handleSubmit = (e) => {
        e.preventDefault()  
        let err = this.validate()
        if(!err){
            const formData = {
                email:this.state.email,
                password:this.state.password
            }
    
            axios.post('/users/login', formData)
                .then((response) => {
                    localStorage.setItem('authtoken', response.data)
                    this.props.dispatch(setUser(jwtdecode(response.data)))
                    
                    
                    this.setState({redirect:true})
                })
                .catch((err) => {
                    this.setState({loginFail: true})
                })
        }
        
    }

    render(){
        return(

           
            <>
             {this.state.redirect && this.props.history.push("/")}

             {this.state.loginFail && <h1>Invald Email or Password</h1>}
                <form onSubmit={this.handleSubmit}>
                    Email : <input type="email" name="email" value={this.state.email} onChange={this.handleChange}/><br/>
        <p>{this.state.emailError}</p>
                    Password:<input type="password"  name="password" value={this.state.password} onChange={this.handleChange}/>
        <p>{this.state.passwordError}</p>
                    <input type="submit" value="submit"/>
                </form>

            </>
        )
    }
}

export default connect()(Login)