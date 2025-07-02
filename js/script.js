// Find our date picker inputs on the page
const startInput = document.getElementById('startDate');
const endInput = document.getElementById('endDate');

// Find space facts elements
const spaceFactText = document.getElementById('space-fact-text');
const newFactBtn = document.getElementById('new-fact-btn');

// Call the setupDateInputs function from dateRange.js
// This sets up the date pickers to:
// - Default to a range of 9 days (from 9 days ago to today)
// - Restrict dates to NASA's image archive (starting from 1995)
setupDateInputs(startInput, endInput);

// Initialize with a random space fact when page loads
displayRandomSpaceFact();

// Add event listener to "New Fact" button
newFactBtn.addEventListener('click', displayRandomSpaceFact);

// Find the button and gallery elements
const button = document.querySelector('button');
const gallery = document.getElementById('gallery');

// NASA APOD API endpoint (no API key needed for demo usage)
const NASA_API_URL = 'https://api.nasa.gov/planetary/apod';

// Function to extract YouTube video ID from URL
function getYouTubeVideoId(url) {
  const regex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
  const match = url.match(regex);
  return match ? match[1] : null;
}

// Function to check if URL is a YouTube video
function isYouTubeVideo(url) {
  return url && (url.includes('youtube.com') || url.includes('youtu.be'));
}

