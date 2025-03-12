import React from 'react';
import PropTypes from 'prop-types';
import {
    Typography,
    Box,
    List,
    ListItem,
    ListItemText,
    Accordion,
    AccordionSummary,
    AccordionDetails,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { SectionPaper } from './styles';

const OrganizedThoughtsResult = ({ data }) => {
    if (!data) return null;

    const { blog_topic, key_points, structure, writing_prompts } = data;

    return (
        <Box>
            <SectionPaper elevation={0}>
                <Typography
                    variant="subtitle2"
                    color="primary.main"
                    gutterBottom
                >
                    Blog Topic
                </Typography>
                <Typography variant="body2">{blog_topic}</Typography>
            </SectionPaper>

            <SectionPaper elevation={0}>
                <Typography
                    variant="subtitle2"
                    color="primary.main"
                    gutterBottom
                >
                    Key Points
                </Typography>
                <Typography variant="body2" sx={{ whiteSpace: 'pre-line' }}>
                    {key_points}
                </Typography>
            </SectionPaper>

            <SectionPaper elevation={0}>
                <Typography
                    variant="subtitle2"
                    color="primary.main"
                    gutterBottom
                >
                    Suggested Structure
                </Typography>
                <Typography variant="body2" sx={{ whiteSpace: 'pre-line' }}>
                    {structure}
                </Typography>
            </SectionPaper>

            <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography variant="subtitle2" color="primary.main">
                        Writing Prompts
                    </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <List dense disablePadding>
                        {writing_prompts
                            .split('\n')
                            .filter((prompt) => prompt.trim())
                            .map((prompt, index) => (
                                <ListItem key={index} disableGutters>
                                    <ListItemText
                                        primary={prompt}
                                        primaryTypographyProps={{
                                            variant: 'body2',
                                        }}
                                    />
                                </ListItem>
                            ))}
                    </List>
                </AccordionDetails>
            </Accordion>
        </Box>
    );
};

OrganizedThoughtsResult.propTypes = {
    data: PropTypes.shape({
        blog_topic: PropTypes.string.isRequired,
        key_points: PropTypes.string.isRequired,
        structure: PropTypes.string.isRequired,
        writing_prompts: PropTypes.string.isRequired,
    }),
};

export default OrganizedThoughtsResult;
