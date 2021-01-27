import React, {Component} from 'react'

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
        replace: false
    }

    fileInput = React.createRef();

    handleSubmit = (event) => {
        event.preventDefault();
        this.setState({
            disabled: true
        });

        const data = new FormData(event.target);
        data.set('width', this.state.width);
        data.set('invert', this.state.invert);
        data.set('braille', this.state.braille);
        data.append('file', this.fileInput);

        fetch('http://docker/api/ascii-demo/', {
            method: 'POST',
            body: data
        }).then((response) => {
            response.text().then((text) => {
                this.setState({
                    text: text,
                    disabled: false
                });
                if (this.state.replace && this.state.braille){
                    this.setState({
                        text: this.state.text.replace(/⠀/g, "⠄")
                    });
                }
            })
        });
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
            <input name="file" id="file" type="file" ref={this.fileInput} accept="image/png, image/jpeg"/><br/><br/>
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