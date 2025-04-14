//https://www.geeksforgeeks.org/how-to-fetch-images-from-node-js-server/

const express = require("express");
const path = require('path')

const app = express();

const { configDotenv } = require("dotenv");
configDotenv();
const PORT = process.env.PORT;

const picturesController = require("./controllers/photo.controller")

const server = require("http").createServer(app);
const cors = require("cors");
const imgsrc = "/public/media/0157.jpg"
const image = `<img src = '${imgsrc}'/>`
console.log(image)

app.use(express.json());

app.use(cors());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS,CONNECT,TRACE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization, X-Content-Type-Options, Accept, X-Requested-With, Origin, Access-Control-Request-Method, Access-Control-Request-Headers"
  );
  res.setHeader("Access-Control-Allow-Credentials", true);

  res.setHeader("Access-Control-Allow-Private-Network", true);

  res.setHeader("Access-Control-Max-Age", 7200);

  next();
});

app.use("/photos", picturesController)

// app.use(express.static('../client'))

app.use(express.static("public"))
app.use("/public", express.static("public"))


// const directory = __dirname+"/public/media/"
// console.log(directory)
// app.use(express.static(path.join(directory)))
// app.use(express.static("images", "../server/media/"))
// app.use('./media/Chase Stop motion', express.static('images'))

server.listen(PORT, () => {
  console.log("server running on port:", PORT);
});
