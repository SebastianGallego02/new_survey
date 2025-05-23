import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Survey from "./survey";
import ErrorBoundary from "../../hooks/ErrorBoundery";
import NavbarUser from "../../header/navbarUser";

export default function SurveyIndex() {
  const { email } = useParams();

  return (
    <ErrorBoundary>
      <NavbarUser />
      <div className="mx-auto max-w-9/10">
        <Survey />
      </div>
    </ErrorBoundary>
  );
}
