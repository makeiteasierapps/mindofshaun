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
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CallToActionIcon from '@mui/icons-material/CallToAction';
import { ContentPaper } from './styles';

const ConclusionResult = ({ data }) => {
    if (!data) return null;

    const { conclusion_paragraph, key_takeaways, call_to_action } = data;

    return (
        <Box>
            <ContentPaper elevation={0}>
                <Typography
                    variant="subtitle2"
                    color="primary.main"
                    gutterBottom
                >
                    Conclusion Paragraph
                </Typography>
                <Typography variant="body2" sx={{ whiteSpace: 'pre-line' }}>
                    {conclusion_paragraph}
                </Typography>
            </ContentPaper>

            <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography variant="subtitle2" color="primary.main">
                        Key Takeaways
                    </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <List dense disablePadding>
                        {key_takeaways
                            .split('\n')
                            .filter((item) => item.trim())
                            .map((takeaway, index) => (
                                <ListItem
                                    key={index}
                                    disableGutters
                                    alignItems="flex-start"
                                >
                                    <ListItemIcon sx={{ minWidth: 36 }}>
                                        <CheckCircleOutlineIcon
                                            color="primary"
                                            fontSize="small"
                                        />
                                    </ListItemIcon>
                                    <ListItemText
                                        primary={takeaway}
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
                        Call to Action
                    </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
                        <CallToActionIcon
                            color="primary"
                            sx={{ mr: 1, mt: 0.5 }}
                            fontSize="small"
                        />
                        <Typography
                            variant="body2"
                            sx={{ whiteSpace: 'pre-line' }}
                        >
                            {call_to_action}
                        </Typography>
                    </Box>
                </AccordionDetails>
            </Accordion>
        </Box>
    );
};

ConclusionResult.propTypes = {
    data: PropTypes.shape({
        conclusion_paragraph: PropTypes.string.isRequired,
        key_takeaways: PropTypes.string.isRequired,
        call_to_action: PropTypes.string.isRequired,
    }),
};

export default ConclusionResult;
