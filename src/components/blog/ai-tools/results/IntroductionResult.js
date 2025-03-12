import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Typography, Box, Tabs, Tab } from '@mui/material';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import InsightsIcon from '@mui/icons-material/Insights';
import CompareArrowsIcon from '@mui/icons-material/CompareArrows';
import { ContentPaper, TabIcon } from './styles';

const IntroductionResult = ({ data }) => {
    const [tabValue, setTabValue] = useState(0);

    if (!data) return null;

    const { story_hook, question_hook, statistic_hook, contrast_hook } = data;

    const handleTabChange = (event, newValue) => {
        setTabValue(newValue);
    };

    const getTabContent = () => {
        switch (tabValue) {
            case 0:
                return story_hook;
            case 1:
                return question_hook;
            case 2:
                return statistic_hook;
            case 3:
                return contrast_hook;
            default:
                return '';
        }
    };

    return (
        <Box>
            <Tabs
                value={tabValue}
                onChange={handleTabChange}
                variant="scrollable"
                scrollButtons="auto"
                sx={{ mb: 2 }}
            >
                <Tab
                    label={
                        <TabIcon>
                            <AutoStoriesIcon color="primary" />
                            <Typography variant="body2">Story</Typography>
                        </TabIcon>
                    }
                />
                <Tab
                    label={
                        <TabIcon>
                            <HelpOutlineIcon color="primary" />
                            <Typography variant="body2">Question</Typography>
                        </TabIcon>
                    }
                />
                <Tab
                    label={
                        <TabIcon>
                            <InsightsIcon color="primary" />
                            <Typography variant="body2">Statistic</Typography>
                        </TabIcon>
                    }
                />
                <Tab
                    label={
                        <TabIcon>
                            <CompareArrowsIcon color="primary" />
                            <Typography variant="body2">Contrast</Typography>
                        </TabIcon>
                    }
                />
            </Tabs>

            <ContentPaper elevation={0}>
                <Typography
                    variant="subtitle2"
                    color="primary.main"
                    gutterBottom
                >
                    {tabValue === 0
                        ? 'Story Hook'
                        : tabValue === 1
                        ? 'Question Hook'
                        : tabValue === 2
                        ? 'Statistic Hook'
                        : 'Contrast Hook'}
                </Typography>
                <Typography variant="body2" sx={{ whiteSpace: 'pre-line' }}>
                    {getTabContent()}
                </Typography>
            </ContentPaper>
        </Box>
    );
};

IntroductionResult.propTypes = {
    data: PropTypes.shape({
        story_hook: PropTypes.string.isRequired,
        question_hook: PropTypes.string.isRequired,
        statistic_hook: PropTypes.string.isRequired,
        contrast_hook: PropTypes.string.isRequired,
    }),
};

export default IntroductionResult;
