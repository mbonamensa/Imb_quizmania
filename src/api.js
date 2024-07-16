export async function getQuiz(category, difficulty) {

    const response = await fetch(`https://opentdb.com/api.php?amount=10&category=${category ? category : 9}&difficulty=${difficulty ? difficulty : "easy"}&type=multiple`)
    if (!response.ok) {
        throw {
            message: "Failed to load quizzes. Try again in a few minutes",
            statusText: response.statusText,
            status: response.status
        }
    }

    const data = await response.json()

    return data

}