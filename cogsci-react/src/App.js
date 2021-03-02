import React, { useEffect } from "react";
import "./App.css";
import { useSelector } from "react-redux";
import { getLoading } from "./features/student/home/homeSlice";
import StudentHomePage from "./features/student/home/StudentHomePage";
import { BrowserRouter, Switch } from "react-router-dom";
import SubjectsPage from "./features/student/subjects/SubjectsPage";
import Login from "./features/login/Login";
import AuthRoute from "./features/login/AuthRoute";
import {
  URL_BONUSES,
  URL_HOME_STUDENT,
  URL_PRESENTATIONS,
  URL_SUBJECTS,
} from "./constants";
import BonusesPage from "./features/student/bonuses/BonusesPage";
import BonusPage from "./features/student/bonus/BonusPage";
import ScrollToTop from "./components/ScrollToTop";
import PresentationPage from "./features/student/presentation/PresentationPage";

function App() {
  const isLoading = useSelector(getLoading);

  useEffect(() => {
    document.body.style.cursor = isLoading ? "progress" : "";
  }, [isLoading]);

  return (
    <div className="App">
      <BrowserRouter>
        <ScrollToTop />
        <Switch>
          <AuthRoute path="/" exact component={SubjectsPage} type="student" />
          <AuthRoute path="/login" component={Login} type="login" />
          {/* prettier-ignore */}
          <AuthRoute path={"/subject/:subjectId" + URL_HOME_STUDENT} component={StudentHomePage} type="home-student"/>
          <AuthRoute
            path={URL_SUBJECTS}
            component={SubjectsPage}
            type="student"
          />

          <AuthRoute
            exact
            path={"/subject/:subjectId" + URL_BONUSES}
            component={BonusesPage}
            type="bonus"
          />
          <AuthRoute
            path={"/subject/:subjectId" + URL_BONUSES + "/:bonusId"}
            component={BonusPage}
            type="bonusId"
          />
          <AuthRoute
            path={"/subject/:subjectId" + URL_BONUSES + "/:bonusId"}
            component={BonusPage}
            type="bonusId"
          />
          <AuthRoute
            // prettier-ignore
            path={"/subject/:subjectId" + URL_PRESENTATIONS + "/:presentationId"}
            component={PresentationPage}
            type="presentation"
          />
          {/* defaultna route, ak nematchne nic: /login, ak je prihlaseny, /subjects ak je prihlaseny */}
          <AuthRoute component={Login} type="login" />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
