import React, { useState } from "react";

function App() {
  let tempName = "";
  const [name, setName] = useState("");

  function handleChange(event) {
    tempName = event.target.value;
  }
  function changeName() {
    setName(tempName);
  }
  return (
    <div className="container">
      <h1>Hello {name} </h1>
      <input
        onChange={handleChange}
        type="text"
        placeholder="What's your name?"
      />
      <button onClick={changeName}>Submit</button>
    </div>
  );
}

export default App;
