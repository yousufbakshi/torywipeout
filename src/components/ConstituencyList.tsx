import React, { useState } from "react";
import "./ConstituencyList.css";

interface ConstituencyListProps {
  constituencies: { id: string; name: string }[];
  updateCounts: (win: number, loss: number) => void;
}

const ConstituencyList: React.FC<ConstituencyListProps> = ({
  constituencies,
  updateCounts,
}) => {
  const [selectedWins, setSelectedWins] = useState<string[]>([]);
  const [selectedLosses, setSelectedLosses] = useState<string[]>([]);

  const handleWinClick = (id: string) => {
    setSelectedWins((prev) =>
      prev.includes(id) ? prev.filter((w) => w !== id) : [...prev, id]
    );
    if (selectedLosses.includes(id)) {
      setSelectedLosses((prev) => prev.filter((l) => l !== id));
    }
    updateCounts(selectedWins.length, selectedLosses.length);
  };

  const handleLossClick = (id: string) => {
    setSelectedLosses((prev) =>
      prev.includes(id) ? prev.filter((l) => l !== id) : [...prev, id]
    );
    if (selectedWins.includes(id)) {
      setSelectedWins((prev) => prev.filter((w) => w !== id));
    }
    updateCounts(selectedWins.length, selectedLosses.length);
  };

  return (
    <div className="constituency-list">
      {constituencies.map((constituency) => (
        <div
          key={constituency.id}
          className={`constituency-card ${
            selectedWins.includes(constituency.id) ? "win" : ""
          } ${selectedLosses.includes(constituency.id) ? "loss" : ""}`}
        >
          <div className="constituency-info">
            <strong>{constituency.name}</strong>
            <span>SURNAME, firstname</span>
          </div>
          <div className="buttons">
            <button
              className="win-button"
              onClick={() => handleWinClick(constituency.id)}
            >
              TORY WIN
            </button>
            <button
              className="loss-button"
              onClick={() => handleLossClick(constituency.id)}
            >
              TORY LOSS
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ConstituencyList;
