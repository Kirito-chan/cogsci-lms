import React, { useEffect } from "react";
import "./App.css";
import { useSelector } from "react-redux";
import { getLoading } from "./features/student/home/homeSlice";
import StudentHomePage from "./features/student/home/StudentHomePage";
import { Switch } from "react-router-dom";
import { Router } from "react-router";
import SubjectsPage from "./features/student/subjects/SubjectsPage";
import LoginNad from "./features/login/LoginNad";
import AuthRoute from "./features/login/AuthRoute";
import NavbarWithRouter from "./components/Navigation";
import { createBrowserHistory } from "history";

function App() {
  const isLoading = useSelector(getLoading);

  useEffect(() => {
    document.body.style.cursor = isLoading ? "progress" : "";
  }, [isLoading]);

  const history = createBrowserHistory();

  return (
    <div className="App">
      <Router history={history}>
        <NavbarWithRouter />
        <Switch>
          <AuthRoute path="/" exact component={SubjectsPage} type="student" />
          <AuthRoute path="/login" type="login" component={LoginNad} />
          {/* prettier-ignore */}
          <AuthRoute path="/home-student" component={StudentHomePage} type="student"/>
          <AuthRoute path="/subjects" component={SubjectsPage} type="student" />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
