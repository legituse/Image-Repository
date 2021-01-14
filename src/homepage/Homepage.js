import React from "react";
import "./Homepage.css";

class Homepage extends React.Component{

    constructor(props) {
        super(props);
        this.state={
            data: null,
        }
        this.searchTerm = this.searchTerm.bind(this);
        this.searchImages = this.searchImages.bind(this);
        this.searchImages("");
    }

    searchImages(str){
        fetch("http://localhost/imagerepo/server/services/getImage.php"+str, {
            method: "GET"
        }).then((response) => {
            if (response.status===404){
                console.log("error");
            }
            return response.json()})
            .then((jsondata) => {
                this.setState({
                    data: jsondata
                });
            })
    }

    searchTerm(e){
        e.preventDefault();
        let searchTerm = e.target.parentElement.children[0].value;
        if (searchTerm.length>2){
            this.searchImages("?search="+searchTerm);
        }
        e.target.parentElement.children[0].value=null;
    }

    render() {
        let images = <p>No Access</p>;
        if (this.state.data){
            images=[];
            for (const name in this.state.data) {
                images.push(
                    <div className="col-lg-4 col-md-4 col-xs-6">
                        <img className="img-thumbnail" key={name} src={this.state.data[name]} alt={name}   />
                    </div>
                );
            }
        }
        return(
            <div className="App">
                <div className="container-fluid">
                    <h2 className="text-left">Latest Additions</h2>
                    <div className="row">
                        {images}
                    </div>
                </div>
            </div>
        );
    }

}


export default Homepage;