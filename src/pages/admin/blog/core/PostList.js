import React from 'react';
import { Typography, Box, CircularProgress } from '@mui/material';
import PostItem from './PostItem';
import { usePosts } from '../../../../contexts/PostsContext';

const PostList = ({ onEdit, onDelete }) => {
    const { posts, loading } = usePosts();

    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
                <CircularProgress />
            </Box>
        );
    }

    if (posts.length === 0) {
        return (
            <Typography>No posts yet. Create your first post above!</Typography>
        );
    }

    return (
        <>
            {posts.map((post) => (
                <PostItem
                    key={post._id}
                    post={post}
                    onEdit={() => onEdit(post)}
                    onDelete={() => onDelete(post)}
                />
            ))}
        </>
    );
};

export default PostList;
