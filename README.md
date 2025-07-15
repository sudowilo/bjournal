# bjournal

A simple CLI todo and soon goal pointer 

---

## ✨ Features

-  Fast and lightweight
-  Handy and easy to use via the terminal
-  Works entirely **locally** — no data is sent anywhere

---

## 🚀 Installation

> 🟢 Requires [Node.js](https://nodejs.org/) v14 or newer (npm comes bundled with Node.js)

Install globally via npm:

⚠️ Version 2.0.0 introduces a new data location (~/.config/bjournal/data.json)

If you're upgrading from v1, your old data won't be auto-migrated.

```bash
npm install -g bjournal
```

Then run it from anywhere:

```bash
bjournal [commands]
```

---

## 📖 Usage

For full usage run:

```bash
bjournal --help
```

example:
```
Usage: bjournal [options] [command]

cli todo and goal pointer

Options:
  -V, --version                   output the version number
  -h, --help                      display help for command

Commands:
  insert|i [options] <string...>  inserting todo to specific date
  list|l [options]                lists todos (and goals)
  remove|rm [options] <index...>  removing given index from todo list
  done|d [options] <index...>     marks given indexes done
  undone|u [options] <index...>   marks given indexes undone
  bold|b [options] <index...>     mark given indexes as import and bold
  forward|f [options] <index...>  forwards todo to specific date
  default-todos [options]         default todos for adding to day by default
  backup [options]                get a backup from your data
  help [command]                  display help for command

```


---
## 🔐 Legal & Disclaimer

> ⚠️ **Use at your own risk.**

This software **does not collect, transmit, or store** any personal or project data externally.  
All operations are performed **locally on your machine**.

I am **not responsible for any data loss, damage, or unintended behavior** resulting from the use of this CLI.  
Please ensure you have backups and understand the commands before running them.

By using this tool, you agree that:
- You are solely responsible for how it’s used
- No liability shall be held against the developer (me) for lost data or damage

> 🔒 > The terms described in this section apply retroactively to all existing content in this repository, including earlier commits and published versions, and prospectively to all future updates.


---

## 🛠️ Development

Clone the repo:

```bash
git clone https://github.com/sudowilo/bjournal.git
cd bjournal
npm install
npm link  # Makes the CLI available globally for testing
```

Now you can test it:

```bash
bjournal
```

---

## 📄 License

MIT © sudowilo
See [`LICENSE`](./LICENSE) for more info.
