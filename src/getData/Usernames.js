import React from "react";


class Usernames extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            data : []
        };
        this.getData= this.getData.bind(this);
        this.getData();
    }


    getData(){
        fetch("http://localhost/imagerepo/server/services/getData.php", {
            headers: new Headers({
                "Authorization" : "Bearer "+localStorage.getItem('jwt'),
                "Content-Type" : "multipart/form-data"
            }),
            method: "POST",
            mode: "cors",
        }).then((response) => {
            if (response.status===401){
                window.location.href="/login";
            }
            return response.json()})
            .then((jsondata) => {
                this.setState({
                    data: jsondata
                });
            })
    }



    render() {
        let users = <p>No Access</p>;
        if (this.state.data){
            users = this.state.data.map((user) => {
                return(<li>{user}</li>);
            });
        }


        return(
            <div className="container">
                <h1 className="text-center">The List Of Users</h1>
                <ul className="text-center">
                    {users}
                </ul>
            </div>
        );
    }
}



export default Usernames;