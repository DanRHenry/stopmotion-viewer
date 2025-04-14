const router = require("express").Router();
// const fs = require("fs").promises;
const fs = require("fs");

const prefix = "http://127.0.0.1:3521"
const filePath = "/server/public/media";
const filespath = "../public/media"
const fullpath = prefix + filePath

router.get("/directory_listing", async (req, res) => {
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
  } catch (err) {
    console.error("server-side error");
    return res.status(500).json({
      Error: err.message,
    });
  }
});

// router.get("/find_one", async (req, res) => {
//   try {
//     console.log("trying...")
//     const path = "/server/public/media/0157.jpg"
//     // const {path} = req.params.path
//     const picture = await getPicture(path)

//     picture
//       ? res.status(200).json({
//         message: "Picture:",
//         picture
//       })
//       : res.status(404).json({
//         message: "not found"
//       })
//     // console.log(req)
//   } catch (err) {
//     console.error("Server-side error");
//     return res.status(500).json({
//       Error: err.message,
//     });
//   }
//   console.log("all tuckered out");
// });


// async function getPicture () {
//   const path = "/server/public/media/0157.jpg"
//   try {
//     await fs.readFile(path, function (err, data) {
//       if (err) {
//         console.log("path error: ",path)
//         console.error(err)
//         return
//       }
//               console.log("path success: ",path)

//       console.log(data)
//       return data
//     }
//   )} catch (err) {
//     console.log("catch path",path)
//     console.error(`Got an error: ${err.message}`)
//   }
// }

async function getDirectoryListing() {
  console.log("getting directory listing");
const filePath = "/home/dan/coding/apps/stopmotion-viewer/server/public/media";
  try {
    const directoryListing = [];
    console.log(__dirname)
    const data = await fs.promises.readdir(filePath);

    for (let i = 0; i < data.length; i++) {
      const pictureLocation = data[i];
      directoryListing.push(`${pictureLocation}`);
    }
    console.log("done getting directory listings...");
    return directoryListing;
  } catch (err) {
    console.error(`Got an error trying to read the directory: ${err.message}`);
  }
}

module.exports = router;
