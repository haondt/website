import React from 'react'
import  {Link} from 'react-router-dom'


const Navbar = (props) => {
    const buttons = props.pages.map((page, index) => {
        if ("demo" in page){
            return []
        }
        return(<li key={index}><Link to={page.url} target="_self">{page.text}</Link></li>)
    })

    return (
        <div id="navBar">
            <ul>
                {buttons}
            </ul>
        </div>
    )
}

export default Navbar
