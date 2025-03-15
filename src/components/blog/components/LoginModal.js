import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { GlassmorphicCard } from '../styles/Blog.styles';

const LoginModal = ({ show, password, setPassword, onLogin, onCancel }) => {
    if (!show) return null;

    return (
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
                <Button variant="contained" onClick={onCancel}>
                    Cancel
                </Button>
                <Button variant="contained" onClick={onLogin}>
                    Login
                </Button>
            </Box>
        </GlassmorphicCard>
    );
};

export default LoginModal;
