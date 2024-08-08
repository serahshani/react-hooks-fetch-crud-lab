import React, { useState } from "react";

function QuestionForm({ onAddQuestion }) {
  const [prompt, setPrompt] = useState("");
  const [answers, setAnswers] = useState(["", "", "", ""]);
  const [correctIndex, setCorrectIndex] = useState(0);

  const handleSubmit = (event) => {
    event.preventDefault();

    const newQuestion = {
      prompt,
      answers,
      correctIndex,
    };

    onAddQuestion(newQuestion);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Prompt:
        <input
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        />
      </label>
      <br />
      {answers.map((answer, index) => (
        <label key={index}>
          Answer {index + 1}:
          <input
            type="text"
            value={answer}
            onChange={(e) =>
              setAnswers((prevAnswers) =>
                prevAnswers.map((a, i) => (i === index ? e.target.value : a))
              )
            }
          />
          <br />
        </label>
      ))}
      <label>
        Correct Answer Index:
        <input
          type="number"
          value={correctIndex}
          min="0"
          max={answers.length - 1}
          onChange={(e) => setCorrectIndex(parseInt(e.target.value, 10))}
        />
      </label>
      <br />
      <button type="submit">Submit</button>
    </form>
  );
}

export default QuestionForm;
