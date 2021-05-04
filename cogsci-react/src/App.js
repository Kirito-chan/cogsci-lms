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
  URL_ADMIN_PRESENTATIONS,
  URL_ADMIN_SETTINGS,
  URL_ADMIN_SUBJECTS,
  URL_BONUSES,
  URL_ADMIN_HOME,
  URL_HOME,
  URL_PRESENTATIONS,
  URL_SUBJECTS,
  URL_TERMS,
  URL_ADMIN_EMAIL,
  URL_NOT_AUTHORIZED,
  URL_REGISTER,
  URL_ADMIN_STUDENT_DETAIL,
  URL_ADMIN_USERS,
  URL_ADMIN_OVERALL_ATTENDANCE,
  URL_ADMIN_OVERALL_BONUSES,
  URL_FORGOTTEN_PASSWORD,
  URL_RESETED_PASSWORD,
  URL_LOGIN,
} from "./constants";
import BonusesPage from "./features/student/bonuses/BonusesPage";
import BonusPage from "./features/student/bonus/BonusPage";
import ScrollToTop from "./components/ScrollToTop";
import PresentationPage from "./features/student/presentation/PresentationPage";
import PresentationsPage from "./features/student/presentations/PresentationsPage";
import TermsPage from "./features/student/terms/TermsPage";
import NotAuthorizedPage from "./components/NotAuthorizedPage";
import AdminHomePage from "./features/admin/home/AdminHomePage";
import PresentationsPageAdmin from "./features/admin/presentations/PresentationsPage";
import SettingsPage from "./features/admin/settings/SettingsPage";
import EmailPage from "./features/admin/email/EmailPage";
import RegisterPage from "./features/login/RegisterPage";
import StudentDetailPage from "./features/admin/student-detail/StudentDetailPage";
import UsersPage from "./features/admin/all-users/UsersPage";
import OverallAttendance from "./features/admin/overall-attendance/OverallAttendance";
import OverallBonuses from "./features/admin/overall-bonuses/OverallBonuses";
import ForgottenPasswordPage from "./features/login/ForgottenPasswordPage";
import ResetedPasswordPage from "./features/login/ResetedPasswordPage";

// prettier-ignore
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <ScrollToTop />
        <Switch>
          <AuthRoute exact path="/" component={Login} type="login" />
          <AuthRoute path={URL_LOGIN} component={Login} type="login" />
          <AuthRoute path={URL_NOT_AUTHORIZED} component={NotAuthorizedPage} type="not-auth" />
          
          {/* admin routes */}
          <AuthRoute path={"/subject/:subjectId" + URL_ADMIN_HOME} component={AdminHomePage} type="admin" />
          <AuthRoute path={URL_ADMIN_SUBJECTS} component={SubjectsPageAdmin} type="admin" />
          <AuthRoute path={"/subject/:subjectId" + URL_ADMIN_SETTINGS} component={SettingsPage} type="admin" />
          <AuthRoute exact path={"/subject/:subjectId" + URL_ADMIN_BONUSES} component={BonusesPage} type="admin" />
          <AuthRoute exact path={"/subject/:subjectId" + URL_ADMIN_PRESENTATIONS} component={PresentationsPageAdmin} type="admin" />
          <AuthRoute path={"/subject/:subjectId" + URL_ADMIN_EMAIL} component={EmailPage} type="admin" />
          <AuthRoute path={"/subject/:subjectId" + URL_ADMIN_STUDENT_DETAIL + "/:studentId"} component={StudentDetailPage} type="admin" />
          <AuthRoute path={URL_ADMIN_USERS} component={UsersPage} type="admin" />
          <AuthRoute path={"/subject/:subjectId" + URL_ADMIN_OVERALL_ATTENDANCE} component={OverallAttendance} type="admin" />
          <AuthRoute path={"/subject/:subjectId" + URL_ADMIN_OVERALL_BONUSES} component={OverallBonuses} type="admin" />

          {/* student routes */}
          <AuthRoute path={"/subject/:subjectId" + URL_HOME} component={StudentHomePage} type="student"/>
          <AuthRoute path={URL_SUBJECTS} component={SubjectsPage} type="student" />
          <AuthRoute exact path={"/subject/:subjectId" + URL_BONUSES} component={BonusesPage} type="student" />
          <AuthRoute exact path={"/subject/:subjectId" + URL_PRESENTATIONS} component={PresentationsPage} type="student" />
          <AuthRoute path={"/subject/:subjectId" + URL_TERMS} component={TermsPage} type="student" />

          {/* student and admin common routes */}        
          <AuthRoute path={"/subject/:subjectId" + URL_BONUSES + "/:bonusId"} component={BonusPage} type="both" />
          <AuthRoute path={"/subject/:subjectId" + URL_PRESENTATIONS + "/:presentationId"} component={PresentationPage} type="both" />
          <AuthRoute path={URL_REGISTER} component={RegisterPage} type="register" />
          <AuthRoute path={URL_FORGOTTEN_PASSWORD} component={ForgottenPasswordPage} type="register" />
          <AuthRoute path={URL_RESETED_PASSWORD + "/:userId/:token"} component={ResetedPasswordPage} type="register" />
          
          {/* defaultna route, ak nematchne nic: /login, ak je neprihlaseny, /subjects ak je prihlaseny */}
          <AuthRoute component={Login} type="login" />
          
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
