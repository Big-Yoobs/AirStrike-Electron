const fs = require("fs");
try {
    fs.rmdirSync("out", {
        recursive: true
    });
} catch {}