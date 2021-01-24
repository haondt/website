import React, {Component} from 'react'

class AsciiArt extends Component {
    state = {
        width: 150,
        invert: true,
        braille: true
    }
    fileInput = React.createRef();
    handleSubmit = (event) => {
        event.preventDefault();

        const data = new FormData(event.target);
        data.append('width', this.state.width);
        data.append('invert', this.state.invert);
        data.append('braille', this.state.braille);
        data.append('file', this.fileInput);

        fetch('http://docker/api/ascii-demo/', {
            method: 'POST',
            body: data
        }).then(function(response){
            console.log(response.text())
        });
    }

    handleInputChange = (event) => {
        const target = event.target;
        const value = target.type ==='checkbox' ? target.checked : target.value;
        const name = target.name;
        this.setState({
            [name]: value
        });
    }


    render() { return (
        <div className="demo">
            <form ref="form" onSubmit={this.handleSubmit}>
            <label htmlFor="file">Upload an Image: </label>
            <input name="file" id="file" type="file" ref={this.fileInput} accept="image/png, image/jpeg"/><br/><br/>
            <label htmlFor="width">Width (in characters):</label>
            <input type="number" step="1" defaultValue={this.state.width} onChange={this.handleInputChange}/><br/><br/>
            <input type="checkbox" id="invert" name="invert" checked={this.state.invert} onChange={this.handleInputChange}/>
            <label htmlFor="invert">Invert color</label><br/><br/>
            <input type="checkbox" id="braille" name="braille" checked={this.state.braille} onChange={this.handleInputChange}/>
            <label htmlFor="braille">Use braille characters</label><br/><br/>
            <input type="submit" value="submit"/>
            </form>
        </div>
    )}

}

export default AsciiArt