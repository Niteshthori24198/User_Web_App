const mongoose = require('mongoose');
const { UserModel } = require('./user.model');

const postSchema = mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: UserModel, required: true },
    caption: { type: String, required: true },
    imageUrl: { type: String, required: true }
},
    {
        timestamps: true
    }
);

const PostModel = mongoose.model('post', postSchema);

module.exports = {
    PostModel
}