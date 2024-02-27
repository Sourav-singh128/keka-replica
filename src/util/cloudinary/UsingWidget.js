import React, { useState } from "react";

const UsingWidget = ({ setImage, uploaded, setUploaded }) => {
  const openWidget = () => {
    const widget = window.cloudinary.createUploadWidget(
      {
        cloudName: "souravsingh",
        uploadPreset: "ru8h35ic",
      },
      (error, result) => {
        console.log("result ", result.event);
        console.log("result-info ", result.info);
        if (result.event == "success") {
          console.log("comming-here");
          setImage({
            imageUrl: result.info.secure_url,
            imageAlt: result.info.original_filename,
          });
          setUploaded(true);
        } else {
          console.log(`error is ${error}`);
        }
      }
    );

    widget.open();
  };
  if (uploaded) {
    document.querySelector("#upload").innerHTML = "Uploaded";
  }
  return (
    <>
      <button
        onClick={openWidget}
        id="upload"
        style={{ backgroundColor: uploaded && "red" }}>
        Upload
      </button>
    </>
  );
};

export default UsingWidget;
