import { useState, useEffect } from "react";
import { get_survey_answers, get_surveyer } from "../../utils/api";
import { Navigate } from "react-router-dom";

const SurveyRecap = () => {
  const [answers, setAnswers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);



  useEffect(() => {
    const fetchAnswers = async () => {
      try {
        const userData = await get_surveyer();
        setUser(userData);

        const data = await get_survey_answers(userData.user);
        console.log(data)
        setAnswers(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchAnswers();
  }, []);

  if (user && user.completed === false) {
    return <Navigate to="/encuesta" replace />;
  }

  if (loading) {
    return <div className="text-center py-8">Loading survey answers...</div>;
  }

  if (error) {
    return (
      <div className="text-center py-8 text-red-500">
        Error loading survey answers: {error}
      </div>
    );
  }

  if (!answers || answers.length === 0) {
    return <div className="text-center py-8">No survey answers found</div>;
  }

  return (
    <>
      <h2 className="text-4xl text-center font-semibold tracking-tight text-balance text-gray-950 my-16">
        Recapitulación
      </h2>
      <div className="overflow-x-auto min-w-full inline-block rounded-lg border">
        <table className="min-w-full">
          <thead className="bg-amber-100">
            <tr>
              <th className="px-4 py-2 text-left">#</th>
              <th className="px-4 py-2 text-left">Question</th>
              <th className="px-4 py-2 text-left">Type</th>
              <th className="px-4 py-2 text-left">Answer</th>
              <th className="px-4 py-2 text-left">Answered At</th>
            </tr>
          </thead>
          <tbody>
            {answers.map((answer, index) => (
              <tr
                key={answer.id}
                className="hover:bg-gray-50 border-b border-gray-200"
              >
                <td className="px-4 py-2">{index + 1}</td>
                <td className="px-4 py-2">
                  {answer.question_details.question}
                  <div className="text-xs text-gray-500 mt-1">
                    Survey: {answer.question_details.survey_details.name}
                  </div>
                </td>
                <td className="px-4 py-2 capitalize">
                  {answer.question_details.question_type.replace("_", " ")}
                </td>
                <td className="px-4 py-2">
                  {answer.choice || answer.text || (
                    <span className="text-gray-400">No answer provided</span>
                  )}
                </td>
                <td className="px-4 py-2">
                  {new Date(answer.created_at).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default SurveyRecap;
