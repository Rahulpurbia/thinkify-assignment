import React, { useContext, useEffect } from "react";
import ColorSelection from "../components/ColorSelection";
import "../styles/CreativeDashboard.css";
import SearchBar from "../components/SearchBar";
import ProgressBar from "../components/ProgressBar";
import Button from "../components/Button";
import CreativeContext from "../context/creativeContext";
import CreateCreativeDrawer from "../components/CreateCreativeDrawer";
import CreativeCard from "../components/CreativeCard";

const CreativeDashboard = () => {
  const {
    openDrawer,
    setOpenDrawer,
    filterColor,
    setFilterColor,
    filteredList,
    creativeList,
    setColors,
    colors,
  } = useContext(CreativeContext);

  const fetchColors = async () => {
    const data = await fetch(
      "https://random-flat-colors.vercel.app/api/random?count=5"
    );

    const response = await data.json();
    setColors(response.colors);
  };

  useEffect(() => {
    fetchColors();
  }, []);

  const selectColor = (e) => {
    const color = e.target.getAttribute("data-color");
    color !== filterColor ? setFilterColor(color) : setFilterColor("");
  };

  return (
    <div className={`dashboard-wrapper ${openDrawer ? "opened-drawer" : ""}`}>
      <div className="heading-1">Filter By</div>
      <div className="d-flex gap-20">
        <div className="d-flex flex-col">
          <span className="heading-2">color:</span>
          <div onClick={selectColor} className="d-flex gap-10 mt-10">
            {colors.map((color, index) => {
              return (
                <ColorSelection
                  key={`${index}-${color}`}
                  color={color}
                  selectedColor={filterColor}
                />
              );
            })}
          </div>
        </div>
        <div className="d-flex flex-col gap-5">
          <div>
            <SearchBar label="title/subtitle:" />
          </div>
        </div>
      </div>
      <ProgressBar maxCount={7} currentCount={creativeList.length} />

      <Button
        label="+ Add Creative"
        disabled={openDrawer || creativeList.length >= 7}
        handleClick={() => setOpenDrawer(true)}
      />
      {filteredList.map((data, index) => {
        return <CreativeCard key={`${index}-${data.color}`} data={data} />;
      })}
      <CreateCreativeDrawer />
    </div>
  );
};

export default CreativeDashboard;
