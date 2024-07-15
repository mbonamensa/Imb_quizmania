import { Outlet } from "react-router-dom"
import NavBar from "./NavBar"
import QuizContext from "./QuizContext"

function Layout() {
    return (
        <>
            <QuizContext>
            <NavBar />
                <Outlet />
            </QuizContext>
        </>
    )
}

export default Layout