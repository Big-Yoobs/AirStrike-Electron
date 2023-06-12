const fs = require("fs");
const fse = require('fs-extra');
const path = require("path");

const copies = {
    "assets": "assets",
    ".webpack/renderer": "resources/renderer",
    ".webpack/main": "resources/main",
    "content": "content"
};

const directories = fs.readdirSync("out");

for (const src of Object.keys(copies)) {
    const dest = copies[src];
    for (let directory of directories) {
        const srcPath = path.join(...src.split("/"));
        const destPath = path.join("out", directory, ...dest.split("/"));
        fse.copySync(srcPath, destPath);
    }
}