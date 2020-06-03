import React from 'react'
import { startRegisterUser } from '../../actions/userActions'
import { connect } from 'react-redux';
import isEmail from 'validator/lib/isEmail'
class Register extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            username: "",
            email: "",
            password: "",
            nameError:"",
            emailError:"",
            paswordError:""
        }
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

  
    validate = () => {
        let isError = false
        const error = {
            nameError: '',
            emailError: '',
            passwordError: ''

        }
        if (this.state.username.length === 0) {
            isError = true
            error.nameError = 'Please Provide User Name'
        }
        if (this.state.email.length === 0) {
            isError = true
            error.emailError = 'Please Provide email  '
        }
        if(this.state.email.length > 0){
          if(!isEmail(this.state.email)){
            isError = true
            error.emailError = 'Provide valid Email'
          }



        }
        if (this.state.username.length > 0 && this.state.username.length < 3) {
            isError = true
            error.nameError = 'Must contain min 3 Character'
        }


        if (this.state.password.length === 0) {
            isError = true
            error.passwordError = 'Please Provide Password'
        }
        if (this.state.password.length > 0 && this.state.password.length < 6) {
            isError = true
            error.passwordError = 'Must Contain 6 characters'
        }

        this.setState(() => ({
            ...this.state,
            ...error
        }))
        return isError
    }
















    handleSubmit = (e) => {
        e.preventDefault()
        let err = this.validate()

        if(!err) {
            const formData = {
                username: this.state.username,
                email: this.state.email,
                password: this.state.password
            }
    
            const redirect = () => {
                return this.props.history.push("/")
            }
    
            this.props.dispatch(startRegisterUser(formData, redirect))
    
            console.log(formData)
        }
        
    }



    render() {
        return (
            <>
                <form onSubmit={this.handleSubmit}>
                    <div>
                        Username: <input type="text" name="username" value={this.state.username} onChange={this.handleChange} />
        <span style={{ color: 'red' }}>{this.state.nameError }</span>
                    </div>

                    <div>
                    Email: <input type="email" name="email" value={this.state.email} onChange={this.handleChange} />
                    <span  style={{ color: 'red' }} > {this.state.emailError} </span>
                    </div>


                    <div>
                    Password : <input type="password" name="password" value={this.state.password} onChange={this.handleChange} />      
                      <span style={{ color: 'red' }}> {this.state.passwordError} </span>

                    </div>
                    
                   
                    <input type="submit" value="submit" />

                </form>
            </>
        )
    }
}

export default connect()(Register)