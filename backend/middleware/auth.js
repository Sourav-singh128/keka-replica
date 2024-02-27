const jwt = require("jsonwebtoken");
async function auth(req, res, next) {
  console.log("hitting auth file");
  const headerInfo = req.headers.authorization;
  const token = headerInfo.split(" ")[1];
  console.log("auth-tok ", token);
  try {
    let decode = jwt.verify(JSON.parse(token), "sourav");
    console.log("decoding-token ", decode);
    if (decode) {
      req.cred = decode;
      next();
    }
    // if (decode.username === "sourav" && decode.password === "sourav-singh") {
    //   return next();
    // }
    else {
      res.status(400).send({ message: "access denied" });
    }
  } catch (error) {
    res.status(500).send({ error: error });

    // next(error);
    // res.status(400).send({ message: `error is ${error}` });
    // res.send(Error(`error is ${error}`));
  }
}

module.exports = auth;
