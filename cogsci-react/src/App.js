import React from "react";
import "./App.css";
import StudentHomePage from "./features/student/home/StudentHomePage";
import { BrowserRouter, Switch } from "react-router-dom";
import SubjectsPage from "./features/student/subjects/SubjectsPage";
import SubjectsPageAdmin from "./features/admin/subjects/SubjectsPage";
import Login from "./features/login/Login";
import AuthRoute from "./features/login/AuthRoute";
import {
  URL_ADMIN_BONUSES,
  URL_ADMIN_SUBJECTS,
  URL_BONUSES,
  URL_HOME_ADMIN,
  URL_HOME_STUDENT,
  URL_PRESENTATIONS,
  URL_SUBJECTS,
  URL_TERMS,
} from "./constants";
import BonusesPage from "./features/student/bonuses/BonusesPage";
import BonusPage from "./features/student/bonus/BonusPage";
import ScrollToTop from "./components/ScrollToTop";
import PresentationPage from "./features/student/presentation/PresentationPage";
import PresentationsPage from "./features/student/presentations/PresentationsPage";
import TermsPage from "./features/student/terms/TermsPage";
import NotAuthorizedPage from "./components/NotAuthorizedPage";
import AdminHomePage from "./features/admin/home/AdminHomePage";

// prettier-ignore
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <ScrollToTop />
        <Switch>
          <AuthRoute path="/" exact component={SubjectsPage} type="student" />
          <AuthRoute path="/login" component={Login} type="login" />
          <AuthRoute path="/not-authorized" component={NotAuthorizedPage} type="not-auth" />

          {/* admin routes */}
          <AuthRoute path={"/subject/:subjectId" + URL_HOME_ADMIN} component={AdminHomePage} type="home-student" />
          <AuthRoute path={URL_ADMIN_SUBJECTS} component={SubjectsPageAdmin} type="admin" />
          <AuthRoute exact path={"/subject/:subjectId" + URL_ADMIN_BONUSES} component={BonusesPage} type="bonus" />
          <AuthRoute path={"/subject/:subjectId" + URL_ADMIN_BONUSES + "/:bonusId"} component={BonusPage} type="bonusId" />
          {/* student routes */}
          <AuthRoute path={"/subject/:subjectId" + URL_HOME_STUDENT} component={StudentHomePage} type="home-student"/>
          <AuthRoute path={URL_SUBJECTS} component={SubjectsPage} type="subjects" />
          <AuthRoute exact path={"/subject/:subjectId" + URL_BONUSES} component={BonusesPage} type="bonus" />
          <AuthRoute path={"/subject/:subjectId" + URL_BONUSES + "/:bonusId"} component={BonusPage} type="bonusId" />
          <AuthRoute exact path={"/subject/:subjectId" + URL_PRESENTATIONS} component={PresentationsPage} type="presentation" />
          <AuthRoute path={"/subject/:subjectId" + URL_PRESENTATIONS + "/:presentationId"} 
                     component={PresentationPage} type="presentationId" />
          <AuthRoute path={"/subject/:subjectId" + URL_TERMS} component={TermsPage} type="term" />
          {/* defaultna route, ak nematchne nic: /login, ak je neprihlaseny, /subjects ak je prihlaseny */}
          <AuthRoute component={Login} type="login" />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
