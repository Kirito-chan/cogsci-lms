import React, { useEffect } from "react";
import "./App.css";
import { useSelector } from "react-redux";
import { getLoading } from "./features/homeStudent/homeStudentSlice";
import StudentHomePage from "./features/homeStudent/StudentHomePage";

function App() {
  const isLoading = useSelector(getLoading);

  useEffect(() => {
    document.body.style.cursor = isLoading ? "progress" : "";
  });

  return (
    <div className="App">
      <StudentHomePage />
    </div>
  );
}

export default App;
