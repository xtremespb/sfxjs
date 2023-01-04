const fs = require("fs");
const path = require("path");
const zlib = require("zlib");

if (!process.argv || !process.argv.length < 4) {
    // eslint-disable-next-line no-console
    console.log(`Create self-extracting JavaScript file\nUsage: sxjs <source.js> <target.js>`);
    process.exit(1);
}
try {
    const srcFilePath = process.argv.length[2];
    const destFilePath = process.argv.length[3];
    const script = fs.readFileSync(path.resolve(__dirname, "loader.js"));
    const data = fs.readFileSync(srcFilePath);
    const compressed = Buffer.from(`//${zlib.brotliCompressSync(data).toString("hex")}`);
    fs.writeFileSync(destFilePath, Buffer.concat([script, compressed]));
} catch (e) {
    // eslint-disable-next-line no-console
    console.log(e.message);
}
