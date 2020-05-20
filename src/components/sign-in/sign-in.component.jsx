import React, { Component } from 'react'
import './sign-in.styles.scss'
import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';
import { signInWithGoogle } from '../../firebase/firebase.utils';
import { auth } from '../../firebase/firebase.utils'

export class SignIn extends Component {

    constructor(){
        super();
        this.state={
            email:'',
            password:''
        }
    }

    handleChange = event =>{
        const {name,value} = event.target

        this.setState({[name]:value})
    }

    handleSubmit = async event =>{
        event.preventDefault();
        const {email, password} = this.state
        try {
            await auth.signInWithEmailAndPassword(email,password)
            this.setState({email:'', password:''})
        } catch (error) {
            console.log(error)
        }

    }
    render() {
        return (
            <div className='sign-in'>
                <h2>I already have an account</h2>
                <span className='title'>Sign in with your email and password</span>
                <form onSubmit={this.handleSubmit} autoComplete='off'>
                    <FormInput label='email' name='email' type="email" onChange={this.handleChange} value={this.state.email} />
                    <FormInput label='password' name='password' type="password" onChange={this.handleChange} value={this.state.password} />
                    <div className="buttons">
                        <CustomButton type="submit">SIGN IN</CustomButton>
                        <CustomButton type='button' onClick={signInWithGoogle} isGoogleSignIn >SIGN IN WITH GOOGLE</CustomButton>
                    </div>
                </form>
            </div>
        )
    }
}

export default SignIn
