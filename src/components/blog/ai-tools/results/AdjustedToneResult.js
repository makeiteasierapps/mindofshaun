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
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { ContentPaper, WordChip } from './styles';

const AdjustedToneResult = ({ data }) => {
    if (!data) return null;

    const { adjusted_content, tone_analysis, word_choice_suggestions } = data;

    // Parse word suggestions into an array if it's a string
    const wordSuggestions =
        typeof word_choice_suggestions === 'string'
            ? word_choice_suggestions
                  .split(/[,;\n]/)
                  .map((word) => word.trim())
                  .filter(Boolean)
            : word_choice_suggestions;

    return (
        <Box>
            <ContentPaper elevation={0}>
                <Typography
                    variant="subtitle2"
                    color="primary.main"
                    gutterBottom
                >
                    Adjusted Content
                </Typography>
                <Typography variant="body2" sx={{ whiteSpace: 'pre-line' }}>
                    {adjusted_content}
                </Typography>
            </ContentPaper>

            <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography variant="subtitle2" color="primary.main">
                        Tone Analysis
                    </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography variant="body2" sx={{ whiteSpace: 'pre-line' }}>
                        {tone_analysis}
                    </Typography>
                </AccordionDetails>
            </Accordion>

            <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography variant="subtitle2" color="primary.main">
                        Word Choice Suggestions
                    </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', mt: 1 }}>
                        {Array.isArray(wordSuggestions) ? (
                            wordSuggestions.map((word, index) => (
                                <WordChip
                                    key={index}
                                    label={word}
                                    variant="outlined"
                                />
                            ))
                        ) : (
                            <Typography
                                variant="body2"
                                sx={{ whiteSpace: 'pre-line' }}
                            >
                                {word_choice_suggestions}
                            </Typography>
                        )}
                    </Box>
                </AccordionDetails>
            </Accordion>
        </Box>
    );
};

AdjustedToneResult.propTypes = {
    data: PropTypes.shape({
        adjusted_content: PropTypes.string.isRequired,
        tone_analysis: PropTypes.string.isRequired,
        word_choice_suggestions: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.arrayOf(PropTypes.string),
        ]).isRequired,
    }),
};

export default AdjustedToneResult;
