import Header from "../components/header";
import AddQuiz from "../components/add-quiz";
import classes from "./page.module.css"

export default function CreateQuiz() {
    return (
        <>
            <Header></Header>
            <div className={classes.container}>
                <h2>Create your own quiz!</h2>
                <AddQuiz/>
            </div>
        </>
    )
}