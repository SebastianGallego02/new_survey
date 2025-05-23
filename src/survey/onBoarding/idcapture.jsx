import { useRef, useState, useEffect } from "react";
import { gsap } from "gsap";
import { get_surveyer } from "../../utils/api";

import {
  handleCaptureID as CaptureID,
  initializeCamera,
} from "../../hooks/userCapture";

export default function IDCapture({
  step,
  fileName,
  imageName,
  imageALT,
  imageDescription,
  setCanProceed,
}) {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const frameRef = useRef(null);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [isCaptured, setIsCaptured] = useState(false);
  const [user, setUser] = useState(null);
  const [surveyUserId, setSurveyUserId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showCaptureButton, setShowCaptureButton] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await get_surveyer();
        console.log(userData);
        setUser(userData);
        if (userData && userData.id) {
          setSurveyUserId(userData.id);
        } else {
          alert("User ID not found");
        }
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };
    fetchUser();
  }, []);

  const handleCaptureID = () =>
    CaptureID({
      surveyUserId,
      user,
      videoRef,
      canvasRef,
      frameRef,
      fileName,
      imageName,
      setLoading,
      setIsCaptured,
      setCanProceed,
    });

  useEffect(() => {
    initializeCamera(videoRef, setIsVideoLoaded, step);
  }, [step]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowCaptureButton(true);
    }, 9000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (isVideoLoaded) {
      gsap.fromTo(
        ".box",
        {
          autoAlpha: 1,
          y: -200,
          scale: 2,
        },
        {
          autoAlpha: 0.5,
          y: 0,
          scale: 1,
          duration: 3,
          delay: 5,
          ease: "power2.out",
        }
      );
    }
  }, [isVideoLoaded]);

  return (
    <>
      <div
        className={`absolute inset-0 z-30 h-[70vh] ${
          isVideoLoaded ? "animate-white-blur" : "bg-black"
        }`}
      ></div>

      <div className="flex flex-col items-center mx-auto space-y-4 lg:h-[60vh] h-[60vh] relative md:w-3/4">
        <div className="w-full overflow-hidden rounded-md transition-all duration-10000 ease-in-out">
          <video
            ref={videoRef}
            autoPlay
            className="absolute top-0 left-0 w-full h-full object-cover"
          />
          <div className="absolute top-0 left-0 w-full h-[20%] backdrop-blur-xs bg-black/20 z-10 pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-full h-[20%] backdrop-blur-xs bg-black/20 z-10 pointer-events-none" />
          <div className="absolute top-[20%] left-0 md:w-[20%] w-[5%] h-[60%] backdrop-blur-xs bg-black/20 z-10 pointer-events-none" />
          <div className="absolute top-[20%] right-0 md:w-[20%] w-[5%] h-[60%] backdrop-blur-xs bg-black/20 z-10 pointer-events-none" />
          <div
            ref={frameRef}
            className="absolute top-1/2 left-1/2 md:w-[60%] w-[90%] h-[60%] -translate-x-1/2 -translate-y-1/2 border-2 border-green-500 z-20 pointer-events-none"
          />
        </div>

        <div
          className={`absolute top-[calc(50%+33.4%)] left-1/2 -translate-x-1/2 w-full flex justify-center z-30 pointer-events-none items-center md:gap-12 gap-6 box ${
            !isVideoLoaded ? "opacity-0" : ""
          }`}
        >
          <span className="text-white whitespace-nowrap md:text-base text-xs">
            {imageDescription}
          </span>
          <img
            src={`/images/${imageName}.png`}
            alt={imageALT}
            className="md:w-28 w-22 h-auto"
          />
        </div>

        <canvas ref={canvasRef} className="hidden" />
      </div>

      {showCaptureButton && (
        <div className="flex justify-center w-full">
          <button
            onClick={handleCaptureID}
            className={`p-2 rounded w-full max-w-md z-31 text-white ${
              isCaptured || loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 cursor-pointer"
            }`}
            disabled={loading || isCaptured}
          >
            {loading ? "Processing..." : isCaptured ? "Captured" : "Capture"}
          </button>
        </div>
      )}
    </>
  );
}
