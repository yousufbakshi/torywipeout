import React, { useEffect } from "react";
import "./HexMap.css"; // Ensure the correct path to your CSS file

interface Prediction {
  post_label: string; // Change to match votepredictions.json
  person_name: string; // Change to match votepredictions.json
}

interface HexEvent {
  data: {
    hexmap: any;
    region: string;
    data: {
      n: string;
      q: number;
      r: number;
    };
  };
  target: HTMLElement;
}

const loadScript = (src: string) => {
  return new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = src;
    script.async = true;
    script.onload = resolve;
    script.onerror = reject;
    document.body.appendChild(script);
  });
};

function HexMap() {
  useEffect(() => {
    const initializeHexmap = async () => {
      try {
        await loadScript("../../oi.hexmap.js"); // Adjust the path as necessary
        if (window.OI && window.OI.hexmap) {
          // Fetch the votepredictions.json data
          const predictionsResponse = await fetch(
            "/src/assets/votepredictions.json"
          );
          const predictionsData: Prediction[] =
            await predictionsResponse.json();

          // Fetch the constituencies hexjson file
          const hexjsonResponse = await fetch(
            "/src/assets/constituencies.hexjson"
          );
          const hexjsonData = await hexjsonResponse.json();

          // Create the hexagon layout
          const hex = new window.OI.hexmap(document.getElementById("hexmap3"), {
            hexjson: hexjsonData,
            ready: function () {
              // Create a tooltip
              this.on("mouseover", function (e: HexEvent) {
                const svg = e.data.hexmap.el;
                const hexElement = e.target;
                let tip = svg.querySelector(".tooltip") as HTMLDivElement;
                if (!tip) {
                  tip = document.createElement("div");
                  tip.classList.add("tooltip");
                  svg.appendChild(tip);
                }

                // Get the constituency ID and candidate name
                const constituencyID = e.data.region;
                const constituencyData = hexjsonData.hexes[constituencyID];
                const candidate = predictionsData.find(
                  (prediction: Prediction) =>
                    prediction.post_label === constituencyData.n
                );
                const candidateName = candidate
                  ? candidate.person_name
                  : "Unknown";

                // Update contents of tooltip
                tip.innerHTML = `${constituencyData.n}<br />${candidateName}`;

                // Update position of tooltip
                const bb = hexElement.getBoundingClientRect();
                const bbo = svg.getBoundingClientRect();
                tip.style.left =
                  Math.round(
                    bb.left + bb.width / 2 - bbo.left + svg.scrollLeft
                  ) + "px";
                tip.style.top =
                  Math.round(bb.top + bb.height / 2 - bbo.top) + "px";
                tip.style.display = "block";
              });

              // Ensure the tooltip hides on mouseout
              this.on("mouseout", function (e: HexEvent) {
                const svg = e.data.hexmap.el;
                const tip = svg.querySelector(".tooltip") as HTMLDivElement;
                if (tip) {
                  tip.style.display = "none";
                }
              });

              // Update the hex colours to grey
              this.updateColours(() => "#808080");
            },
          });
        }
      } catch (error) {
        console.error("Error initializing hexmap:", error);
      }
    };

    initializeHexmap();
  }, []);

  return <div id="hexmap3" className="hexmap-responsive"></div>;
}

export default HexMap;
