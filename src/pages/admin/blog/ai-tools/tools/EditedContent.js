import React from 'react';
import PropTypes from 'prop-types';
import ToolAccordion from '../../components/ToolAccordion';

const EditedContent = ({ content }) => {
    const {
        content_feedback = '',
        structure_suggestions = [],
        clarity_improvements = [],
    } = content || {};

    return (
        <>
            <ToolAccordion
                title="Content Feedback"
                content={[content_feedback]}
            />

            <ToolAccordion
                title="Structure Suggestions"
                content={structure_suggestions}
            />

            <ToolAccordion
                title="Clarity Improvements"
                content={clarity_improvements}
            />
        </>
    );
};

EditedContent.propTypes = {
    data: PropTypes.shape({
        content_feedback: PropTypes.string,
        structure_suggestions: PropTypes.arrayOf(PropTypes.string),
        clarity_improvements: PropTypes.arrayOf(PropTypes.string),
    }),
};

export default EditedContent;
