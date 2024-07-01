import React, { useState } from "react";
import SearchBar from "./components/SearchBar";
import ConstituencyList from "./components/ConstituencyList";
import HexMap from "./components/HexMap"; // Import the new component
import "./App.css";

const App: React.FC = () => {
  const [showIncomplete, setShowIncomplete] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [winCount, setWinCount] = useState(0);
  const [lossCount, setLossCount] = useState(0);

  const totalConstituencies = 650; // Replace with the actual number of constituencies

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
          <div className="incomplete-label-wrapper">
            <label className="incomplete-label">
              <input
                type="checkbox"
                checked={showIncomplete}
                onChange={() => setShowIncomplete(!showIncomplete)}
              />
              Show Incomplete Races
            </label>
            <div className="picks-complete">{`${
              winCount + lossCount
            }/${totalConstituencies} picks complete`}</div>
          </div>
          <ConstituencyList
            onSelectionChange={handleSelectionChange}
            showIncomplete={showIncomplete}
            searchQuery={searchQuery}
          />
        </div>
      </div>
      <div className="main">
        <h2>My Tory Wipeout Prediction</h2>
        <div className="results">
          <div className="results-box win">{`TORY WINS: ${winCount}`}</div>
          <div className="results-box loss">{`TORY LOSSES: ${lossCount}`}</div>
        </div>
        <div className="hexmap-container">
          <HexMap />
        </div>
      </div>
    </div>
  );
};

export default App;
