import React, { useState } from "react";

const QuizCreator = ({ setQuizData }) => {
  const [quizTitle, setQuizTitle] = useState("");
  const [questions, setQuestions] = useState([
    { question: "", options: ["", "", "", ""], correctAnswer: null },
  ]);

  const handleQuestionChange = (index, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index].question = value;
    setQuestions(updatedQuestions);
  };

  const handleOptionChange = (qIndex, oIndex, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[qIndex].options[oIndex] = value;
    setQuestions(updatedQuestions);
  };

  const addQuestion = () => {
    setQuestions([
      ...questions,
      { question: "", options: ["", "", "", ""], correctAnswer: null },
    ]);
  };

  const deleteQuestion = (index) => {
    const updatedQuestions = questions.filter((_, qIndex) => qIndex !== index);
    setQuestions(updatedQuestions);
  };

  const handleAnswerSelect = (qIndex, oIndex) => {
    const updatedQuestions = [...questions];
    updatedQuestions[qIndex].correctAnswer = oIndex;
    setQuestions(updatedQuestions);
  };

  const handleSubmit = () => {
    const isComplete = questions.every(
      (q) =>
        q.question && q.options.every((opt) => opt) && q.correctAnswer !== null
    );

    if (quizTitle && isComplete) {
      setQuizData({ title: quizTitle, questions });
    } else {
      alert("Please complete all fields before submitting the quiz!");
    }
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
        Create Your Quiz
      </h2>
      <div className="w-full mb-8">
        <input
          type="text"
          placeholder="Quiz Title"
          value={quizTitle}
          onChange={(e) => setQuizTitle(e.target.value)}
          className="w-full p-3 mb-6 border-2 border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-gray-600 focus:outline-none"
        />
      </div>

      {questions.map((q, qIndex) => (
        <div
          key={qIndex}
          className="relative mb-8 p-6 border border-gray-300 rounded-lg bg-gray-50 shadow-sm"
        >
          <button
            onClick={() => deleteQuestion(qIndex)}
            className="absolute top-2 right-2 text-red-500 text-xl font-bold hover:bg-red-100 rounded-full p-1 transition-all"
            aria-label="Delete Question"
          >
            x
          </button>
          <input
            type="text"
            placeholder={`Question ${qIndex + 1}`}
            value={q.question}
            onChange={(e) => handleQuestionChange(qIndex, e.target.value)}
            className="w-full p-3 mb-4 border-2 border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-gray-600 focus:outline-none"
          />
          {q.options.map((opt, oIndex) => (
            <div key={oIndex} className="flex items-center mb-2">
              <input
                type="text"
                placeholder={`Option ${oIndex + 1}`}
                value={opt}
                onChange={(e) =>
                  handleOptionChange(qIndex, oIndex, e.target.value)
                }
                className="w-full p-2 border-2 border-gray-200 rounded-md shadow-sm focus:ring-2 focus:ring-gray-600 focus:outline-none"
              />
              <input
                type="radio"
                name={`correctAnswer-${qIndex}`}
                onChange={() => handleAnswerSelect(qIndex, oIndex)}
                checked={q.correctAnswer === oIndex}
                className="ml-4 text-gray-700 focus:ring-gray-600"
              />
            </div>
          ))}
        </div>
      ))}

      <div className="flex flex-wrap justify-center space-y-4 md:space-y-0 md:space-x-4 mt-6">
        <button
          onClick={addQuestion}
          className="bg-blue-500 text-white py-2 px-4 rounded-lg shadow hover:bg-blue-600 transition-all"
        >
          Add Question
        </button>
        <button
          onClick={handleSubmit}
          className="bg-green-500 text-white py-2 px-4 rounded-lg shadow hover:bg-green-600 transition-all"
        >
          Create Quiz
        </button>
      </div>
    </div>
  );
};

export default QuizCreator;
