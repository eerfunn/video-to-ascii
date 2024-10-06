const fffmpeg = require("fluent-ffmpeg");
const sffmpeg = require("ffmpeg-static");
const ffprobePath = require("@ffprobe-installer/ffprobe").path;
const { getVideoData, getStartTime } = require("../helper/helper");

fffmpeg.setFfmpegPath(sffmpeg);
fffmpeg.setFfprobePath(ffprobePath);

const extractFramesFromVideo = async (videoSource) => {
  // Extract from thumbnail directory
  return new Promise((resolve, reject) => {
    return fffmpeg()
      .input(videoSource)
      .saveToFile("./frames-original/frame-%03d.png")
      .on("progress", (progress) => {
        if (progress.percent) {
          console.log(`Processing: ${Math.floor(progress.percent)}% done`);
        }
      })
      .on("end", resolve)
      .on("error", reject, function (err, stdout, stderr) {
        if (err) {
          console.log(err.message);
          console.log("stdout:\n" + stdout);
          console.log("stderr:\n" + stderr);
        }
      });
  });
};

const createVideoThumbnail = async (
  videoSource,
  thumbnailDirectory,
  thumbnailDurationInSeconds = 15
) => {
  return new Promise(async (resolve, reject) => {
    const { durationInSeconds: duration } = await getVideoData(videoSource);

    const startTime = getStartTime(duration, thumbnailDurationInSeconds);
    console.log("Duration is: ", duration);
    console.log("Start Time is: ", startTime);

    return fffmpeg()
      .input(videoSource)
      .inputOptions([`-ss ${startTime}`])
      .outputOptions([`-t ${thumbnailDurationInSeconds}`])
      .noAudio()
      .output(thumbnailDirectory)
      .on("end", resolve)
      .on("error", reject)
      .run();
  });
};

module.exports = {
  extractFramesFromVideo,
  createVideoThumbnail,
};
