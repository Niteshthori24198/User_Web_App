
const cloudinary = require("../config/cloudinary");
const { PostModel } = require("../models/feed.posts.model");


const GetFeedPosts = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = 3;
        const skip = (page - 1) * limit;

        const totalPosts = await PostModel.countDocuments();

        const posts = await PostModel.find()
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit)
            .populate("user", "name");

        return res.status(200).send({
            success: true,
            posts,
            currentPage: page,
            totalPages: Math.ceil(totalPosts / limit),
        });
    } catch (error) {
        console.error("Error fetching posts:", error);
        return res.status(500).send({ success: false, msg: "Error fetching posts" });
    }
};

const CreateNewFeedPost = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).send({ success: false, msg: "Photo is required" });
        }

        // Upload image to Cloudinary
        cloudinary.uploader.upload_stream(
            { folder: "feed_posts" },
            async (error, result) => {
                if (error) return res.status(500).send({ success: false, msg: "Upload failed" });

                const newPost = new PostModel({ imageUrl: result.secure_url, caption: req.body.caption, user: req.body.UserID });
                await newPost.save();
                return res.send({
                    success: true,
                    msg: "Post created successfully.",
                    post: newPost
                });
            }
        ).end(req.file.buffer);

    } catch (error) {
        res.status(500).send({ msg: "Error creating post " + error.message });
    }
}


module.exports = { CreateNewFeedPost, GetFeedPosts };
