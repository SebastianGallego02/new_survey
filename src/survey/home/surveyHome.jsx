import { useState, useEffect, useMemo } from "react";
import ProgressBar from "../survey/progressBar";
import { get_survey, get_surveyer, get_survey_answers } from "../../utils/api";
import { Document, Page, pdfjs } from "react-pdf";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url,
).toString();

export default function SurveyHome() {
  const [user, setUser] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [answers, setAnswers] = useState([]);
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  const pdfFile = useMemo(() => {
    if (!user?.id) return null;
    return {
      url: `http://localhost:8000/api/survey-answers/pdf/${user.id}.pdf`,
    };
  }, [user?.id]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const userData = await get_surveyer();
        setUser(userData);
        console.log("Fetching answers for user ID:", userData.user);

        const surveyData = await get_survey();
        if (Array.isArray(surveyData)) {
          setQuestions(surveyData);
        }

        if (userData?.user) {
          const answersData = await get_survey_answers(userData.user); 
          setAnswers(answersData);

          if (Array.isArray(answersData)) {
            const firstUnansweredIndex = surveyData.findIndex(
              (q) => !answersData.some((a) => a.question === q.id)
            );
            setCurrentQuestionIndex(
              firstUnansweredIndex === -1
                ? surveyData.length - 1
                : firstUnansweredIndex
            );
          }
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
    setPageNumber(1);
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center w-full">
        <div className="text-xl">Loading survey data...</div>
      </div>
    );
  }

  const completed = user?.completed === true;

  return (
    <div className="bg-gray-50 w-full">
      {/* Banner */}
      <div className="w-full bg-indigo-600 text-white py-6 px-8 shadow-md">
        <h1 className="text-3xl font-bold">Survey Portal</h1>
      </div>

      <div className="w-full mx-auto px-6 py-12">
        <div className="flex flex-col lg:flex-row lg:space-x-10 space-y-10 lg:space-y-0">
          {/* Left Column: User Info */}
          <div className="lg:w-1/3">
            <div className="bg-white rounded-2xl shadow p-6 flex flex-col items-center lg:items-start space-y-4">
              <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center">
                <span className="text-gray-500 text-2xl">👤</span>
              </div>
              <div className="space-y-1 text-center lg:text-left">
                <h2 className="text-2xl font-semibold text-gray-800">
                  {user?.name ||
                    `${user?.first_name || ""} ${
                      user?.last_name || ""
                    }`.trim() ||
                    "Anonymous User"}
                </h2>
                <p className="text-gray-600">
                  <strong>Email:</strong>{" "}
                  {user?.user_details?.email || "Not provided"}
                </p>
                <p className="text-gray-600">
                  <strong>Location:</strong>{" "}
                  {user?.city && user?.country
                    ? `${user.city}, ${user.country}`
                    : "Unknown"}
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Survey Content */}
          <div className="lg:w-2/3">
            <div className="bg-white rounded-2xl shadow p-6 space-y-4">
              <div className="space-y-1">
                <h3 className="text-xl font-bold text-gray-800">
                  Workplace Environment Satisfaction
                </h3>
                <p className="text-gray-700">
                  This survey aims to understand how employees perceive their
                  work environment, including factors like management, workspace
                  design, and collaboration culture. Your insights help us
                  improve workplaces globally.
                </p>
              </div>

              {/* Progress Bar */}
              {questions.length > 0 && (
                <ProgressBar
                  currentQuestionIndex={currentQuestionIndex}
                  questions={questions}
                />
              )}

              <div className="pt-2">
                <button
                  disabled={completed}
                  className={`w-full sm:w-auto text-white font-medium py-2 px-4 rounded-xl shadow
                    ${
                      completed
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-indigo-600 hover:bg-indigo-700"
                    }`}
                >
                  {questions.length > 0 ? "Continue Survey" : "Start Survey"}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* PDF Viewer rendered if completed */}
        {completed && pdfFile && (
          <div className="mt-12 bg-white rounded-xl shadow p-6 w-full mx-auto">
            <h3 className="text-2xl font-semibold mb-4 text-center">
              Your Survey Report
            </h3>

            <Document
              file={pdfFile}
              onLoadSuccess={onDocumentLoadSuccess}
              onLoadError={(err) => console.error("Error loading PDF:", err)}
              loading={<div>Loading PDF...</div>}
            >
              <Page pageNumber={pageNumber} />
            </Document>

            {numPages && (
              <p className="text-center mt-2">
                Page {pageNumber} of {numPages}
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}