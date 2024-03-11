import { useState } from "react";
import React from 'react';
import SetID from "./SetID";
import ProgressDisplay from "./progressDisplay";
import MainProgress from "./mainProgress";

function App() {
    const [ttID, setttID] = useState("");
    const [mtchingId, setMatchingId] = useState("");

    

  return (
    <div className="App">
        {!ttID && <SetID ttID={ttID} setttID={setttID} setMatchingId={setMatchingId} mtchingId={mtchingId}/>}
        {ttID && <MainProgress ttID={ttID} mtchingId={mtchingId}/>}
        {ttID && <ProgressDisplay ttID={ttID} />}
    </div>
  );
}

export default App;
