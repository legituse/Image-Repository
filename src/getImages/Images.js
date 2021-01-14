import React from "react";


class Images extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            data: []
        };
        this.getData = this.getData.bind(this);
        this.getData();
    }

    getData(){
        fetch("http://localhost/imagerepo/server/services/getImages.php", {
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
                console.log(this.state.data);
            })
    }

    render() {
        let images = <p>No Access</p>;
        if (this.state.data){
            images=[];
            for (const name in this.state.data) {
                images.push(<img src={this.state.data[name]} alt={name} height="250px" width="250px" />);
            }
        }

        return(

            <div className="container">
                <h1 className="text-center">All Images</h1>
                {images}
            </div>
        );
    }

}


export default Images;