import React, {Component} from 'react'
import  {Link} from 'react-router-dom'


class Navbar extends Component {

    state = {
        activeLink: null,
    };

    // Set the activeLink id in the state
    handleClick = id => {
        this.setState({activeLink: id});
    }

    render() {
        // Grab the links and active link id from the state
        const { activeLink } = this.state;

        return (
            <div id="navBar">
                <ul>
                    {
                        this.props.pages.map((page, index) => {
                        if ('demo' in page){
                            return []
                        }
                        return(<li key={index}><Link 
                                to={page.url} 
                                target="_self" 
                                onClick={() => this.handleClick(index)}
                                className={index === activeLink ? "active" : ""}
                            >{page.text}</Link></li>)
                        })
                    }
                </ul>
            </div>
        )
    }
}


export default Navbar
