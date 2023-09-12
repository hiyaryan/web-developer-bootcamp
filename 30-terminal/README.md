# Section 30: Mastering the Terminal

- [Backend Overview](#backend-overview)
- [Terminal Intro](#terminal-intro)
- [Terminal Basics](#terminal-basics)
  - [Terminology](#terminology)
- [Navigation](#navigation)
  - [`ls`](#ls)
  - [`pwd`](#pwd)
  - [`cd`](#cd)
- [Paths](#paths)
  - [Relative](#relative)
  - [Absolute](#absolute)
- [Directories](#directories)
  - [`mkdir`](#mkdir)
- [Files](#files)
  - [`touch`](#touch)
  - [`rm`](#rm)
  - [`rmdir`](#rmdir)
- [Flags](#flags)
- [Manuals](#manuals)
  - [`man`](#man)

## [Backend Overview](https://developer.mozilla.org/en-US/docs/Learn/Server-side/First_steps/Introduction)
Most large-scale websites use server-side code to dynamically display different data when needed, generally pulled out of a database stored on a server and sent to the client to be displayed via some code (e.g. HTML and JavaScript).

## [Terminal Intro](https://developer.mozilla.org/en-US/docs/Learn/Tools_and_testing/Understanding_client-side_tools/Command_line#welcome_to_the_terminal)
The terminal is a text interface for executing text-based programs. If you're running any tooling for web development there's a near-guaranteed chance that you'll have to pop open the command line and run some commands to use your chosen tools (you'll often see such tools referred to as **CLI tools** — command line interface tools).

## [Terminal Basics](https://developer.mozilla.org/en-US/docs/Learn/Tools_and_testing/Understanding_client-side_tools/Command_line#basic_built-in_terminal_commands)
- The terminal is much faster than using a GUI, therefore, making development faster.
- The terminal provides greater access into a computer.
- The terminal has many tools that are installed through and used in it via the command line.

### Terminology
- Terminal - a text-based interface to a computer
- Shell - the program running on the terminal that processes commands
- Command line - the method of entering textual commands into the shell
- Console - physical hardware or a text-based interface
- Bash - one of the most popular shells (zsh is the default shell on MacOS)

## [Navigation](https://developer.mozilla.org/en-US/docs/Learn/Tools_and_testing/Understanding_client-side_tools/Command_line#navigation_on_the_command_line)
### [`ls`](https://developer.mozilla.org/en-US/docs/Learn/Tools_and_testing/Understanding_client-side_tools/Command_line#listing_directory_contents)
`ls` (short for list), lists the contents of the directory you're currently in.

Note: `~` references the home directory, this means that you are in the home directory e.g. `Ryans-MacBook-Pro:~ ryan$ `.

### `pwd`
`pwd` (print working directory), prints the path to the working directory (where you currently are).

### `cd`
`cd` (change directory) - change and move between folders

## [Paths](https://www.geeksforgeeks.org/absolute-relative-pathnames-unix/)
A path is a unique location to a file or a folder in a file system of an OS. A path to a file is a combination of `/` and alpha-numeric characters.

### Relative
A relative path is defined as the path related to the present working directly (`pwd`). It starts at your current directory and never starts with a `/`.

Entering this relative path returns "is a directory".
```
../../ml-a-z/
```

### Absolute
An absolute path is defined as the location of a file or directory from the root directory (`/`).

Entering this absolute path returns "is a directory".
```
/Users/ryan/Dev/web-developer-bootcamp/30-terminal
```

## [Directories](https://developer.mozilla.org/en-US/docs/Learn/Tools_and_testing/Understanding_client-side_tools/Command_line#creating_copying_moving_removing)
### `mkdir`
`mkdir` (make directory) - creates a new directory

Makes a new directory for Section 31.
```
mkdir 31-node
```

Create a new directory one folder up.
```
mkdir ../32-modules-npm
```

## [Files](https://developer.mozilla.org/en-US/docs/Learn/Tools_and_testing/Understanding_client-side_tools/Command_line#creating_copying_moving_removing)
### `touch`
The primary purpose of `touch` is to change file access and modification times. If any file does not exist, it creates the file with default permissions.

If `app.js` already exists and the command `touch app.js` is ran, then the modification time is updated. For example if `app.js` was modified at 15:26, and `touch app.js` was ran at 15:29, then the modification time is updated to 15:29.

Create a `README.md` file.
```
touch README.md
```

Touch can create multiple files at once.

Create `README.md`, `app.js`, `index.html`, and `app.css`.
```
touch README.md app.js index.html app.css
```

### `rm`
`rm` (short for remove), permanently deletes a file or files.

Remove a file called `README.txt`.
```
rm README.txt
```

Remove files called `README.md`, `app.js`, `index.html`, and `app.css`.
```
rm README.md app.js index.html app.css
```

### `rmdir`
`rmdir` (remove directory), removes a directory only if it is empty.

Remove an empty directory called `newProject`.
```
rmdir newProject
```

Using `rmdir` on a non-empty directory called `oldProject` returns "is a directory".
```
rmdir oldProject
rm: oldProject: is a directory
```

To remove a non-empty directory, use the `rm` and its `-r` (recursive) and `-f` (force) flags.

Remove a non-empty directory called `oldProject`.
```
rm -rf oldProject
```

`-f` (force) flag removes files without prompting for confirmation, regardless of the files permissions.

`-r` (recursive) flag attempts to remove the file hierarchy rooted in each file argument.

## Flags
Flags are options that can be passed to a command similar to arguments. 

Gives a listing with one file or directory on each line with a lot more information.
```
ls -l
```

Include directory entries whose names begin with a dot (`.`).
```
ls -a
```

To run a command with multiple options at the same time, you can usually put them all in a single string after the dash character, for example `ls -lah`, or `ls -ltrh`.

Combine both `l` and `a` flags.
```
la -la
```

## Manuals
### [`man`](https://en.wikipedia.org/wiki/Man_page)
To find out exactly what options each command has available type the `man` command, followed by the name of the command you want to look up, for example `man ls`. This will open up the man page in the terminal's default text file viewer (for example, [`less`](https://en.wikipedia.org/wiki/Less_(Unix))), and you should then be able to scroll through the page using the arrow keys, or some similar mechanism. The man page lists all the options in great detail. Once you are finished looking through the man page, you need to quit out of it using your text viewer's quit command ("q" in `less`).

Get the man page for `mkdir` command.
```
man mkdir
```