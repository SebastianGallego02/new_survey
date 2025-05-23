import React from "react";
import ErrorBoundary from "../../hooks/errorBoundery";
import NavbarUser from "../../header/navbarUser";
import OnBoardingHome from "./onBoardingHome";

export default function OnBoardingIndex() {

  return (
    <ErrorBoundary>
      <NavbarUser />
      <div className="mx-auto max-w-9/10">
        <OnBoardingHome />
      </div>
    </ErrorBoundary>
  );
}
