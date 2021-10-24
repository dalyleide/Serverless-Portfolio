import React, { SyntheticEvent } from "react";
import { AuthService } from "../../services/AuthService";
import history from '../../utils/history'

interface CustomEvent {
    target: HTMLInputElement
}

interface SignUpState {
    userName: string,
    password: string,
    email: string
    confirmPassword: string,
    message: string
}

export class SignUp extends React.Component<{ authService: AuthService}, SignUpState> {

    state: SignUpState = {
        userName: '',
        password: '',
        email: '',
        confirmPassword: '',
        message: ''
    }

    private async signUp(event: SyntheticEvent){
        event.preventDefault();
        if (!this.state.confirmPassword ||
            !this.state.email ||
            !this.state.password ||
            !this.state.userName) {
                this.setState({
                    message: 'Please fill all the fields!!!'
                })
        } else if (this.state.password !== this.state.confirmPassword) {
            this.setState({
                message: 'Check passwords fields!'
            })
        } else {
            const result = await this.props.authService.createUser(
                this.state.userName,
                this.state.email,
                this.state.password
                
            )
            if (result) {
                history.push('/login')
            } else {
                this.setState({
                    message: 'There was an error while signing up!!!'
                })
            }
        }
    }

    private setUserName(event: CustomEvent){
        this.setState({userName: event.target.value})
    }

    private setEmail(event: CustomEvent){
        this.setState({email: event.target.value})
    }

    private setPassword(event: CustomEvent){
        this.setState({password: event.target.value})
    }

    private setConfirmPassword(event: CustomEvent){
        this.setState({confirmPassword: event.target.value})
    }

    private renderSingUpForm(){

         return <div className= 'form-registration'>
            <h2>Please register</h2>
            <form onSubmit={e => this.signUp(e)}>
            <label>User name: </label>
            <input value={this.state.userName} onChange = {e => this.setUserName(e)}/>
            <label>Email:  </label>
            <input value={this.state.email} onChange = {e => this.setEmail(e)}/>
            <label>Password: </label>
            <input value={this.state.password} onChange = {e => this.setPassword(e)} type='password'/>
            <label>Confirm password: </label>
            <input value={this.state.confirmPassword} onChange = {e => this.setConfirmPassword(e)} type='password'/>
            <input type='submit' value='Register'/>
            </form>
            {this.renderMessage()}
        </div> 
    }

    private renderMessage(){
        if (this.state.message) {
            return <label className='error'> {this.state.message}</label>
        }
    }

    render(){
            return (
                <div>
                  {this.renderSingUpForm()}
                </div>
            )
    }
}