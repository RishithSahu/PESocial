// server/updateAlgolia.js
import mongoose from 'mongoose';
import algoliasearch from 'algoliasearch';
import dotenv from 'dotenv';
import Post from './models/Post.js'; // Adjust the path as necessary

dotenv.config();

// MongoDB connection
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1);
  }
};

// Algolia configuration
const client = algoliasearch('X4HHNR74UG', '78940dc30269d838cfd1384ab7c27892');
const index = client.initIndex('posts_index');

// Function to update Algolia with MongoDB data
const updateAlgolia = async () => {
  try {
    await connectDB();

    const posts = await Post.find();
    const algoliaObjects = posts.map(post => ({
      objectID: post._id.toString(),
      userId: post.userId,
      firstName: post.firstName,
      lastName: post.lastName,
      location: post.location,
      description: post.description,
      userPicturePath: post.userPicturePath,
      picturePath: post.picturePath,
      likes: post.likes,
      comments: post.comments,
    }));

    await index.saveObjects(algoliaObjects);
    console.log('Algolia index updated with MongoDB data');
  } catch (error) {
    console.error('Error updating Algolia:', error);
  } finally {
    mongoose.connection.close();
  }
};

updateAlgolia();