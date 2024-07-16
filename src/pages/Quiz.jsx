import { nanoid } from "nanoid"
import 'react-loading-skeleton/dist/skeleton.css'
import { useEffect, useState } from "react"
import { Link, useSearchParams } from "react-router-dom"
import { IoIosArrowRoundBack } from "react-icons/io";
import QuizSkeleton from "../components/QuizSkeleton"
import Quiz from "../components/Quiz"


function Quizzes() {

    const [quiz, setQuiz] = useState([])
    const [quizStart, setQuizStart] = useState(false)
    const [loading, setLoading] = useState(true)
    const [allAnswersSelected, setAllAnswersSelected] = useState(false)
    const [score, setScore] = useState(0)
    const [endQuiz, setEndQuiz] = useState(false)
    const [searchParams, setSearchParams] = useSearchParams()

    const selectedCategoryId = searchParams.get("categoryId")
    const selectedDifficulty = searchParams.get("difficulty")
    
    function fetchQuiz() {
        setLoading(true)
        fetch(`https://opentdb.com/api.php?amount=10&category=${selectedCategoryId ? selectedCategoryId : 9}&difficulty=${selectedDifficulty ? selectedDifficulty : "easy"}&type=multiple`)
        .then(response => response.json())
        .then(data => {
            const unfilteredData = data.results
    
            const newQuizData = []
    
            for(let i = 0; i < unfilteredData.length; i++) {
                const unfiltered = unfilteredData[i]
                const allAnswers = [...unfiltered.incorrect_answers, unfiltered.correct_answer]
                const shuffleAllAnswers = allAnswers.sort(() => {return (0.5 - Math.random())})
    
                const answerObjects = shuffleAllAnswers.map(answer => {
                    return {
                        id: nanoid(),
                        answerValue: answer,
                        isSelected: false,
                        isCorrect: answer === unfiltered.correct_answer ? true : false
                    }
                })
    
                newQuizData.push({
                    question: (unfiltered.question),
                    correctAnswer: (unfiltered.correct_answer),
                    answers: answerObjects,
                    id: nanoid()
                })
            }
            setQuiz(newQuizData)
            setLoading(false)
            
        })
    }

    useEffect(() => {
        fetchQuiz()   
    }, [selectedCategoryId, selectedDifficulty])

    useEffect(() => {

        const allAnswerschecked = quiz.every(quizElement => {
           return quizElement.answers.some(answer => answer.isSelected)
        })

        if(allAnswerschecked) {
            setAllAnswersSelected(true)
        }else {
            setAllAnswersSelected(false)
        }

    }, [quiz])

    function startQuiz() {
        setQuizStart(true)
        fetchQuiz()
        setAllAnswersSelected(false)
        setEndQuiz(false)
    }

    function selectedAnswer(answerId, quizId) {
  
        setQuiz(prevQuiz => {
            
            return prevQuiz.map(quizElement => {
                if (quizId === quizElement.id) {
                    return {
                        ...quizElement, 
                        answers: quizElement.answers.map(answer => {
                            if(answer.id === answerId) {
                                
                                return {
                                    ...answer,
                                    isSelected: !answer.isSelected
        
                                }
                            } else {
                                return {
                                    ...answer,
                                    isSelected: false
                                }
                            }
                        }) 
                    }
                  
                } else {
                    return quizElement
                }
            })
        })
    }


    function countScores() {
        const QuizArrayWithSelectedAnswers = [...quiz]
        
        let scoreCount = 0
        for (let i = 0; i < QuizArrayWithSelectedAnswers.length; i++) {
            const eachQuiz = QuizArrayWithSelectedAnswers[i]

            eachQuiz.answers.map(answer => {
                if(answer.isSelected) {
                    if(answer.answerValue === eachQuiz.correctAnswer) {
                        scoreCount += 1

                    }
                }
            })
        }

        return setScore(scoreCount)
    }

    function checkAnswers() {
        
        setEndQuiz(true)
        countScores()

    }

    const quizElements = loading
    ? Array.from({ length: 10 }).map((_, i) => <QuizSkeleton key={i} />)
    : quiz.map(quizElement => (
        <Quiz
            key={quizElement.id}
            question={quizElement.question}
            correctAnswer={quizElement.correctAnswer}
            allAnswers={quizElement.answers}
            selectedAnswer={selectedAnswer}
            quizId={quizElement.id}
            loading={loading}
            endQuiz={endQuiz}
        />
    ));
    
    
    const buttonStyle = {
        cursor: allAnswersSelected ? "pointer" : "not-allowed",
        opacity: allAnswersSelected ? "1" : "0.8"
    }

    return (
        <>
        <div className="main-content">
            <Link to=".." className="back-to-home"><IoIosArrowRoundBack /> Back to home</Link>
            <div className="quizzes-main-wrapper">
                <div className="quizzes">
                    <div className="quizzes--container">                
                        { quizElements }
                    </div>
                    <div className="checks">
                        {endQuiz && <p>You scored {score}/10</p>}
                        <button
                            className="check-btn btn" 
                            disabled={allAnswersSelected ? false : true} 
                            onClick={endQuiz ? startQuiz : checkAnswers}
                            style={buttonStyle }
                        >{endQuiz ? "Play again" : "Check answers"}</button>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}

export default Quizzes