import { useState } from 'react';
import { usePosts } from '../blog/context/PostsContext';

export const useBlogHandlers = () => {
    const [editingPost, setEditingPost] = useState(null);
    const [postToDelete, setPostToDelete] = useState(null);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

    const {
        posts,
        loading: postsLoading,
        createPost,
        updatePost,
        deletePost,
    } = usePosts();

    const handleEditPost = (post) => {
        setEditingPost(post);
    };

    const handleDeletePostClick = (post) => {
        setPostToDelete(post);
        setDeleteDialogOpen(true);
    };

    const handleDeletePostConfirm = async () => {
        if (postToDelete) {
            try {
                await deletePost(postToDelete._id);
                setDeleteDialogOpen(false);
                setPostToDelete(null);
            } catch (error) {
                console.error('Error deleting post:', error);
            }
        }
    };

    const handlePostFormSubmit = async (formData) => {
        try {
            if (editingPost) {
                await updatePost(editingPost._id, formData);
            } else {
                await createPost(formData);
            }
            setEditingPost(null);
        } catch (error) {
            console.error('Error saving post:', error);
        }
    };

    const handleCancelPostEdit = () => {
        setEditingPost(null);
    };

    return {
        posts,
        postsLoading,
        editingPost,
        setEditingPost,
        postToDelete,
        deleteDialogOpen,
        handleEditPost,
        handleDeletePostClick,
        handleDeletePostConfirm,
        handlePostFormSubmit,
        handleCancelPostEdit,
        setDeleteDialogOpen,
    };
};
