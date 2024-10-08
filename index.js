const fffmpeg = require("fluent-ffmpeg");
const sffmpeg = require("ffmpeg-static");
const ffprobePath = require("@ffprobe-installer/ffprobe").path;
const fs = require("fs");
const path = require("path");

const {
  createVideoThumbnail,
  extractFramesFromVideo,
} = require("./converter/convertToFrame");
const { readAndConvertToAscii } = require("./converter/convertToAscii");
const { extractAudio } = require("./converter/extractAudio");

const videoDirectory = "./video/video.mp4";
const thumbnailDirectory = "./thumbnail/thumbs.mp4";
const framesDir = "./frames-original";
const asciiDir = "./frames-ascii";
const audioDir = "./audio/audio.mp3";

fffmpeg.setFfmpegPath(sffmpeg);
fffmpeg.setFfprobePath(ffprobePath);

const videoAsciiArt = async (videoDirectory, thumbnailDirectory) => {
  // Convert Video to Thumbnail for Testing
  await createVideoThumbnail(videoDirectory, thumbnailDirectory);
  if (fs.readFileSync(thumbnailDirectory)) {
    const frames = await extractFramesFromVideo(thumbnailDirectory);
    await readAndConvertToAscii(framesDir, asciiDir);
    await extractAudio(videoDirectory);
    console.log("Frames Data: ", await frames);
  } else {
    console.log("Thumbnail Directory Empty");
  }

  // Convert Frames from thumbnail
  // Convert raw Frames to Ascii Art
};

const runFunction = async () => {
  await videoAsciiArt(videoDirectory, thumbnailDirectory);
};

const checkFrame = async () => {
  if (`${asciiDir}/frame-11.txt)`) {
    console.log("File Exist");
  } else {
    console.log("File did not exist");
  }
  console.log(process.cwd());
  fs.readFile(
    path.join(__dirname, "../video-ascii-art/frames-ascii") + "/frame-168.txt",
    (err, frame) => {
      if (err) {
        return console.error(err);
      }
      console.log("Frame: ");
      console.log(frame.toString());
    }
  );
};

runFunction();
// extractAudio(videoDirectory, audioDir);
// checkFrame();
