
export default function ProgressBar({
    currentQuestionIndex
  , questions
}) {
  return (
    <div className="p-4 bg-white border-b">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-medium text-gray-700">
          Question {currentQuestionIndex + 1} of {questions.length}
        </span>
        <span className="text-sm font-medium text-gray-500">
          {Math.round(((currentQuestionIndex + 1) / questions.length) * 100)}%
        </span>
      </div>
      <div className="w-full bg-gray-200 h-2 rounded-full">
        <div
          className="bg-blue-500 h-2 rounded-full"
          style={{
            width: `${((currentQuestionIndex + 1) / questions.length) * 100}%`,
          }}
        />
      </div>
    </div>
  );
}
