import React from 'react';
import { Typography } from '@mui/material';
import PostItem from './PostItem';

const PostList = ({ posts, onEdit, onDelete }) => {
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
