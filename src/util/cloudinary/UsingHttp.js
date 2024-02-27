import React from "react";

const url = "https://api.Cloudinary.com/v1_1/:souravsingh/:image/upload";
const UsingHttp = () => {
  const handleUpload = (e) => {
    e.preventDefault();
    console.log("file-clicked");
    const file = document.querySelector("input[type='file']");
    console.log("file ", file.files[0]);
    const formData = new FormData();
    formData.append("file", file.files[0]);
    formData.append("upload_preset", "ml_default");
    // post request to cloudinary api.
    fetch(url, {
      method: "POST",
      body: formData,
    })
      .then((data) => data.json())
      .then((res) => {
        console.log("res ", res);
      })
      .catch((err) => {
        console.log("error is ", err);
      });
  };
  return (
    <form>
      <button onClick={handleUpload}>upload</button>
    </form>
  );
};

export default UsingHttp;
