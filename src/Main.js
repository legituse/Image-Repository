import React from 'react';
import App from "./App";



class Main extends React.Component{

    loginFailed=false;

    constructor(props) {
        super(props);
        this.state = {
            jwt: null
        }
        this.handleLoginInput = this.handleLoginInput.bind(this);
        this.handleLogout = this.handleLogout.bind(this);

    }


    handleLoginInput(e){
        e.preventDefault();

        let user = e.target.elements.username.value;
        let pass = e.target.elements.password.value;
        localStorage.removeItem('expiry');


        fetch("http://localhost/imagerepo/server/controllers/login.php", {
            body: JSON.stringify({
                usr: user,
                pwd: pass
            }),
            headers: {
                "Content-Type": "application/json"
            },
            method: "POST"
        })
            .then(response => response.json())
            .then(data => {
                if (!data.jwt){
                    this.loginFailed=true;
                }else {
                    localStorage.setItem('jwt', data.jwt);
                    localStorage.setItem('expiry', data.expireAt*1000);
                }
                this.setState({
                    jwt: data.jwt || this.state.jwt
                });
                e.target.elements.username.value = null;
                e.target.elements.password.value = null;
            })
    }

    handleLogout(){
        this.setState({
            jwt: null
        })
        localStorage.removeItem('jwt');
    }

    render() {
        console.log(localStorage.getItem('jwt'), Date.now()<localStorage.getItem('expiry'), localStorage.getItem('expiry'));
        return (
            <main>
                <App loginInput={this.handleLoginInput} handleLogout={this.handleLogout} loginResult={this.loginFailed} />
            </main>
        );
    }


}

export default Main;