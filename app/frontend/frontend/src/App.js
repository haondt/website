import React, {Component} from 'react'
import Navbar from './Navbar'
import HomePage from './Homepage'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import AboutMe from './AboutMe'
import Projects from './Projects'
import AsciiArt from './AsciiArt'
import Boids from './Boids'

const SwitchFactory = (props) => {
    const routes = props.pages.map((route, index) => {
        return (
            <Route key={index} exact path={route.url}>
                {route.page}
            </Route>
        )
    })

    return (
        <Switch>
            {routes}
        </Switch>
    )
}

class App extends Component {
  render() {
    const pages = [
        {
            url: "/",
            text: "Noah Burghardt",
            page: <HomePage />
        },
        {
            url: "/aboutme",
            text: "Resume",
            page: <AboutMe />
        },
        {
            url: "/projects",
            text: "Projects",
            page: <Projects />
        },
        {
            url: "/demos/ascii-art",
            text: "Ascii-Art",
            page: <AsciiArt />,
            demo: true
        },
        {
            url: "/demos/boids",
            text: "Boids",
            page: <Boids />,
            demo: true
        },
    ]
    return (
        <Router>
            <link href="https://fonts.googleapis.com/css?family=Roboto" rel="stylesheet" />
            <Navbar pages={pages}/>
            <SwitchFactory pages={pages} />
        </Router>
    )
  }
}

export default App