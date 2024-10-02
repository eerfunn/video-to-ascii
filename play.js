const fs = require("fs");

const asciiArtDirectory = "./frames-ascii";

const playAsciiArt = (asciiArtDirectory) => {
  // Work in progress
  fs.readdir(asciiArtDirectory, (err, file) => {
    if (err) {
      return console.error(err);
    }

    let i = 0;

    const interval = setInterval(() => {
      fs.promises
        .readFile(`${asciiArtDirectory}/${file[i]}`, "utf8", (err, frame) => {
          if (err) {
            return console.error(err);
          }
          return frame;
        })
        .then((x) => {
          console.log(i);
          console.log("\n\n\n\n\n");
          console.log(x.toString());
        });
      i++;
      if (i >= file.length) {
        clearInterval(interval);
      }
    }, 33);
  });
};
playAsciiArt(asciiArtDirectory);

module.exports = {
  playAsciiArt,
};
