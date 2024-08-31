import React, { useState } from "react";
import QuizCreator from "./components/CreateQuiz";
import QuizTaker from "./components/TakeQuiz";

const App = () => {
  const [quizData, setQuizData] = useState(null);

  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-800 via-gray-700 to-gray-600 flex items-center justify-center py-12">
      <div className="relative w-full max-w-4xl p-8 bg-gray-100 rounded-2xl shadow-2xl border-4 border-gray-300 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 transform -rotate-2 scale-105 z-10 opacity-50"></div>
        <div className="absolute inset-0 border-t border-gray-400 border-b border-gray-600 border-opacity-30 rounded-lg z-20"></div>
        <div className="relative z-30">
          <h1 className="text-4xl font-semibold text-center mb-8 text-gray-900 tracking-widest uppercase">
            QuizzeR
          </h1>
          {!quizData ? (
            <QuizCreator setQuizData={setQuizData} />
          ) : (
            <QuizTaker
              quizData={quizData}
              resetQuiz={() => setQuizData(null)}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
