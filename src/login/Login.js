import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";


class Login extends React.Component{

    errorMessage= "";
    loginErrorDisplayed=false;
    constructor(props) {
        super(props);
        this.state = {
            showModal: false,
        };
    }

    openModal(){
        this.setState({showModal: true});
    }
    closeModal(){
        this.setState({showModal : false});
        this.errorMessage="";
        this.loginErrorDisplayed=true;
    }


    render() {
        if(this.props.loginResult && !this.loginErrorDisplayed){
            this.errorMessage="Login Failed";
        }
        this.loginErrorDisplayed=false;

        if(localStorage.getItem('expiry')!==null && localStorage.getItem('jwt')!==null && Date.now()>localStorage.getItem('expiry')){
            localStorage.removeItem('jwt');
            localStorage.removeItem('expiry');
            this.errorMessage="Login Expired";
        }


        return (
            <div className="container" >
                <h1 className="text-center my-lg-4" >Login Here</h1>
                <form onSubmit={this.props.loginInput} method="post">
                    <div className="form-group">
                        <label htmlFor="username">Username: </label>
                        <input id="username" name="username" type="text" className="form-control" placeholder="Username"
                               required="" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password: </label>
                        <input id="password" name="password" type="password" className="form-control" placeholder="Password"
                               required="" />
                    </div>
                    <div className="form-group text-center">
                        <button className="btn btn-primary" type="submit" id="loginButton" >Log in</button>
                    </div>
                </form>
                <p className="text-center"><a href="./registerPage.php">Create an Account</a></p>
                <Modal show={this.state.showModal || this.errorMessage.length>0} onHide={() => this.closeModal()}>
                    <Modal.Header closeButton>
                        <Modal.Title>Error</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <p>{this.errorMessage}</p>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button className="btn-danger" onClick={() => this.closeModal()}>Close</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }

}


export default Login;

