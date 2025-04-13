import React, { useState } from 'react';
import {
    TextField,
    Button,
    Box,
    Typography,
    Container,
    InputAdornment,
    IconButton,
    Grid2,
} from '@mui/material';
import { Visibility, VisibilityOff, ArrowBack } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { FrostedGlassContainer, HolographicText } from '../../components/shared/styles';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (!username.trim() || !password.trim()) {
            setError('Username and password are required');
            return;
        }

        try {
            const result = await login(username, password);
            if (result.success) {
                navigate('/admin/posts');
            } else {
                setError(result.message || 'Invalid credentials');
            }
        } catch (err) {
            setError('An error occurred. Please try again.');
            console.error(err);
        }
    };

    const handleTogglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <Container
            maxWidth="xs"
            sx={{
                height: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            <IconButton
                sx={{ position: 'absolute', top: 10, left: 10 }}
                onClick={() => navigate('/')}
            >
                <ArrowBack />
            </IconButton>
            <FrostedGlassContainer
                sx={{
                    padding: 4,
                    width: '100%',
                    maxWidth: 400,
                }}
            >
                <Box sx={{ mb: 4, textAlign: 'center' }}>
                    <HolographicText variant="h4" gutterBottom>
                        Portal Access
                    </HolographicText>
                    <Typography variant="subtitle1" color="text.secondary">
                        Enter your credentials
                    </Typography>
                </Box>

                <form onSubmit={handleSubmit}>
                    <Grid2 container spacing={3}>
                        <Grid2 size={{ xs: 12 }}>
                            <TextField
                                fullWidth
                                label="Username"
                                variant="outlined"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                autoFocus
                                required
                            />
                        </Grid2>
                        <Grid2 size={{ xs: 12 }}>
                            <TextField
                                fullWidth
                                label="Password"
                                variant="outlined"
                                type={showPassword ? 'text' : 'password'}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                onClick={
                                                    handleTogglePasswordVisibility
                                                }
                                                edge="end"
                                            >
                                                {showPassword ? (
                                                    <VisibilityOff />
                                                ) : (
                                                    <Visibility />
                                                )}
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                            />
                        </Grid2>

                        {error && (
                            <Grid2 size={{ xs: 12 }}>
                                <Typography color="error" variant="body2">
                                    {error}
                                </Typography>
                            </Grid2>
                        )}

                        <Grid2 size={{ xs: 12 }}>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                size="large"
                                sx={{ mt: 1 }}
                            >
                                Login
                            </Button>
                        </Grid2>
                    </Grid2>
                </form>
            </FrostedGlassContainer>
        </Container>
    );
};

export default Login;
