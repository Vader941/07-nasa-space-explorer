Welcome to the **NASA Space Explorer App**, a dynamic, interactive gallery that showcases real-time Astronomy Pictures of the Day (APOD) using data from NASA’s public API. This project was developed as part of an assignment in the Global Career Acceleration program—but with a personal creative spin and several enhancements beyond the base requirements.

## 🌌 Project Overview

NASA publishes a new "Astronomy Picture of the Day" daily, featuring incredible images from across the universe. This app:

- Fetches APOD entries from the NASA API based on a user-selected date range.
- Displays a gallery of images (or embedded videos) with titles and dates.
- Allows users to click on each image to open a modal for a detailed view, including NASA's explanation.
- Integrates real NASA branding for a polished and authentic feel.

## 🔧 Features

- 📆 **Date Range Selection** – Choose a start and end date to explore multiple APOD entries.
- 🖼️ **Image & Video Handling** – Automatically detects and renders either images or video links depending on content type.
- 🔍 **Modal Viewer** – View full-sized content with detailed descriptions in a clean, accessible modal.
- 🌠 **Random Space Fact** – A fun "Did You Know?" space fact appears at the top of the page each time it loads.
- 🎯 **Hover Effects** – Interactive image zoom-in on hover for a smooth, modern UI.
- 🔄 **Loading Message** – A message appears while data is being fetched for better user feedback.

## 🎨 NASA Branding

The app uses official NASA color schemes and style references from the [NASA Web Design System](https://nasa.github.io/nasawds-site/components/colors/) to reflect their iconic look and feel.

## 🚀 Technologies Used

- HTML, CSS, JavaScript
- NASA APOD API
- DOM Manipulation & Event Handling
- GitHub Codespaces
- AI-assisted development with GitHub Copilot and ChatGPT

## 📈 Stretch Goals (Completed)

- ✅ Handle APOD video entries
- ✅ Display a random space fact on page load
- ✅ Apply hover zoom effect to gallery images

## 📸 Preview

_🔗 [Live Project Link](Comming soon)_  


![NASA Space Explorer Gallery Screenshot](screenshot.png)

## 🧪 How to Use

1. Clone the repo or open in GitHub Codespaces.
2. Obtain a [NASA API Key](https://api.nasa.gov/) (or use the `DEMO_KEY` with limited requests).
3. Enter a date range and click **Get Space Images**.
4. Explore space from your browser!

## 📁 Project Structure

```bash
├── index.html          # Main HTML file
├── style.css           # CSS styling and NASA branding
├── script.js           # Main JavaScript for API fetching and interactivity
├── dateRange.js        # Provided logic to enforce valid APOD date ranges
├── img/                # NASA logo and other assets
└── README.md           # This file
```

## 💬 Reflections

This project gave me real-world experience working with a third-party API and taught me how to handle asynchronous data, dynamically update the DOM, and work through issues like error handling and formatting API results. Integrating AI tools was a major support in streamlining development and debugging.

## 📣 Connect with Me

If you're curious about the code, my learning process, or want to collaborate, reach out!  
📬 GitHub: [@Vader941](https://github.com/Vader941)

---

> _“Exploration is in our nature. We began as wanderers, and we are wanderers still.” – Carl Sagan_