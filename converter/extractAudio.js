const fffmpeg = require("fluent-ffmpeg");
const fs = require("fs");

export const extractAudio = async (v) => {
  if (fs.existsSync("../audio/audio.mp3")) {
    console.log("Audio directory is not empty.");
  } else {
    fffmpeg()
      .input(v)
      .outputOptions("-ab", "192k")
      .saveToFile("../audio/audio.mp3")
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
