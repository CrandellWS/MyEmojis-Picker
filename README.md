# 🎰 MyEmojis Picker

> A free Chrome extension that adds a slot-themed emoji picker to [MyPrize.us](https://myprize.us/invite/GWASlots) chat. Made for the **gwa_slots** community.

[![Chrome Web Store](https://img.shields.io/badge/Chrome%20Web%20Store-Published-brightgreen)](https://chromewebstore.google.com/detail/myprize-slot-emoji-picker/bbakpgfkeaimoipknjlddilhkafgfflm)
[![GitHub Release](https://img.shields.io/github/v/release/CrandellWS/MyEmojis-Picker)](https://github.com/CrandellWS/MyEmojis-Picker/releases/latest)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

**[🌐 Landing Page](https://crandellws.github.io/MyEmojis-Picker/) · [🧩 Add to Chrome](https://chromewebstore.google.com/detail/myprize-slot-emoji-picker/bbakpgfkeaimoipknjlddilhkafgfflm) · [⬇️ Download Zip](https://github.com/CrandellWS/MyEmojis-Picker/releases/latest/download/myprize-emoji-picker.zip) · [🎰 Join MyPrize](https://myprize.us/invite/GWASlots)**

---

## Features

- **⚡ Quick Picks** — Your 5 most recently used emojis always visible at the top, auto-closes on select
- **⏱ Smart Recents** — 5×5 grid of your 25 most used emojis as the default view, preloaded with the best defaults
- **🗂️ 6 Tabs** — Recent · 🏆 Win · 😭 Loss · 🎄 Seasonal · 😂 Feels · 🖨️ Printer
- **🔍 Keyword Search** — Type `fire`, `money`, `unicorn`, `salty`, `lucky` and instantly filter
- **🧠 Smart Memory** — localStorage only, no servers, picks float to top automatically
- **⌨️ Keyboard Friendly** — `Escape` to close, click outside to dismiss
- **🖨️ Printer Tab** — Because we're printing money out here: 🖨️💸💵🤑🪙💎🎰🦄

## Install

### Option 1 — Chrome Web Store (Recommended)

[**Add to Chrome →**](https://chromewebstore.google.com/detail/myprize-slot-emoji-picker/bbakpgfkeaimoipknjlddilhkafgfflm)

One click, auto-updates, done.

### Option 2 — Load Unpacked (Manual)

1. [Download the zip](https://github.com/CrandellWS/MyEmojis-Picker/releases/latest/download/myprize-emoji-picker.zip) and unzip it
2. Go to `chrome://extensions` and enable **Developer mode**
3. Click **Load unpacked** and select the unzipped folder
4. To update: replace folder contents and hit the refresh icon on the extension card

## Usage

1. Go to [myprize.us/invite/GWASlots](https://myprize.us/invite/GWASlots)
2. Open chat — look for the **🎰** button in the input
3. Click it to open the picker
4. Quick picks auto-close · grid stays open for multi-select
5. `Escape` or click outside to dismiss

## Privacy & Safety

| | |
|---|---|
| 🚫 No servers | Never makes any network requests |
| 🗄️ Local only | Recents saved in your browser's `localStorage` |
| 👤 No account | No login, no email, nothing |
| 📖 Open source | Every line of code is right here to read |
| 🎯 Single-site | Only activates on `myprize.us` |
| 🧹 Tiny | Under 8KB total, zero dependencies |

## Development

```bash
# Edit content.js, then reload at chrome://extensions
# Rebuild zip for store upload:
python3 create_zip.py
```

## Version History

### v2.0.0
- Tabs: Recent · Win · Loss · Seasonal · Feels · Printer
- Quick picks strip (top 5, auto-closes on select)
- 5×5 recent grid default view with smart preload
- Keyword search across all categories
- Grid stays open for multi-select
- Fixed textarea selector for updated MyPrize DOM

### v1.0.0
- Initial release — basic emoji popup

---

Made with love for the [gwa_slots](https://kick.com/gwa_slots) community. Not on MyPrize yet? [Join free here](https://myprize.us/invite/GWASlots).
