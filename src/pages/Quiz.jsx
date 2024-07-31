import { nanoid } from "nanoid"
import 'react-loading-skeleton/dist/skeleton.css'
import { useEffect, useState } from "react"
import { Link, useSearchParams } from "react-router-dom"
import { IoIosArrowRoundBack } from "react-icons/io";
import QuizSkeleton from "../components/QuizSkeleton"
import Quiz from "../components/Quiz"
import { getQuiz } from "../api";


function Quizzes() {

    const [quiz, setQuiz] = useState([])
    const [quizStart, setQuizStart] = useState(false)
    const [loading, setLoading] = useState(true)
    const [allAnswersSelected, setAllAnswersSelected] = useState(false)
    const [score, setScore] = useState(0)
    const [endQuiz, setEndQuiz] = useState(false)
    const [searchParams, setSearchParams] = useSearchParams()
    const [error, setError] = useState(null)

    const selectedCategoryId = searchParams.get("categoryId")
    const selectedDifficulty = searchParams.get("difficulty")

    async function loadQuiz() {
        setLoading(true)
        try {

            const rawData = await getQuiz(selectedCategoryId, selectedDifficulty)
                
            const unfilteredData = rawData.results
            
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
        } catch(error) {

            console.log(error)
            setError(error)

        } finally {
            
            setLoading(false)
        }
    }
        
    
    useEffect(() => {

        loadQuiz()
    }, [])


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
        loadQuiz()
        setQuizStart(true)
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
                            return {
                                ...answer,
                                isSelected: answer.id === answerId ? !answer.isSelected : false
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

    if (error) {
        return (
            <div className="not-found">
                <h1>An unexpected error occured: {error.message}</h1>
            </div>
        ) 
            
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