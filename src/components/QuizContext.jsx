import { useState, createContext } from "react"
import { categoryData } from "../data"
import { difficultyData } from "../data"

const MainQuizContext = createContext()    

export default function QuizContext({children}) {

    const [category, setCategory] = useState(categoryData)
    const [difficulty, setDifficulty] = useState(difficultyData)
    const [darkmode, setDarkmode] = useState(() => checkUserDarkTheme() ? true : false)

    function checkUserDarkTheme() {
        return (window.matchMedia("(prefers-color-scheme: dark)").matches)
    }
 
    function toggleTheme() {
 
        setDarkmode(prevMode => !prevMode)
        if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
 
            document.body.classList.toggle("light")
        }else {
            document.body.classList.toggle("dark")
 
        }
         
        
    }

    function selectCategory(id) {
        setCategory(prevCategory => {
            return prevCategory.map(category => {
                return {
                    ...category,
                    isSelected: category.id === id ? !category.isSelected : false
                }
            })
        })

    }

    function selectDifficulty(id) {
        console.log("clicked")
        setDifficulty(prevDifficulty => {
            return prevDifficulty.map(difficulty => {
                return {
                    ...difficulty,
                    isSelected: difficulty.id === id ? !difficulty.isSelected : false
                }
            })
        })

    }

    return (
        <MainQuizContext.Provider value={{
            category,
            difficulty,
            darkmode,
            selectCategory,
            selectDifficulty,
            toggleTheme
        }}>
            {children}
        </MainQuizContext.Provider>
    )
}

export {MainQuizContext}