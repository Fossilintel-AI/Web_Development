import React, { useState } from "react";

function App() {
  const [name, setName] = useState("");
  const [lastName, setlastName] = useState("");
  const [email, setEmail] = useState("");

  function onName(event) {
    setName(event.target.value);
  }

  function onLastName(event) {
    setlastName(event.target.value);
  }

  function onEmail(event) {
    setEmail(event.target.value);
  }

  return (
    <div className="container">
      <h1>
        Hello {name} {lastName}
      </h1>
      <p>{email}</p>
      <form>
        <input onChange={onName} name="fName" placeholder="First Name" />
        <input onChange={onLastName} name="lName" placeholder="Last Name" />
        <input onChange={onEmail} name="email" placeholder="Email" />
        <button>Submit</button>
      </form>
    </div>
  );
}

export default App;
