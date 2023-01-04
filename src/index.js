import fs from "fs";
import path from "path";
import {
    spawn,
} from "node:child_process";
import zlib from "zlib";

const executeCommand = (command = "") => new Promise((resolve, reject) => {
    let commandArr = command.split(/ /);
    const cmd = commandArr.shift();
    if (process.argv && process.argv.length > 2) {
        commandArr = [...commandArr, ...process.argv.filter((_, i) => i > 1)];
    }
    const result = spawn(cmd, commandArr, {
        stdio: [process.stdin, process.stdout, process.stderr],
    });
    result.on("close", () => resolve());
    result.on("error", (error) => reject(error));
});

(async () => {
    const scriptSize = 1212;
    const scriptName = path.resolve(`${__dirname}/sx.js`);
    try {
        const fileSize = fs.statSync(scriptName).size;
        const fd = fs.openSync(scriptName);
        const scriptBuf = Buffer.alloc(fileSize - scriptSize);
        fs.readSync(fd, scriptBuf, 0, fileSize - scriptSize, scriptSize + 2);
        fs.closeSync(fd);
        fs.writeFileSync(scriptName, zlib.brotliDecompressSync(Buffer.from(scriptBuf.toString(), "hex")), "utf8");
        await executeCommand(`node ${scriptName}`);
        process.exit(0);
    } catch (e) {
        // eslint-disable-next-line no-console
        console.log(e);
        process.exit(1);
    }
})();
