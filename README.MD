# WSG-o-matic

A lightweight interactive website for exploring the [Web Sustainability Guidelines (WSGs)](https://w3c.github.io/sustainableweb-wsg/). This project helps users discover and learn about sustainability guidelines for the web.

## Features

- **Random Guideline Generator:** Instantly view a random WSG guideline.
- **Topic-Based Browsing:** Filter and explore guidelines by topic.
- **Interactive UI:** Responsive, accessible design with dynamic content.
- **Sustainable Tooling And Reporting (STAR):** View related STAR tests for each guideline.
- **Client-side Only:** 'No backend required'; all data is loaded via JSON and ideally cached too.

## Getting Started

1. **Clone this repository:**
   ```sh
   git clone https://github.com/airbr/wsg-o-matic.git
   cd wsg-o-matic
   ```

2. **Install dependencies:**  
   No dependencies required. All code is static HTML, CSS, and JS.

3. **Run locally:**  
   Open `index.html` in your browser, or use a local server:
   ```sh
   # Python 3.x
   python3 -m http.server
   # Then visit http://localhost:8000
   ```

## Project Structure

```
/
├── index.html
├── css/
│   └── styles.css
├── js/
│   └── app.js
├── js/guidelines.json
├── js/star.json
└── ...
```

## Customization

- **Style changes:**  
  Modify `css/styles.css` for custom themes or layouts.
- **JS logic:**  
  Update `js/app.js` for new features or UI changes.

## Credits

- [Web Sustainability Guidelines (WSGs)](https://w3c.github.io/sustainableweb-wsg/) by the W3C Community Group and now the Sustainable Web Interest Group.
- Project by [Morgan Murrah](https://github.com/airbr), with all credit to the contributors for the guidelines themselves.

## License

MIT License. See [LICENSE](LICENSE) for details.

---
*This project is for educational and demonstration purposes. All guideline content credit to the W3C and contributors.*
