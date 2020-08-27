import React, {Component} from 'react'
import Navbar from './Navbar'
import HomePage from './Homepage'


class App extends Component {
  render() {
    const pages = [
        {
            url: "#",
            text: "Noah Burghardt",
        },
        {
            url: "#",
            text: "About Me",
        },
        {
            url: "#",
            text: "Projects",
        },
    ]
    return (
        <div>
            <Navbar pages={pages}/>
            <HomePage />
        </div>
    )
  }
}

export default App