const fffmpeg = require("fluent-ffmpeg");
const sffmpeg = require("ffmpeg-static");
const ffprobePath = require("@ffprobe-installer/ffprobe").path;

fffmpeg.setFfmpegPath(sffmpeg);
fffmpeg.setFfprobePath(ffprobePath);

const extractFramesFromVideo = async (videoSource) => {
  // Extract from thumbnail directory
  fffmpeg()
    .input(videoSource)
    .saveToFile("../frames-original/frame-%03d.png")
    .on("progress", (progress) => {
      if (progress.percent) {
        console.log(`Processing: ${Math.floor(progress.percent)}% done`);
      }
    })
    .on("error", (error) => {
      console.error(error);
    });
};

const createVideoThumbnail = async (
  videoSource,
  thumbnailDirectory,
  thumbnailDurationInSeconds = 5
) => {
  console.log("Video Data" + (await getVideoData(videoSource)));
  return new Promise(async (resolve, reject) => {
    const { durationInSeconds: duration } = await getVideoData(videoSource);

    const startTime = getStartTime(duration, thumbnailDurationInSeconds);

    return fffmpeg()
      .input(videoSource)
      .inputOptions([`-ss ${startTime}`])
      .outputOptions([`-t ${thumbnailDurSec}`])
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
