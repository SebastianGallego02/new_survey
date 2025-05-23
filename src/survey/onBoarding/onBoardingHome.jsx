import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import WelcomeInstructions from "./obBoardingWelcome";
import IDCapture from "./idcapture";
import NavegationBoarding from "./navOnBoarding";
import { get_surveyer_id } from "../../utils/api";

export default function OnBoardingHome() {
  const [step, setStep] = useState(0);
  const [canProceed, setCanProceed] = useState(false);
  const [hasIdFront, setHasIdFront] = useState(false);
  const [hasIdBack, setHasIdBack] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (step === 0) {
      setCanProceed(true);
    } else {
      setCanProceed(false);
    }
  }, [step]);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const [userData] = await get_surveyer_id();
        console.log(userData);

        const front = userData.has_id_front;
        const back = userData.has_id_back;

        setHasIdFront(front);
        setHasIdBack(back);
        if (front && back) {
          navigate("/encuesta");
        } else {
          setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching user:", error);
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  const nextStep = () => {
    if (step === 0) {
      if (!hasIdFront && !hasIdBack) {
        setStep(1); 
      } else if (hasIdFront && !hasIdBack) {
        setStep(2); 
      } else if (!hasIdFront && hasIdBack) {
        setStep(1); 
      } else {
        handleEnd();
      }
    } else if (step === 1) {
      if (!hasIdFront && !hasIdBack) {
        setStep(2); 
      } else if (!hasIdFront && hasIdBack) {
        handleEnd(); 
      } else {
        handleEnd(); 
      }
    } else if (step === 2) {
      handleEnd();
    }
  };

  const handleEnd = () => {
    navigate("/encuesta");
  };

  return (
    <div className="relative w-full h-full mx-auto space-y-5 overflow-hidden rounded-2xl p-4 bg-white border-[0.01vw]">
      {/* Step 0: Welcome Page */}
      {step === 0 && <WelcomeInstructions imageName="id_complete" />}

      {/* Step 1: Capture ID Page */}
      {step === 1 && (
        <IDCapture
          step={step}
          fileName="id_front"
          imageName="idFront"
          imageALT=""
          imageDescription="Cara Frontal Documento"
          setCanProceed={setCanProceed}
        />
      )}

      {/* Step 2: Capture ID Back */}
      {step === 2 && (
        <IDCapture
          step={step}
          fileName="id_back"
          imageName="idBack"
          imageALT=""
          imageDescription="Cara Posterior Documento"
          setCanProceed={setCanProceed}
        />
      )}

      {/* Navigation Arrows */}
      <NavegationBoarding
        step={step}
        nextStep={nextStep}
        canProceed={canProceed}
        handleEnd={handleEnd}
      />
    </div>
  );
}
