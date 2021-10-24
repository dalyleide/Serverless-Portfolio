import React, { SyntheticEvent } from "react";
import { AuthService } from "../../services/AuthService";
import { User } from "../../models/UserInterfaces";
import history from "../../utils/history";
import { Link } from "react-router-dom";

interface LoginProps {

    authService: AuthService,
    setUser:(user:User) => void
}

interface LoginState {

    userName: string, 
    password: string, 
    loginSuccessful: boolean, 
    message: string
}

interface CustomEvent {
    target: HTMLInputElement
}

export class Login extends React.Component<LoginProps, LoginState>{

    state: LoginState  = {
        userName: '', 
        password: '',
        loginSuccessful: false, 
        message: ''
    }

    constructor(props: LoginProps) {
        super(props)
    }

    private setPassword(event: CustomEvent){
        this.setState({
            password: event.target.value
        })
    }

    private setUserName(event: CustomEvent){
        this.setState({
            userName: event.target.value
        })
    }

    private async handleSubmit(event: SyntheticEvent) {
        event.preventDefault();
        this.setState({
            message: ''
        })
        if (!this.state.password ||
            !this.state.userName) {
                this.setState({
                    message: 'Please fill all the fields!!!'
                })
        } else {
            try {
                const result = await this.props.authService.login(
                    this.state.userName, 
                    this.state.password
                )
                if (result) {
                    console.log('ok')
                    this.setState({loginSuccessful:true})
                    const user:User = {
                        ...result
                    }
                    console.log('user', user)
                    this.props.setUser(user)
                    history.push('/')
                } else {
                    console.log('erro')
                    this.setState({loginSuccessful:false})
                    this.setState({
                        message: 'Invalid Username or Password'
                    })
                }
            } catch (error) {
                console.log('erro')
                    this.setState({loginSuccessful:false})
                    this.setState({
                        message: 'Invalid Username or Password'
                    })
            }
        }
    }

    render() {

        let loginMessage: any;

        if (this.state.message){
            loginMessage = <label className='error'>{this.state.message}</label>
        }

        return (
            <div>
                <h2>Please login</h2>
                <form onSubmit={e=> this.handleSubmit(e)}>
                    <input value={this.state.userName} onChange ={e => this.setUserName(e)}/><br/>
                    <input value={this.state.password} onChange = {e => this.setPassword(e)} type='password'/><br/>
                    <input type='submit' value='login'/>
                </form>
                {loginMessage}
                <br></br>
                <div><label>Don't have an account?</label> <Link to='signup'>Sign up</Link></div>
            </div>
        )
    }
}