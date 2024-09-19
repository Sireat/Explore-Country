// Event listeners
document.getElementById('search-button').addEventListener('click', searchCountry);
document.getElementById('region-filter').addEventListener('change', filterByRegion);
document.getElementById('country-input').addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
        searchCountry();
    }
});

let currentRegion = ''; // Track the currently selected region

// Display all countries on initial load
window.onload = displayAllCountries;

function displayAllCountries() {
    fetch('https://restcountries.com/v3.1/all')
        .then(response => {
            if (!response.ok) throw new Error('Failed to fetch countries.');
            return response.json();
        })
        .then(data => {
            displayCountries(data);
        })
        .catch(error => {
            document.getElementById('message').textContent = error.message;
        });
}

function searchCountry() {
    const input = document.getElementById('country-input').value.trim().toLowerCase();
    const message = document.getElementById('message');
    const display = document.getElementById('country-display');

    // Clear previous data
    message.textContent = '';
    display.innerHTML = '';

    if (input === '') {
        message.textContent = 'Please enter a country name.';
        return;
    }

    // Determine the API URL based on the selected region and input
    let url = '';
    if (currentRegion) {
        // Fetch countries by region and then filter them by name
        url = `https://restcountries.com/v3.1/region/${currentRegion}`;
    } else {
        // Fetch countries by name
        url = `https://restcountries.com/v3.1/name/${input}`;
    }

    fetch(url)
        .then(response => {
            if (!response.ok) throw new Error('Country not found.');
            return response.json();
        })
        .then(data => {
            // If searching within a region, filter by input name
            const filteredData = currentRegion
                ? data.filter(country => country.name.common.toLowerCase().includes(input))
                : data;

            if (filteredData.length > 0) {
                displayCountries(filteredData);
            } else {
                message.textContent = 'No results found.';
            }
        })
        .catch(error => {
            message.textContent = error.message;
        });
}

function displayCountries(countries) {
    const display = document.getElementById('country-display');
    countries.forEach(country => {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
            <img src="${country.flags.svg}" alt="Flag of ${country.name.common}">
            <h2>${country.name.common}</h2>
            <p><strong>Capital:</strong> ${country.capital ? country.capital[0] : 'N/A'}</p>
            <p><strong>Population:</strong> ${country.population.toLocaleString()}</p>
            <p><strong>Languages:</strong> ${Object.values(country.languages || {}).join(', ')}</p>
        `;
        display.appendChild(card);
    });
}

function filterByRegion() {
    currentRegion = document.getElementById('region-filter').value;
    const message = document.getElementById('message');
    const display = document.getElementById('country-display');

    // Clear previous data
    message.textContent = '';
    display.innerHTML = '';

    if (!currentRegion) {
        message.textContent = 'Please select a region to filter.';
        displayAllCountries(); // Show all countries if no region is selected
        return;
    }

    fetch(`https://restcountries.com/v3.1/region/${currentRegion}`)
        .then(response => {
            if (!response.ok) throw new Error('No countries found in this region.');
            return response.json();
        })
        .then(data => {
            if (data.length > 0) {
                displayCountries(data);
            } else {
                message.textContent = 'No countries found for the selected region.';
            }
        })
        .catch(error => {
            message.textContent = error.message;
        });
}
