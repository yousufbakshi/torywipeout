import React, { useState, useEffect } from "react";
import ConstituencyList from "./components/ConstituencyList";
import "./App.css";
import hexData from "./assets/constituencies.hexjson";

const App: React.FC = () => {
  const [winCount, setWinCount] = useState(0);
  const [lossCount, setLossCount] = useState(0);
  const [constituencies, setConstituencies] = useState<
    { id: string; name: string }[]
  >([]);

  useEffect(() => {
    const constituencyList = Object.entries(hexData.hexes).map(
      ([id, data]: [string, any]) => ({
        id,
        name: data.n,
      })
    );
    setConstituencies(constituencyList);
  }, []);

  const updateCounts = (win: number, loss: number) => {
    setWinCount(win);
    setLossCount(loss);
  };

  return (
    <div className="App">
      <div className="sidebar">
        <div className="sidebar-wrapper">
          <img src="/logo.png" alt="Logo" className="logo" />
          <input
            type="text"
            className="search-bar"
            placeholder="Search for a constituency or candidate"
          />
          <ConstituencyList
            constituencies={constituencies}
            updateCounts={updateCounts}
          />
        </div>
      </div>
      <div className="main">
        <h2>My Tory Wipeout Prediction</h2>
        <div className="prediction-summary">
          <button className="win-count">TORY WINS: {winCount}</button>
          <button className="loss-count">TORY LOSSES: {lossCount}</button>
        </div>
      </div>
    </div>
  );
};

export default App;
