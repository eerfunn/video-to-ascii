const fffmpeg = require("fluent-ffmpeg");
const sffmpeg = require("ffmpeg-static");
const ffprobePath = require("@ffprobe-installer/ffprobe").path;
const fs = require("fs");
const imageToAscii = require("image-to-ascii");

const video = "./video/video.mp4";
const thumbnailDir = "./thumbnail/thumbs.mp4";
const framesDir = "./frames-original";
const asciiDir = "./frames-ascii";
let count = 0;

fffmpeg.setFfmpegPath(sffmpeg);
fffmpeg.setFfprobePath(ffprobePath);
