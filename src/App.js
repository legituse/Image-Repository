import './App.css';
import Login from "./login/Login";
import Homepage from "./homepage/Homepage";
import Logout from "./logout/Logout"
import Images from "./getImages/Images";
import Upload from "./uploadImage/Upload";
import Register from "./register/Register";
import React from 'react';
import {Route, Switch, Redirect, Link} from 'react-router-dom';


class App extends React.Component{


    render() {
        return (
            <div>
                <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                    <a className="navbar-brand" href="/">ImageRepo</a>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarColor01"
                            aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarColor01">
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item active">
                                <Link className="nav-link" to={'/'}>Home <span className="sr-only">(current)</span></Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to={'/all'}>All Images</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to={'/upload'}>Upload</Link>
                            </li>


                        </ul>
                        <Link to='/logout'>
                            <button className={(localStorage.getItem('jwt')!==null)? "btn btn-outline-danger" : "btn btn-outline-primary"} type="button">{(localStorage.getItem('jwt')!==null)? "Logout" : "Login"}</button>
                        </Link>
                    </div>
                </nav>
                <Switch>
                    <Route path="/" exact>
                        <Homepage />
                    </Route>
                    <Route path="/register" exact>
                        <Register />
                    </Route>
                    <Route path="/login">
                        {(localStorage.getItem('expiry')!==null && localStorage.getItem('jwt')!==null && Date.now()<localStorage.getItem('expiry') )? <Redirect to="/"/> : <Login loginInput={this.props.loginInput} loginResult={this.props.loginResult} /> }
                    </Route>
                    <Route path="/logout">
                        <Logout handleLogout={this.props.handleLogout} />
                    </Route>
                    <Route path="/all">
                        <Images />
                    </Route>
                    <Route path="/upload">
                        <Upload />
                    </Route>
                </Switch>
            </div>
        );
    }
}


export default App;
