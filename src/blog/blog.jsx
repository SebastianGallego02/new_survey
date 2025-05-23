import { LoremIpsum } from "lorem-ipsum";
import ErrorBoundary from "../hooks/ErrorBoundery";

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

export default function Blog() {
  const loremText = lorem.generateParagraphs(1);

  return (
    <ErrorBoundary>
      <div className="bg-white py-24 sm:py-32">
        <div className="px-6 lg:px-8">
          <div className="lg:mx-0 text-center">
            <h2 className="text-4xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-5xl">
              From the blog
            </h2>
            <div className="mt-8 text-lg font-medium text-pretty text-gray-500 sm:text-xl/8">
              {loremText}
            </div>
          </div>
          <div className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 border-t border-gray-200 pt-10 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-3 md:grid-cols-2">
            <article className="flex flex-col items-start justify-between">
              <div className="container h-72 bg-red-200 my-2 mb-4 rounded-xl overflow-hidden transform transition-transform duration-300 hover:scale-105">
                <img src="https://images.unsplash.com/photo-1547586696-ea22b4d4235d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3270&q=80" />
              </div>
              <div className="flex items-center gap-x-4 text-xs">
                <time dateTime="2020-03-16" className="text-gray-500">
                  Mar 16, 2020
                </time>
                <a
                  href="#"
                  className="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100"
                >
                  Marketing
                </a>
              </div>
              <div className="group relative">
                <h3 className="mt-3 text-lg/6 font-semibold text-gray-900 group-hover:text-gray-600">
                  <a href="#">
                    <span className="absolute inset-0"></span>
                    Boost your conversion rate
                  </a>
                </h3>
                <p className="mt-5 line-clamp-3 text-sm/6 text-gray-600">
                  Illo sint voluptas. Error voluptates culpa eligendi. Hic vel
                  totam vitae illo. Non aliquid explicabo necessitatibus unde.
                  Sed exercitationem placeat consectetur nulla deserunt vel.
                  Iusto corrupti dicta.
                </p>
              </div>
              <div className="relative mt-8 flex items-center gap-x-4">
                <img
                  src="https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                  alt=""
                  className="size-10 rounded-full bg-gray-50"
                />
                <div className="text-sm/6">
                  <p className="font-semibold text-gray-900">
                    <a href="#">
                      <span className="absolute inset-0"></span>
                      Michael Foster
                    </a>
                  </p>
                  <p className="text-gray-600">Co-Founder / CTO</p>
                </div>
              </div>
            </article>
            <article className="flex flex-col items-start justify-between">
              <div className="container h-72 bg-red-200 my-2 mb-4 rounded-xl overflow-hidden transform transition-transform duration-300 hover:scale-105">
                <img src="https://images.unsplash.com/photo-1547586696-ea22b4d4235d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3270&q=80" />
              </div>
              <div className="flex items-center gap-x-4 text-xs">
                <time dateTime="2020-03-16" className="text-gray-500">
                  Mar 16, 2020
                </time>
                <a
                  href="#"
                  className="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100"
                >
                  Marketing
                </a>
              </div>
              <div className="group relative">
                <h3 className="mt-3 text-lg/6 font-semibold text-gray-900 group-hover:text-gray-600">
                  <a href="#">
                    <span className="absolute inset-0"></span>
                    Boost your conversion rate
                  </a>
                </h3>
                <p className="mt-5 line-clamp-3 text-sm/6 text-gray-600">
                  Illo sint voluptas. Error voluptates culpa eligendi. Hic vel
                  totam vitae illo. Non aliquid explicabo necessitatibus unde.
                  Sed exercitationem placeat consectetur nulla deserunt vel.
                  Iusto corrupti dicta.
                </p>
              </div>
              <div className="relative mt-8 flex items-center gap-x-4">
                <img
                  src="https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                  alt=""
                  className="size-10 rounded-full bg-gray-50"
                />
                <div className="text-sm/6">
                  <p className="font-semibold text-gray-900">
                    <a href="#">
                      <span className="absolute inset-0"></span>
                      Michael Foster
                    </a>
                  </p>
                  <p className="text-gray-600">Co-Founder / CTO</p>
                </div>
              </div>
            </article>
            <article className="flex flex-col items-start justify-between">
              <div className="container h-72 bg-red-200 my-2 mb-4 rounded-xl overflow-hidden transform transition-transform duration-300 hover:scale-105">
                <img src="https://images.unsplash.com/photo-1547586696-ea22b4d4235d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3270&q=80" />
              </div>
              <div className="flex items-center gap-x-4 text-xs">
                <time dateTime="2020-03-16" className="text-gray-500">
                  Mar 16, 2020
                </time>
                <a
                  href="#"
                  className="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100"
                >
                  Marketing
                </a>
              </div>
              <div className="group relative">
                <h3 className="mt-3 text-lg/6 font-semibold text-gray-900 group-hover:text-gray-600">
                  <a href="#">
                    <span className="absolute inset-0"></span>
                    Boost your conversion rate
                  </a>
                </h3>
                <p className="mt-5 line-clamp-3 text-sm/6 text-gray-600">
                  Illo sint voluptas. Error voluptates culpa eligendi. Hic vel
                  totam vitae illo. Non aliquid explicabo necessitatibus unde.
                  Sed exercitationem placeat consectetur nulla deserunt vel.
                  Iusto corrupti dicta.
                </p>
              </div>
              <div className="relative mt-8 flex items-center gap-x-4">
                <img
                  src="https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                  alt=""
                  className="size-10 rounded-full bg-gray-50"
                />
                <div className="text-sm/6">
                  <p className="font-semibold text-gray-900">
                    <a href="#">
                      <span className="absolute inset-0"></span>
                      Michael Foster
                    </a>
                  </p>
                  <p className="text-gray-600">Co-Founder / CTO</p>
                </div>
              </div>
            </article>
            <article className="flex flex-col items-start justify-between">
              <div className="container h-72 bg-red-200 my-2 mb-4 rounded-xl overflow-hidden transform transition-transform duration-300 hover:scale-105">
                <img src="https://images.unsplash.com/photo-1547586696-ea22b4d4235d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3270&q=80" />
              </div>
              <div className="flex items-center gap-x-4 text-xs">
                <time dateTime="2020-03-16" className="text-gray-500">
                  Mar 16, 2020
                </time>
                <a
                  href="#"
                  className="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100"
                >
                  Marketing
                </a>
              </div>
              <div className="group relative">
                <h3 className="mt-3 text-lg/6 font-semibold text-gray-900 group-hover:text-gray-600">
                  <a href="#">
                    <span className="absolute inset-0"></span>
                    Boost your conversion rate
                  </a>
                </h3>
                <p className="mt-5 line-clamp-3 text-sm/6 text-gray-600">
                  Illo sint voluptas. Error voluptates culpa eligendi. Hic vel
                  totam vitae illo. Non aliquid explicabo necessitatibus unde.
                  Sed exercitationem placeat consectetur nulla deserunt vel.
                  Iusto corrupti dicta.
                </p>
              </div>
              <div className="relative mt-8 flex items-center gap-x-4">
                <img
                  src="https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                  alt=""
                  className="size-10 rounded-full bg-gray-50"
                />
                <div className="text-sm/6">
                  <p className="font-semibold text-gray-900">
                    <a href="#">
                      <span className="absolute inset-0"></span>
                      Michael Foster
                    </a>
                  </p>
                  <p className="text-gray-600">Co-Founder / CTO</p>
                </div>
              </div>
            </article>
          </div>
        </div>
      </div>
    </ErrorBoundary>
  );
}
