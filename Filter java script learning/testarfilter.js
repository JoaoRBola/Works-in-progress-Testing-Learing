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
  const searchInput = document.getElementById('searchInput').value.toLowerCase();
  const searchSubRegionInput = document.getElementById('searchSubRegionInput').value.toLowerCase();
  
  const countries = await fetchData();

  const filteredCountries = countries.filter(country => {
    const countryName = country.name.common.toLowerCase();
    const countryRegion = country.region.toLowerCase();
    const countrySubRegion = country.subregion?.toLowerCase();
    const keywords = country.altSpellings.map(spelling => spelling.toLowerCase());

    return countryRegion.includes(searchInput) && countrySubRegion.includes(searchSubRegionInput);  
  });

  displayCountries(filteredCountries);
}

function displayCountries(countries) {
  const countryList = document.getElementById('country-list');
  countryList.innerHTML = '';

  countries.forEach(country => {
    const countryItem = document.createElement('li');
    countryItem.classList.add('countryItem');
    countryItem.textContent = country.name.common;

    countryList.appendChild(countryItem);
  });
}

filterCountries();