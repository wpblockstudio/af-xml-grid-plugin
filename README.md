# AF XML Grid

A WordPress block plugin that fetches items from an external XML feed (RSS/Atom) and displays them in a responsive, paginated grid using the [Block Editor](https://developer.wordpress.org/block-editor/) and the [Interactivity API](https://developer.wordpress.org/block-editor/reference-guides/interactivity-api/).

## Features

- **XML Feed Fetching**: Pulls items from configured feeds via a custom REST API endpoint.  
- **Caching**: Responses cached with WordPress transients to reduce repeated requests.  
- **Composable Layout**:  
  - `af/xml-grid`: parent grid block that fetches data and handles pagination.  
  - `af/xml-grid-card`: container block for each feed item.  
  - `af/xml-grid-content`: displays specific parts of each item (title, description, content, image, date, category, author, link).  
- **Editor Controls**: Choose feed source, date format, image size, grid columns per breakpoint, pagination size, and more.  
- **Responsive Styling**: CSS custom properties with breakpoint support from `theme.json`.  
- **Progressive Loading**: Lazy-fetches feed when visible, with “Load more” button and reveal animations.  

## Requirements

- WordPress 6.5+ (Interactivity API stable release).  
- PHP 8.0+  
- Node.js 18+ for development builds.  

## Installation

1. Clone this repository into your plugins directory:  
   ```bash
   git clone https://github.com/thedivlabs/af-xml-grid-plugin.git
   ```
2. Run the build:  
   ```bash
   npm install
   npm run build
   ```
3. Activate **AF XML Grid** in WordPress → Plugins.

## Usage

1. Add an **XML Grid** block to a post or page.  
2. Select a feed source from the block’s inspector controls (currently defaults are hard-coded in PHP).  
3. Customize:  
   - Grid columns per breakpoint.  
   - Row/column gaps.  
   - Date format.  
   - Image size.  
   - Load more button label.  
4. Insert **Grid Card** blocks as children, and inside them add **Grid Content** blocks to display feed item fields.  

## Development

- Source code lives in `/dev/src/blocks/`.  
- Compiled assets are written to `/dev/af-xml-grid/blocks/` and registered automatically.  
- Run dev mode:  
  ```bash
  npm run start
  ```

## License

GPL-2.0-or-later. See [LICENSE](./LICENSE) for details.
