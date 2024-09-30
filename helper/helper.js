const fffmpeg = require("fluent-ffmpeg");
const sffmpeg = require("ffmpeg-static");
const ffprobePath = require("@ffprobe-installer/ffprobe").path;
const fs = require("fs");
const imageToAscii = require("image-to-ascii");

fffmpeg.setFfmpegPath(sffmpeg);
fffmpeg.setFfprobePath(ffprobePath);

const getVideoData = async (videoSource) => {
  return new Promise((resolve, reject) => {
    fffmpeg.ffprobe(videoSource, (error, vidInfo) => {
      if (error) {
        console.log(error);
        return reject(error);
      } else {
        const { duration, size } = vidInfo.format;

        console.log("duration:" + Math.floor(duration), size);
        return resolve({ durationInSeconds: Math.floor(duration), size });
      }
    });
  });
};

const getStartTime = (duration, thumbnailDurationInSeconds) => {
  //assure that thumbnail duraction is lower than video duration
  const checkVideoDurationLeft = duration - thumbnailDurationInSeconds;

  if (checkVideoDurationLeft <= 0) {
    return 0;
  }
  return getRandomIntegerInRange(
    0.25 * checkVideoDurationLeft,
    0.75 * checkVideoDurationLeft
  );
};

const getRandomIntegerInRange = (min, max) => {
  const minInt = Math.ceil(min);
  const maxInt = Math.ceil(max);

  return Math.floor(Math.random() * (maxInt - minInt + 1) + minInt);
};

module.exports = {
  getVideoData,
  getStartTime,
  getRandomIntegerInRange,
};
