import React from 'react'


const AsciiArt = () => {
    return (
        <div className="demo">
            Upload an image:
            <form>
            <input name="selectImage" id="selectImage" type="file" 
            accept="image/png, image/jpeg"/>
            </form>
        </div>
    )
}

export default AsciiArt