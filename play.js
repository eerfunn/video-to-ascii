const fs = require("fs");
const { sortArray } = require("./helper/helper");
const { resolve } = require("dns");

const asciiArtDirectory = "./frames-ascii";
const sortArr = async (file) => {
  const data = file.sort((a, b) => a - b);
  return data;
};

const getFileList = async () => {
  const newArr = [...fs.readdirSync(asciiArtDirectory, "utf8")];
  return newArr;
};
const play = async () => {
  new Promise((resolve, reject) => {
    fs.readdir(asciiArtDirectory, "utf8", async (err, file) => {
      let data = await sortArray(file);
      if (data != "") {
        return resolve(data);
      }
      if (err) {
        reject(console.error(err));
      }
    });
  });
};
const playAsciiArt = async (asciiArtDirectory) => {
  // Work in progress
  let i = 0;

  fs.readdir(asciiArtDirectory, "utf8", async (err, file) => {
    if (err) {
      return console.error(err);
    }
    let arr = file.sort((a, b) => {
      const numberA = parseInt(a.match(/\d+/), 10);
      const numberB = parseInt(b.match(/\d+/), 10);
      return numberA - numberB;
    });
    console.log("Arr: ", arr);
    let i = 0;
    if (arr) {
      const interval = setInterval(() => {
        fs.promises
          .readFile(`${asciiArtDirectory}/${file[i]}`, "utf8", (err, frame) => {
            if (err) {
              return console.error(err);
            }
            return frame;
          })
          .then((x) => {
            console.log("\n\n\n\n\n");
            console.log(x.toString());
            console.log(file[i]);
          });
        i++;
        if (i >= file.length) {
          clearInterval(interval);
        }
      }, 24); // 24 fps
    }
  });
};
playAsciiArt(asciiArtDirectory);

module.exports = {
  playAsciiArt,
};
