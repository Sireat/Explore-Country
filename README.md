# Country Search Application

## Purpose
This application allows users to search for and view information about different countries. It fetches data from the REST Countries API to display details such as the country name, flag, capital, population, and languages.

## Design
The application is built with HTML, CSS, and JavaScript. The UI consists of a search input, button, and display area. The JavaScript handles fetching data from the API and displaying it in a formatted card layout. CSS ensures the application is responsive and visually appealing.

## Usage
1. Enter the name of the country you want to search for in the input field.
2. Click the "Search" button.
3. View the results displayed in the card below the search bar.

## Automation
A shell script (`automate.sh`) is included to automate tasks such as linting and deploying the application.
Run it with:
```bash
bash scripts/automate.sh
