const express = require("express");
const app = express();
const jwt = require("jsonwebtoken");
const protected = require("./middleware/auth");
const connectDb = require("./db");
const kekaUser = require("./schemas/user");
const kekapost = require("./schemas/post");

// for parsing request body.
app.use(express.json());

connectDb();

let userObj = {};
app.get("/", async (req, res) => {
  res.status(200).send("hitting backend");
});

app.post("/login", async (req, res) => {
  console.log("hitting-backend-login");
  const { email, password } = req.body;
  const user = await kekaUser.findOne({ email });
  if (user && user.password === password) {
    const token = jwt.sign({ email, password }, "sourav", {
      expiresIn: 30000,
      algorithm: "HS256",
    });
    res.status(200).send({ token: token, user: user });
  } else {
    res.status(400).send({ message: "unsuccessfull login" });
  }
});

app.post("/register", async (req, res, next) => {
  console.log("hitting-register");
  const { username, password, email, phone } = req.body;
  userObj["email"] = email;
  userObj["password"] = password;
  // throw error if  username is already exist.
  const user = await kekaUser.findOne({ email });
  console.log("user ", user);
  if (user) {
    res
      .status(400)
      .send({ message: "username already exists choose different one" });
    return;
  }

  // console.log("register -userObj ", userObj);
  try {
    const newUser = await kekaUser.create({
      username,
      email,
      password,
      phoneNo: phone,
    });
    const token = jwt.sign(userObj, "sourav", {
      algorithm: "HS256",
      expiresIn: 100000,
    });
    console.log("tok ", token);
    res.status(200).send({ token: token, user: newUser });
  } catch (err) {
    res.status(400).send(err);
  }
});

app.post("/login-cred", protected, async (req, res, next) => {
  // console.log("hitting-login-cred ", req.headers.authorization);
  console.log("log-crd ", req.cred);
  const details = await kekaUser.findOne({ email: req.cred.email });
  res.status(200).send({ user: details });
});

app.post("/userData", protected, async (req, res, next) => {
  res
    .status(200)
    .send({ info: [{ name: "sourav", email: "singh@gmail.com" }] });
});

app.post("/uploadPost", protected, async (req, res, next) => {
  console.log("hitting upload-post");
  const { email, text, url } = req.body;
  const user = await kekaUser.findOne({ email: email });
  console.log("user ", user);
  try {
    const post = await kekapost.create({
      comment: text,
      postUrl: url,
      createdOn: new Date().toISOString(),
      empId: user._id,
    });
    console.log("post ", post);
    res.status(200).send({ message: "post saved successfull" });
  } catch (err) {
    res.status(400).send({ message: `error occured ${err}` });
  }
});

app.get("/fetchPost", protected, async (req, res, next) => {
  console.log("hitting fetch-post url");
  try {
    const post = await kekapost.find().populate("empId");
    // console.log("all-post ", post);
    post.sort((a, b) => b.createdOn - a.createdOn);
    // console.log("sorted post ", post);
    // const postWithUserName = [];
    // for (let current of post) {
    //   const currentUser = await kekaUser.findOne({ _id: current.empId });
    //   // const obj = { ...current };
    //   current["empId"] = currentUser.username;
    //   postWithUserName.push(current);
    // }
    // console.log("post-user ", postWithUserName);
    res.status(200).send({ posts: post });
  } catch (err) {
    console.log(`some error occured ${err}`);
  }
});

const server = app.listen(8001, () => {
  const host = server.address().address;
  const port = server.address().port;
  console.log(`server listening on host ${host} and port ${port}`);
});
