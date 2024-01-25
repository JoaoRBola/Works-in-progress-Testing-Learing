async function fetchData() {
  try {
    const response = await fetch('https://restcountries.com/v3.1/all');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

async function filterCountries() {
  const selectedRegion = document.getElementById('regionInput').value.toLowerCase();
  const selectedSubregion = document.getElementById('subregionInput').value.toLowerCase();

  // Check if either region or subregion is selected
  if (!selectedRegion && !selectedSubregion) {
    console.log('Please select a region or subregion before clicking "Procurar".');
    return;
  }

  const countries = await fetchData();

  const filteredCountries = countries.filter(country => {
    const countryRegion = country.region?.toLowerCase() || '';
    const countrySubregion = country.subregion?.toLowerCase() || '';

    // Check both region and subregion filters
    return (selectedRegion && countryRegion.includes(selectedRegion)) ||
           (selectedSubregion && countrySubregion.includes(selectedSubregion));
  });

  if (filteredCountries.length > 0) {
    displayCountriesInfo(filteredCountries);
  } else {
    console.log('No countries found for the selected region and subregion');
  }
}

function displayCountriesInfo(countries) {
  const countryList = document.getElementById('country-list');
  countryList.innerHTML = '';

  countries.forEach(country => {
    const countryItem = document.createElement('li');

    countryItem.classList.add('countryItem');

    countryItem.textContent = `Name: ${country.name.common},
    Region: ${country.region || 'N/A'},
    Subregion: ${country.subregion || 'N/A'}`;

    countryList.appendChild(countryItem);
  });
}