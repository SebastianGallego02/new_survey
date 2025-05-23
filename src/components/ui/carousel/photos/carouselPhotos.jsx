import React from "react";
import CarouselMod from "./carouselMod";
import ErrorBoundary from "../../../../hooks/ErrorBoundery";
import { LoremIpsum } from "lorem-ipsum";

const lorem = new LoremIpsum({
  sentencesPerParagraph: {
    max: 3,
    min: 1,
  },
  wordsPerSentence: {
    max: 16,
    min: 4,
  },
});

const carouselOptions = {
  loop: true,
  align: "center",
};

const slides = Array.from({ length: 15 }, (_, i) => i);

const CarouselPhotos = () => {
  const loremText = lorem.generateParagraphs(1)

  return (
  <ErrorBoundary>
    <div className="w-full px-0 md:px-6 lg:px-8 pt-16">
      <div className="text-center">
        <h1 className="text-2xl sm:text-4xl font-semibold tracking-tight text-gray-900 hover:bg-gray-50 text-balance">
          Important News
        </h1>
        <div className="mt-8 text-lg sm:text-xl/8 font-medium text-gray-500 text-pretty">
          {loremText}
        </div>
      </div>
      <div className="py-12">
        <CarouselMod slides={slides} options={carouselOptions} />
      </div>
    </div>
  </ErrorBoundary>
  )
};

export default CarouselPhotos;
