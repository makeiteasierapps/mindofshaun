import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';
import { SnackbarProvider } from './contexts/SnackbarContext';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline, GlobalStyles } from '@mui/material';
import { theme } from './utils/theme';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <ThemeProvider theme={theme}>
        <CssBaseline />
        <GlobalStyles
            styles={{
                '*': {
                    scrollbarWidth: 'thin',
                    scrollbarColor: 'rgba(0, 178, 181, 0.5) transparent',
                },
                '*::-webkit-scrollbar': {
                    width: '8px',
                    height: '8px',
                    backgroundColor: 'transparent',
                },
                '*::-webkit-scrollbar-thumb': {
                    backgroundColor: 'rgba(0, 178, 181, 0.3)',
                    borderRadius: '4px',
                    transition: 'opacity 0.3s',
                },
                '*::-webkit-scrollbar-thumb:hover': {
                    backgroundColor: 'rgba(0, 178, 181, 0.5)',
                },
                html: {
                    scrollbarGutter: 'stable both-edges',
                },
                body: {
                    margin: 0,
                    overflowY: 'auto',
                    overflowX: 'hidden',
                },
            }}
        />
        <SnackbarProvider>
            <Router>
                <App />
            </Router>
        </SnackbarProvider>
    </ThemeProvider>
);
