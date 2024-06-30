import React, { useState, useEffect } from "react";
import hexData from "../assets/constituencies.hexjson";
import votePredictions from "../assets/votepredictions.json"; // Import the JSON file
import "./ConstituencyList.css";

interface ConstituencyProps {
  onSelectionChange: (type: string, selected: boolean) => void;
  showIncomplete: boolean;
  searchQuery: string;
}

const ConstituencyList: React.FC<ConstituencyProps> = ({
  onSelectionChange,
  showIncomplete,
  searchQuery,
}) => {
  const constituencies = Object.keys(hexData.hexes).map(
    (key) => hexData.hexes[key].n
  );
  constituencies.sort();

  const [selections, setSelections] = useState<{ [key: string]: string }>({});
  const [filteredConstituencies, setFilteredConstituencies] =
    useState<string[]>(constituencies);

  useEffect(() => {
    const query = searchQuery.toLowerCase();
    const filtered = constituencies.filter((constituency) => {
      const candidate = votePredictions.find(
        (prediction) => prediction.post_label === constituency
      );
      const candidateName = candidate
        ? candidate.person_name.toLowerCase()
        : "";
      return (
        constituency.toLowerCase().includes(query) ||
        candidateName.includes(query)
      );
    });
    if (showIncomplete) {
      setFilteredConstituencies(
        filtered.filter((constituency) => !selections[constituency])
      );
    } else {
      setFilteredConstituencies(filtered);
    }
  }, [showIncomplete, selections, searchQuery]);

  const handleSelection = (constituency: string, type: string) => {
    const newSelections = { ...selections };
    if (newSelections[constituency] === type) {
      delete newSelections[constituency];
      onSelectionChange(type, false);
    } else {
      if (newSelections[constituency]) {
        onSelectionChange(newSelections[constituency], false);
      }
      newSelections[constituency] = type;
      onSelectionChange(type, true);
    }
    setSelections(newSelections);
  };

  // Map constituency names to candidate names
  const getCandidateName = (constituency: string) => {
    const candidate = votePredictions.find(
      (prediction) => prediction.post_label === constituency
    );
    return candidate ? candidate.person_name : "Unknown Candidate";
  };

  return (
    <div className="constituency-list">
      {filteredConstituencies.map((constituency) => (
        <div
          key={constituency}
          className={`constituency-card ${selections[constituency] || ""}`}
        >
          <div className="constituency-name">{constituency}</div>
          <div className="candidate-name">{getCandidateName(constituency)}</div>
          <button
            className={`win ${
              selections[constituency] === "win" ? "selected" : ""
            }`}
            onClick={() => handleSelection(constituency, "win")}
          >
            TORY WIN
          </button>
          <button
            className={`loss ${
              selections[constituency] === "loss" ? "selected" : ""
            }`}
            onClick={() => handleSelection(constituency, "loss")}
          >
            TORY LOSS
          </button>
        </div>
      ))}
    </div>
  );
};

export default ConstituencyList;
