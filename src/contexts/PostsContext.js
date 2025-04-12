import React, {
    createContext,
    useState,
    useContext,
    useCallback,
    useEffect,
} from 'react';
import { getBackendUrl } from '../utils/utils';

const PostsContext = createContext();

export const usePosts = () => useContext(PostsContext);

export const PostsProvider = ({ children }) => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const backendUrl = getBackendUrl();

    // Fetch all posts (for admin)
    const fetchAllPosts = useCallback(async () => {
        try {
            setLoading(true);
            const response = await fetch(`${backendUrl}/blog/posts`);
            if (!response.ok) {
                throw new Error('Failed to fetch posts');
            }
            const data = await response.json();
            setPosts(data);
            return data;
        } catch (error) {
            console.error('Error fetching all blog posts:', error);
            setError(error.message);
            return [];
        } finally {
            setLoading(false);
        }
    }, [backendUrl]);

    // Create a new post
    const createPost = useCallback(
        async (postData) => {
            try {
                const response = await fetch(`${backendUrl}/blog/posts`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(postData),
                });
                if (!response.ok) {
                    throw new Error('Failed to create post');
                }
                const newPost = await response.json();
                setPosts((prevPosts) => [...prevPosts, newPost]);
                return newPost;
            } catch (error) {
                console.error('Error creating blog post:', error);
                setError(error.message);
                throw error;
            }
        },
        [backendUrl]
    );

    // Update an existing post
    const updatePost = useCallback(
        async (postId, postData) => {
            console.log('Updating post:', postData);
            try {
                const response = await fetch(
                    `${backendUrl}/blog/posts/${postId}`,
                    {
                        method: 'PUT',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(postData),
                    }
                );
                if (!response.ok) {
                    throw new Error('Failed to update post');
                }
                const updatedPost = await response.json();
                setPosts((prevPosts) =>
                    prevPosts.map((post) =>
                        post._id === postId ? updatedPost : post
                    )
                );
                return updatedPost;
            } catch (error) {
                console.error('Error updating blog post:', error);
                setError(error.message);
                throw error;
            }
        },
        [backendUrl]
    );

    // Delete a post
    const deletePost = useCallback(
        async (postId) => {
            try {
                const response = await fetch(
                    `${backendUrl}/blog/posts/${postId}`,
                    {
                        method: 'DELETE',
                    }
                );
                if (!response.ok) {
                    throw new Error('Failed to delete post');
                }
                setPosts((prevPosts) =>
                    prevPosts.filter((post) => post._id !== postId)
                );
                return true;
            } catch (error) {
                console.error('Error deleting blog post:', error);
                setError(error.message);
                throw error;
            }
        },
        [backendUrl]
    );

    // Get published posts only (for public blog view)
    const getPublishedPosts = useCallback(() => {
        return posts.filter((post) => post.published);
    }, [posts]);

    // Load posts on initial mount
    useEffect(() => {
        fetchAllPosts();
    }, [fetchAllPosts]);

    const value = {
        posts,
        loading,
        error,
        fetchAllPosts,
        createPost,
        updatePost,
        deletePost,
        getPublishedPosts,
    };

    return (
        <PostsContext.Provider value={value}>{children}</PostsContext.Provider>
    );
};
