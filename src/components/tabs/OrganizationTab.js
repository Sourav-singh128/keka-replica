import React, { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import Avatar from "@mui/material/Avatar";
import "./organizationTab.css";
// import UsingHttp from "../../util/cloudinary/UsingHttp";
import UsingWidget from "../../util/cloudinary/UsingWidget";
const OrganizationTab = () => {
  const [area, setArea] = useState("");
  const [image, setImage] = useState({
    imageUrl: "",
    imageAlt: "",
  });

  const state = useSelector((state) => state.login);
  const textRef = useRef();
  const [uploaded, setUploaded] = useState(false);
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    fetch("/fetchPost", {
      method: "GET",
      headers: {},
    })
      .then((data) => data.json())
      .then((res) => {
        setPosts(res.posts);
      });
  }, [uploaded]);
  const areaHandler = (e) => {
    setArea(e.target.value);
    e.target.style.height = "auto";
    e.target.style.height = e.target.scrollHeight + "px";
  };

  const handlePost = () => {
    console.log("image-url ", image.imageUrl);
    console.log("text-cont ", textRef.current.value);
    console.log("email-state ", state.email);
    fetch("/uploadPost", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: state.email,
        text: textRef.current.value,
        url: image.imageUrl,
      }),
    })
      .then((data) => data.json())
      .then((res) => {
        console.log("resp-> ", res);
        document.querySelector("#text-area").innerHTML = "";
        setUploaded(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <>
      <div className="organization-tab-container">
        <div className="upload-post">
          <div className="tab-header">Post</div>
          <textarea
            className="post"
            type="text"
            placeholder="write a post"
            value={area}
            onChange={areaHandler}
            ref={textRef}
            id="text-area"
          />
          <div className="media">
            <div>
              <span
                style={{ cursor: "pointer" }}
                onClick={() => {
                  console.log("clicked");
                }}>
                @
              </span>
              <UsingWidget
                setImage={setImage}
                uploaded={uploaded}
                setUploaded={setUploaded}
              />
            </div>
            <button onClick={handlePost}>Post</button>
          </div>
        </div>
        {/* fetch post */}
        {console.log(posts)}
        {posts &&
          posts.map((post) => (
            <div key={post._id} className="fetch-posts">
              <Avatar sx={{ bgcolor: "deepskyblue" }}>
                {post.empId.username.substring(0, 2)}
              </Avatar>
              <div>{post.comment}</div>
              <img src={post.postUrl} style={{ maxWidth: "100%" }} />
            </div>
          ))}
      </div>
    </>
  );
};

export default OrganizationTab;

// Online Javascript Editor for free
// Write, Edit and Run your Javascript code using JS Online Compiler

// const a = [{"name": "sourav"}, {"name": "yhivam"}, {"name": "zhivam"}, {"xname": "shivam"}, {"name": "mhivam"}, {"name": "nhivam"}, {"name": "ohivam"},{"name": "phivam"}, {"name": "khivam"},{"name": "phivam"}];
// let count = 0;
// let ind = 0;
// const arr = []
//  a.forEach((val)=>{
//      if(ind < 3) {

//     }
//     else{
//         console.log('yes')
//         ind = 1;
//         count +=1;

//     }
//     val.id = count;
//      arr.push(val);
//     ind += 1
//  })

//  console.log(arr)
