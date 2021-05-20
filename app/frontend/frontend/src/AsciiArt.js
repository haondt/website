import React, {Component} from 'react'
import configData from './config.json'

const AsciiDisplay = (props) => {
    return (
        <div>
            <textarea readOnly defaultValue={props.text}/>
        </div>
    )
}
class AsciiArt extends Component {
    state = {
        width: 80,
        invert: true,
        braille: true,
        text: "",
        disabled: false,
        replace: false,
        file_size: 0
    }

    fileInput = React.createRef();

    handleSubmit = (event) => {
        event.preventDefault();

        const data = new FormData(event.target);
        data.set('width', this.state.width);
        data.set('invert', this.state.invert);
        data.set('braille', this.state.braille);
        data.append('file', this.fileInput);

        // Ensure the file size is reasonable
        if (this.state.file_size === 0){
            this.setState({
                text: "Error in reading image."
            })
            return;
        }
        else if (this.state.file_size > 2000000){
            this.setState({
                text: "File size too large. Please select a file smaller than 2.0 MB"
            })
            return;
        }

        // Disable the UI while we wait for the backend response
        this.setState({
            disabled: true
        });

        fetch(new URL('/api/ascii-demo/', configData.BACKEND_URL), {
        //fetch('http://docker/api/ascii-demo/', {
            method: 'POST',
            body: data,
            mode: 'no-cors'
        }).then((response) => {
            response.text().then((text) => {
                    this.setState({
                        disabled: false
                    });
                if (response.ok){
                    this.setState({
                        text: text
                    });
                    if (this.state.replace && this.state.braille){
                        this.setState({
                            text: this.state.text.replace(/⠀/g, "⠄")
                        });
                    }
                }
                else{
                    this.setState({
                        text: "Error: Try a different image or character width"
                    })
                }
            })
        });
    }

    handleFileChange = (event) => {
        try{
            this.setState({
                file_size: event.target.files[0].size
            });
        }
        catch (e) {
            this.setState({
                file_size: 0
            });
        }
    }

    handleInputChange = (event) => {
        const target = event.target;
        let value = target.value;
        if (target.type === "number"){
            value = parseInt(target.value);
        }
        else if (target.type === "checkbox"){
            value = target.checked;
        }
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    render() { return (
        <div className="demo">
            <h1>Ascii-art</h1>
            <p>
                Upload an image to turn it into art made with text!
            </p><br/><br/>
            <fieldset disabled={this.state.disabled}>
            <form ref="form" onSubmit={this.handleSubmit}>
            <label htmlFor="file">Upload an Image: </label>
            <input name="file" id="file" type="file" ref={this.fileInput} accept="image/png, image/jpeg" onChange={this.handleFileChange}/><br/><br/>
            <label htmlFor="width">Width (in characters): </label>
            <input type="number" id="width" name="width" step="1" defaultValue={String(this.state.width)} onChange={this.handleInputChange}/><br/><br/>
            <input type="checkbox" id="invert" name="invert" checked={this.state.invert} onChange={this.handleInputChange}/>
            <label htmlFor="invert">Invert color</label><br/><br/>
            <input type="checkbox" id="braille" name="braille" checked={this.state.braille} onChange={this.handleInputChange}/>
            <label htmlFor="braille">Use braille characters</label><br/><br/>
            <input type="checkbox" id="replace" disabled={!this.state.braille} name="replace" onChange={this.handleInputChange}/>
            <label htmlFor="replace">Replace empty braille character with single point character (may help with alignment)</label><br/><br/>
            <input type="Submit" id="submit"/>
            </form>
            </fieldset>
            <AsciiDisplay text={this.state.text}/>
        </div>
    )}

}

export default AsciiArt