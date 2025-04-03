# Theater Web App

## Overview
This project is a web application that allows users to select a theater from a list and view information about ongoing movies, including showtimes and images. The application features a custom search input field to filter movies based on user criteria.

## Project Structure
```
theater-web-app
├── public
│   ├── index.html          # Main HTML document
│   ├── styles
│   │   └── main.css       # CSS styles for the application
│   └── images             # Directory for image files (movie posters, theater images)
├── src
│   ├── app.js             # Entry point of the JavaScript application
│   ├── components
│   │   ├── TheaterList.js  # Component to display a list of theaters
│   │   ├── MovieDetails.js  # Component to show details of the selected movie
│   │   └── SearchBar.js     # Component for the custom search input field
│   └── data
│       └── theaters.json    # JSON data for theaters
├── package.json            # npm configuration file
└── README.md               # Project documentation
```

## Setup Instructions
1. Clone the repository:
   ```
   git clone <repository-url>
   ```
2. Navigate to the project directory:
   ```
   cd theater-web-app
   ```
3. Install the dependencies:
   ```
   npm install
   ```
4. Start the application:
   ```
   npm start
   ```

## Usage
- Open the application in your web browser.
- Select a theater from the list to view ongoing movies.
- Use the search bar to filter movies based on your criteria.

## Contributing
Contributions are welcome! Please submit a pull request or open an issue for any suggestions or improvements.

## License
This project is licensed under the MIT License.