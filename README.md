# SFX JS

This utility allows you to turn any server-side (Node.js) JavaScript file into a self-extracting script.

Algorithm of operation:

1. The source file is compressed using the Brolti algorithm
2. A small download script (about 1 Kb) is written at the beginning of the source file, which uncompresses and starts the compressed source file

The advantage of using this utility is that the size of the source file is reduced by compression, which reduces the file size by several times.

No external dependencies are required for the utility to work.

## Usage

In order to pack a file, you must install *sfxjs* in "global" mode:

```
npm i sfxjs -G
```

Then, go to the directory where you would like to pack a file, and execute the following command:

```
sfxjs source.js result.js
```

**Important**: once unpacked, the "packed" version is replaced with "unpacked" one.