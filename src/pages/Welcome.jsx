import { useContext, useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import { MainQuizContext } from "../components/QuizContext"

function Welcome() {
    
    const {category, difficulty, selectCategory, selectDifficulty} = useContext(MainQuizContext)


    const categories = category.map(category => {
        return <button className={category.isSelected ? "selected" : ""} onClick={() => selectCategory(category.id)} key={category.id}>{category.name}</button>
    })

    const difficulties = difficulty.map(difficulty => {
        return <button className={difficulty.isSelected ? "selected" : ""} onClick={() => selectDifficulty(difficulty.id)} key={difficulty.id}>{difficulty.name}</button>
    })

    const [selectedCategory, setSelectedCategory] = useState()
    const [selectedCategoryId, setSelectedCategoryId] = useState()
    const [selectedDifficulty, setSelectedDifficulty] = useState()
    const navigate = useNavigate()


    useEffect(() => {
        const selectedCat = category.find(cat => cat.isSelected)
        const selectedDiff = difficulty.find(cat => cat.isSelected)

        setSelectedCategory(selectedCat ? selectedCat.slug : null)
        setSelectedCategoryId(selectedCat ? selectedCat.id : null)
        setSelectedDifficulty(selectedDiff ? selectedDiff.id : null)
    }, [category, difficulty])

    function checkQuizSettings() {
        if (!selectedCategory && !selectedDifficulty) {
            const confirm = window.confirm("you haven't chosen any category and difficulty yet, proceed with category: general knowledge and difficulty: easy?")
            if (confirm) {
                setSelectedCategory("general-knowledge")
                setSelectedCategoryId(9)
                setSelectedDifficulty("easy")
                setTimeout(() => {
                    navigate("/quiz?category=general-knowledge&categoryId=9&difficulty=easy")
                }, 0);
            }
        } else {
            navigate("/quiz?category=general-knowledge&categoryId=9&difficulty=easy")
            
        }
    }

    return (
            <div className="home">
                <h1>Welcome to Quizmania!</h1>
                <p>Wanna rack your brains? &#128071;&#127998;</p>
                <div className="settings-wrapper">
                    <h2>Choose your category</h2>
                    <div className="settings">
                        {categories}
                    </div>
                </div>
                <div className="settings-wrapper">
                    <h2>Choose your difficulty</h2>
                    <div className="settings">
                        {difficulties}
                    </div>
                </div>
                <Link onClick={checkQuizSettings} className="btn" to={selectedCategory && selectDifficulty && `quiz?category=${selectedCategory}&categoryId=${selectedCategoryId}&difficulty=${selectedDifficulty}`}>Start quiz</Link>
            </div>
    )
}

export default Welcome