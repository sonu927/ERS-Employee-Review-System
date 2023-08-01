const mongoose = require('mongoose');


const reviewSchema = new mongoose.Schema({
    from_user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    to_user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    feedback:{
        type: String,
        default: ''
    }
},{
    timestamps: true
});

const Review = mongoose.model('Review',reviewSchema);

module.exports = Review;