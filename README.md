# MyPrize Slot Emoji Picker - Chrome Extension

A Chrome extension that adds a slot-themed emoji picker to the MyPrize chat input for faster, more expressive reactions during live slot sessions.

## Features

- **Slot-Themed Emoji Collection**: 60+ curated emojis perfect for slot streaming
- **One-Click Access**: Click the 🎰 button in the chat input to open the picker
- **Categories Include**:
  - 🔥 Hype & Wins (🔥💯🎉🥳🚀💥⚡🎰💎💵💰🤑)
  - 😱 Reactions (😱🤯🤩😍🙌🫡👑🏆)
  - 😂 Humor (😂🤣😭💀🤡😵‍💫)
  - 🙏 Hope & Luck (🙏🤞😬😔😮‍🗨😓)
  - 😡 Tilt & Salt (😡🤬😤🧂👎🤦😒)
  - 👀 Misc (👀😳🫣👏🧍🍻🍺❤️🤝🔄✌️)
  - 🎲 Gambling (🎲🪙💸🧨🔔⭐7️⃣🍒🍀)

## Installation

### From Chrome Web Store (Recommended - Coming Soon)
1. Visit the Chrome Web Store
2. Search for "MyPrize Slot Emoji Picker"
3. Click "Add to Chrome"

### Local Development Installation
1. Download or clone this repository
2. Open Chrome and navigate to `chrome://extensions/`
3. Enable "Developer mode" (toggle in top right)
4. Click "Load unpacked"
5. Select the `myprize-emoji-picker` folder
6. Navigate to https://myprize.us and enjoy!

## Usage

1. Go to https://myprize.us
2. Open the chat
3. Look for the 🎰 button on the left side of the chat input
4. Click it to open the emoji picker
5. Click any emoji to insert it into your message
6. Click outside or on the 🎰 button again to close the picker

## Files Included

### Extension Files (Required for Publishing)
- `manifest.json` - Extension configuration
- `content.js` - Main functionality script
- `icon16.png` - 16×16 icon
- `icon48.png` - 48×48 icon
- `icon128.png` - 128×128 icon

### Documentation & Build Files
- `README.md` - This file
- `STORE_LISTING.txt` - Chrome Web Store listing details
- `generate_icons.py` - Icon generator script (not included in ZIP)

## Publishing to Chrome Web Store

### Step 1: Create ZIP Package

Run this command from the extension directory:

```bash
cd /home/aiuser/projects/myprize-emoji-picker
zip myprize-emoji-picker.zip manifest.json content.js icon16.png icon48.png icon128.png
```

**IMPORTANT**: Only include the 5 files listed above. Do NOT include:
- README.md
- STORE_LISTING.txt
- generate_icons.py
- .git folder
- Any other files

### Step 2: Prepare Screenshots

Take 1-3 screenshots showing the extension in action:
- Go to https://myprize.us
- Open the chat
- Show the 🎰 button
- Click it to show the emoji popup
- Save as PNG (1280×800 recommended)

### Step 3: Submit to Chrome Web Store

1. Go to: https://chrome.google.com/webstore/devconsole
2. Click "Add new item"
3. Upload `myprize-emoji-picker.zip`
4. Fill in store listing (see `STORE_LISTING.txt` for copy-paste ready content)
5. Upload screenshots
6. Submit for review

**Expected Approval Time**: 10-60 minutes for simple extensions like this

See `STORE_LISTING.txt` for complete publishing details including:
- Short description (132 chars)
- Long description
- Privacy policy
- Category recommendations

## Privacy

This extension:
- ✅ Does NOT collect any data
- ✅ Does NOT send data to external servers
- ✅ Only runs on https://myprize.us
- ✅ Requires zero permissions
- ✅ All functionality is local

## Technical Details

- **Manifest Version**: 3 (latest Chrome standard)
- **Permissions**: None required
- **Host Permissions**: `https://myprize.us/*` only
- **Content Script**: Injected at `document_idle`
- **File Size**: ~3KB total (extremely lightweight)

## Development

### Rebuilding Icons

If you need to regenerate the icons:

```bash
python3 generate_icons.py
```

Requires: `pip3 install Pillow`

### Testing Locally

1. Make changes to `content.js`
2. Go to `chrome://extensions/`
3. Click the refresh icon on the extension card
4. Reload https://myprize.us
5. Test your changes

## Support

For issues or feature requests, please contact the developer.

## Version History

### v1.0.0 (2025-12-30)
- Initial release
- 60+ slot-themed emojis
- Clean, simple interface
- Zero permissions required
- Fast and lightweight

## Credits

Created for the MyPrize slot streaming community.

Built with ❤️ for slot streamers who love to express themselves in chat.

---

**Ready to publish?** See `STORE_LISTING.txt` for complete publishing instructions.
