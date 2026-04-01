const mongoose = require('mongoose');

async function connectDatabase() {
  const connectionUri = process.env.MONGODB_URI;

  if (!connectionUri) {
    console.warn('MONGODB_URI is not set. Server will start without a database connection.');
    return false;
  }

  mongoose.set('strictQuery', true);

  try {
    await mongoose.connect(connectionUri, {
      serverSelectionTimeoutMS: 5000,
    });

    console.log('MongoDB connected.');
    return true;
  } catch (error) {
    console.warn(`MongoDB connection skipped: ${error.message}`);
    return false;
  }
}

module.exports = {
  connectDatabase,
};
