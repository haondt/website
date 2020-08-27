import React from 'react'

const HomePage = () => {
    return (
        <div>
            <div id="intro" className="centerContent">
                <table>
                    <tbody>
                    <tr>
                        <td><img src={require("./images/avatar_circle.png")} height="200" alt=""/></td>
                        <td>
                            <h1>
                                I'm Noah Burghardt, a technology enthusiast and aspiring software developer,
                                currently attending the University of Alberta.
                            </h1>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
            <div id="contacts">
                <table>
                    <tbody>

                    <tr>
                        <td><a id="insta" href="https://www.instagram.com/nfishlabs/" target="_blank" rel="noopener noreferrer"> </a></td>
                        <td><a id="github" href="https://github.com/haondt" target="_blank" rel="noopener noreferrer"> </a></td>
                        <td><a id="mail" href="mailto:burghardtnoah@gmail.com?" target="_blank" rel="noopener noreferrer"> </a></td>
                        <td><a id="linkedin" href="https://www.linkedin.com/in/noah-burghardt-438027173/" target="_blank" rel="noopener noreferrer"> </a></td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default HomePage