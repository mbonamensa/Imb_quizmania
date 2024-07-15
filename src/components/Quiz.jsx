import { decode } from "html-entities"
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import AnswerOption from "./AnswerOption"


function Quiz({
    allAnswers, 
    quizId,
    endQuiz,
    darkmode,
    loading,
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
            darkmode={darkmode}
        />
    })

    console.log("loading?", loading)

    return (
        <>
        <div className="quiz">
            <h2>
                {
                loading ? 
                <>
                <div>Loading...</div>
                <Skeleton 
                baseColor={darkmode ? "#353536" : "#ebebeb"} 
                highlightColor={darkmode ? "#403e3e" : "#f5f5f5"}
                className="skeleton"
                /> </>
                : decode(question)
                }
            </h2>
            <div className="answer-options">
                {
                loading ? 
                <Skeleton 
                width={150} 
                height={30} 
                count={4} 
                borderRadius={10} 
                baseColor={darkmode ? "#353536" : "#ebebeb"} 
                highlightColor={darkmode ? "#403e3e" : "#f5f5f5"}
                containerClassName="answers-skeleton" 
                className="skeleton"
                /> 
                : answerElements
                }
            </div>
        </div>
        {loading ? <Skeleton 
        height={2}
        baseColor={darkmode ? "#353536" : "#ebebeb"} 
        highlightColor={darkmode ? "#403e3e" : "#f5f5f5"}
        /> : <hr />}
        </>
    )
}

export default Quiz