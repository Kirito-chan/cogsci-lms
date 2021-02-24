import React, { useEffect } from "react";
import "./App.css";
import { useSelector } from "react-redux";
import { getLoading } from "./features/student/home/homeSlice";
import StudentHomePage from "./features/student/home/StudentHomePage";
import { BrowserRouter, Switch } from "react-router-dom";
import SubjectsPage from "./features/student/subjects/SubjectsPage";
import Login from "./features/login/Login";
import AuthRoute from "./features/login/AuthRoute";
import { URL_BONUSES, URL_HOME_STUDENT, URL_SUBJECTS } from "./constants";
import BonusesPage from "./features/student/bonuses/BonusesPage";
import BonusPage from "./features/student/bonus/BonusPage";
import ScrollToTop from "./components/ScrollToTop";

// TO-DO
// taha z API veci pomocou subjektID nielen pre Attendance, ale ja ostatne, aby to netahal z konstanty, ale z req.params
// premenovat nazov predmetu '18' na .title z DB
// AKO oddelit prezencny a logicky komponent, ak je tam reagovanie na udalost..napr. ak klikne na buttom tak urobi API request v NavigationLoggedIn
// ten last fetch musim fakt nastavovat pre kazdy samostatne?
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
            type="bonus"
          />
          {/* defaultna route, ak nematchne nic: /login, ak je prihlaseny, /subjects ak je prihlaseny */}
          <AuthRoute component={Login} type="login" />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
