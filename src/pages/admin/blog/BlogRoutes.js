import { useEffect, useState } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { Box, Typography, Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { usePosts } from '../../../contexts/PostsContext';
import PostList from './core/PostList';
import { useParams } from 'react-router-dom';
import WritingEditor from './editor/WritingEditor';
import PublishingEditor from './editor/PublishingEditor';

const DEFAULT_AUTHOR = 'Shaun Offenbacher';

// Writing mode component
const WritePost = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { posts, updatePost } = usePosts();
    const post = id ? posts.find((p) => p._id === id) : null;
    const [content, setContent] = useState(post?.content || '');
    const [saveStatus, setSaveStatus] = useState('');

    useEffect(() => {
        if (post) {
            setContent(post.content || '');
        }
    }, [post]);

    const handlePublishingPackageReady = (packageData) => {
        navigate(
            id ? `/admin/posts/publish/${id}` : '/admin/posts/publish/new',
            {
                state: { content, publishingPackage: packageData },
            }
        );
    };

    const handleCancel = () => {
        navigate('/admin/posts');
    };

    const handleSave = async () => {
        try {
            setSaveStatus('saving');
            await updatePost(id, { content });
            setSaveStatus('saved');

            // Reset the saved status after 2 seconds
            setTimeout(() => {
                setSaveStatus('');
            }, 2000);
        } catch (error) {
            console.error('Error saving post:', error);
            setSaveStatus('error');
        }
    };

    return (
        <Box width="100%">
            <Typography variant="h5" component="h3" gutterBottom>
                {id ? 'Edit Post' : 'Create New Post'}
            </Typography>
            <WritingEditor
                content={content}
                setContent={setContent}
                onPublishingPackageReady={handlePublishingPackageReady}
                postId={id}
            />
            <Box
                gap={2}
                sx={{
                    mt: 3,
                    display: 'flex',
                    justifyContent: 'flex-end',
                    alignItems: 'center',
                }}
            >
                {saveStatus === 'saving' && (
                    <Typography variant="body2" color="text.secondary">
                        Saving...
                    </Typography>
                )}
                {saveStatus === 'saved' && (
                    <Typography variant="body2" color="success.main">
                        Saved successfully
                    </Typography>
                )}
                {saveStatus === 'error' && (
                    <Typography variant="body2" color="error">
                        Error saving post
                    </Typography>
                )}
                <Button variant="contained" onClick={handleSave}>
                    Save
                </Button>
                <Button variant="contained" onClick={handleCancel}>
                    Cancel
                </Button>
            </Box>
        </Box>
    );
};

// Publishing mode component
const PublishPost = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const { posts, createPost, updatePost } = usePosts();

    const content = location.state?.content || '';
    const publishingPackage = location.state?.publishingPackage || null;

    const post = id && id !== 'new' ? posts.find((p) => p._id === id) : null;

    const postData = {
        title: post?.title || '',
        summary: post?.summary || '',
        author: DEFAULT_AUTHOR,
        tags: post?.tags || [],
        published: post?.published || false,
        content: content || post?.content || '',
    };

    const handleSubmit = async (formData) => {
        try {
            if (id && id !== 'new') {
                // Update existing post
                await updatePost(id, {
                    ...formData,
                    content: content || post?.content || '',
                });
            } else {
                // Create new post if somehow we got here without creating it first
                await createPost({
                    ...formData,
                    content: content || '',
                });
            }
            navigate('/admin/posts');
        } catch (error) {
            console.error('Error saving post:', error);
        }
    };

    const handleBackToWriting = () => {
        navigate(
            id && id !== 'new'
                ? `/admin/posts/write/${id}`
                : '/admin/posts/write'
        );
    };

    return (
        <Box width="100%">
            <Typography variant="h5" component="h3" gutterBottom>
                {id && id !== 'new' ? 'Edit Post' : 'Create New Post'}
            </Typography>
            <PublishingEditor
                content={content}
                publishingPackage={publishingPackage}
                initialData={postData}
                onSubmit={handleSubmit}
                onBack={handleBackToWriting}
            />
        </Box>
    );
};

// EditPost component - replaced with direct routes to WritePost

const BlogRoutes = ({ handleDeleteClick }) => {
    const navigate = useNavigate();
    const { posts, createPost } = usePosts();

    const handleDeletePostClick = (post) => {
        handleDeleteClick({ type: 'post', id: post._id });
    };

    const handleCreateNewPost = async () => {
        try {
            // Create a blank post in the database
            const newPost = await createPost({
                title: 'Untitled Post',
                summary: '',
                author: DEFAULT_AUTHOR,
                tags: [],
                published: false,
                content: '',
            });

            // Navigate to edit page with the new post ID
            navigate(`/admin/posts/write/${newPost._id}`);
        } catch (error) {
            console.error('Error creating new post:', error);
        }
    };

    const handleEditPost = (post) => {
        navigate(`/admin/posts/write/${post._id}`);
    };

    return (
        <Routes>
            <Route
                path="/"
                element={
                    <>
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                mb: 3,
                            }}
                        >
                            <Typography variant="h6">
                                Manage Blog Posts
                            </Typography>
                            <Button
                                variant="contained"
                                color="primary"
                                startIcon={<AddIcon />}
                                onClick={handleCreateNewPost}
                            >
                                New Post
                            </Button>
                        </Box>
                        <PostList
                            onEdit={handleEditPost}
                            onDelete={handleDeletePostClick}
                        />
                    </>
                }
            />
            <Route path="/write" element={<WritePost />} />
            <Route path="/write/:id" element={<WritePost />} />
            <Route path="/publish/new" element={<PublishPost />} />
            <Route path="/publish/:id" element={<PublishPost />} />
        </Routes>
    );
};

export default BlogRoutes;
