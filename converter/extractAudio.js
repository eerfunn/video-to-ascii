const fffmpeg = require("fluent-ffmpeg");
const fs = require("fs");

const extractAudio = async (videoSource, outputDir) => {
  if (fs.existsSync(outputDir)) {
    return console.log("Audio directory is not empty.");
  } else {
    fffmpeg()
      .input(videoSource)
      .outputOptions("-ab", "192k")
      .saveToFile(outputDir)
      .on("progress", (progress) => {
        if (progress.percent) {
          console.log(`Processing: ${Math.floor(progress.percent)}% done`);
        }
      })
      .on("end", () => {
        return console.log("Finished extracting audio");
      })
      .on("error", (error) => {
        return console.error(error);
      });
  }
};

module.exports = {
  extractAudio,
};
