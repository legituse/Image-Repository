import React from "react";
import "./Homepage.css";

class Homepage extends React.Component{

    constructor(props) {
        super(props);
        this.state={
            data: null,
        }
        this.getLatestImages = this.getLatestImages.bind(this);
        this.getLatestImages();
    }

    getLatestImages(){
        fetch("http://localhost/imagerepo/server/services/getLatestImages.php", {
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

   

    render() {
        let images = <p>No Data</p>;
        if (this.state.data){
            images=[];
            for (const name in this.state.data) {
                images.push(
                    <div key={name.split("-")[0]} className="col-lg-4 col-md-4 col-xs-6">
                        <img className="img-thumbnail" key={name.split("-")[0]} src={this.state.data[name]} alt={name}   />
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
