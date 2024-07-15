import { useContext } from "react"
import Skeleton from "react-loading-skeleton"
import { MainQuizContext } from "./QuizContext"


export default function QuizSkeleton() {

    const {darkmode} = useContext(MainQuizContext)

    return ( 
        <div className="quiz">
            <Skeleton 
                baseColor={darkmode ? "#353536" : "#ebebeb"} 
                highlightColor={darkmode ? "#403e3e" : "#f5f5f5"}
                className="skeleton"
            />
            <div className="answer-options">
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
            </div>
            <Skeleton 
                height={2}
                baseColor={darkmode ? "#353536" : "#ebebeb"} 
                highlightColor={darkmode ? "#403e3e" : "#f5f5f5"}
            />
        </div>
    )
}