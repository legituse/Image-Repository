import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Pagination from 'react-bootstrap/Pagination';

class Images extends React.Component{

    currentPage = 1;
    maxPage=100;
    constructor(props) {
        super(props);
        this.state={
            data: null,
            showModal : false,
            itemCount : 0,
            search : "",
            maxPage : 100
        }
        this.searchTerm = this.searchTerm.bind(this);
        this.searchImages = this.searchImages.bind(this);
        this.getPageCount("");
        this.searchImages("");
        this.searchInput = React.createRef();
        this.getPageCount= this.getPageCount.bind(this);
    }

    openModal(){
        this.setState({showModal: true});
    }
    closeModal(){
        this.setState({showModal : false});
    }

    getPageCount(str){
        fetch("http://localhost/imagerepo/server/services/imagePagination.php"+"?count=0"+str, {
            method: "GET"
        }).then((response) => {
            if (response.status===404){
                console.log("error");
                this.openModal();
            }
            return response.json()})
            .then((jsondata) => {
                this.setState({
                    itemCount : jsondata
                });
                this.setState({
                    maxPage: Math.ceil(this.state.itemCount/3)
                })
            }).catch((err) => console.log(err))
    }

    searchImages(str){
        fetch("http://localhost/imagerepo/server/services/imagePagination.php"+"?page="+this.currentPage+str, {
            method: "GET"
        }).then((response) => {
            if (response.status===404){
                console.log("error");
                this.openModal();
            }
            return response.json()})
            .then((jsondata) => {
                this.setState({
                    data: jsondata.images,
                });
            }).catch((err) => console.log(err))
    }

    searchTerm(e){
        e.preventDefault();
        this.currentPage=1;
        let searchTerm = this.searchInput.current.value;

        if (searchTerm.length>0){
            this.getPageCount("&search="+searchTerm);
            this.searchImages("&search="+searchTerm);
        } else {
            this.getPageCount("");
            this.searchImages("");
        }
        this.setState({
            search: (searchTerm.length>0)? searchTerm : ""
        });
    }

    updatePage(){
        this.getPageCount("&search="+this.state.search);
        this.searchImages("&search="+this.state.search);
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


        let pages = [];

        for (let x = 1; x<= this.state.maxPage; x++){
            pages.push(
                <Pagination.Item key={x}
                                 onClick={() => {
                                     this.currentPage=x;
                                     this.updatePage();
                                 }}
                                 active={x === this.currentPage}>
                    {x}
                </Pagination.Item>,
            );
        }

        return(
            <div className="App">
                <div className="container-fluid">
                    <h4 className="text-center">Search For Images</h4>
                    <form className="justify-content-center form-inline my-1">
                        <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" ref={this.searchInput} />
                        <button className="btn btn-outline-success my-2 my-sm-0" type="submit" onClick={(e) => this.searchTerm(e)}>Search</button>
                    </form>

                    <div className="row">
                        {images}
                    </div>
                    <Pagination size="lg" className="justify-content-center">
                        <Pagination.First onClick={() => {
                            this.currentPage = 1;
                            this.updatePage();
                        }} />
                        <Pagination.Prev onClick={() => {
                            if(this.currentPage!==1) {
                                this.currentPage -= 1;
                                this.updatePage();
                            }
                        }} />
                        {pages}
                        <Pagination.Next onClick={() => {
                            if(this.currentPage!==this.state.maxPage){
                                this.currentPage+=1;
                                this.updatePage()
                            }
                        }} />
                        <Pagination.Last onClick={() => {
                            this.currentPage = this.state.maxPage;
                            this.updatePage();
                        }} />
                    </Pagination>
                    <Modal show={this.state.showModal} onHide={() => this.closeModal()}>
                        <Modal.Header closeButton>
                            <Modal.Title>No Results</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <p>Nothing Found</p>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button className="btn-danger" onClick={() => this.closeModal()}>Close</Button>
                        </Modal.Footer>
                    </Modal>
                </div>
            </div>
        );
    }

}


export default Images;
