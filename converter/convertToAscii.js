const fffmpeg = require("fluent-ffmpeg");
const sffmpeg = require("ffmpeg-static");
const ffprobePath = require("@ffprobe-installer/ffprobe").path;
const fs = require("fs");
const imageToAscii = require("image-to-ascii");

const asciiDirectory = "./frames-ascii";

fffmpeg.setFfmpegPath(sffmpeg);
fffmpeg.setFfprobePath(ffprobePath);
let count = 0;

const playAsciiArt = (asciiArtDirectory) => {
  // Work in progress
  fs.readdir(asciiArtDirectory, (err, file) => {
    if (err) {
      return console.error(err);
    }
    file.sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));

    let i = 0;

    const interval = setInterval(() => {
      fs.readFile(`${asciiArtDirectory}/${file[i]}`, "utf8", (err, frame) => {
        if (err) {
          return console.error(err);
        }
        console.log(frame.toString(), "\n \n \n \n \n");
      });
      // console.log(file[i]);
      i++;
      if (i >= file.length) {
        clearInterval(interval);
      }
    }, 33);
  });
};

const readAndConvertToAscii = async (rawFramesDirectory, asciiDirectory) => {
  fs.readdir(rawFramesDirectory, "utf8", (err, files) => {
    files.sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));
    if (err) {
      return console.error(err);
    }
    files.forEach((file) => {
      frameToAscii(`./frames-original/${file}`, asciiDirectory);
    });
  });
};

const frameToAscii = async (file) => {
  const frame = fs.readFileSync(file);
  return new Promise((resolve, reject) => {
    imageToAscii(frame, { pixels: ".:" }, (err, converted) => {
      console.log(converted);
      count++;
      fs.writeFile(
        `${asciiDirectory}/frame-${count}.txt`,
        converted.toString(),
        { encoding: "utf8" },
        (err) => {
          if (err) {
            console.error(err);
            return reject(err);
          } else {
            return resolve(console.log(`Frames ${frame} converted`));
          }
        }
      );
    });
  });
};

module.exports = {
  readAndConvertToAscii,
  frameToAscii,
  playAsciiArt,
};
