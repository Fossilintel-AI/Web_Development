import React from "react";
import Form from "./Form";
import Register from "./Register";
import Login from "./Login";

var userIsRegistered = true;

function App() {
  return (
    <div className="container">
      {userIsRegistered == false ? <Register /> : <Login />}
    </div>
  );
}

export default App;
