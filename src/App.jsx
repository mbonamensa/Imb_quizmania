import NavBar from "./components/NavBar"
import "./css/styles.css"
import Quiz from "./pages/Quiz"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Welcome from "./pages/Welcome"
import Layout from "./components/Layout"


function App() {
    
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Welcome />} />
                    <Route path="/quiz" element={<Quiz />}/>
                </Route>
            </Routes>
        </BrowserRouter>

            // <Quizzes />
    )
}


export default App