import React from 'react';
import PropTypes from 'prop-types';
import ToolAccordion from '../../components/ToolAccordion';

const ExpandedPoints = ({ content }) => {
    // Handle null or undefined data with defaults
    const { expanded_content = [], transition_suggestions = [] } =
        content || {};

    return (
        <>
            <ToolAccordion
                title="Expanded Content"
                content={expanded_content}
            />
            <ToolAccordion
                title="Transition Suggestions"
                content={transition_suggestions}
            />
        </>
    );
};

ExpandedPoints.propTypes = {
    content: PropTypes.shape({
        expanded_content: PropTypes.arrayOf(PropTypes.string),
        transition_suggestions: PropTypes.arrayOf(PropTypes.string),
    }),
};

export default ExpandedPoints;
