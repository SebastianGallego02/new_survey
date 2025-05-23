import React from "react";
import ErrorBoundary from "../../hooks/ErrorBoundery";
import NavbarUser from "../../header/navbarUser";
import SurveyRecap from "./suveyRecap";

export default function SurveyRecapIndex() {


  return (
    <ErrorBoundary>
      <NavbarUser />
      <div className="mx-auto max-w-9/10">
        <SurveyRecap />
      </div>
    </ErrorBoundary>
  );
}
