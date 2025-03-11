import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';
import { ChatProvider } from './contexts/ChatContext';
import { SnackbarProvider } from './contexts/SnackbarContext';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { theme } from './contexts/theme'; // Your theme file
import { GlobalStyles } from '@mui/material';

// Global styles to replace the basic CSS from your SCSS file
const globalStyles = {
  body: {
    margin: 0,
    fontFamily: theme.typography.fontFamily,
    WebkitFontSmoothing: 'antialiased',
    MozOsxFontSmoothing: 'grayscale',
  },
  code: {
    fontFamily: '"source-code-pro", "Menlo", "Monaco", "Consolas", "Courier New", monospace',
  },
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ThemeProvider theme={theme}>
    {/* CssBaseline provides a consistent baseline to build upon (similar to normalize.css) */}
    <CssBaseline />
    {/* Add global styles to replace what was in index.scss */}
    <GlobalStyles styles={globalStyles} />
    <SnackbarProvider>
      <ChatProvider>
        <Router>
          <App />
        </Router>
      </ChatProvider>
    </SnackbarProvider>
  </ThemeProvider>
);