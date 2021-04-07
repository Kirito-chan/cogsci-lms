import React, { useEffect } from "react";
import Navigation from "../../../components/Navigation";

function AdminHomePage() {
  useEffect(() => {
    document.title = "Domov";
  }, []);

  return (
    <div>
      <Navigation />

      <h1>Home - admin</h1>
    </div>
  );
}

export default AdminHomePage;
