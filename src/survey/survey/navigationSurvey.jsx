import { useNavigate } from "react-router-dom";
import { FiArrowRight, FiArrowLeft, FiCheckCircle } from "react-icons/fi";

import { useFinalization } from "../../context/useFinalization";


export default function NavigationSurvey({
  goToPrevQuestion,
  currentQuestionIndex,
  goToNextQuestion,
  questions,
  inputAnswers,
  currentQuestion,
}) {
  const navigate = useNavigate();

  const { setHasFinalized } = useFinalization();

  const handleClick = () => {
    const isLast = currentQuestionIndex === questions.length - 1;
  
    if (isLast) {
      setHasFinalized(true); // ✅ set flag before navigating
      navigate("/encuesta/recap");
      goToNextQuestion();
    } else {
      goToNextQuestion();
    }
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-40 py-4 mx-auto max-w-9/10">
      <div className="flex justify-between max-w-3xl mx-auto">
        <button
          onClick={goToPrevQuestion}
          disabled={currentQuestionIndex === 0}
          className={`flex items-center px-4 py-2 rounded-lg ${
            currentQuestionIndex === 0
              ? "bg-gray-200 text-gray-400"
              : "bg-blue-100 text-blue-700 hover:bg-blue-200"
          }`}
        >
          <FiArrowLeft className="mr-2" />
          Previous
        </button>

        <button
          onClick={handleClick}
          disabled={
            !inputAnswers[currentQuestion.id]
          }
          className={`flex items-center px-4 py-2 rounded-lg ${
            currentQuestionIndex === questions.length - 1
              ? "bg-green-600 text-white hover:bg-green-700"
              : "bg-blue-600 text-white hover:bg-blue-700"
          }`}
        >
          {currentQuestionIndex === questions.length - 1 ? "Finalize" : "Next"}
          {currentQuestionIndex === questions.length - 1 ? (
            <FiCheckCircle className="ml-2" />
          ) : (
            <FiArrowRight className="ml-2" />
          )}
        </button>
      </div>
    </div>
  );
}
