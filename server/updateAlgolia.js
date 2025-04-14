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
const client = algoliasearch('KEY', 'KEY');
const index = client.initIndex('posts_index');

// Function to update Algolia with MongoDB data
const updateAlgolia = async () => {
  try {
    await connectDB();

    // Clear all previous entries in the Algolia index
    await index.clearObjects();
    console.log('Cleared all previous entries in Algolia index');

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
