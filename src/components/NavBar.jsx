import { MdOutlineDarkMode, MdOutlineLightMode } from "react-icons/md"
import { useContext, useState, } from "react"
import { MainQuizContext } from "./QuizContext"
// import { logo } from "./"


function NavBar() {

    // const [darkmode, setDarkmode] = useState(() => checkUserDarkTheme() ? true : false)

    // function checkUserDarkTheme() {
    //     return (window.matchMedia("(prefers-color-scheme: dark)").matches)
    // }
 
    // function toggleTheme() {
 
    //     setDarkmode(prevMode => !prevMode)
    //     if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
 
    //         document.body.classList.toggle("light")
    //     }else {
    //         document.body.classList.toggle("dark")
 
    //     }
         
        
    // }

    const {darkmode, toggleTheme} = useContext(MainQuizContext)
 
    console.log(darkmode)
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
