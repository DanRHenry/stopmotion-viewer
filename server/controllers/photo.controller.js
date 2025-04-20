const router = require("express").Router();
const fs = require("fs").promises;

const prefix = "http://127.0.0.1:3521";
const filePath = "/home/dan/coding/apps/stopmotion-viewer/server/public/media";

let fullpath = filePath;

router.get("/directory_listing/:subdir", async (req, res) => {
  const { subdir } = req.params;
  let info = subdir;

  if (info === "*") {
    info = "";
  }

  if (info !== undefined) {
    fullpath = fullpath + info;
  }

  try {
    const directoryListing = await getDirectoryListing(fullpath);
    directoryListing
      ? res.status(200).json({
          message: "Directory Listing:",
          directoryListing,
        })
      : res.status(404).json({
          message: "No files found",
        });

    fullpath = prefix + filePath + "/";
    fullpath = filePath + "/";
  } catch (err) {
    console.error("server-side error");
    return res.status(500).json({
      Error: err.message,
    });
  }
});

router.get("/find_one:link", async (req, res) => {
  try {
    console.log("trying...")
    // const path = "/server/public/media/0157.jpg"
    const {link} = req.params
    console.log("link: ",link)

    const picture = await getPicture(path)

    picture
      ? res.status(200).json({
        message: "Picture:",
        picture
      })
      : res.status(404).json({
        message: "not found"
      })
  } catch (err) {
    console.error("Server-side error");
    return res.status(500).json({
      Error: err.message,
    });
  }
  console.log("all tuckered out");
});

async function getPicture () {
  const path = "/server/public/media/0157.jpg"
  try {
    await fs.readFile(path, function (err, data) {
      if (err) {
        console.log("path error: ",path)
        console.error(err)
        return
      }
              console.log("path success: ",path)

      console.log(data)
      return data
    }
  )} catch (err) {
    console.log("catch path",path)
    console.error(`Got an error: ${err.message}`)
  }
}

async function getDirectoryListing(fullpath) {
  try {
    const directoryListing = [];
    const data = await fs.readdir(fullpath);

    for (let i = 0; i < data.length; i++) {
      const pictureLocation = data[i];
      directoryListing.push(`${pictureLocation}`);
    }
    return directoryListing;
  } catch (err) {
    console.error(`Got an error trying to read the directory: ${err.message}`);
  }
}

module.exports = router;
