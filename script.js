// List of all countries
const countries = [
  "Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Antigua and Barbuda", "Argentina", "Armenia", 
  "Australia", "Austria", "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", 
  "Belize", "Benin", "Bhutan", "Bolivia", "Bosnia and Herzegovina", "Botswana", "Brazil", "Brunei", "Bulgaria", 
  "Burkina Faso", "Burundi", "Côte d'Ivoire", "Cabo Verde", "Cambodia", "Cameroon", "Canada", "Central African Republic", 
  "Chad", "Chile", "China", "Colombia", "Comoros", "Congo (Congo-Brazzaville)", "Costa Rica", "Croatia", "Cuba", 
  "Cyprus", "Czechia (Czech Republic)", "Democratic Republic of the Congo", "Denmark", "Djibouti", "Dominica", 
  "Dominican Republic", "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia", "Eswatini", 
  "Ethiopia", "Fiji", "Finland", "France", "Gabon", "Gambia", "Georgia", "Germany", "Ghana", "Greece", "Grenada", 
  "Guatemala", "Guinea", "Guinea-Bissau", "Guyana", "Haiti", "Honduras", "Hungary", "Iceland", "India", "Indonesia", 
  "Iran", "Iraq", "Ireland", "Israel", "Italy", "Jamaica", "Japan", "Jordan", "Kazakhstan", "Kenya", "Kiribati", 
  "Kuwait", "Kyrgyzstan", "Laos", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania", 
  "Luxembourg", "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Marshall Islands", "Mauritania", 
  "Mauritius", "Mexico", "Micronesia", "Moldova", "Monaco", "Mongolia", "Montenegro", "Morocco", "Mozambique", 
  "Myanmar (formerly Burma)", "Namibia", "Nauru", "Nepal", "Netherlands", "New Zealand", "Nicaragua", "Niger", 
  "Nigeria", "North Korea", "North Macedonia", "Norway", "Oman", "Pakistan", "Palau", "Palestine State", "Panama", 
  "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Poland", "Portugal", "Qatar", "Romania", "Russia", "Rwanda", 
  "Saint Kitts and Nevis", "Saint Lucia", "Saint Vincent and the Grenadines", "Samoa", "San Marino", "Sao Tome and Principe", 
  "Saudi Arabia", "Senegal", "Serbia", "Seychelles", "Sierra Leone", "Singapore", "Slovakia", "Slovenia", "Solomon Islands", 
  "Somalia", "South Africa", "South Korea", "South Sudan", "Spain", "Sri Lanka", "Sudan", "Suriname", "Sweden", "Switzerland", 
  "Syria", "Tajikistan", "Tanzania", "Thailand", "Timor-Leste", "Togo", "Tonga", "Trinidad and Tobago", "Tunisia", "Turkey", 
  "Turkmenistan", "Tuvalu", "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", "United States of America", 
  "Uruguay", "Uzbekistan", "Vanuatu", "Vatican City", "Venezuela", "Vietnam", "Yemen", "Zambia", "Zimbabwe"
];

// Sample data for search results
const availableResults = [
  { id: 1, title: 'A', wikipedia: 'https://example.com', wikidata: 'https://example.com' },
  { id: 2, title: 'B', wikipedia: 'https://example.com', wikidata: 'https://example.com' },
];

const nonAvailableResults = [
  { id: 1, title: 'C', wikidata: 'https://example.com' },
  { id: 2, title: 'D', wikidata: 'https://example.com' },
];

// Sample data for extension tracker
const extensions = [
  { title: 'Lecturers', theme: 'Human', reason: 'We are having so...', username: 'Aminwa', status: 'Pending' },
];

// Function to populate the country dropdown
function populateCountries() {
  const countryDropdown = document.getElementById('country');
  countries.forEach(country => {
    const option = document.createElement('option');
    option.value = country;
    option.textContent = country;
    countryDropdown.appendChild(option);
  });
}

// Function to populate tables
function populateTable(tableId, data) {
  const tableBody = document.querySelector(`#${tableId} tbody`);
  tableBody.innerHTML = data.map(item => `
    <tr>
      <td>${item.id}</td>
      <td>${item.title}</td>
      ${item.wikipedia ? `<td><a href="${item.wikipedia}">Wikipedia</a></td>` : '<td>-</td>'}
      <td><a href="${item.wikidata}">Wikidata</a></td>
    </tr>
  `).join('');
}

// Function to handle tab switching
function changeTab(event) {
  event.preventDefault(); // Prevent default anchor behavior

  // Remove active class from all sections and tab links
  document.querySelectorAll('.tab-content').forEach(section => section.classList.remove('active'));
  document.querySelectorAll('.tab-link').forEach(tab => tab.classList.remove('active'));

  // Get the target tab's ID from the href attribute
  const targetTab = event.target.getAttribute('href').substring(1); 

  // Show the selected section and highlight the active tab
  document.getElementById(targetTab).classList.add('active');
  event.target.classList.add('active');
}

// Attach click event listeners to all tabs
document.querySelectorAll('.tab-link').forEach(tab => {
  tab.addEventListener('click', changeTab);
});

// Function to initialize the page and ensure the first tab is active
function initializePage() {
  // Set the first tab as active on load
  const firstTab = document.querySelector('.tab-link');
  const firstContent = document.querySelector('.tab-content');

  if (firstTab && firstContent) {
    firstTab.classList.add('active');
    firstContent.classList.add('active');
  }

  // Populate tables and countries
  populateTable('available-results', availableResults);
  populateTable('non-available-results', nonAvailableResults);
  populateCountries();

  // Populate tracker table
  const trackerTableBody = document.querySelector('#tracker-table tbody');
  trackerTableBody.innerHTML = extensions.map(ext => `
    <tr>
      <td>${ext.title}</td>
      <td>${ext.theme}</td>
      <td>${ext.reason}</td>
      <td>${ext.username}</td>
      <td>${ext.status}</td>
    </tr>
  `).join('');
}

// Ensure everything is set up when the page loads
document.addEventListener('DOMContentLoaded', initializePage);