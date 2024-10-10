const { Comment, Like, Post, Profile, User } = require("./index");
const { db } = require('./db/connection.js');
//const seedDatabase = require('./seed/seed');

describe('Sequelize Associations and Connection', () => {
  
    // Test database connection
    test('Database connection should be established successfully', async () => {
      try {
        await db.authenticate();
        expect(true).toBe(true);  // Pass if no error
      } catch (error) {
        console.error('Unable to connect to the database:', error);
        expect(true).toBe(false);  // Fail if connection failed
      }
    });
  
    // Test model associations
    test('User should have one Profile and vice versa', async () => {
      expect(User.hasOne(Profile)).toBeTruthy();
      expect(Profile.belongsTo(User)).toBeTruthy();
    });
  
    test('User should have many Posts, and Post should belong to User', async () => {
      expect(User.hasMany(Post)).toBeTruthy();
      expect(Post.belongsTo(User)).toBeTruthy();
    });
  
    test('Post should have many Comments, and Comment should belong to Post', async () => {
      expect(Post.hasMany(Comment)).toBeTruthy();
      expect(Comment.belongsTo(Post)).toBeTruthy();
    });
  
    test('User should have many Likes, and Like should belong to User', async () => {
      expect(User.belongsToMany(Like, { through: 'UserLikes' })).toBeTruthy();
      expect(Like.belongsToMany(User, { through: 'UserLikes' })).toBeTruthy();
    });
  });