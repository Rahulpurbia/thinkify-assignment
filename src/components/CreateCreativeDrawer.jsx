import React, { useContext, useState } from "react";
import InputField from "./InputField";
import ColorSelection from "./ColorSelection";
import Button from "./Button";
import "../styles/CreateCreativeDrawer.css";
import CreativeContext from "../context/creativeContext";

const initialFormState = {
  title: "",
  subtitle: "",
  color: "",
};

const CreateCreativeDrawer = () => {
  const [formData, setFormData] = useState(initialFormState);
  const {
    setOpenDrawer,
    openDrawer,
    creativeList,
    updateCreativeList,
    colors,
  } = useContext(CreativeContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    setOpenDrawer(false);
    const updatedCreative = [...creativeList, { ...formData }];
    updateCreativeList(updatedCreative);
    setFormData(initialFormState);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const selectColor = (e) => {
    setFormData({
      ...formData,
      color: e.target.getAttribute("data-color"),
    });
  };

  const { title, subtitle, color } = formData;

  const buttonDisabled = !title || !subtitle || !color;

  const handleClose = () => {
    setOpenDrawer(false);
  };

  return (
    <div
      className={`create-creative-wrapper ${
        !openDrawer ? "close-drawer" : "open-drawer"
      }`}
    >
      <span className="close-btn" onClick={handleClose}>
        X
      </span>
      <form onSubmit={handleSubmit}>
        <div className="heading-1">Creative Creation</div>
        <InputField
          label={"Title"}
          name="title"
          value={title}
          handleChange={handleChange}
        />
        <InputField
          label={"Subtitle"}
          name="subtitle"
          value={subtitle}
          handleChange={handleChange}
        />
        <div>
          <div className="heading-2">
            Background Color
            <div onClick={selectColor} className="d-flex gap-10 mt-10">
              {colors.map((color, index) => {
                return (
                  <ColorSelection
                    key={`${index}-${color}`}
                    color={color}
                    selectedColor={formData.color}
                  />
                );
              })}
            </div>
          </div>
        </div>

        <Button label="Done" type="submit" disabled={buttonDisabled} />
      </form>
    </div>
  );
};

export default CreateCreativeDrawer;
