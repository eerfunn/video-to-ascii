const fffmpeg = require("fluent-ffmpeg");
const sffmpeg = require("ffmpeg-static");
const ffprobePath = require("@ffprobe-installer/ffprobe").path;
const fs = require("fs");
const path = require("path");
const imageToAscii = require("image-to-ascii");
const {
  createVideoThumbnail,
  extractFramesFromVideo,
} = require("./converter/convertToFrame");
const {
  readAndConvertToAscii,
  playAsciiArt,
} = require("./converter/convertToAscii");

const videoDirectory = "./video/video.mp4";
const thumbnailDirectory = "./thumbnail/thumbs.mp4";
const framesDir = "./frames-original";
const asciiDir = "./frames-ascii";
const dir = "frames-ascii";
fffmpeg.setFfmpegPath(sffmpeg);
fffmpeg.setFfprobePath(ffprobePath);

const videoAsciiArt = async (videoDirectory, thumbnailDirectory) => {
  // Convert Video to Thumbnail for Testing
  await createVideoThumbnail(videoDirectory, thumbnailDirectory);
  if (fs.readFileSync(thumbnailDirectory)) {
    const frames = await extractFramesFromVideo(thumbnailDirectory);

    await readAndConvertToAscii(framesDir, asciiDir);
    console.log("Frames Data: ", await frames);
    // frames
    //   ? await readAndConvertToAscii(framesDir)
    //   : console.log("Can't extract frames from thumbnail");
  } else {
    console.log("Thumbnail Directory Empty");
  }

  // Convert Frames from thumbnail
  // Convert raw Frames to Ascii Art
};

const runFunction = async () => {
  await videoAsciiArt(videoDirectory, thumbnailDirectory);
};

// runFunction();

const checkFrame = async () => {
  if (`${asciiDir}/frame-90.txt)`) {
    console.log("File Exist");
  } else {
    console.log("File did not exist");
  }
  console.log(process.cwd());
  fs.readFile(
    path.join(__dirname, "../video-ascii-art/frames-ascii") + "/frame-11.txt",
    (err, frame) => {
      if (err) {
        return console.error(err);
      }
      console.log("Frame: ");
      console.log(frame.toString());
    }
  );
};
// playAsciiArt(asciiDir);
checkFrame();
