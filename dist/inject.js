#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const zlib = require("zlib");

if (!process.argv || process.argv.length < 3) {
    // eslint-disable-next-line no-console
    console.log(`Create self-extracting JavaScript file\nUsage: sfxjs <source.js> <target.js>`);
    process.exit(1);
}
try {
    const srcFilePath = process.argv[2];
    const destFilePath = process.argv[3];
    const script = fs.readFileSync(path.resolve(__dirname, "loader.js"));
    const data = fs.readFileSync(srcFilePath);
    const compressed = Buffer.from(`//${zlib.brotliCompressSync(data).toString("hex")}`);
    // eslint-disable-next-line no-console
    fs.writeFileSync(destFilePath, Buffer.concat([script, compressed]));
    // eslint-disable-next-line no-console
    console.log(`All done, compressed file written to: ${destFilePath}`);
} catch (e) {
    // eslint-disable-next-line no-console
    console.log(`Error: ${e.message}`);
}
