import { useState, createContext, useEffect } from "react"
import { categoryData } from "../data"
import { difficultyData } from "../data"

const MainQuizContext = createContext()  

function getInitialTheme() {
    const savedTheme = localStorage.getItem("theme")

    if (savedTheme) {
        return savedTheme
    } else {

        const preferredTheme = (window.matchMedia("(prefers-color-scheme: dark)").matches)  ? "dark" : "light"
        return preferredTheme
    }

}

export default function QuizContext({children}) {

    const [category, setCategory] = useState(categoryData)
    const [difficulty, setDifficulty] = useState(difficultyData)
    const [theme, setTheme] = useState(getInitialTheme())
 
    useEffect(() => {
        
        document.body.classList.remove('light', 'dark');
        document.body.classList.add(theme);
        localStorage.setItem("theme", theme)

    }, [theme])

    function toggleTheme() {

        setTheme(prevTheme => prevTheme === "light" ? "dark" : "light")
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
            theme,
            selectCategory,
            selectDifficulty,
            toggleTheme
        }}>
            {children}
        </MainQuizContext.Provider>
    )
}

export {MainQuizContext}