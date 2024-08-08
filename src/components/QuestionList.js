import React from "react";

function QuestionList({ questions, onDeleteQuestion, onUpdateCorrectIndex }) {
  return (
    <div>
      <h2>Question List</h2>
      <ul>
        {questions.map((question) => (
          <li key={question.id}>
            <div>{question.prompt}</div>
            <label>
              Correct Answer:
              <select
                value={question.correctIndex}
                onChange={(e) => onUpdateCorrectIndex(question.id, parseInt(e.target.value, 10))}
              >
                {question.answers.map((answer, index) => (
                  <option key={index} value={index}>
                    {answer}
                  </option>
                ))}
              </select>
            </label>
            <button onClick={() => onDeleteQuestion(question.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default QuestionList;
