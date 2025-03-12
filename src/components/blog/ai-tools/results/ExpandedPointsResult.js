import React from 'react';
import PropTypes from 'prop-types';
import {
    Typography,
    Box,
    Accordion,
    AccordionSummary,
    AccordionDetails,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { ContentPaper } from './styles';

const ExpandedPointsResult = ({ data }) => {
    if (!data) return null;

    const { expanded_content, transition_suggestions } = data;

    return (
        <Box>
            <ContentPaper elevation={0}>
                <Typography
                    variant="subtitle2"
                    color="primary.main"
                    gutterBottom
                >
                    Expanded Content
                </Typography>
                <Typography variant="body2" sx={{ whiteSpace: 'pre-line' }}>
                    {expanded_content}
                </Typography>
            </ContentPaper>

            <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography variant="subtitle2" color="primary.main">
                        Transition Suggestions
                    </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography variant="body2" sx={{ whiteSpace: 'pre-line' }}>
                        {transition_suggestions}
                    </Typography>
                </AccordionDetails>
            </Accordion>
        </Box>
    );
};

ExpandedPointsResult.propTypes = {
    data: PropTypes.shape({
        expanded_content: PropTypes.string.isRequired,
        transition_suggestions: PropTypes.string.isRequired,
    }),
};

export default ExpandedPointsResult;
