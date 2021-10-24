import React from "react";
import { User } from "../models/UserInterfaces";
import { AuthService } from "../services/AuthService"
import { Login } from "./auth/Login"
import { Router, Route, Switch } from 'react-router-dom'
import history from "../utils/history"
import { Navbar } from "./Navbar";
import { Home } from "./Home";
import { TravelPackageService } from "../services/TravelPackageService";
import { CreateTravelPackage } from "./travel-package/CreateTravelPackage"
import { Reservations } from "./reservation/Reservations"
import { UpdateTravelPackages } from './travel-package/UpdateTravelPackages'
import { SignUp } from "./auth/SignUp";

interface AppState {
  user: User | undefined
}


export class App extends React.Component<{}, AppState>{

  private authService: AuthService = new AuthService();
  private travelService: TravelPackageService = new TravelPackageService();

  constructor(props:any) {
    super(props)
    this.state = {
      user:undefined
    }
    this.setUser = this.setUser.bind(this)
  }

  private setUser(user:User){
    this.setState({
      user:user
    })
    console.log('setting user!: ' + user)
  }

  render(){
    if (this.state.user) {
      return(<div>
          <Router history={history}>
            <div>
              <Navbar user={this.state.user}/> 
              <Switch>
                <Route exact path='/' >
                  <Home user={this.state.user}/>
                </Route>
                <Route exact path='/create'>
                  <CreateTravelPackage user={this.state.user}/>
                </Route>
                <Route exact path='/mantain'>
                  <UpdateTravelPackages user={this.state.user}/>
                </Route>
                <Route exact path='/reservations'>
                  <Reservations user={this.state.user}/>
                </Route>
                <Route exact path='/login'>
                  <Login authService={this.authService} setUser={this.setUser} />
                </Route>
                <Route exact path='/signup'>
                  <SignUp authService={this.authService} />
                </Route>
              </Switch>
            </div>
          </Router>
        </div>)}
      else {
        return this.loginRender()
      }
  }

  loginRender(){
    return (<div>
        <Router history={history}>
          <Switch>
              <Route exact path='/login'>
                  <Login authService={this.authService} setUser={this.setUser} />
                </Route>
              <Route exact path='/signup'>
                  <SignUp authService={this.authService} />
              </Route>
            </Switch>
        </Router>
      </div>)
  }
}
