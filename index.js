const fffmpeg = require("fluent-ffmpeg");
const sffmpeg = require("ffmpeg-static");
const fs = require("fs");

const video = "./video/video.mp4";

fffmpeg.setFfmpegPath(sffmpeg);

const extractAudio = async (v) => {
  if (fs.existsSync("./audio/audio.mp3")) {
    console.log("Audio directory is not empty.");
  } else {
    fffmpeg()
      .input(v)
      .outputOptions("-ab", "192k")
      .saveToFile("./audio/audio.mp3")
      .on("progress", (progress) => {
        if (progress.percent) {
          console.log(`Processing: ${Math.floor(progress.percent)}% done`);
        }
      })
      .on("end", () => {
        console.log("Finished extracting audio");
      })
      .on("error", (error) => {
        console.error(error);
      });
  }
};

const extractFrames = async (f) => {
  fffmpeg()
    .input(f)
    .saveToFile("./frames-original/frame-%03d.png")
    .on("progress", (progress) => {
      if (progress.percent) {
        console.log(`Processing: ${Math.floor(progress.percent)}% done`);
      }
    })
    .on("end", () => {
      console.log("Extracting frames is finished");
    })
    .on("error", (error) => {
      console.error(error);
    });
};
extractFrames(video);
