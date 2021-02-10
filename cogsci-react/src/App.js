import React, { useEffect } from "react";
import "./App.css";
import { useSelector } from "react-redux";
import { getLoading } from "./features/student/home/homeSlice";
import StudentHomePage from "./features/student/home/StudentHomePage";
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
          <AuthRoute path="/" exact component={SubjectsPage} type="student" />
          <AuthRoute path="/login" type="login" component={Login} />
          {/* prettier-ignore */}
          <AuthRoute path="/home-student/:subjectId" component={StudentHomePage} type="home-student"/>
          <AuthRoute path="/subjects" component={SubjectsPage} type="student" />
          {/* defaultna route, ak nematchne nic: /login, ak je prihlaseny, /subjects ak je prihlaseny */}
          <AuthRoute component={Login} type="login" />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
