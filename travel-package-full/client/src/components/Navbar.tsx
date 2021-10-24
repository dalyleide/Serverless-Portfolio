import React from "react"
import {User} from "../models/UserInterfaces"
import {Link} from 'react-router-dom'

export class Navbar extends React.Component<{ user: User | undefined}> {

    render(){

        let loginLogOut: any
        if (this.props.user){
            loginLogOut = <Link to = '/logout' style={{float:"right"}}>{this.props.user.userName}</Link>
        } else {
            loginLogOut = <Link to = '/login' style={{float:"right"}}>Login</Link>
        }
        let retorno: any =''
        if (!this.props.user) {
            retorno = loginLogOut
        }
        else if (this.props.user?.isAdmin) {
            retorno = (
                <div className='navbar'>
                    <Link to='/'>Home</Link>
                    <Link to='/reservations'>Reservations</Link>
                    <Link to='/mantain'>Mantain T.Pckges</Link>
                    <Link to='/create'>Create T.Pckg</Link>
                    {loginLogOut}
                </div>
            )
        } else {
            retorno = (
                <div className='navbar'>
                    <Link to='/'>Home</Link>
                    <Link to='/reservations'>Reservations</Link>
                    {loginLogOut}
                </div>
            )
        }
        return retorno 
    }
}