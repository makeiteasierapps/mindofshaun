import { useState } from 'react';
import { useTheme } from '@mui/material/styles';
import { Drawer, Typography } from '@mui/material';
import AiToolsPanel from '../ai-tools/AiToolsPanel';
import { SidebarContent } from '../styles/WritingEditor.styles';

const WritingAssistant = ({
    content,
    onPublishingPackageReady,
    sidebarOpen,
    selectedText,
    postId,
}) => {
    const theme = useTheme();
    const [tone, setTone] = useState('professional');

    return (
        <Drawer
            variant="persistent"
            anchor="right"
            open={sidebarOpen}
            sx={{
                width: 350,
                display: sidebarOpen ? 'block' : 'none',
                flexShrink: 0,
                '& .MuiDrawer-paper': {
                    width: 350,
                    boxSizing: 'border-box',
                    backgroundColor: 'rgb(0, 77, 77)',
                    color: theme.palette.text.primary,
                    zIndex: 1200, // Ensure it's below the toggle button
                },
            }}
        >
            <SidebarContent>
                <Typography variant="h6" gutterBottom color="text.primary">
                    Writing Assistant
                </Typography>

                <AiToolsPanel
                    content={content}
                    selectedText={selectedText}
                    tone={tone}
                    setTone={setTone}
                    postId={postId}
                    onPublishingPackageReady={onPublishingPackageReady}
                />
            </SidebarContent>
        </Drawer>
    );
};

export default WritingAssistant;
