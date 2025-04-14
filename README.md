# PESocial - Social Media Platform

PESocial is a full-stack social media application built using the MERN stack (MongoDB, Express, React, Node.js). This platform allows users to connect with friends, share posts, like and comment on content, and maintain their profiles.

## Features

- **User Authentication**: Secure sign-up and login functionality
- **Profile Management**: Create and edit personal profiles
- **Posts**: Create, view, like, comment on, and delete posts
- **Friend Management**: Add and remove friends
- **Real-time Search**: Powered by Algolia for fast content discovery
- **Dark/Light Mode**: Toggle between visual themes
- **Responsive Design**: Works seamlessly across devices
- **Notifications**: Get notified when users interact with your content
- **Comments System**: Engage in conversations through post comments
- **Image Uploads**: Share images with your posts
- **Friend Recommendations**: Discover new connections
- **Profile Customization**: Personalize your profile with images and details

## Tech Stack

### Frontend

- React.js
- Redux Toolkit for state management
- Material-UI for components and styling
- React Router for navigation
- Formik & Yup for form validation
- React Dropzone for file uploads
- Algolia InstantSearch for search functionality

### Backend

- Node.js & Express.js
- MongoDB with Mongoose ODM
- JWT for authentication
- Multer for file handling
- Algolia for search functionality
- bcrypt for password encryption

## Setup Instructions

### Prerequisites

- Node.js (v14 or higher)
- MongoDB database (local or Atlas)
- Algolia account for search functionality

### Backend Setup

1. Navigate to the server directory:

   ```
   cd server
   ```

2. Install dependencies:

   ```
   npm install
   ```

3. Create a `.env` file in the server directory with the following variables:

   ```
   MONGO_URL=your_mongodb_connection_string
   PORT=3001
   JWT_SECRET=your_secret_key
   ```

4. Start the server:
   ```
   npm start
   ```
   The server will run on port 3001 by default.

### Frontend Setup

1. Navigate to the client directory:

   ```
   cd client
   ```

2. Install dependencies:

   ```
   npm install
   ```

3. Start the development server:
   ```
   npm start
   ```
   The React app will run on port 3000 by default.

### Setting up Algolia Search

1. Create an account on [Algolia](https://www.algolia.com/)
2. Create an index named `posts_index`
3. Update the Algolia application ID and API keys in:
   - `server/updateAlgolia.js`
   - `client/src/algoliaConfig.js`
4. Run the Algolia update script to populate your search index:
   ```
   cd server
   node updateAlgolia.js
   ```

## Project Structure

### Server Structure

```
server/
│
├── controllers/         # Route controllers
│   ├── auth.js          # Authentication logic
│   ├── posts.js         # Post management
│   ├── users.js         # User operations
│   ├── notifications.js # Notification management
│   └── friendController.js # Friend management
│
├── data/                # Sample data for development
│
├── middleware/
│   └── auth.js          # JWT authentication middleware
│
├── models/              # MongoDB schema models
│   ├── Post.js
│   ├── User.js
│   └── Notification.js
│
├── public/              # Static files
│   └── assets/          # Uploaded images and media
│
├── routes/              # API routes
│   ├── auth.js
│   ├── posts.js
│   ├── users.js
│   ├── friends.js
│   └── notifications.js
│
├── .env                 # Environment variables
├── index.js             # Main server file
└── updateAlgolia.js     # Script to update Algolia search index
```

### Client Structure

```
client/
│
├── public/              # Static files
│
├── src/
│   ├── components/      # Reusable UI components
│   │   ├── FlexBetween.jsx
│   │   ├── Friend.jsx
│   │   ├── UserImage.jsx
│   │   └── WidgetWrapper.jsx
│   │
│   ├── scenes/          # Page components
│   │   ├── homePage/
│   │   ├── loginPage/
│   │   ├── navbar/
│   │   ├── profilePage/
│   │   └── widgets/     # Widget components
│   │
│   ├── state/           # Redux store setup
│   │   ├── index.js
│   │   └── api.js
│   │
│   ├── algoliaConfig.js # Algolia client configuration
│   ├── App.js           # Main React component
│   ├── index.css        # Global styles
│   ├── index.js         # Entry point
│   └── theme.js         # MUI theme configuration
│
├── .env                 # Environment variables
└── package.json         # Dependencies and scripts
```

## API Endpoints

### Authentication
- `POST /auth/register` - Register a new user
- `POST /auth/login` - Login a user

### Users
- `GET /users/:id` - Get user information
- `GET /users/:id/friends` - Get user's friends
- `PATCH /users/:id/:friendId` - Add or remove a friend
- `PUT /users/:userId` - Update user profile

### Posts
- `GET /posts` - Get all posts
- `GET /posts/:userId/posts` - Get posts by a specific user
- `POST /posts` - Create a new post
- `PATCH /posts/:id/like` - Like/unlike a post
- `POST /posts/:id/comment` - Comment on a post
- `DELETE /posts/:id/delete` - Delete a post

### Friends
- `POST /friends/add` - Add a friend
- `POST /friends/accept` - Accept a friend request

### Notifications
- `GET /notifications` - Get user notifications

## Authentication Flow

PESocial uses JWT (JSON Web Tokens) for authentication:

1. User registers or logs in through the frontend
2. Server validates credentials and returns a JWT token
3. Frontend stores the token in Redux state
4. Token is included in Authorization header for authenticated requests
5. Server middleware validates the token for protected routes

## Deployment

### Backend Deployment
1. Set up a MongoDB Atlas database
2. Deploy the Node.js server to services like Heroku, Render, or AWS
3. Set environment variables in your deployment platform

### Frontend Deployment
1. Build the React app: `npm run build`
2. Deploy the build folder to services like Netlify, Vercel, or Firebase Hosting
3. Configure environment variables for the production build

## Contributing

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add some amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details

## Acknowledgements

- [Create React App](https://create-react-app.dev/)
- [Material-UI](https://mui.com/)
- [Redux Toolkit](https://redux-toolkit.js.org/)
- [Express.js](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/)
- [Algolia](https://www.algolia.com/)
