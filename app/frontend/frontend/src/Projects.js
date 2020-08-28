import React from 'react'

const HeaderCard = () => {
    return (
        <div className="Title">
            <h1>Some of my Projects</h1>
        </div>
    )
}

const SkillButtons = (props) => {
    return (props.skills.map((skill, index) => {
        return(
            <td key={index}>
                <img className="language" src={require(`${skill.img}`)} title={skill.name} alt=""/>
            </td>
        )
    }))
}

const ProjectCard = (props) => {
    return (
        <div className="projectContent">
            <div className="smallContent">
                <h1>{props.title}</h1>
                <p>{props.description}</p>
                <div className="buttons">
                    <table>
                        <tbody>
                            <tr>
                                <SkillButtons skills={props.skills} />
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div className="smallContent">
                <img className="projPic" src={require(`${props.img}`)} alt="" />
            </div>
        </div>

    )
}

const Projects = () => {
    const projects = [
        {
            title: "This site",
            description: `
                This is a full-stack website, hosted on a vps.
                It is built with ReactJS and Flask, all wrapped up in a
                Docker-Compose stack.
                `,
            img: "./images/projects/website.png",
            skills: [
                {
                    img: "./images/projects/css.svg",
                    name: "CSS"
                },
                {
                    img: "./images/projects/html.svg",
                    name: "HTML"
                }
            ]
        }
    ]


    const projectItems = projects.map((project, index) => {
        return (
            <ProjectCard key={index} {...project}/>
        )
    })

    return (
        <div>
            <HeaderCard />
            {projectItems}
        </div>
    )
}

export default Projects