/** @type {e:Event} */
import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";


class Register extends React.Component{

    
    constructor(props) {
        super(props);
        this.state = {
            showModal: false,
            successDialog: false,
            errorMessage: "",
            user: "",
            pass: ""
        };
    }


    closeModal(){
        this.setState({showModal : false});
    }

    handleInputChange(e){
        if(e.target.name==="username"){
            this.setState({
                user : e.target.value
            })
        }
        else if(e.target.name==="password"){
            this.setState({
                pass: e.target.value
            })
        }

    }

    registerUser(e){
        
        e.preventDefault();
        if(this.state.user.length <= 5 || this.state.pass.length <=5 ){
            this.setState({
                errorMessage : "Username and Password must be at least 6 Characters",
                showModal : true
            })
        }
        else{
            fetch("http://localhost/imagerepo/server/controllers/register.php", {
            body: JSON.stringify({
                usr: this.state.user,
                pwd: this.state.pass
            }),
            headers: {
                "Content-Type": "application/json"
            },
            method: "POST"
            }).then(response => {
                if(response.status===200){
                     this.setState({
                         successDialog: true
                     })
                }else{
                    this.setState({
                        errorMessage : "Unable to register the user, Username may be taken",
                        showModal : true,
                        successDialog: false
                    })
                }
            })

        }
        e.target.reset();
            
    }

    

    render() {
    
        return (
            <div className="container" >
                <h1 className="text-center my-lg-4" >Register Here</h1>
                {(this.state.successDialog)? <h1 className="text-center my-lg-4 text-success" >Account Created! Login now</h1> : null}
                <form onSubmit={(e) => this.registerUser(e)} method="post">
                    <div className="form-group">
                        <label htmlFor="username">Username: </label>
                        <input id="username" name="username" type="text" className="form-control" placeholder="Username"
                               required="" onChange={(e) => this.handleInputChange(e)} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password: </label>
                        <input id="password" name="password" type="password" className="form-control" placeholder="Password"
                               required="" onChange={(e) => this.handleInputChange(e)} />
                    </div>
                    <div className="form-group text-center">
                        <button className="btn btn-primary" type="submit" id="loginButton" >Register</button>
                    </div>
                </form>
                <p className="text-center"><Link className="nav-link" to={'/login'}>Login Here</Link></p>
                <Modal show={this.state.showModal} onHide={() => this.closeModal()}>
                    <Modal.Header closeButton>
                        <Modal.Title>Error</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <p>{this.state.errorMessage}</p>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button className="btn-danger" onClick={() => this.closeModal()}>Close</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }

}


export default Register;

