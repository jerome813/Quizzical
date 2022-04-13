import { nanoid } from "nanoid";
import React from "react"
import Answer from "../component/Answer"


export default function Question(props) {


    const htmlDecode = input => {
        var doc = new DOMParser().parseFromString(input, "text/html");
        return doc.documentElement.textContent;
    }

    const onTrigger = (questionId, answerId) => {
        props.selectedAnswer(questionId, answerId);
    }
  
    return (
        <div> 
            <h1 className="question">{htmlDecode(props.questionData.question)}</h1>
            <div className="choice-container" >
                {
                    props.answerData.map(answer => {                  

                        return (
                            <Answer 
                                key={nanoid()} 
                                answerData={answer} 
                                isSelected={() => onTrigger(props.questionData.id, answer.answerId)} 
                                checkAnswers={props.checkAnswers}
                            />
                        )
                    })
                }
            </div>
            <hr />
        </div>
    )

}