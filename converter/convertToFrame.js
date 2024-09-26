const fffmpeg = require("fluent-ffmpeg");
const sffmpeg = require("ffmpeg-static");
const ffprobePath = require("@ffprobe-installer/ffprobe").path;

fffmpeg.setFfmpegPath(sffmpeg);
fffmpeg.setFfprobePath(ffprobePath);

const extractFrames = async (f) => {
  // Extract from thumbnail directory
  fffmpeg()
    .input(f)
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
  video,
  thumbnailDir,
  thumbnailDurSec = 5
) => {
  console.log("Vid Data" + (await getVideoData(video)));
  return new Promise(async (resolve, reject) => {
    const { durationInSeconds: duration } = await getVideoData(video);

    const startTime = getStartTime(duration, thumbnailDurSec);

    return fffmpeg()
      .input(video)
      .inputOptions([`-ss ${startTime}`])
      .outputOptions([`-t ${thumbnailDurSec}`])
      .noAudio()
      .output(thumbnailDir)
      .on("end", resolve)
      .on("error", reject)
      .run();
  });
};
