import React from "react";
import ErrorBoundary from "../../../hooks/ErrorBoundery";

export default function Post() {
  return (
    <ErrorBoundary>
      <div className="py-24 sm:py-32">
        <div className="px-6 lg:px-8">
          <h2 className="text-center text-base/7 font-semibold text-indigo-600">
            Category
          </h2>
          <p className="mx-auto mt-2 max-w-lg text-center text-4xl font-semibold tracking-tight text-balance text-gray-950 sm:text-5xl">
            Title
          </p>
          <div className="mt-10 grid gap-4 sm:mt-16 grid-cols-1 md:grid-cols-2 auto-rows-fr">
            <div className="relative row-span-1 h-auto sm:h-[300px] md:h-[550px]">
              <div className="relative h-full">
                <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(var(--radius-lg)+1px)] lg:rounded-[calc(2rem+1px)]">
                  <div className="h-full">
                    <img
                      className="h-full w-full object-cover object-top rounded-[inherit]"
                      src="https://images.unsplash.com/photo-1606857521015-7f9fcf423740?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1344&h=1104&q=80"
                      alt=""
                    />
                  </div>
                </div>
                <div className="pointer-events-none absolute inset-px rounded-lg"></div>
              </div>
            </div>
            <div className="relative row-span-1 h-auto sm:h-[250px] md:h-[550px]">
              <div className="relative h-full flex flex-col overflow-hidden rounded-[calc(var(--radius-lg)+1px)] lg:rounded-[calc(2rem+1px)]">
                <div className="px-8 md:pt-[20%] pt-[10%] flex flex-col h-full">
                  <p className="text-2xl font-medium text-gray-950">
                    Performance
                  </p>
                  <p className="mt-2 text-sm/6 text-gray-600">
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit
                    maiores impedit.
                  </p>
                  <p className="mt-auto text-right text-gray-600 text-xs/4">
                    Last update 12 minutes ago
                  </p>
                </div>
              </div>
              <div className="pointer-events-none absolute inset-px rounded-lg max-lg:rounded-t-[2rem]"></div>
            </div>
          </div>
        </div>
      </div>
    </ErrorBoundary>
  );
}
