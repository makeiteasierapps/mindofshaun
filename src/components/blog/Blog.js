import React, { useState } from 'react';
import {
    Box,
    Typography,
    CardContent,
    Chip,
    CircularProgress,
    Button,
} from '@mui/material';
import BlogAdmin from './BlogAdmin';
import { useAuth } from '../../contexts/AuthContext';
import { usePosts } from '../../contexts/PostsContext';
import {
    GlassmorphicCard,
    BlogContainer,
    BlogHeader,
    SecretLoginButton,
    TagsContainer,
} from '../styles/Blog.styles';
import { formatDate } from '../../utils/blogUtils';

const Blog = () => {
    const [showLoginModal, setShowLoginModal] = useState(false);
    const [password, setPassword] = useState('');
    const { isAuthenticated, login, logout } = useAuth();
    const { loading, getPublishedPosts } = usePosts();

    // Get only published posts
    const publishedPosts = getPublishedPosts();

    const handleLogin = () => {
        if (login(password)) {
            setShowLoginModal(false);
            setPassword('');
        } else {
            alert('Invalid password');
        }
    };

    if (isAuthenticated) {
        return <BlogAdmin onLogout={logout} />;
    }

    return (
        <BlogContainer id="blog">
            <BlogHeader>
                <Typography variant="h2" component="h2" gutterBottom>
                    Blog
                </Typography>
                <SecretLoginButton onClick={() => setShowLoginModal(true)} />
            </BlogHeader>

            {showLoginModal && (
                <GlassmorphicCard
                    sx={{
                        padding: 3,
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        zIndex: 10,
                        width: 300,
                    }}
                >
                    <Typography variant="h6" gutterBottom>
                        Admin Login
                    </Typography>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                        style={{
                            width: '100%',
                            padding: '10px',
                            marginBottom: '10px',
                        }}
                    />
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                        }}
                    >
                        <Button
                            variant="contained"
                            onClick={() => setShowLoginModal(false)}
                        >
                            Cancel
                        </Button>
                        <Button variant="contained" onClick={handleLogin}>
                            Login
                        </Button>
                    </Box>
                </GlassmorphicCard>
            )}

            {loading ? (
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        padding: 4,
                    }}
                >
                    <CircularProgress />
                </Box>
            ) : publishedPosts.length === 0 ? (
                <Typography variant="body1">
                    No blog posts yet. Check back soon!
                </Typography>
            ) : (
                publishedPosts.map((post) => (
                    <GlassmorphicCard key={post._id}>
                        <CardContent>
                            <Typography
                                variant="h5"
                                component="h3"
                                gutterBottom
                            >
                                {post.title}
                            </Typography>
                            <Typography
                                variant="caption"
                                color="text.secondary"
                                gutterBottom
                            >
                                {post.author && `By ${post.author} • `}
                                {formatDate(post.created_at)}
                            </Typography>

                            <TagsContainer>
                                {post.tags.map((tag) => (
                                    <Chip key={tag} label={tag} size="small" />
                                ))}
                            </TagsContainer>

                            {post.summary && (
                                <Typography variant="body2" paragraph>
                                    {post.summary}
                                </Typography>
                            )}

                            <Typography variant="body1" paragraph>
                                {post.content}
                            </Typography>
                        </CardContent>
                    </GlassmorphicCard>
                ))
            )}
        </BlogContainer>
    );
};

export default Blog;
