// Replace with your own API key
const apiKey = 'AIzaSyBooe-Fdm9nJRv1buEzPA8ayyRPPXtPQbs';
const spreadsheetId = '1XUQ9dOEQsplX8_FCgJKqcFT-h0KDtu6gPO_EbhSJ4Uw';

function loadBuyNowLink() {
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${range}?key=${apiKey}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            const buyNowLink = data.values[0][0];
            document.getElementById('buyNowLink').href = buyNowLink;
        })
        .catch(error => console.error('Error fetching data:', error));
}

// Call the function to load the link
loadBuyNowLink();