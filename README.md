# Katarzyna Tondaś – Data Analyst Portfolio

**Live site:** https://katarzynatondas.github.io/

Personal portfolio showcasing data analysis and BI projects: Power BI and Tableau reports, Python analyses and SQL queries. The site is bilingual – English by default, Polish via the EN/PL switch in the header.

## Pages

| File | Content |
|---|---|
| `index.html` | Home page: introduction, technologies, selected projects, contact |
| `Omnie.html` | About me: skills, tools and certificates |
| `SalesAnalysis.html` | Power BI report – sales and customer analysis |
| `CoffeShop.html` | Power BI report – coffee shop sales analysis |
| `RaportTableau.html` | One-page Tableau overview dashboard |
| `AnalizaPython.html` | Customer churn analysis in Python (Jupyter Notebook) |
| `AnalizaSQL.html` | COVID-19 data analysis in SQL |
| `Portfolio.html`, `contact.html` | Redirects to sections of the home page |

## Tech stack

Plain HTML, CSS and JavaScript – no frameworks and no build step.

- `assets/css/portfolio.css` – styles (light and dark theme, responsive layout)
- `assets/js/portfolio.js` – language switch, mobile menu, project filtering, image lightbox
- `assets/js/translations.js` – Polish translations (the English text lives directly in the HTML)
- [Inter](https://fonts.google.com/specimen/Inter) font (Google Fonts) and [Font Awesome 5](https://fontawesome.com/) icons (CDN)

## Running locally

Open `index.html` in a browser, or serve the folder with any simple static server, e.g. the *Live Server* extension for VS Code.

## Translations

Every element with a `data-i18n="key"` attribute has a Polish counterpart under the same key in `assets/js/translations.js`. The `data-i18n-attr="attribute:key"` attribute works the same way for attributes such as `alt` or `aria-label`. The chosen language is remembered in the browser and can be forced with `?lang=pl` or `?lang=en` in the URL.

## Copyright

Texts, report screenshots and certificates: © 2026 Katarzyna Tondaś.
