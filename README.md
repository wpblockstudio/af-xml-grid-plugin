# XML Grid Block Plugin

A WordPress block plugin that fetches items from an external XML feed (RSS/Atom) and displays them in a responsive, paginated grid using the [Block Editor](https://developer.wordpress.org/block-editor/) and the [Interactivity API](https://developer.wordpress.org/block-editor/reference-guides/interactivity-api/).

> **Note:** This is primarily a coding demo / portfolio project. It installs and works, but it’s not intended for production sites yet.

## Features

- **XML Feed Fetching** — Pulls items from configured feeds via a custom REST API endpoint.
- **Caching** — Responses cached with WordPress transients to reduce repeated requests.
- **Composable Layout**
    - `af/xml-grid`: parent grid block that fetches data and handles pagination.
    - `af/xml-grid-card`: container block for each feed item.
    - `af/xml-grid-content`: displays specific parts of each item (title, description, image, date, author, link).
- **Editor Controls** — Choose feed source, date format, image size, grid columns per breakpoint, pagination size, and more.
- **Responsive Styling** — CSS custom properties with breakpoint support from `theme.json`.
- **Progressive Loading** — Lazy‑fetches feed when visible, with “Load more” and reveal animations.

## Requirements

- WordPress 6.5+ (Interactivity API stable).
- PHP 8.0+
- Node.js 18+ (for development builds).

## Installation

### Option 1: Install the prebuilt release (recommended)
1. Download the latest release ZIP from the **Releases** page.
    - https://github.com/thedivlabs/af-xml-grid-plugin/releases
2. In your WordPress admin, go to **Plugins → Add New → Upload Plugin**.
3. Upload the ZIP and activate the plugin.

### Option 2: Build from source (for developers)
1. Clone this repository into any working directory:
   ```bash
   git clone https://github.com/thedivlabs/af-xml-grid-plugin.git
   cd af-xml-grid-plugin
   ```
2. Install dependencies and build:
   ```bash
   npm install
   npm run build
   ```
3. Copy the compiled plugin folder (`af-xml-grid-plugin/af-xml-grid`) into your WordPress `wp-content/plugins/` directory.
4. Activate **XML Grid** from the WordPress admin.

## Usage

1. Add an **XML Grid** block to a post or page.
2. Select a feed source from the block’s inspector controls (currently defaults are hard-coded).
3. Customize:
    - Grid columns per breakpoint
    - Row/column gaps
    - Date format
    - Image size
    - Load more button label
4. Insert **Grid Card** blocks as children, and inside them add **Grid Content** blocks to display feed item fields.

## Development

- Source code lives in `/src/blocks/`.
- Compiled assets are written to `/af-xml-grid/build/blocks/` and registered automatically.
- Run dev mode:
  ```bash
  npm run start
  ```

### Breakpoints

By default, the plugin includes hard-coded breakpoint definitions in PHP.  
These can be overridden in your theme’s `theme.json` file using the following structure (under `custom.breakpoint`):

```json
{
  "settings": {
    "custom": {
      "breakpoints": {
        "xs": {
          "label": "Extra Small",
          "size": 520
        },
        "sm": {
          "label": "Small",
          "size": 768
        },
        "md": {
          "label": "Medium",
          "size": 1040
        },
        "normal": {
          "label": "Normal",
          "size": 1240
        },
        "lg": {
          "label": "Large",
          "size": 1304
        }
      }
    }
  }
}
```

This allows themes to override the default breakpoints used by the grid system.
> **Note:** The `size` value must be an integer (e.g., `520`), not a string (e.g., `"520px"`).  
> This ensures WordPress and the plugin interpret breakpoints correctly when generating CSS.


## Roadmap

Planned improvements and future features include:

- **Theme.json integration** — Add support for defining feed sources through `theme.json` for easier configuration.
- **Grid dividers** — Option to display dividers between grid items for improved layout clarity.
- **Editor display improvements** — Better editor-side UI when no feed source or options are selected (e.g., helpful placeholder message).
- **Endpoint security** — Harden API endpoints and request validation for safer usage.
- **Sorting options** — Allow sorting feed items (e.g., by date, title, or custom criteria) in both editor and frontend.
- **Masonry JS** — Add support for masonry layouts.

## License

GPL-2.0-or-later.