// Function to get YouTube thumbnail URL
function getYouTubeThumbnail(videoId) {
  return `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
}

// Find modal elements
const modal = document.getElementById('modal');
const modalImage = document.getElementById('modal-image');
const modalVideo = document.getElementById('modal-video');
const modalTitle = document.getElementById('modal-title');
const modalDate = document.getElementById('modal-date');
const modalExplanation = document.getElementById('modal-explanation');
const modalClose = document.querySelector('.modal-close');

// Modal event listeners
modalClose.addEventListener('click', closeModal);

// Close modal when clicking outside the content
modal.addEventListener('click', (event) => {
  if (event.target === modal) {
    closeModal();
  }
});

// Close modal with Escape key
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && modal.style.display === 'block') {
    closeModal();
  }
});

// Add event listener to the "Get Space Images" button
button.addEventListener('click', async () => {
  // Get the selected date range
  const startDate = startInput.value;
  const endDate = endInput.value;
  
  // Make sure both dates are selected
  if (!startDate || !endDate) {
    alert('Please select both start and end dates');
    return;
  }
  
  // Show loading message
  gallery.innerHTML = `
    <div class="placeholder">
      <div class="placeholder-icon">🚀</div>
      <p>Loading space images...</p>
    </div>
  `;
  
  try {
    // Fetch data from NASA APOD API
    await fetchAndDisplayImages(startDate, endDate);
  } catch (error) {
    // Show error message if something goes wrong
    gallery.innerHTML = `
      <div class="placeholder">
        <div class="placeholder-icon">❌</div>
        <p>Error loading images. Please try again.</p>
      </div>
    `;
    console.error('Error fetching images:', error);
  }
});

// Function to fetch images from NASA APOD API and display them
async function fetchAndDisplayImages(startDate, endDate) {
  // Build the API URL with date range parameters
  const apiUrl = `${NASA_API_URL}?start_date=${startDate}&end_date=${endDate}&api_key=NmWjGMiaAhEAi1G29Dmm4ZaPfhGLzk0ofyc3YLcz`;
  
  console.log('Fetching from URL:', apiUrl);
  
  // Fetch data from the API
  const response = await fetch(apiUrl);
  
  // Check if the request was successful
  if (!response.ok) {
    throw new Error(`API request failed: ${response.status}`);
  }
  
  // Convert response to JSON
  const data = await response.json();
  
  // Log the raw data so you can see what's available
  console.log('NASA APOD API Response:', data);
  console.log('Number of items received:', data.length);
  
  // Display the images in the gallery
  displayGallery(data);
}

// Function to create and display the gallery items
function displayGallery(imageData) {
  // Clear the gallery
  gallery.innerHTML = '';
  
  // Create a gallery item for each image
  imageData.forEach(item => {
    // Log each individual item to see its structure
    console.log('Individual item:', item);
    
    // Create a container for this gallery item
    const galleryItem = document.createElement('div');
    galleryItem.className = 'gallery-item';
    
    // Build the HTML content for this item
    // Handle both images and videos (especially YouTube videos)
    let mediaContent = '';
    if (item.media_type === 'image') {
      mediaContent = `<img src="${item.url}" alt="${item.title}" class="gallery-image">`;
    } else if (item.media_type === 'video') {
      // Check if it's a YouTube video for better handling
      if (isYouTubeVideo(item.url)) {
        const videoId = getYouTubeVideoId(item.url);
        if (videoId) {
          // Use YouTube thumbnail as preview
          const thumbnailUrl = getYouTubeThumbnail(videoId);
          mediaContent = `
            <div class="video-preview">
              <img src="${thumbnailUrl}" alt="${item.title}" class="gallery-image video-thumbnail">
              <div class="video-overlay">
                <div class="play-button">
                  <svg width="60" height="60" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="11" fill="rgba(255,255,255,0.9)"/>
                    <polygon points="9,8 9,16 17,12" fill="#FF0000"/>
                  </svg>
                </div>
                <span class="video-label">YouTube Video</span>
              </div>
            </div>
          `;
        } else {
          // Fallback for YouTube videos without extractable ID
          mediaContent = `
            <div class="video-placeholder">
              <div class="video-icon">🎬</div>
              <p><strong>YouTube Video</strong></p>
              <a href="${item.url}" target="_blank" class="video-link">Watch on YouTube</a>
            </div>
          `;
        }
      } else {
        // Handle other video types
        mediaContent = `
          <div class="video-placeholder">
            <div class="video-icon">🎥</div>
            <p><strong>Video Content</strong></p>
            <a href="${item.url}" target="_blank" class="video-link">View Video</a>
          </div>
        `;
      }
    }
    
    // Set the content of the gallery item
    galleryItem.innerHTML = `
      ${mediaContent}
      <div class="gallery-info">
        <h3 class="gallery-title">${item.title}</h3>
        <p class="gallery-date">${item.date}</p>
      </div>
    `;
    
    // Add click event listener to open modal
    galleryItem.addEventListener('click', () => {
      openModal(item);
    });
    
    // Add the item to the gallery
    gallery.appendChild(galleryItem);
  });
  
  // Log how many items were displayed
  console.log(`Displayed ${imageData.length} items in the gallery`);
  
  // Display a new random space fact when new images are loaded
  displayRandomSpaceFact();
}

// Function to open the modal with enhanced video support
function openModal(imageData) {
  // Set the title and date
  modalTitle.textContent = imageData.title;
  modalDate.textContent = imageData.date;
  modalExplanation.textContent = imageData.explanation || 'No description available.';
  
  // Handle different media types with enhanced video support
  if (imageData.media_type === 'image') {
    // Show image, hide video container
    modalImage.style.display = 'block';
    modalVideo.style.display = 'none';
    
    // Use high-resolution image if available, otherwise use regular URL
    const imageUrl = imageData.hdurl || imageData.url;
    modalImage.src = imageUrl;
    modalImage.alt = imageData.title;
  } else if (imageData.media_type === 'video') {
    // Hide image, show video container
    modalImage.style.display = 'none';
    modalVideo.style.display = 'block';
    
    // Enhanced video handling
    if (isYouTubeVideo(imageData.url)) {
      const videoId = getYouTubeVideoId(imageData.url);
      if (videoId) {
        // Embed YouTube video directly in modal
        modalVideo.innerHTML = `
          <div class="youtube-embed">
            <iframe 
              width="100%" 
              height="400" 
              src="https://www.youtube.com/embed/${videoId}?autoplay=0&rel=0&modestbranding=1" 
              title="${imageData.title}" 
              frameborder="0" 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
              allowfullscreen>
            </iframe>
            <div class="video-links">
              <a href="${imageData.url}" target="_blank" class="external-link">
                🔗 Open in YouTube
              </a>
            </div>
          </div>
        `;
      } else {
        // Fallback for problematic YouTube URLs
        modalVideo.innerHTML = `
          <div class="video-fallback">
            <div class="video-icon-large">🎬</div>
            <h3>YouTube Video</h3>
            <p>This content is available on YouTube</p>
            <a href="${imageData.url}" target="_blank" class="video-button">
              Watch on YouTube
            </a>
          </div>
        `;
      }
    } else {
      // Handle other video types or non-YouTube videos
      modalVideo.innerHTML = `
        <div class="video-fallback">
          <div class="video-icon-large">🎥</div>
          <h3>Video Content</h3>
          <p>Click the link below to view this video content</p>
          <a href="${imageData.url}" target="_blank" class="video-button">
            View Video
          </a>
        </div>
      `;
    }
  }
  
  // Show the modal
  modal.style.display = 'block';
  
  // Prevent body scrolling when modal is open
  document.body.style.overflow = 'hidden';
}

// Function to close the modal
function closeModal() {
  modal.style.display = 'none';
  document.body.style.overflow = 'auto';
  
  // Clear the image source to prevent flash of previous image
  modalImage.src = '';
}

// Function to display a random space fact
function displayRandomSpaceFact() {
  // Get a random fact from the spaceFacts array (defined in spaceFacts.js)
  const randomIndex = Math.floor(Math.random() * spaceFacts.length);
  const randomFact = spaceFacts[randomIndex];
  
  // Update the fact text on the page
  spaceFactText.textContent = randomFact;
  
  // Add a subtle animation effect
  spaceFactText.style.opacity = '0.5';
  setTimeout(() => {
    spaceFactText.style.opacity = '1';
  }, 150);
}
