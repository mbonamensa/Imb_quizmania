import { useContext, useState, } from "react"
import { MainQuizContext } from "./QuizContext"

function AnswerOption({
        endQuiz,
        selected,
        isCorrect,
        selectedAnswer,
        value
}) {

        const {darkmode} = useContext(MainQuizContext)

        const darkmodeStyles = {
                backgroundColor: endQuiz ? (selected ? (isCorrect ? "#358A47" : "#d7263d") : (isCorrect ? "#358A47" :"none")) : (selected ? "#448FA3" : "none"),
                borderColor: endQuiz ? (selected ? (isCorrect ? "#358A47" : "#d7263d") : (isCorrect ? "#358A47" :"#f5f7fb59")) : (selected ? "#448FA3" : "none"),
                color: endQuiz ? (isCorrect ? "#02182B" :"#f5f7fb59") : "#F5F7FB",
                cursor: endQuiz ? "not-allowed" : "pointer"
        }

        const styles = {
                backgroundColor: endQuiz ? (selected ? (isCorrect ? "#358A47" : "#d7263d") : (isCorrect ? "#358A47" :"none")) : (selected ? "#448FA3" : "none"),
                borderColor: endQuiz ? (selected ? (isCorrect ? "#358A47" : "#d7263d") : (isCorrect ? "#358A47" :"#02182b66")) : (selected ? "#448FA3" : "none"),
                color: endQuiz ? (isCorrect ? "#02182B" :"#02182b66") : "#02182B",
                cursor: endQuiz ? "not-allowed" : "pointer"
                
        }

        return (
                <button 
                        className="answer-btn" 
                        style={darkmode? darkmodeStyles : styles} 
                        onClick={selectedAnswer} 
                        disabled={endQuiz ? true : false}
                >
                        {value}
                </button>
        )
}

export default AnswerOption