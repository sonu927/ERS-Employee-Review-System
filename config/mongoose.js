const mongoose = require('mongoose');

const uri ='mongodb+srv://sonu16122001:qelJMXqUqXDupLNs@cluster0.wsdpwct.mongodb.net/ERSdb?retryWrites=true&w=majority'

mongoose.connect(uri,{ useNewUrlParser: true, useUnifiedTopology: true });

// Get the default connection
const db = mongoose.connection;

// Check for MongoDB connection errors
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

db.once('open',function(){console.log("Sucessfully connected to database")});

module.exports = db;

  module.exports = db