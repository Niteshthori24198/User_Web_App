import React, { useState, useEffect } from 'react';
import { createPost, fetchPosts } from '../services/feed.service';
import PostCard from '../components/PostCard';
import styles from "../styles/FeedPage/Feed.module.css"

const FeedPage = () => {
    const [posts, setPosts] = useState([]);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [formData, setFormData] = useState({ caption: '', photo: null });
    const [message, setMessage] = useState("");

    useEffect(() => {
        const getPostsData = async () => {
            const [success, res] = await fetchPosts(page);
            if (success) {
                setPosts((prevPosts) => {
                    const newPosts = res.data.posts.filter(
                        (post) => !prevPosts.some((p) => p._id === post._id)
                    );
                    return [...prevPosts, ...newPosts];
                });

                if (page >= res.data.totalPages) setHasMore(false);
            } else {
                alert(res.data.msg);
                return
            }
        }
        getPostsData();

    }, [page]);

    const handleFileChange = (e) => {
        setFormData({ ...formData, photo: e.target.files[0] });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData();
        data.append('photo', formData.photo);
        data.append('caption', formData.caption);

        const [success, res] = await createPost(data);
        if (success) {
            setPosts((prevPosts) => [res.data.post, ...prevPosts]);
            setFormData((prev) => ({ ...prev, caption: '', photo: null }));
            setMessage(res.data.msg);
        } else {
            alert("Error while creating post");
            setMessage(res.data.msg);
            return;
        }

    };

    return (
        <div className={styles.feed}>
            <h2>Feed Section</h2>
            <form onSubmit={handleSubmit}>
                {message && <p className={styles.message}>{message}</p>}
                <input
                    type="text"
                    placeholder="Write a caption..."
                    value={formData.caption}
                    onChange={(e) => setFormData({ ...formData, caption: e.target.value })}
                    required
                />
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    required
                />
                <button type="submit">
                    Create Post
                </button>
            </form>

            <div className={styles.postCardContainer}>
                {
                    posts.length === 0 ? <h3 style={{ textAlign: 'center' }}>No posts yet</h3> :
                        posts.map((post) => (
                            <PostCard key={post._id} post={post} />
                        ))}
            </div>

            {posts.length !== 0 && <div className={styles.pagination}>
                <button onClick={() => setPage((prev) => prev + 1)} disabled={!hasMore}>Load more</button>
            </div>}
        </div>
    );
};

export default FeedPage;
