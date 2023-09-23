# Section 32: Exploring Modules & The NPM Universe

- [Modules](#modules)
  - [`module.exports`](#moduleexports)
  - [Requiring a directory ](#requiring-a-directory)
- [NPM](#npm)
  - [Installing packages](#installing-packages)
  - [Adding global packages](#adding-global-packages)
  - [`package.json`](#packagejson)
  - [Installing dependencies](#installing-dependencies)
- [Language Guesser Challenge](#language-guesser-challenge)
- [Packages Used in this Section](#packages-used-in-this-section)


## Modules
A module is a standalone program that can be imported into another program.

### `module.exports`
To export code from within a program it must be added to the Node `module.exports` object.

Exporting a function from inside a `math.js` file.
```
const add = (x, y) => x + y;

module.export.add = add;
```

To import the program into another file called `app.js` us the Node `require()` function.
```
const math = require("./math") // require path to file in current working directory

console.log(math) // prints file's exports as an object `{ add: [Function: add] }`
```

### Requiring a directory 
Directories may have multiple files that need to be imported into a single program.

After exporting each files contents into the `module.exports` object, each files name should be included in an `index.js` file that can then be used to import them all.

An `index.js` file inside of a `shelter` directory that contains references to separate exportable files.
```
const blue = require("./blue");
const sadie = require("./sadie");
const janet = require("./janet");

const allCats = [blue, sadie, janet];
module.exports = allCats;
```

`shelter` directory required in an `app.js` file with access to its contents referencing `index.js`.
```
const cats = require("./shelter");

console.log("Required entire directory", cats);
```

## [NPM](https://www.npmjs.com/)
The Node Package Manager (NPM) is,
1. A library of thousands of packages published by other developers that can be used for free.
2. A command line tool to easily install and manage those packages in Node projects.

`npm` terminal command returns usage.
```
npm <command>

Usage:

npm install        install all the dependencies in your project
npm install <foo>  add the <foo> dependency to your project
npm test           run this project's tests
npm run <foo>      run the script named <foo>
npm <command> -h   quick help on <command>
npm -l             display usage info for all commands
npm help <term>    search for help on <term>
npm help npm       more involved overview

All commands:
    ...
```

### Installing packages
To install packages using NPM use the command `npm install <package>` or `npm i <package>`.

After a package is installed, the directory the command was run in will contain two new files and a directory
- `node_modules`
- `package-lock.json`
- `package.json` *(created if it does not already exist)*

To use the package in a file `require` it.
```
const package = require("<package>"); // access to package methods
```

### Adding global packages
Packages can be installed locally, accessible only inside the working directory, or globally, accessible on the local machine or current user.

To install packages locally
```
> npm i <package>
```

Example of packages to use locally in standalone projects
- `colors`
- `give-me-a-joke`

To install packages globally
```
> npm i -g <package>
```

Example of a package to use globally
- `cowsay`

To use an installed global package in a local project you must `link` it
```
> npm link <global-package>
```

### `package.json`
`package.json` is a special file placed in every Node app containing metadata about the project or package. It contains information such as `name`, `description`, `version`, `author`, `license`, `dependencies` and `devDependencies`.

The `dependencies` metadata contains the most crucial information describing what packages Node should pull into the project for the application.

The `package.json` can be created manually or using the package creation utility command `npm init`.

Using `npm init` provides a walkthrough to name the package and provide other information that will be used for the metadata.
```
package name: (artster) 
version: (1.0.0) 
description: 
entry point: (index.js) 
test command: 
git repository: 
keywords: 
author: Ryan Meneses
license: (ISC) 
About to write to /Users/ryan/Dev/web-developer-bootcamp/32-modules-npm/packages/Artster/package.json:

{
  "name": "artster",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "Ryan Meneses",
  "license": "ISC"
}


Is this OK? (yes) 
```

After using the package creation utility, all packages install using `npm i <package>` will be added to the dependencies section of `package.json` automatically.

### Installing dependencies
To install all dependencies required for a project, the `package.json` file contains the metadata that Node uses to pull the packages into the project.

Pull dependencies into a project provided a `package.json` file exists using the command `npm install`.

`npm install` looks for the `package.json` file inside of the root directory of the project and installs all of the dependencies into the `node_modules` directory.

## Language Guesser Challenge
See `LangGuessr` directory. This mini project combines packages to create a language guessing application.

To use it, run `npm install` in the root directory, then run it in the terminal using `node` with a String, a sentence in another language, passed as an argument.

Example guessing the Danish language
```
> node index.js "Alderdom beskytter ikke mod dårskab" 
Danish
```

## Packages Used in this Section
- [`give-me-a-joke`](https://www.npmjs.com/package/give-me-a-joke)
- [`colors`](https://www.npmjs.com/package/colors)
- [`cowsay`](https://www.npmjs.com/package/cowsay)
- [`figlet`](https://www.npmjs.com/package/figlet)
- [`franc`](https://www.npmjs.com/package/franc)
- [`langs`](https://www.npmjs.com/package/langs)