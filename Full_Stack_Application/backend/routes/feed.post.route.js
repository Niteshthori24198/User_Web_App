
const express = require('express');
const multer = require('multer');
const postRouter = express.Router();
const { CreateNewFeedPost, GetFeedPosts } = require('../controllers/feed.post.controller');
const { AuthMiddleware } = require('../middleware/user.authMiddleware');


// configure multer storage
const storage = multer.memoryStorage();
const upload = multer({
    storage,
    fileFilter: (req, file, cb) => {
        if (!file.mimetype.startsWith("image/")) {
            return cb(new Error("Only images are allowed"), false);
        }
        cb(null, true);
    },
});


postRouter.get('/get', AuthMiddleware, GetFeedPosts)

postRouter.post("/create", upload.single("photo"), AuthMiddleware, CreateNewFeedPost);


module.exports = { postRouter };