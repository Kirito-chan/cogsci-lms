import React from "react";
import Navigation from "./Navigation";

function NotAuthorizedPage() {
  return (
    <div>
      <Navigation />
      <h1 className="text-center"> Neautorizovaný prístup na admin stránku!</h1>
    </div>
  );
}

export default NotAuthorizedPage;
