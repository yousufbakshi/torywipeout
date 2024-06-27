import React, { useState } from "react";
import SearchBar from "./components/SearchBar";
import ConstituencyList from "./components/ConstituencyList";
import "./App.css";

const App: React.FC = () => {
  const [showIncomplete, setShowIncomplete] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [winCount, setWinCount] = useState(0);
  const [lossCount, setLossCount] = useState(0);

  const handleSelectionChange = (type: string, selected: boolean) => {
    if (type === "win") {
      setWinCount(winCount + (selected ? 1 : -1));
    } else if (type === "loss") {
      setLossCount(lossCount + (selected ? 1 : -1));
    }
  };

  return (
    <div className="App">
      <div className="sidebar">
        <div className="sidebar-wrapper">
          <h1>My Tory Wipeout</h1>
          <SearchBar onSearch={setSearchQuery} />
          <label className="incomplete-label">
            <input
              type="checkbox"
              checked={showIncomplete}
              onChange={() => setShowIncomplete(!showIncomplete)}
            />
            Show Incomplete Races
          </label>
          <ConstituencyList
            onSelectionChange={handleSelectionChange}
            showIncomplete={showIncomplete}
            searchQuery={searchQuery}
          />
          <div className="picks-complete">{`${
            winCount + lossCount
          }/650 picks complete`}</div>
        </div>
      </div>
      <div className="main">
        <h2>My Tory Wipeout Prediction</h2>
        <div className="results">
          <div className="results-box win">{`TORY WINS: ${winCount}`}</div>
          <div className="results-box loss">{`TORY LOSSES: ${lossCount}`}</div>
        </div>
      </div>
    </div>
  );
};

export default App;
