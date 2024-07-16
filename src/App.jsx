import NavBar from "./components/NavBar"
import "./css/styles.css"
import Quiz from "./pages/Quiz"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Welcome from "./pages/Welcome"
import Layout from "./components/Layout"
import NotFound from "./pages/404"


function App() {
    
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Welcome />} />
                    <Route path="/quiz" element={<Quiz />}/>
                    <Route path="*" element={ <NotFound /> }/>  
                </Route>
            </Routes>
        </BrowserRouter>
    )
}


export default App