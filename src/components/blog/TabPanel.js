import React from 'react';
import { Box } from '@mui/material';

/**
 * TabPanel component for displaying tab content
 */
const TabPanel = ({ children, value, index, ...other }) => {
    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`sidebar-tabpanel-${index}`}
            aria-labelledby={`sidebar-tab-${index}`}
            style={{ height: '100%', overflowY: 'auto' }}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 1, height: '100%' }}>{children}</Box>
            )}
        </div>
    );
};

export default TabPanel;
