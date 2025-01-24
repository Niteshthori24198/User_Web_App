import React from 'react';
import styles from "../styles/FeedPage/Postcard.module.css"

const PostCard = ({ post }) => {
    return (
        <div key={post._id} className={styles.postCard}>
            <img
                src={post.imageUrl}
                alt={post.caption}
            />
            <p>{post.caption}</p>
            <p><b>Owner</b> : {post.user.name}</p>
        </div>
    );
};

export default PostCard;
