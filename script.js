// Default values (you can set default values or leave them empty)
var spreadsheetId = '';
var sheetName = '';
var apiKey = '';

// Function to update variables based on user input
function updateVariables() {
  spreadsheetId = document.getElementById('sheetId').value;
  sheetName = document.getElementById('sheetName').value;
  apiKey = document.getElementById('apiKey').value;

  // Call function to load Google Sheets data with updated variables
  loadGoogleSheetsData();
}

// Function to load Google Sheets data
function loadGoogleSheetsData() {
  // Access variables from the HTML file
  var url = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${sheetName}?key=${apiKey}`;

  // Fetch data from Google Sheets
  fetch(url)
    .then(response => response.json())
    .then(data => {
      var values = data.values;

      // Create DataTable using DataTables plugin
      var table = $('#dataTable').DataTable({
        data: values,
        columns: values[0].map((header, index) => ({
          title: header,
          type: index === 0 ? 'num' : 'string' // Assuming the first column contains numeric data
        }))
      });
    })
    .catch(error => console.error('Error fetching data:', error));
}

// Call function to load Google Sheets data when the page loads
loadGoogleSheetsData();
