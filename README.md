# 📒 bjournal

A simple and fast CLI-based todo tracker — with goal management coming soon.

---

## ✨ Features

* ⚡ **Fast & Lightweight**
  Designed for terminal lovers who want quick access without clutter.

* 🧠 **Intuitive & Handy**
  Easy-to-remember commands with helpful aliases (`i` for insert, `rm` for remove, etc.)

* 🔒 **Privacy-First**
  Runs fully **locally** — no data is sent anywhere.

* 📅 **Date-Based Todo Management**
  Add, list, remove, and manage todos for today, tomorrow, yesterday, or any specific date.

* ✅ **Mark as Done/Undone**
  Update your todos’ status using their index numbers.

* 🔥 **Prioritize with Bold**
  Emphasize important tasks. Mark repeatedly for even higher priority.

* ⏩ **Forward Tasks**
  Move any todo to another date — great for shifting plans.

* ♻️ **Default (Recurring) Todos**
  Add habits or recurring tasks that auto-fill into each day.

* 📊 **View Recent History**
  Use `--last-7` to view todos from the last 7 days.

* 📀 **Backup Support**
  Backup your data to any file path and locate your local storage with ease.

---

## 🚀 Installation

> 🟢 Requires [Node.js](https://nodejs.org/) v14 or newer (npm is included)

Install globally via `npm`:

```bash
npm install -g bjournal
```

> ⚠️ **v2.0.0 Change Notice**
> Data is now stored at: `~/.config/bjournal/data.json`
> If you're upgrading from v1, your old data will not be auto-migrated.

Run from anywhere in your terminal:

```bash
bjournal [command] [options]
```

---

## 📖 Usage

To view all available commands:

```bash
bjournal --help
```

To see options and examples for a specific command:

```bash
bjournal help insert
bjournal help list
# ...and so on
```

---

## 🔐 Legal & Disclaimer

> ⚠️ **Use at your own risk.**

* This tool does **not collect or transmit** your data externally.
* All operations happen **locally** on your device.

The developer (me) is **not responsible** for data loss, corruption, or unintended behavior.
Please **back up your data** and use with care.

By using this tool, you agree that:

* You take full responsibility for its use
* No liability is held against the developer

> 🔒 These terms apply retroactively to all previous versions, and forward to all future updates.

---

## 🛠️ Development

Clone and set up locally:

```bash
git clone https://github.com/sudowilo/bjournal.git
cd bjournal
npm install
npm link  # Symlink to test the CLI globally
```

Now you can run it like so:

```bash
bjournal
```

---

## 📄 License

MIT © [sudowilo](https://github.com/sudowilo)
See [`LICENSE`](./LICENSE) for more information.
