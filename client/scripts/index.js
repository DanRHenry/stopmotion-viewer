const container = document.getElementById('container')
const getPhotosListBtn = document.getElementById("getPhotosListBtn")
const getPhotoBtn = document.getElementById("getPhotoBtn")
const serverURL = "http://127.0.0.1:3521"

// getPhotosBtn.addEventListener("click",fetchpictures)
getPhotosListBtn.addEventListener("click",fetchPictureDirectoryListing)
getPhotoBtn.addEventListener("click", getPicture)

let directoryListing

const imgsrc = `${serverURL}/public/media/0157.jpg`

const picture = document.createElement("img")
picture.src = imgsrc

container.append(picture)

async function fetchPictureDirectoryListing () {
    const url = `${serverURL}/photos/directory_listing`
    const res = await fetch (url)
    const data = await res.json()

    directoryListing = await data.directoryListing;

    localStorage.setItem("photos", directoryListing)

    let pics = []
    for(let i = 0; i < directoryListing.length; i++) {
        let res = await fetch(`${serverURL}/public/media/${directoryListing[i]}`)
        console.log("res: ",res.url)
        pics.push(res.url)
    }
let index = 0
setInterval(() => {
    picture.src = `${pics[index]}`
    if (index++ < pics.length) {
        index ++
    } else {
        index = 0;
    }
}, 1000);
}


async function getPicture(link) {

    if (!localStorage.photos) {
        await fetchPictureDirectoryListing()
    }
    const pictureArray = localStorage.photos.split(",")
    // console.log(pictureArray.length)

    const path = `"${pictureArray[0]}"`

    // console.log("path: ",path)
    const url = `${serverURL}/photos/find_one`
    // const url = `http://127.0.0.1:3521/photos/findphoto:${path}`
        console.log("url: ",url)

        const data = await fetch(url)
        const imageSource = await data;

        const blob = imageSource.blob()
        const imageUrl = URL.createObjectURL(blob)
        const imageElement = document.createElement("img")
        imageElement.src = imageUrl
        body.appendChild(imageElement)
        console.log(imageSource)
        
        console.log("here")

}
// for (let i = 0; i < item.length; i++) {
    // console.log(item)
    // const blob = item.blob();
    // const imageUrl = URL.createObjectURL(item)
    // const imageElement = document.createElement("img")
    // imageElement.src = imageUrl;
    // container.appendChild(imageElement)
// }

// async function fetchImage() {
//     const url = 'http://127.0.0.1:3521/images'; // Replace with your image URL
//     const response = await fetch(url);
//     if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//     }
// }

