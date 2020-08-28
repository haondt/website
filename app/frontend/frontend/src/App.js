import React, {Component} from 'react'
import Navbar from './Navbar'
import HomePage from './Homepage'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import AboutMe from './AboutMe'
import Projects from './Projects'

const SwichFactory = (props) => {
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
            url: "/pages/aboutme",
            text: "Resume",
            page: <AboutMe />
        },
        {
            url: "/pages/projects",
            text: "Projects",
            page: <Projects />
        },
    ]
    return (
        <Router>
            <link href="https://fonts.googleapis.com/css?family=Roboto" rel="stylesheet" />
            <Navbar pages={pages}/>

            <SwichFactory pages={pages} />

        </Router>
    )
  }
}

export default App