# Section 31: Node

- [Node Intro](#node-intro)
- [Installation](#installation)
- [The Node REPL](#the-node-repl)
- [Running Node Files](#running-node-files)
- [`process` and `argv`](#process-and-argv)
- [File System Module](#file-system-module)

## [Node](https://nodejs.org/en) Intro
Node.js® is an open-source, cross-platform JavaScript runtime environment. It allows JavaScript to be executed outside of the browser so that it may be used as **server-side code**.

Node is used to build
- Web Servers
- Command Line Tools
- Native Apps (VSCode is a Node app)
- Video Games
- Drone Software

## Installation
Use [`nvm`](https://github.com/nvm-sh/nvm#installing-and-updating) to easily install different versions of Node on your system.
- For MacOS High Sierra use `Node.js v17.9.1`.

After following `nvm` installation instructions, install the working version of Node for your system or the LTS.

Installing, verifying, and launching Node 17.9.1 in the terminal.
```
nvm install 17.9.1
nvm use node # Now using node v17.9.1 (npm v8.11.0)

node -v      # v17.9.1
npm -v       # 8.11.0

node         # Welcome to Node.js v17.9.1.
```

## [The Node REPL](https://nodejs.dev/en/learn/how-to-use-the-nodejs-repl/)
The `node:repl` module provides a Read-Eval-Print-Loop (REPL) implementation that is available both as a standalone program or includible in other applications.

If the node command is ran without any script to execute or without any arguments, a REPL session is started.
```
node
```

In the node REPL, the `document` and `window` objects are not accessible because they do not exist outside of the browser.
```
> document
Uncaught ReferenceError: document is not defined
> window
Uncaught ReferenceError: window is not defined
```

Instead, the top level object available is called [`global`](https://nodejs.org/docs/latest-v17.x/api/globals.html) (v17.9.1).
```
> global
Object [global] {
  global: [Circular *1],
  clearInterval: [Function: clearInterval],
  clearTimeout: [Function: clearTimeout],
  setInterval: [Function: setInterval],
  setTimeout: [Function: setTimeout] {
    [Symbol(nodejs.util.promisify.custom)]: [Getter]
  },
  queueMicrotask: [Function: queueMicrotask],
  performance: Performance {
    nodeTiming: PerformanceNodeTiming {
      name: 'node',
      entryType: 'node',
      startTime: 0,
      duration: 90866921.29480195,
      nodeStart: 3.3586368560791016,
      v8Start: 4.537478923797607,
      bootstrapComplete: 40.31375980377197,
      environment: 21.46938991546631,
      loopStart: 67.60267996788025,
      loopExit: -1,
      idleTime: 90866606.063088
    },
    timeOrigin: 1694547947725.864
  },
  clearImmediate: [Function: clearImmediate],
  setImmediate: [Function: setImmediate] {
    [Symbol(nodejs.util.promisify.custom)]: [Getter]
  },
  structuredClone: [Function: structuredClone]
}
```

The `global` object has similar methods to the `window` that can be access directly without the dot syntax `global.{method}`.
```
> setTimeout(() => console.log("HELLO!!!"), 3000);
```

Node JS vs Client-Side JS
- New stuff in Node
  - Ability to interact with the operating system.
  - Ability to create, read, update, and delete files/folders.
- Not included in Node
  - `window` and `document` (anything related to the browser)
  - The DOM API.

## Running Node Files
Use the node command followed by `.js` file to run Node.js scripts.
```
node <path-to-script>/script.js
```

If no file is found, node throws an error.
```
node:internal/modules/cjs/loader:936
  throw err;
  ^

Error: Cannot find module 'web-developer-bootcamp/31-node/node/script.js'
...
```

## [`process`](https://nodejs.org/docs/latest-v17.x/api/process.html) and `argv`
The process object provides information about, and control over, the current Node.js process.

### [`process.version`](https://nodejs.org/docs/latest-v17.x/api/process.html#processversion)
The `process.version` property contains the Node.js version string.
```
> process.version
'v17.9.1'
```

### [`process.release`](https://nodejs.org/docs/latest-v17.x/api/process.html#processrelease)
The `process.release` property returns an Object containing metadata related to the current release, including URLs for the source tarball and headers-only tarball.
```
> process.release

{
  name: 'node',
  sourceUrl: 'https://nodejs.org/download/release/v17.9.1/node-v17.9.1.tar.gz',
  headersUrl: 'https://nodejs.org/download/release/v17.9.1/node-v17.9.1-headers.tar.gz'
}
```

### `process.cwd`
The `process.cwd()` method returns the current working directory of the Node.js process.
```
> process.cwd
'/Users/ryan/Dev/web-developer-bootcamp/31-node/node'
```

### [`process.argv`](https://nodejs.org/docs/latest-v17.x/api/process.html#processargv)
The `process.argv` property returns an array containing the command-line arguments passed when the Node.js process was launched. The first element will be [`process.execPath`](https://nodejs.org/docs/latest-v17.x/api/process.html#processexecpath). See `process.argv0` if access to the original value of `argv[0]` is needed. The second element `argv[1]` will be the path to the JavaScript file being executed. The remaining elements will be any additional command-line arguments.

Example, assume the following script for `process-args.js`
```
import { argv } from 'process';

// print process.argv
argv.forEach((val, index) => {
  console.log(`${index}: ${val}`);
});
```

Launch the Node.js process
```
$ node process-args.js one two=three four
0: /usr/local/bin/node
1: /Users/mjr/work/node/process-args.js
2: one
3: two=three
4: four
```

## [File System](https://nodejs.org/docs/latest-v17.x/api/fs.html#file-system) Module
The fs module enables interacting with the file system in a way modeled on standard POSIX functions.

Note that `fs` must be imported into the file in order to use it.
```
const fs = require("fs");
```

File system has two ways to read and write files, [synchronously](https://nodejs.org/docs/latest-v17.x/api/fs.html#synchronous-api) and [asynchronously](https://nodejs.org/docs/latest-v17.x/api/fs.html#callback-api).
- The synchronous APIs perform all operations synchronously, blocking the event loop until the operation completes or fails.
- The callback APIs perform all operations asynchronously, without blocking the event loop, then invoke a callback function upon completion or error.

### [`mkdir()`](https://nodejs.org/docs/latest-v17.x/api/fs.html#fsmkdirpath-options-callback)
Example creating a directory using the synchronous API
```
import { mkdir } from 'fs';

// Creates /tmp/a/apple, regardless of whether `/tmp` and /tmp/a exist.
mkdir('/tmp/a/apple', { recursive: true }, (err) => {
  if (err) throw err;
});
```

### [`writeFile()`](https://nodejs.org/docs/latest-v17.x/api/fs.html#fswritefilefile-data-options-callback)
Example writing a file using the synchronous API.

If data is a plain object, it must have an own (not inherited) toString function property.
```
import { writeFile } from 'fs';
import { Buffer } from 'buffer';

const data = new Uint8Array(Buffer.from('Hello Node.js'));
writeFile('message.txt', data, (err) => {
  if (err) throw err;
  console.log('The file has been saved!');
});
```

If `options` is a string, then it specifies the encoding.
```
import { writeFile } from 'fs';

writeFile('message.txt', 'Hello Node.js', 'utf8', callback);
```