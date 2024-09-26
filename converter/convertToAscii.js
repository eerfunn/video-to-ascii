const fffmpeg = require("fluent-ffmpeg");
const sffmpeg = require("ffmpeg-static");
const ffprobePath = require("@ffprobe-installer/ffprobe").path;
const fs = require("fs");
const imageToAscii = require("image-to-ascii");

fffmpeg.setFfmpegPath(sffmpeg);
fffmpeg.setFfprobePath(ffprobePath);

const readFrames = () => {
  fs.readdir(asciiDir, (err, file) => {
    if (err) {
      return console.error(err);
    }
    file.sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));

    let i = 0;

    const interval = setInterval(() => {
      // fs.readFile(`${asciiDir}/${file[i]}`, "utf8", (err, frame) => {
      //   if (err) {
      //     return console.error(err);
      //   }
      //   console.log("\n \n \n \n \n", frame.toString());
      // });
      console.log(file[i]);
      i++;
      if (i >= file.length) {
        clearInterval(interval);
      }
    }, 33);
  });
};

const readOriginalFrame = async () => {
  fs.readdir(framesDir, "utf8", (err, files) => {
    files.sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));
    if (err) {
      return console.error(err);
    }
    files.forEach((file) => {
      frameToAscii(`./frames-original/${file}`);
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
        `${asciiDir}/frame-${count}`,
        converted.toString(),
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
