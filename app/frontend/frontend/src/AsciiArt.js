import React, {Component} from 'react'

class AsciiArt extends Component {
    handleSubmit = (event) => {
        event.preventDefault();

        fetch('http://docker/api/ascii-demo/', {
            method: 'GET'/*,
            headers: {
                'Content-Type': 'multipart/form-data'
            }//,
            //body: new FormData(event.target)*/
        }).then(function(response){
            console.log(response)
            return response.json();
        });
    }

    handleChange

    render() { return (
        <div className="demo">
            <form ref="form" onSubmit={this.handleSubmit}>
            <label htmlFor="selectImage">Upload an Image: </label>
            <input name="selectImage" id="selectImage" type="file" accept="image/png, image/jpeg"/><br/><br/>
            <label htmlFor="width">Width (in characters):</label>
            <input type="number" step="1" defaultValue="100"/><br/><br/>
            <input type="submit" value="submit"/>
            </form>
        </div>
    )}

}

export default AsciiArt