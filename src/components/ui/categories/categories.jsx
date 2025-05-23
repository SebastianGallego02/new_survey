import React, { useRef, useState, useEffect } from "react";
import { labels } from "./categoriesLabels";
import ErrorBoundary from "../../../hooks/errorBoundery";

export default function Categories() {
  const trackRef = useRef(null);
  const [showPrev, setShowPrev] = useState(false);
  const [showNext, setShowNext] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const slideWidth = 250;
  const gap = 32;

  const checkScroll = () => {
    if (!trackRef.current) return;

    const { scrollLeft, scrollWidth, clientWidth } = trackRef.current;

    // Check if scrollLeft is very close to 0 (within 2 pixels)
    setShowPrev(scrollLeft > 5);
    setShowNext(scrollLeft < scrollWidth - clientWidth - 1);

    const newIndex = Math.round(scrollLeft / (slideWidth + gap));
    setCurrentIndex(newIndex);
  };

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    // Force scroll to true 0 position when component mounts
    track.scrollLeft = 0;

    checkScroll();
    track.addEventListener("scroll", checkScroll);
    return () => track.removeEventListener("scroll", checkScroll);
  }, []);

  const scrollTo = (direction) => {
    if (!trackRef.current) return;

    const currentScrollPosition = trackRef.current.scrollLeft;

    if (direction === "prev") {
      // If we're already close to the beginning, scroll to exact 0
      if (currentScrollPosition < slideWidth + gap) {
        trackRef.current.scrollTo({
          left: 0,
          behavior: "smooth",
        });
      } else {
        trackRef.current.scrollTo({
          left: currentScrollPosition - (slideWidth + gap),
          behavior: "smooth",
        });
      }
    } else {
      trackRef.current.scrollTo({
        left: currentScrollPosition + (slideWidth + gap),
        behavior: "smooth",
      });
    }
  };

  return (
    <ErrorBoundary>
      <div className="bg-white py-24 sm:py-32 relative">
        <div className="px-6 lg:px-8 relative">
          <div className="relative overflow-hidden mx-4">
            <div className="carousel-track" ref={trackRef}>
              {labels.map((labels) => (
                <div key={labels.id} className="carousel-slide">
                  <div className="mx-auto h-40 w-40 rounded-full overflow-hidden bg-gray-100">
                    <img
                      src={labels.image}
                      alt="Statistic icon"
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="mt-4 text-3xl font-semibold tracking-tight text-gray-900 sm:text-2xl">
                    {labels.value}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="inset-0 absolute">
            {showPrev && (
              <button
                className="carousel-prev"
                onClick={() => scrollTo("prev")}
              >
                ‹
              </button>
            )}
            {showNext && (
              <button
                className="carousel-next right-0.5"
                onClick={() => scrollTo("next")}
              >
                ›
              </button>
            )}
          </div>
        </div>
      </div>
    </ErrorBoundary>
  );
}
