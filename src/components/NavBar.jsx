import { MdOutlineDarkMode, MdOutlineLightMode } from "react-icons/md"
import { useContext, useState, } from "react"
import { MainQuizContext } from "./QuizContext"


function NavBar() {

    const {darkmode, toggleTheme} = useContext(MainQuizContext)

    return (
        <div className="navbar">
            <div className="logo">
                <img src="../logo-img.png" alt="light bulb"/>
                <p>Quizmania</p>
            </div>
            <button className="theme-icon-container" onClick={toggleTheme}><p>Toggle theme</p>{darkmode ? <MdOutlineLightMode /> : <MdOutlineDarkMode />}</button>
        </div>
    )
}

export default NavBar
