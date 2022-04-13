import React from "react"

export default function Answer(props) {
    function htmlDecode(input) {
        var doc = new DOMParser().parseFromString(input, "text/html");
        return doc.documentElement.textContent;
    }
    let style = {}
    if ((props.checkAnswers.status && props.answerData.isSelected && props.answerData.isCorrect ) || (props.checkAnswers.status && props.answerData.isCorrect)) {

        style = { backgroundColor: "#94D7A2" } // Correct Answer

    } else if (props.checkAnswers.status && props.answerData.isSelected && !props.answerData.isCorrect) {

        style = { backgroundColor: "#F8BCBC", border: "2px solid #8792c4", color:" #8792c4"  } // Incorrect Answer

    } else if (props.checkAnswers.status) {

    style = { border: "2px solid #8792c4", color:" #8792c4" } // Incorrect Answer

    } else if (props.answerData.isSelected) {

        style = { backgroundColor: "#adb7eb" } 

    } else {
        style = { backgroundColor: "#fff" } 
    }
    
  
    return (
        <button className="answer-button" style={style} onClick={props.isSelected} >{htmlDecode(props.answerData.name)}</button>
    )
}

