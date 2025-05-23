import React from "react";
import { LoremIpsum } from "lorem-ipsum";
import ErrorBoundary from "../hooks/errorBoundery";
import Carousel from "../components/ui/carousel/photos/carouselMod";

// Constants for slide count and slides
const SLIDE_COUNT = 15;
const slides = Array.from(Array(SLIDE_COUNT).keys()); // [0, 1, 2, 3, 4]


const lorem = new LoremIpsum({
  sentencesPerParagraph: {
    min: 1,
    max: 3,
  },
  wordsPerSentence: {
    min: 4,
    max: 16,
  },
});

// Function version of NewsCarousel
function NewsCarousel() {
  const carouselOptions = {
    loop: true,
    align: "center",
  };

  // Generate lorem ipsum text
  const loremText = lorem.generateParagraphs(1); // Generates 1 paragraph of lorem ipsum


  
  return (
    <ErrorBoundary>
      <div className="w-full px-0 md:px-6 lg:px-8 pt-16">
        <div className="text-center">
          <h1 className="text-2xl tracking-tight text-balance sm:text-4xl font-semibold text-gray-900 hover:bg-gray-50">
            Important News
          </h1>
          <div className="mt-8 text-lg font-medium text-pretty text-gray-500 sm:text-xl/8">
            {loremText}
          </div>
        </div>
        <div className="py-12">
          <Carousel slides={slides} options={carouselOptions} />
        </div>
      </div>
    </ErrorBoundary>
  );
}

export default NewsCarousel;
