import React from 'react'


const Navbar = (props) => {
    const buttons = props.pages.map((page, index) => 
        <li key={index}><a href={page.url} target="_self">{page.text}</a></li>
    )

    return (
        <div id="navBar">
            <ul>
                {buttons}
            </ul>
        </div>
    )
}

export default Navbar
