# TweetX - Social Media Platform

TweetX is a social media platform that allows users to share short 2-sentence text posts, follow other users, and view a personalized feed based on the posts from the users they follow.

## Table of Contents
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Design Choices](#design-choices)
- [Contributing](#contributing)
- [License](#license)

## Features
- User Sign Up/Login
- Post 2-sentence text tweets
- View own list of posts
- See a list of other users
- Follow other users
- Personalized feed showing posts from followed users

## Technologies Used
- Frontend: React
- Backend: Firebase (Realtime Database, Authentication)
- State Management: React Context API
- Styling: Tailwind CSS
- Other: Firebase Hosting, React Router

## Installation
1. Clone the repository: `git clone https://github.com/inishantxchandel/tweetx.git`
2. Navigate to the project directory: `cd tweetx`
3. Install dependencies: `npm install`
4. Set up Firebase:
   - Create a Firebase project: [Firebase Console](https://console.firebase.google.com/)
   - Add your Firebase configuration in `src/config/firebase.js`
5. Run the application: `npm start`

## Usage
- Visit [TweetX](https://your-tweetx-app.firebaseapp.com) and sign up or log in.
- Post your 2-sentence tweets.
- Explore other users and follow them.
- View your own list of posts and personalized feed.

## Project Structure
- `src/components`: React components
- `src/config`: Configuration files
- `src/pages`: React page components
- `src/services`: Firebase services
- `src/styles`: Stylesheets
- `public`: Static assets

## Design Choices
- **React for Frontend**: Chosen for its component-based structure, making it easy to manage and scale.
- **Firebase for Backend**: Utilized for real-time database functionality, authentication, and hosting.
- **Tailwind CSS for Styling**: Allowed for rapid development and easy customization.
- **React Context API for State Management**: Simplified state management within the React application.

## Contributing
Feel free to contribute to the project by opening issues or creating pull requests. Follow the [CONTRIBUTING.md](CONTRIBUTING.md) guidelines.

## License
This project is licensed under the [MIT License](LICENSE).
