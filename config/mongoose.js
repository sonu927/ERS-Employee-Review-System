const mongoose = require('mongoose');

const uri ='mongodb+srv://sonu16122001:qelJMXqUqXDupLNs@cluster0.wsdpwct.mongodb.net/ERSdb?retryWrites=true&w=majority'

const db = mongoose.connect(uri,{ useNewUrlParser: true, useUnifiedTopology: true })
.then(() => {
    console.log('Connected to MongoDB Atlas');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB Atlas:', error.message);
  });

  module.exports = db