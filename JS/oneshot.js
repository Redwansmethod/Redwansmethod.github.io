// Back Button
function goBack() {
    window.history.back();
}
        // Function to toggle box content visibility
        function toggleBoxContent(boxNumber) {
            var boxContent = document.getElementById('box' + boxNumber + '-content');
            var icon = document.querySelector('.box:nth-of-type(' + boxNumber + ') .icon');
            if (boxContent.style.display === 'none' || boxContent.style.display === '') {
                boxContent.style.display = 'block';
                icon.classList.add('expanded');
            } else {
                boxContent.style.display = 'none';
                icon.classList.remove('expanded');
            }
        }

        // Function to check if a link is a video or folder
        function isVideoLink(link) {
            // Regular expression to match Google Drive file ID
            const videoRegex = /drive\.google\.com\/file\/d\/([a-zA-Z0-9-_]+)/;
            return videoRegex.test(link);
        }

        // Function to handle link redirection
        function handleLinkRedirect(link) {
            if (isVideoLink(link)) {
                // If it's a video link, open class.html in a new tab with the video URL
                window.open(`/video-player.html?video=${encodeURIComponent(link)}`, '_blank');
            } else {
                // If it's a folder link, open it in Google Drive
                window.open(link, '_blank');
            }
        }

        // Fetch data from the Google Sheet
        async function fetchSheetData() {
            const url = `https://sheets.googleapis.com/v4/spreadsheets/${oneshotSheetID}/values/${sheetName}?key=${API_KEY}`; // Replace with your API key
            
            try {
                const response = await fetch(url);
                const data = await response.json();
                updatePageContent(data.values);
            } catch (error) {
                console.error('Error fetching sheet data:', error);
            }
        }
        
        // Update the page content based on the fetched data
        function updatePageContent(data) {
            const container = document.getElementById('box-container');

            // Group data by chapters
            const chapters = data.reduce((acc, row) => {
                const [chapter, className, classLink] = row;
                if (!acc[chapter]) {
                    acc[chapter] = [];
                }
                acc[chapter].push({ className, classLink });
                return acc;
            }, {});

            // Create HTML elements for each chapter and class
            Object.keys(chapters).forEach((chapter, index) => {
                const chapterBox = document.createElement('div');
                chapterBox.className = 'box';
                chapterBox.onclick = () => toggleBoxContent(index + 1);
                
                const boxTitle = document.createElement('div');
                boxTitle.className = 'box-title';
                boxTitle.textContent = chapter;
                
                const boxContent = document.createElement('div');
                boxContent.className = 'box-content';
                boxContent.id = `box${index + 1}-content`;

                const classList = document.createElement('ol');
                chapters[chapter].forEach(({ className, classLink }) => {
                    const listItem = document.createElement('li');
                    const link = document.createElement('a');
                    link.href = '#'; // Set to '#' for now, will be updated by handleLinkRedirect
                    link.onclick = (e) => {
                        e.preventDefault(); // Prevent default link behavior
                        handleLinkRedirect(classLink); // Handle redirection
                    };
                    link.textContent = className;
                    listItem.appendChild(link);
                    classList.appendChild(listItem);
                });

                boxContent.appendChild(classList);
                chapterBox.appendChild(boxTitle);
                chapterBox.appendChild(boxContent);

                const icon = document.createElement('i');
                icon.className = 'icon';
                chapterBox.appendChild(icon);

                container.appendChild(chapterBox);
            });
        }

// Initialize the page with sheet data
document.addEventListener('DOMContentLoaded', async function() {
    try {
        // Load preloader content
        const preloaderResponse = await fetch('/common/preloader.html');
        const preloaderHTML = await preloaderResponse.text();
        document.getElementById('preloader').innerHTML = preloaderHTML;

        // Simulate content load (replace with actual content fetching logic)
        await fetchSheetData(); // Fetch and load Google Sheet data

        // Hide preloader and show main content
        document.getElementById('preloader').style.opacity = '0';
        setTimeout(() => {
            document.getElementById('preloader').style.display = 'none';
            document.getElementById('content').style.display = 'block';
        }, 1500); // Match this delay with the transition duration
    } catch (error) {
        console.error('Error loading content:', error);
    }
});
