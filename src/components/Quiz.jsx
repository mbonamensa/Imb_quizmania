import { decode } from "html-entities"
import 'react-loading-skeleton/dist/skeleton.css'
import AnswerOption from "./AnswerOption"

function Quiz({
    allAnswers, 
    selectedAnswer,
    quizId,
    endQuiz,
    theme,
    question
}) {
    
    const answerElements = allAnswers.map(answer => {
        return <AnswerOption 
            key={answer.id}
            value={decode(answer.answerValue)}
            selectedAnswer={() => selectedAnswer(answer.id, quizId)}
            selected={answer.isSelected}
            isCorrect={answer.isCorrect}
            endQuiz={endQuiz}
            theme={theme}
        />
    })

    return (
        <>
        <div className="quiz">
            <h2>
                { decode(question)}
            </h2>
            <div className="answer-options">
                { answerElements }
            </div>
        </div>
        <hr />
        </>
    )
}

export default Quiz