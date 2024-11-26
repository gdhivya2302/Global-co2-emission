import React, { useState, useRef, useEffect } from "react";
import './Tableau.css'; // Import the external CSS file

const Tableau = () => {
  const [url, setUrl] = useState(
    "https://public.tableau.com/views/CO2EMISSION4_16925604126610/Dashboard6?:language=en-US&:sid=&:redirect=auth&:display_count=n&:origin=viz_share_link"
  );
  const ref = useRef(null);
  const vizRef = useRef(null); // A reference to the Tableau Viz instance

  // Function to initialize the Tableau Viz
  const initViz = () => {
    if (vizRef.current) {
      vizRef.current.dispose(); // Dispose the old Viz before initializing a new one
    }
    vizRef.current = new window.tableau.Viz(ref.current, url);
  };

  // Effect to initialize the Viz whenever the URL changes
  useEffect(() => {
    initViz();
    // Cleanup when component is unmounted or URL changes
    return () => {
      if (vizRef.current) {
        vizRef.current.dispose(); // Clean up the viz when component is unmounted
      }
    };
  }, [url]); // Dependency array with URL, so it reinitializes on URL change

  return (
    <div className="tableau-container">
      <div className="buttons-container">
        {/* Links to switch between different dashboards */}
        <button
          onClick={() =>
            setUrl(
              "https://public.tableau.com/views/CO2EMISSION4_16925604126610/Dashboard6?:language=en-US&:sid=&:redirect=auth&:display_count=n&:origin=viz_share_link"
            )
          }
        >
          Global CO₂ Emissions: Country Contributions, Sectoral Impact, and Trends 
        </button>
        <button
          onClick={() =>
            setUrl(
              "https://public.tableau.com/views/co2emission1_16925587747550/Dashboard4?:language=en-US&:sid=&:redirect=auth&:display_count=n&:origin=viz_share_link"
            )
          }
        >
          Comprehensive CO₂ Emissions Analysis
        </button>
        <button
          onClick={() =>
            setUrl(
              "https://public.tableau.com/views/co2emission3_16925596184500/Dashboard5?:language=en-US&:sid=&:redirect=auth&:display_count=n&:origin=viz_share_link"
            )
          }
        >
          Global CO₂ Emissions Analysis: Trends, Comparisons, and Contributions
        </button>
      </div>

      {/* This is where the Tableau viz will render */}
      <div ref={ref} className="viz-container"></div>
    </div>
  );
};

export default Tableau;
