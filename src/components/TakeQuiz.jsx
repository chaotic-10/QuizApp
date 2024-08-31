import React, { useState, useEffect } from "react";

const QuizTaker = ({ quizData, resetQuiz }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState(
    new Array(quizData.questions.length).fill(null)
  );
  const [score, setScore] = useState(null); // Score displayed after submission
  const [timer, setTimer] = useState(30); // Timer for each question
  const [isSubmitted, setIsSubmitted] = useState(false); // To check if quiz is submitted

  useEffect(() => {
    // This is to Reset timer when changing questions
    setTimer(30);
  }, [currentQuestionIndex]);

  useEffect(() => {
    if (timer > 0 && !isSubmitted) {
      const intervalId = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);

      return () => clearInterval(intervalId);
    } else if (timer === 0 && !isSubmitted) {
      goToNextQuestion();
    }
  }, [timer, isSubmitted]);

  useEffect(() => {
    if (isSubmitted) {
      calculateScore();
    }
  }, [userAnswers, isSubmitted]);

  const handleAnswerChange = (questionIndex, optionIndex) => {
    const updatedAnswers = [...userAnswers];
    updatedAnswers[questionIndex] = optionIndex;
    setUserAnswers(updatedAnswers);
  };

  const calculateScore = () => {
    let newScore = 0;
    quizData.questions.forEach((question, index) => {
      if (userAnswers[index] === question.correctAnswer) {
        newScore += 1;
      }
    });
    setScore(newScore);
  };

  const goToNextQuestion = () => {
    if (currentQuestionIndex < quizData.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const goToPreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleSubmit = () => {
    calculateScore(); // Ensure score is calculated before submission
    setIsSubmitted(true); // Mark quiz as submitted
  };

  const question = quizData.questions[currentQuestionIndex];

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
        {quizData.title}
      </h2>

      {isSubmitted ? (
        <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200">
          <h3 className="text-2xl font-semibold mb-4 text-center">
            Result Analysis
          </h3>
          <p className="text-lg mb-2">
            Your score:{" "}
            <span className="font-bold text-green-600">
              {score} / {quizData.questions.length}
            </span>
          </p>
          <ul className="list-disc pl-5">
            {quizData.questions.map((question, index) => (
              <li key={index} className="mb-4">
                <strong>{question.question}</strong>
                <ul className="list-inside pl-5">
                  {question.options.map((option, oIndex) => (
                    <li
                      key={oIndex}
                      className={`flex items-center ${
                        userAnswers[index] === oIndex ? "text-blue-500" : ""
                      }`}
                    >
                      {option}
                      {userAnswers[index] === oIndex &&
                        userAnswers[index] === question.correctAnswer && (
                          <span className="text-green-500 ml-2">(Correct)</span>
                        )}
                      {userAnswers[index] === oIndex &&
                        userAnswers[index] !== question.correctAnswer && (
                          <span className="text-red-500 ml-2">(Incorrect)</span>
                        )}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
          <div className="flex justify-center mt-6">
            <button
              onClick={resetQuiz}
              className="bg-blue-500 text-white py-2 px-4 rounded-lg shadow hover:bg-blue-600 transition-all"
            >
              Try Again
            </button>
          </div>
        </div>
      ) : (
        <div>
          <div className="w-full mb-8">
            <h3 className="text-xl font-semibold mb-4">
              Question {currentQuestionIndex + 1}: {question.question}
            </h3>
            {question.options.map((option, index) => (
              <div key={index} className="flex items-center mb-2">
                <input
                  type="radio"
                  name={`question-${currentQuestionIndex}`}
                  checked={userAnswers[currentQuestionIndex] === index}
                  onChange={() =>
                    handleAnswerChange(currentQuestionIndex, index)
                  }
                  className="mr-2"
                />
                <label>{option}</label>
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-4">
            <button
              onClick={goToPreviousQuestion}
              disabled={currentQuestionIndex === 0}
              className="bg-gray-500 text-white py-2 px-4 rounded-lg shadow hover:bg-gray-600 transition-all"
            >
              Previous
            </button>
            <button
              onClick={goToNextQuestion}
              disabled={currentQuestionIndex === quizData.questions.length - 1}
              className="bg-blue-500 text-white py-2 px-4 rounded-lg shadow hover:bg-blue-600 transition-all"
            >
              Next
            </button>
          </div>
          <div className="mt-6 flex justify-center items-center">
            <button
              onClick={handleSubmit}
              className="bg-green-500 text-white py-2 px-4 rounded-lg shadow hover:bg-green-600 transition-all"
            >
              Submit
            </button>
          </div>
          <div className="text-center mt-4">
            <span className="text-lg font-semibold text-gray-700">
              Time Left: {timer} seconds
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuizTaker;
