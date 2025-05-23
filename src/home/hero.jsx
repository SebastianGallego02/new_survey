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

const Hero = () => {
  const loremText = lorem.generateParagraphs(1);

  return (
    <>
      <div className="bg-white">
        <div className="relative isolate px-6 pt-6 lg:px-8 bg-gradient-to-r from-teal-200/40 to-teal-500/5">
          <div className="mx-auto pt-24 pb-12 sm:pt-48 lg:pt-36 w-3/4">
            <div className="text-center">
              <h1 className="text-5xl font-semibold tracking-tight text-balance sm:text-7xl bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent">
                Association Name
              </h1>
              <div className="mt-8 text-lg font-medium text-pretty text-gray-500 sm:text-xl/8">
                {loremText}
              </div>
              <div className="mt-10 flex items-center justify-center gap-x-6">
                <a
                  href="#"
                  className="rounded-md bg-violet-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-violet-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-600"
                >
                  Get started
                </a>
                <a href="#" className="text-sm/6 font-semibold text-gray-900">
                  Learn more <span aria-hidden="true">→</span>
                </a>
              </div>
            </div>
            <div className="hidden sm:mb-8 sm:flex sm:justify-center pt-12">
              <div className="relative rounded-full px-3 py-1 text-sm/6 text-gray-600 ring-1 ring-gray-900/10 hover:ring-gray-900/20">
                News!{" "}
                <a href="#" className="font-semibold text-violet-600">
                  <span className="absolute inset-0" aria-hidden="true"></span>
                  Read more <span aria-hidden="true">&rarr;</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Hero;
