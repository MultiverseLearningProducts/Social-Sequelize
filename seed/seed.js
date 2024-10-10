const fs = require('fs');
const path = require('path');
const db = require('../db/connection');
const User = require('../models/User');
const Profile = require('../models/Profile');
const Post = require('../models/Post');
const Comment = require('../models/Comment');
const Like = require('../models/Like');

// Function to load JSON files
const loadJSON = (fileName) => {
  const filePath = path.join(__dirname, `${fileName}.json`);
  return JSON.parse(fs.readFileSync(filePath, 'utf8'));
};

async function seedDatabase() {
  try {
    // Sync all models (create tables if they don't exist)
    await db.sync({ force: true });

    // Load and insert data for each model
    const users = loadJSON('users');       // users.json
    const profiles = loadJSON('profiles'); // profiles.json
    const posts = loadJSON('posts');       // posts.json
    const comments = loadJSON('comments'); // comments.json
    const likes = loadJSON('likes');       // likes.json

    // Insert data into the database
    await User.bulkCreate(users);
    await Profile.bulkCreate(profiles);
    await Post.bulkCreate(posts);
    await Comment.bulkCreate(comments);
    await Like.bulkCreate(likes);

    console.log('Database seeded successfully!');
  } catch (error) {
    console.error('Failed to seed database:', error);
  }
}

// Run the seed function
seedDatabase();
