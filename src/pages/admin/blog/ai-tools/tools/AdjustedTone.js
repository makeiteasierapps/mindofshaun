import React from 'react';
import PropTypes from 'prop-types';
import ToolAccordion from '../../components/ToolAccordion';

const AdjustedTone = ({ content }) => {
    // Handle null or undefined data with defaults
    const { adjusted_content = '', word_choice_suggestions = [] } =
        content || {};

    return (
        <>
            <ToolAccordion
                title="Word Choice Suggestions"
                content={word_choice_suggestions}
            />
            <ToolAccordion
                title="Adjusted Content"
                content={[adjusted_content]}
            />
        </>
    );
};

AdjustedTone.propTypes = {
    data: PropTypes.shape({
        adjusted_content: PropTypes.string,
        word_choice_suggestions: PropTypes.arrayOf(PropTypes.string),
    }),
};

export default AdjustedTone;
