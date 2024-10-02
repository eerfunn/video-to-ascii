const fffmpeg = require("fluent-ffmpeg");
const sffmpeg = require("ffmpeg-static");
const ffprobePath = require("@ffprobe-installer/ffprobe").path;
const fs = require("fs");
const imageToAscii = require("image-to-ascii");

const regex =
  "/[\u001b\u009b][[()#;?]*(?:[0-9]{1,4}(?:;[0-9]{0,4})*)?[0-9A-ORZcf-nqry=><]/g";
fffmpeg.setFfmpegPath(sffmpeg);
fffmpeg.setFfprobePath(ffprobePath);
let count = 0;

const readAndConvertToAscii = async (rawFramesDirectory, asciiDirectory) => {
  fs.readdir(rawFramesDirectory, "utf8", async (err, files) => {
    console.log(files);
    if (err) {
      return console.error(err);
    }
    for await (const file of files) {
      console.log("I'm reading: ", file);
      await frameToAscii(`./frames-original/${file}`, asciiDirectory);
    }
  });
};

const frameToAscii = async (file, asciiArtDirectory) => {
  const frame = fs.readFileSync(file);
  return new Promise((resolve, reject) => {
    imageToAscii(frame, { pixels: ".:" }, async (err, converted) => {
      count++;
      console.log("Extracting frame number: ", count);

      await fs.promises.writeFile(
        `${asciiArtDirectory}/frame-${count}.txt`,
        converted.replace(regex, ""),
        { encoding: "utf8" },
        (err) => {
          console.log(`Frames frame-${count}.txt converted`);
          if (err) {
            console.error(err);
            return reject(err);
          } else {
            return resolve();
          }
        }
      );
      if (err) {
        console.error(err);
        return reject(err);
      } else {
        return resolve();
      }
    });
  });
};

module.exports = {
  readAndConvertToAscii,
  frameToAscii,
};
