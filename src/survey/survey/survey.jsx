import * as yup from "yup";

export const validationSchemas = {
  multiple_choice: yup.string().required("Please select an option."),

  text: yup
    .string()
    .required("This field is required.")
    .min(5, "Answer must be at least 5 characters long.")
    .max(500, "Answer must be less than 500 characters."),

  value: yup
    .number()
    .typeError("Please enter a valid number.")
    .required("A number is required.")
    .positive("Number must be positive.")
    .max(1000000, "Number is too large."),

  audio: yup
    .mixed()
    .test(
      "fileSize",
      "File too large (max 5MB)",
      (value) => !value || (value && value.size <= 5 * 1024 * 1024)
    )
    .test(
      "fileType",
      "Unsupported file format",
      (value) =>
        !value || (value && ["audio/mpeg", "audio/wav"].includes(value.type))
    )
    .required("Audio input is required."),
};

import { useEffect, useState } from "react";
import {
  get_survey,
  post_answer,
  get_survey_answers,
  get_surveyer,
} from "../../utils/api";

import ProgressBar from "./progressBar";
import NavigationSurvey from "./navigationSurvey";
import QuestionBlock from "./questionBlock";
import { Navigate } from "react-router-dom";

export default function Survey() {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [user, setUser] = useState(null);
  const [surveyer, setSurveyer] = useState(null);
  const [inputAnswers, setInputAnswers] = useState({});
  const [showCompletedModal, setShowCompletedModal] = useState(false);

  const currentQuestion = questions[currentQuestionIndex];

  useEffect(() => {
    const initializeSurvey = async () => {
      try {
        const [surveyData, surveyerData] = await Promise.all([
          get_survey(),
          get_surveyer(),
        ]);

        if (surveyData && Array.isArray(surveyData)) {
          setQuestions(surveyData);
        }

        if (
          [surveyerData.user_details] &&
          [surveyerData.user_details].length > 0
        ) {
          const currentSurveyer = surveyerData.user_details;
          const currentSurveyerInfo = surveyerData;

          setUser(currentSurveyer);
          setSurveyer(currentSurveyerInfo);

          const answersData = await get_survey_answers(currentSurveyer.id);

          if (answersData && Array.isArray(answersData)) {
            const answerMap = {};
            answersData.forEach((ans) => {
              answerMap[ans.question] =
                ans.choice || ans.text || ans.audio || ans.value || null;
            });
            setInputAnswers(answerMap);

            const firstUnansweredIndex = surveyData.findIndex(
              (q) => !answerMap[q.id]
            );

            setCurrentQuestionIndex(
              firstUnansweredIndex === -1
                ? surveyData.length - 1
                : firstUnansweredIndex
            );
          }
        }
      } catch (err) {
        console.error("Failed to initialize survey:", err);
      }
    };

    initializeSurvey();
  }, []);

  useEffect(() => {
    if (surveyer && surveyer.completed === true) {
      setShowCompletedModal(true);
    }
  }, [surveyer]);

  const goToNextQuestion = async () => {
    if (currentQuestionIndex < questions.length) {
      const currentQuestion = questions[currentQuestionIndex];
      const selectedAnswer = inputAnswers[currentQuestion.id];

      const schema = validationSchemas[currentQuestion.question_type];

      if (schema) {
        try {
          await schema.validate(selectedAnswer);
        } catch (validationError) {
          alert(validationError.message);
          return;
        }
      }

      const payload = {
        user: user.id,
        question: currentQuestion.id,
      };

      if (currentQuestion.question_type === "multiple_choice") {
        payload.choice = selectedAnswer;
      } else if (
        currentQuestion.question_type === "text" ||
        currentQuestion.question_type === "value"
      ) {
        payload.text = selectedAnswer;
      } else if (currentQuestion.question_type === "audio") {
        payload.audio = selectedAnswer;
      }

      try {
        await post_answer(payload);

        if (currentQuestionIndex === questions.length - 1) {
          setHasFinalized(true);
          navigate("/encuesta/recap");
        } else {
          setCurrentQuestionIndex(currentQuestionIndex + 1);
        }
      } catch (err) {
        console.error("Failed to submit answer", err);
      }
    }
  };

  const goToPrevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleAnswerSelection = (questionId, selectedChoice) => {
    setInputAnswers((prev) => ({
      ...prev,
      [questionId]: selectedChoice,
    }));
  };

  const handleInputChange = (questionId, value) => {
    setInputAnswers((prev) => ({
      ...prev,
      [questionId]: value,
    }));
  };

  // ✅ Now we check loading status AFTER all hooks
  if (questions.length === 0) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-xl">Loading survey...</div>
      </div>
    );
  }

  return (
    <div className="flex flex-col">
        <ProgressBar
          currentQuestionIndex={currentQuestionIndex}
          questions={questions}
        />

        <QuestionBlock
          currentQuestion={currentQuestion}
          inputAnswers={inputAnswers}
          handleAnswerSelection={handleAnswerSelection}
          handleInputChange={handleInputChange}
        />

        <NavigationSurvey
          currentQuestion={currentQuestion}
          currentQuestionIndex={currentQuestionIndex}
          goToPrevQuestion={goToPrevQuestion}
          goToNextQuestion={goToNextQuestion}
          questions={questions}
          inputAnswers={inputAnswers}
        />

        {showCompletedModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/40">
            <div className="bg-white p-8 rounded-xl shadow-xl text-center max-w-md w-full">
              <h2 className="text-2xl font-semibold mb-4">
                Encuesta completada
              </h2>
              <p className="mb-6">
                Ya has completado esta encuesta. Puedes ver tu resumen ahora.
              </p>
              <button
                onClick={() => (window.location.href = "/encuesta/recap")}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition"
              >
                Ver resumen
              </button>
            </div>
          </div>
        )}
      </div>
  );
}

