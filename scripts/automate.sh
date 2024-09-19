# Country Search Application

## Purpose
This application allows users to search for and view information about different countries and filter them by region. It fetches data from the REST Countries API to display details such as the country name, flag, capital, population, and languages.

## Design
The application is built with HTML, CSS, and JavaScript. The UI consists of a search input, button, display area, and a region filter dropdown. The JavaScript handles fetching data from the API, validating inputs, and displaying the data in a formatted card layout. CSS ensures the application is responsive and visually appealing.

## Usage
1. Enter the name of the country you want to search for in the input field.
2. Click the "Search" button to fetch and display country data in a card format.
3. Use the region filter dropdown to filter countries by continent/region.

## Error Handling
- Displays a message if the country is not found.
- Handles empty input searches and invalid region selections gracefully.

## Automation
A shell script (`automate.sh`) is included to automate tasks such as linting and deploying the application.
Run it with:
```bash
bash scripts/automate.sh
