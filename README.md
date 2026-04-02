# Paste Clear URL And Go

A browser extension for Chrome and Firefox that removes tracking and marketing parameters from URLs before opening them.

## What it does

URLs shared online often contain extra parameters used for tracking, for example:

```
https://example.com/product?id=123&utm_source=email&campaign=sale&ref=abc
```

The extension strips everything except the essential part:

```
https://example.com/product?id=123
```

## How to use

### From the clipboard

1. Copy a URL
2. Click the extension icon
3. The clean URL appears in the popup
4. Choose where to open it:
   - **Paste in current tab** — replaces the current page
   - **Paste in new tab** — opens in a new tab
   - **Paste in new incognito tab** — opens in a private window

### From a link on a page

Right-click any link on a page. The extension adds three options to the menu:

- **Open clean link in current tab**
- **Open clean link in new tab**
- **Open clean link in new incognito tab**

## Settings

Click **Settings** in the popup (or go to the extension options) to control one option:

| Setting | Description |
|---------|-------------|
| Keep `id` parameter | When enabled, the `id` query parameter is kept in the clean URL. Matching is case-insensitive (`id`, `Id`, `ID` are all treated the same). |

## Installation

### Chrome
1. Go to `chrome://extensions`
2. Enable **Developer mode**
3. Rename `manifest.chrome.json` to `manifest.json`
4. Click **Load unpacked** and select this folder

### Firefox
1. Go to `about:debugging`
2. Click **This Firefox** → **Load Temporary Add-on**
3. Rename `manifest.firefox.json` to `manifest.json`
4. Select any file in this folder
