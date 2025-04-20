const body = document.getElementById("body");
const container = document.getElementById("container");
const getPhotosListBtn = document.getElementById("getPhotosListBtn");
const getPhotoBtn = document.getElementById("getPhotoBtn");
const serverURL = "http://127.0.0.1:3521";

let directoryListing;

async function fetchPictureDirectoryListing(subdir) {
  let url;
  if (subdir !== undefined) {
    url = `${serverURL}/photos/directory_listing/${subdir}`;
  } else {
    url = `${serverURL}/photos/directory_listing/*`;
  }

  const res = await fetch(url);
  const data = await res.json();

  directoryListing = await data.directoryListing;

  return directoryListing;
}

const mainDirListing = await fetchPictureDirectoryListing();

let picturesLisings = [];
for (let i = 0; i < mainDirListing.length; i++) {
  let subdirectory = {};
  const listing = await fetchPictureDirectoryListing(mainDirListing[i]);
  subdirectory[mainDirListing[i]] = listing;
  picturesLisings.push(subdirectory);
}

for (let i = 0; i < mainDirListing.length; i++) {
  const imageHolder = document.createElement("img");
  imageHolder.id = `imagedir_${mainDirListing[i]}`;
  imageHolder.textContent = "image...";
  imageHolder.className = "image";

  const buttonHolder = document.createElement("div");
  const slowBtn = document.createElement("input");
  slowBtn.id = `slowBtn_${mainDirListing[i]}`;
  slowBtn.type = "radio";
  slowBtn.addEventListener("click", () => {
    document.getElementById(`medBtn_${mainDirListing[i]}`).checked = false;

    document.getElementById(`fastBtn_${mainDirListing[i]}`).checked = false;
    speed = slow;
  });

  const medBtn = document.createElement("input");
  medBtn.id = `medBtn_${mainDirListing[i]}`;
  medBtn.type = "radio";
  medBtn.checked = true;
  medBtn.addEventListener("click", () => {
    document.getElementById(`slowBtn_${mainDirListing[i]}`).checked = false;

    document.getElementById(`fastBtn_${mainDirListing[i]}`).checked = false;
    speed = medium;
  });

  const fastBtn = document.createElement("input");
  fastBtn.id = `fastBtn_${mainDirListing[i]}`;
  fastBtn.type = "radio";

  fastBtn.addEventListener("click", () => {
    document.getElementById(`slowBtn_${mainDirListing[i]}`).checked = false;

    document.getElementById(`medBtn_${mainDirListing[i]}`).checked = false;

    speed = fast;
  });
  const button = document.createElement("button");
  button.innerText = "Start Stopmotion";

  body.append(imageHolder);

  buttonHolder.append(button);
  imageHolder.after(buttonHolder);
  button.before(slowBtn, medBtn, fastBtn);

  let imgpath = picturesLisings[i][mainDirListing[i]];

  let dirname = mainDirListing[i];

  let stop = true;
  let fast = 350;
  let medium = 1000;
  let slow = 1500;
  let speed = medium;
  button.addEventListener("click", () => {
    if (stop === false) {
      stop = true;
      button.textContent = "Start Stopmotion"
    } else {
      stop = false;
      button.textContent = "Stop Stopmotion"
      displayImage(speed);
    }
  });

  let index = 0;

  async function displayImage() {
    if (stop === false) {
      setTimeout(() => {
        const pictureURL = `${serverURL}/public/media/${dirname}/${imgpath[index]}`;

        const imageSet = `imagedir_${dirname}`;

        document.getElementById(imageSet).src = pictureURL;

        if (index < imgpath.length - 1) {
          index++;
        } else {
          index = 0;
        }
        displayImage(imgpath, dirname, speed);
      }, speed);
    }
  }
}
