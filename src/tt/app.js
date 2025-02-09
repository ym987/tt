import { useState } from "react";
import React from 'react';
import SetID from "./SetID";
import Main from "./main";


function App() {
    const [ttID, setttID] = useState("");
    const [mtchingId, setMatchingId] = useState("");

    

  return (
    <div className="App">
        {(!ttID || !mtchingId) && <SetID ttID={ttID} setttID={setttID} setMatchingId={setMatchingId} mtchingId={mtchingId}/>}
        {(ttID && mtchingId) && <Main ttID={ttID} mtchingId={mtchingId} setMatchingId={setMatchingId} setttID={setttID}/>}
    </div>
  );
}

export default App;
