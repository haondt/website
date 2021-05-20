import React from 'react'
import  {Link} from 'react-router-dom'

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
                <img className="language" src={require(`${skill.img}`).default} title={skill.name} alt=""/>
            </td>
        )
    }))
}


const ProjectCard = (props) => {
    var content = []
    if ("src" in props){
        content.push(
            <td key="0">
                <a href={props.src}>Source</a>
            </td>
        )
    }

    if ("demo" in props){
        content.push(
            <td key="1">
                <Link to={props.demo}>Demo</Link>
            </td>
        )
    }

    content.push(<SkillButtons key="2" skills={props.skills} />)
    return (
        <div className="projectContent">
            <div className="smallContent">
                <h1>{props.title}</h1>
                <p>{props.description}</p>
                <div className="buttons">
                    <table>
                        <tbody>
                            <tr>
                                {content}
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div className="smallContent">
                <img className="projPic" src={require(`${props.img}`).default} alt="" />
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
            src: "https://github.com/haondt/website",
            skills: [
                {
                    img: "./images/projects/css.svg",
                    name: "CSS"
                },
                {
                    img: "./images/projects/html.svg",
                    name: "HTML"
                },
                {
                    img: "./images/projects/react.png",
                    name:"React"
                }
            ]
        },
        {
            title: "Obsidian",
            description: `
                Obsidian is my home server. It runs a medly of services in virtual machines
                and LXC containers under the Proxmox Virtual Environment, as well as acting
                as a playground and tesbed for learning Linux applications.
                `,
            img: "./images/projects/server.jpg",
            skills: [
                {
                    img: "./images/projects/plex.svg",
                    name: "Plex"
                },
                {
                    img: "./images/projects/proxmox.svg",
                    name: "Proxmox"
                },
                {
                    img: "./images/projects/samba.svg",
                    name: "Samba"
                },
            ]
        },
        {
            title: "Ascii-art",
            description: `
                Generates ascii (and unicode) art from images using Numpy,
                Pillow and Scitkit-Image in Python.
                `,
            img: "./images/projects/ascii-art.png",
            src: "https://github.com/haondt/ascii-art",
            demo: "/demos/ascii-art",
            skills: [
                {
                    img: "./images/projects/python.svg",
                    name: "Plex"
                },
            ]
        },
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