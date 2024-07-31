import { Link } from "react-router-dom"

export default function NotFound() {
    return (
        <div className="not-found">
            <h1>Sorry, the page you are looking for doesn't exist</h1>
            <Link to="/" className="btn">Return to home</Link>
        </div>
    )
}