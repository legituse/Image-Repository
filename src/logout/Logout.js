import React from "react";
import {Redirect} from "react-router-dom";


class Logout extends React.Component{

    constructor(props) {
        super(props);
        this.props.handleLogout();
    }

    render() {
        return(<Redirect to={'/login'} />)
    }

}

export default Logout;