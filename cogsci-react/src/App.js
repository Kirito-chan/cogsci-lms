import React, { useEffect } from "react";
import "./App.css";
import { useSelector } from "react-redux";
import { getLoading } from "./features/student/homeStudent/homeStudentSlice";
import StudentHomePage from "./features/student/homeStudent/StudentHomePage";
import { BrowserRouter, Switch } from "react-router-dom";
import SubjectsPage from "./features/student/subjects/SubjectsPage";
import Login from "./features/login/Login";
import AuthRoute from "./features/login/AuthRoute";
import NavbarWithRouter from "./components/Navigation";

function App() {
  const isLoading = useSelector(getLoading);

  useEffect(() => {
    document.body.style.cursor = isLoading ? "progress" : "";
  }, [isLoading]);

  return (
    <div className="App">
      <BrowserRouter>
        <NavbarWithRouter />
        <Switch>
          <AuthRoute path="/login" type="login" component={Login} />
          {/* prettier-ignore */}
          <AuthRoute path="/home-student" component={StudentHomePage} type="student"/>
          <AuthRoute path="/subjects" component={SubjectsPage} type="student" />
          <AuthRoute path="/" exact component={SubjectsPage} type="student" />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
