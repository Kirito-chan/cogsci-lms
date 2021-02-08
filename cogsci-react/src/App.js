import React, { useEffect } from "react";
import "./App.css";
import { useSelector } from "react-redux";
import { getLoading } from "./features/homeStudent/homeStudentSlice";
import StudentHomePage from "./features/homeStudent/StudentHomePage";
import { BrowserRouter, Switch } from "react-router-dom";
import SubjectsPage from "./features/subjects/SubjectsPage";
import Login from "./features/login/Login";
// import withAuth from "./features/login/withAuth";
import AuthRoute from "./features/login/AuthRoute";

// import useToken from "./features/login/useToken";

function App() {
  const isLoading = useSelector(getLoading);

  useEffect(() => {
    document.body.style.cursor = isLoading ? "progress" : "";
  });

  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <AuthRoute path="/login" type="login" component={Login} />
          {/* prettier-ignore */}
          <AuthRoute path="/home-student" render={StudentHomePage} type="private"/>
          <AuthRoute path="/subjects" render={SubjectsPage} type="private" />
          <AuthRoute path="/" exact render={SubjectsPage} type="private" />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
