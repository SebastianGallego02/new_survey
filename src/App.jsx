import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import HomeIndex from "./home/homeIndex";
import SurveyIndex from "./survey/survey/surveyIndex";
import LoginIndex from "./login/loginIndex";
import SurveyHomeIndex from "./survey/home/surveyHomeIndex";
import OnBoardingIndex from "./survey/onBoarding/onBoardingIndex";

import { AuthProvider } from "./context/useAuth";
import { FinalizationProvider } from "./context/useFinalization";
import PrivateRoutes from "./utils/privateRoutes";
import SurveyRecapIndex from "./survey/recap/surveyRecapIndex";

function App() {

  return (
    <Router>
      <AuthProvider>
        <FinalizationProvider>
          <div>
            <Routes>
              <Route path="/" element={<HomeIndex />} />
              <Route path="/login" element={<LoginIndex />} />
              <Route path="/encuesta" element={<SurveyIndex />} />
              <Route path="/encuesta/recap" element={<SurveyRecapIndex />} />
              <Route path="/encuesta/bienvenida" element={<SurveyHomeIndex />} />
              <Route path="/encuesta/id" element={<OnBoardingIndex />} />
            </Routes>
          </div>
        </FinalizationProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
