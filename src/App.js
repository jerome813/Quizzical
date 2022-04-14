import './App.css';

import React from "react"
import Question from "./component/Question"
import {nanoid} from "nanoid"
// import Confetti from "react-confetti"

function App() {

    const [startQuiz, setStartQuiz] = React.useState({
        status: false,
        category: "",
        difficulty: "",
        newQuiz: false,
        errorMsg: false
    });
    const [quiz, setQuiz] = React.useState([{
        id: "",
        question: "",
        possibleAnswers: []
    }]);
    const [checkAnswers, setCheckAnswers] = React.useState({
        status: false,
        correctAnswers: 0,
        answers: 0,
        errorMsg: false
    });

    const shuffleAnswer = data => {
        return data.sort((a, b) => 0.5 - Math.random());
    }

    React.useEffect(() => {
        fetch(`https://opentdb.com/api.php?amount=5&category=${startQuiz.category}&difficulty=${startQuiz.difficulty}&type=multiple`)
            .then(res => res.json())
            .then(data => setQuiz(data.results.map(arr => ({
                ...arr,
                id: nanoid(),
                possibleAnswers: shuffleAnswer([{   
                    answerId: nanoid(),
                    name: arr.correct_answer,
                    isSelected: false,
                    isCorrect: true
                },
                {
                    answerId: nanoid(),
                    name: arr.incorrect_answers[0],
                    isSelected: false,
                    isCorrect: false
                },
                {
                    answerId: nanoid(),
                    name: arr.incorrect_answers[1],
                    isSelected: false,
                    isCorrect: false
                },
                {
                    answerId: nanoid(),
                    name: arr.incorrect_answers[2],
                    isSelected: false,
                    isCorrect: false
                }])
            }))));
    }, [startQuiz.difficulty, startQuiz.category])

    const handleStartQuiz = () => {

        startQuiz.category === "" || startQuiz.difficulty === ""
        ? 
        setStartQuiz(prevData => ({
            ...prevData,
            errorMsg: true
        }))
        : 
        setStartQuiz(prevData => ({
            ...prevData,
            status: !prevData.status
        }))

        
    }

    const handleQuizSettings = (event) => {
        const {name, value} = event.target
        setStartQuiz(prevData => ({
            ...prevData,
            [name]: value
        }))
    }
 
    const selectAnswer = (questionId, answerId) => {
        !checkAnswers.status &&
        setQuiz(quiz.map(arr => {
            const updatedAnswer =  arr.possibleAnswers.map(data => {
                return data.answerId === answerId ? {...data, isSelected: true} : {...data, isSelected: false}
            });
            return arr.id === questionId ? {...arr, possibleAnswers: updatedAnswer } : {...arr}
        }))
    }

    const questionList = quiz.map(question => {
        return (
            <Question 
                key={nanoid()} 
                questionData={question} 
                answerData={question.possibleAnswers}
                selectedAnswer={selectAnswer} 
                checkAnswers={checkAnswers}
            />
        )
    }); 

    const handleCheckAnswers = () => {
        
        let correctAnswer = 0
        let answer = 0

        quiz.map(arr => {
            return arr.possibleAnswers.map(data => {
                return data.isSelected && data.isCorrect && correctAnswer++ 
            });
        })
        
        quiz.map(arr => {
            return arr.possibleAnswers.map(data => {
                return data.isSelected && answer++ 
            });
        })

        answer === 5
        ?
        setCheckAnswers({
            status: true,
            correctAnswers: correctAnswer
        })
        :
        setCheckAnswers({
            errorMsg: true
        })
    }

    const playAgainHandler = () => {
        setStartQuiz(prevData => ({
            status: !prevData.status,
            newQuiz: !prevData.newQuiz,
            errorMsg: false,
            category: "",
            difficulty: ""
        }))

        setCheckAnswers({
            status: false,
            correctAnswers: 0
        })
    }
    
    return (
        <main>
            {/* {checkAnswers.correctAnswers === 5 && <Confetti />} */}
            {
                startQuiz.status 
                ?
                <div>
                    <h1 className="title">Quizzical</h1>
                    {
                        checkAnswers.errorMsg && <p className="error-msg">Please answer all the questions.</p>
                    }
                    {questionList}
                    { 
                        checkAnswers.status 
                        ?
                        <div className="score-container">
                            <p>You scored {checkAnswers.correctAnswers}/5 correct answers</p>  
                            <button className="check-button" onClick={playAgainHandler}>Play again</button> 
                        </div>
                        :
                        <button className="check-button" onClick={handleCheckAnswers}>Check Answer</button>
                    }
                </div>
                :
                <div>
                <h1 className="title">Quizzical</h1>
                <p className="description">Test your knowledge in a fun quiz game.</p>
                {
                    startQuiz.errorMsg && <p className="error-msg">Please select the required fields.</p>
                }
                <div className="settings-container" >
                    <select 
                        value={startQuiz.category}
                        onChange={handleQuizSettings}
                        name="category"
                        className="select-grad" 
                    >
                        <option value="">Select Category *</option>
                        <option value="9">General Knowledge</option>
                        <option value="10">Entertainment: Books</option>
                        <option value="11">Entertainment: Film</option>
                        <option value="12">Entertainment: Music</option>
                        <option value="13">Entertainment: Musicals &amp; Theatres</option>
                        <option value="14">Entertainment: Television</option>
                        <option value="15">Entertainment: Video Games</option>
                        <option value="16">Entertainment: Board Games</option>
                        <option value="17">Science &amp; Nature</option>
                        <option value="18">Science: Computers</option>
                        <option value="19">Science: Mathematics</option>
                        <option value="20">Mythology</option>
                        <option value="21">Sports</option>
                        <option value="22">Geography</option>
                        <option value="23">History</option>
                        <option value="24">Politics</option>
                        <option value="25">Art</option>
                        <option value="26">Celebrities</option>
                        <option value="27">Animals</option>
                        <option value="28">Vehicles</option>
                        <option value="29">Entertainment: Comics</option>
                        <option value="30">Science: Gadgets</option>
                        <option value="31">Entertainment: Japanese Anime &amp; Manga</option>
                        <option value="32">Entertainment: Cartoon &amp; Animations</option>
                    </select>
                    <select 
                        value={startQuiz.difficulty}
                        onChange={handleQuizSettings}
                        name="difficulty"
                        className="select-grad" 
                    >
                        <option value="">Select Difficulty *</option>
                        <option value="easy">Easy</option>
                        <option value="medium">Medium</option>
                        <option value="hard">Hard</option>
                    </select>
                    <button className="btn-grad" onClick={handleStartQuiz}>Start Quiz</button>
                </div>
            </div>
            }   
        </main>
    )
}

export default App;
