import React from 'react';
import PropTypes from 'prop-types';
import {
    Typography,
    Box,
    Accordion,
    AccordionSummary,
    AccordionDetails,
    List,
    ListItem,
    ListItemText,
    ListItemIcon,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ArchitectureIcon from '@mui/icons-material/Architecture';
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import { SectionPaper } from './styles';

const EditedContentResult = ({ data }) => {
    if (!data) return null;

    const { content_feedback, structure_suggestions, clarity_improvements } =
        data;

    return (
        <Box>
            <SectionPaper elevation={0}>
                <Typography
                    variant="subtitle2"
                    color="primary.main"
                    gutterBottom
                >
                    Content Feedback
                </Typography>
                <Typography variant="body2" sx={{ whiteSpace: 'pre-line' }}>
                    {content_feedback}
                </Typography>
            </SectionPaper>

            <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography variant="subtitle2" color="primary.main">
                        Structure Suggestions
                    </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <List dense disablePadding>
                        {structure_suggestions
                            .split('\n')
                            .filter((item) => item.trim())
                            .map((item, index) => (
                                <ListItem
                                    key={index}
                                    disableGutters
                                    alignItems="flex-start"
                                >
                                    <ListItemIcon sx={{ minWidth: 36 }}>
                                        <ArchitectureIcon
                                            color="primary"
                                            fontSize="small"
                                        />
                                    </ListItemIcon>
                                    <ListItemText
                                        primary={item}
                                        primaryTypographyProps={{
                                            variant: 'body2',
                                        }}
                                    />
                                </ListItem>
                            ))}
                    </List>
                </AccordionDetails>
            </Accordion>

            <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography variant="subtitle2" color="primary.main">
                        Clarity Improvements
                    </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <List dense disablePadding>
                        {clarity_improvements
                            .split('\n')
                            .filter((item) => item.trim())
                            .map((item, index) => (
                                <ListItem
                                    key={index}
                                    disableGutters
                                    alignItems="flex-start"
                                >
                                    <ListItemIcon sx={{ minWidth: 36 }}>
                                        <LightbulbIcon
                                            color="primary"
                                            fontSize="small"
                                        />
                                    </ListItemIcon>
                                    <ListItemText
                                        primary={item}
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

EditedContentResult.propTypes = {
    data: PropTypes.shape({
        content_feedback: PropTypes.string.isRequired,
        structure_suggestions: PropTypes.string.isRequired,
        clarity_improvements: PropTypes.string.isRequired,
    }),
};

export default EditedContentResult;
