import { useState } from "react";
import React from 'react';
import SetID from "./SetID";
import Main from "./main";


function App() {
    const [ttID, setttID] = useState("");
    const [mtchingId, setMatchingId] = useState("");

    

  return (
    <div className="App">
        {!ttID && <SetID ttID={ttID} setttID={setttID} setMatchingId={setMatchingId} mtchingId={mtchingId}/>}
        {ttID && <Main ttID={ttID} mtchingId={mtchingId}/>}
    </div>
  );
}

export default App;
