import React from 'react';
import PropTypes from 'prop-types';
import { Box } from '@mui/material';
import ToolAccordion from '../../components/ToolAccordion';

const Introductions = ({ content }) => {
    // Handle null or undefined data with defaults
    const {
        story_hook = '',
        question_hook = '',
        statistic_hook = '',
        contrast_hook = '',
    } = content || {};

    return (
        <Box>
            <ToolAccordion
                title="Story Hook"
                content={[story_hook]}
            />
            <ToolAccordion
                title="Question Hook"
                content={[question_hook]}
            />
            <ToolAccordion
                title="Statistic Hook"
                content={[statistic_hook]}
            />
            <ToolAccordion
                title="Contrast Hook"
                content={[contrast_hook]}
            />
        </Box>
    );
};

Introductions.propTypes = {
    data: PropTypes.shape({
        story_hook: PropTypes.string,
        question_hook: PropTypes.string,
        statistic_hook: PropTypes.string,
        contrast_hook: PropTypes.string,
    }).isRequired,
};

export default Introductions;
