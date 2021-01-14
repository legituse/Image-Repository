import React from "react";


class Upload extends React.Component {

    tagSpanClass = [
        "badge badge-pill badge-primary",
        "badge badge-pill badge-secondary",
        "badge badge-pill badge-success",
        "badge badge-pill badge-danger",
        "badge badge-pill badge-warning",
        "badge badge-pill badge-info",
        "badge badge-pill badge-light",
        "badge badge-pill badge-dark"
    ]


    constructor(props) {
        super(props);

        this.state = {
            tags: []
        }
        this.imageInput = React.createRef();
        this.tagInput = React.createRef();
        this.addTag = this.addTag.bind(this);
        this.uploadImg = this.uploadImg.bind(this);
    }

    addTag(e){
        e.preventDefault();
        let textToAdd = this.tagInput.current.value.replace(/ .*/,'');
        if (this.state.tags.length<8 && textToAdd.length<16 && textToAdd.length>1){
            this.setState({
                tags: [...this.state.tags, textToAdd]
            })
        }
        this.tagInput.current.value='';
    }

    updateName(e){
        let filename=e.target.value.split("\\").pop();
        e.target.nextSibling.classList.add("selected")
        e.target.nextSibling.innerHTML=filename;
    }

    uploadImg(e){
        e.preventDefault();
        if (!this.state.tags.length>0 || this.imageInput.current.files.length===0){
            return;
        }
        const form = new FormData();
        let fileEXT = this.imageInput.current.files[0].name.split('.').pop();
        form.append(this.imageInput.current.name, this.imageInput.current.files[0], this.state.tags.join('-')+'.'+fileEXT);
        console.log(this.imageInput.current);
        fetch("http://localhost:80/imagerepo/server/services/uploadImage.php", {
            headers: new Headers({
                "Authorization" : "Bearer "+localStorage.getItem('jwt')
            }),
            method: "POST",
            mode: "cors",
            body: form
        })
            .then((response) => {
                if (response.status===401){
                    window.location.href="/login";
                }
                else if (response.status===200){
                    window.location.reload(false);
                }
                return response.json()})
            .then(data => console.log(data))
            .catch(err => {
            console.error(err);
        });
    }

    render() {

        let tags=<p> </p>;
        let numTags = this.state.tags.length;
        if (numTags>0){
            tags = []
            for (let x = 0; x< numTags; x++){
                tags.push(<span className={"mx-1 " + this.tagSpanClass[x]}>{this.state.tags[x]}</span>)
            }
        }

        return(
            <div className="container">
                <h1 className="text-center my-lg-5">Upload your Image Here</h1>
                <form>
                    <div className="custom-file">
                        <input type="file" name="imageFile" className="custom-file-input" id="imageFile" accept="image/*" ref={this.imageInput} onChange={(e) => this.updateName(e)} />
                        <label className="custom-file-label" htmlFor="customFile">Choose file</label>
                    </div>
                    <h3 className="my-sm-4">Add Some Tags That Describe The Image</h3>
                    <small className="float-md-right">1 Word Per Tag & Max 8</small>
                    <div className="input-group mb-3">
                        <div className="input-group-prepend">
                            <button className="btn btn-outline-success my-2 my-sm-0" type="submit" onClick={(e) => this.addTag(e)}>Add Tag</button>
                        </div>
                        <input className="form-control" type="addtag" ref={this.tagInput} placeholder="Tag Word" aria-label="addtag" />
                    </div>
                    <span>
                        {tags}
                    </span>
                    <input className="btn btn-info btn-lg btn-outline-dark btn-block" type="button" onClick={(e)=> this.uploadImg(e)} name="submit" value="Submit" />
                </form>
            </div>
        );
    }

}

export default Upload;