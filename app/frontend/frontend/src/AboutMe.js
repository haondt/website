import React from 'react'

const HeaderCard = () => {
    return (
        <div className="Title">
            <h1>About Me</h1>
        </div>
    )
}

const AnchorCard = (index, props) => {
    return (
        <tr key={index}>
            <td>
                <img src={require(`${props.img}`)} title={props.alt} alt={props.alt}/>
            </td>
            <td>
                <h3>
                    <a href={props.anchor}>{props.text}</a>
                </h3>
            </td>
        </tr>
    )
}

const TextCard = (index, props) => {
    return (
        <tr key={index}>
            <td>
                <img src={require(`${props.img}`)} title={props.alt} alt={props.alt}/>
            </td>
            <td>
                <h3>
                    <p>{props.text}</p>
                </h3>
            </td>
        </tr>
    )
}

const TextCards = (props) => {
    const rows = props.cards.map((row, index) => {
        if ('anchor' in row){
            return AnchorCard(index, row)
        }
        else{
            return TextCard(index, row)
        }
    })

    return (rows)
}

const AboutMe = () => {
    const cards = [
        {
            img: "./images/education.svg",
            alt: "Education",
            text: "B.Sc. Computer Science Software Specialization - University of Alberta 2021"
        },
        {
            img: "./images/skills.svg",
            alt: "Skills",
            text: "Python, Flask, Django, C, C#, Git, SQL, MongoDB, Agile"
        },
        {
            img: "./images/hobbies.svg",
            alt: "Hobbies",
            text: "Baking, 3D Printing, Lifting, Piano, Rocket League"
        },
        {
            img: "./images/mail.svg",
            alt: "Contact",
            anchor: "mailto:BurghardtNoah@gmail.com?",
            text: "BurghardtNoah@gmail.com",
        },
        {
            img: "./images/resume.svg",
            alt: "Resume",
            anchor: "/doc/NoahBurghardt.pdf",
            text: "Download Resume",
        },
    ]
    return (
        <div>
            <HeaderCard />
        <div className="resumeContent">
            <table>
                <tbody>
                    <TextCards cards={cards} />
                </tbody>
            </table>
        </div>
        </div>
    )
}

export default AboutMe