import { FiArrowRight } from "react-icons/fi";

export default function NavegationBoarding({ step, nextStep, canProceed, handleEnd }) {

  return (
    <div className="sticky bottom-0 left-0 right-0 px-4 pt-14">
      <hr className="pb-2" />
      <div className="flex justify-between items-center">
        <button className="disabled:opacity-30 disabled:cursor-not-allowed">
        </button>

        {/* Step indicator */}
        <div className="flex gap-2">
          <div className={`w-3 h-3 rounded-full ${step >= 0 ? "bg-blue-600" : "bg-gray-300"}`} />
          <div className={`w-3 h-3 rounded-full ${step >= 1 ? "bg-blue-600" : "bg-gray-300"}`} />
          <div className={`w-3 h-3 rounded-full ${step >= 2 ? "bg-blue-600" : "bg-gray-300"}`} />
        </div>

        {step === 2 ? (
          <button
            onClick={handleEnd}
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
          >
            End
          </button>
        ) : (
          <button
            onClick={nextStep}
            disabled={!canProceed}
            className="disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <FiArrowRight size={50} className="z-10" />
          </button>
        )}
      </div>
    </div>
  );
}
