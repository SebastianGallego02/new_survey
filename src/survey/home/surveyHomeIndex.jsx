import ErrorBoundary from "../../hooks/errorBoundery";
import NavbarUser from "../../header/navbarUser";
import SurveyHome from "./surveyHome";

export default function SurveyHomeIndex() {

  return (
    <ErrorBoundary>
      <NavbarUser />
      <div className="mx-auto max-w-9/10">
        <SurveyHome />
      </div>
    </ErrorBoundary>
  );
}
