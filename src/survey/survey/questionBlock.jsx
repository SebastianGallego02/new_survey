import React from "react";

export default function QuestionBlock({
  currentQuestion,
  inputAnswers,
  handleAnswerSelection,
  handleInputChange,
}) {
  if (!currentQuestion) return null;

  return (
    <div className="flex items-stretch p-4 md:p-8">
      <div className="p-6 w-full mx-auto">
        <h2 className="text-xl mb-6">{currentQuestion.question}</h2>

        {currentQuestion.question_type === "multiple_choice" && (
          <div className="space-y-3 text-sm md:text-base">
            {currentQuestion.choices.map((choice, i) => (
              <button
                key={i}
                onClick={() =>
                  handleAnswerSelection(currentQuestion.id, choice)
                }
                className={`w-full p-3 text-left rounded-lg transition-colors ${
                  inputAnswers[currentQuestion.id] === choice
                    ? "bg-blue-300"
                    : "bg-blue-50 hover:bg-blue-100"
                }`}
              >
                {choice}
              </button>
            ))}
          </div>
        )}

        {currentQuestion.question_type === "text" && (
          <div className="space-y-4">
            <textarea
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              rows={4}
              placeholder="Type your answer here..."
              value={inputAnswers[currentQuestion.id] || ""}
              onChange={(e) =>
                handleInputChange(currentQuestion.id, e.target.value)
              }
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                }
              }}
            />
          </div>
        )}

        {currentQuestion.question_type === "value" && (
          <div className="space-y-4">
            <input
              type="number"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter a number..."
              value={inputAnswers[currentQuestion.id] || ""}
              onChange={(e) =>
                handleInputChange(currentQuestion.id, e.target.value)
              }
            />
          </div>
        )}
      </div>
    </div>
  );
}
