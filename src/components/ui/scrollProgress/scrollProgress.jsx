import React, { useEffect, useState, useRef } from "react";

const ScrollProgressBar = ({ containerRef, questionsCount }) => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const popoverRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const calculateScrollProgress = () => {
      const scrollLeft = container.scrollLeft;
      const scrollWidth = container.scrollWidth - container.clientWidth;
      const progress = (scrollLeft / scrollWidth) * 100;
      setScrollProgress(progress);
      
      // Calculate current question based on scroll position
      const questionWidth = container.scrollWidth / questionsCount;
      const current = Math.floor(scrollLeft / questionWidth) + 1;
      setCurrentQuestion(Math.min(current, questionsCount));
    };

    const scrollListener = () => {
      requestAnimationFrame(calculateScrollProgress);
    };

    container.addEventListener("scroll", scrollListener);

    return () => {
      container.removeEventListener("scroll", scrollListener);
    };
  }, [containerRef, questionsCount]);

  // Position the popover at the progress location
  const popoverPosition = { left: `${scrollProgress}%`, transform: 'translateX(-50%)' };

  return (
    <div className="w-full h-4 flex items-center relative">
      {/* Dotted background track */}
      <div
        className="absolute w-full h-3 rounded-full"
        style={{
          backgroundImage: "radial-gradient(circle, #9CA3AF 2.5px, transparent 2.5px)",
          backgroundSize: "14px 14px",
          backgroundPosition: "center",
          backgroundRepeat: "repeat-x",
        }}
      />

      {/* Progress bar */}
      <div className="relative w-full h-1.5 overflow-hidden rounded-full">
        <div
          className="h-full bg-sky-500 transition-all duration-300 rounded-full"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Progress popover */}
      <div
        ref={popoverRef}
        className="absolute -top-8 bg-white border border-gray-200 rounded-md shadow-sm px-2 py-1 text-xs font-medium text-gray-700 whitespace-nowrap"
        style={popoverPosition}
      >
        {currentQuestion}/{questionsCount} ({Math.round(scrollProgress)}%)
      </div>
    </div>
  );
};

export default ScrollProgressBar;