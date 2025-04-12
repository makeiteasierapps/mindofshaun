import React from 'react';
import PropTypes from 'prop-types';
import ToolAccordion from '../../components/ToolAccordion';

const OrganizedThoughts = ({ content }) => {
    const {
        key_points = [],
        structure = [],
        writing_prompts = [],
    } = content || {};

    return (
        <>
            <ToolAccordion title="Key Points" content={key_points} />
            <ToolAccordion title="Structure" content={structure} />
            <ToolAccordion title="Writing Prompts" content={writing_prompts} />
        </>
    );
};

OrganizedThoughts.propTypes = {
    data: PropTypes.shape({
        key_points: PropTypes.arrayOf(PropTypes.string),
        structure: PropTypes.arrayOf(PropTypes.string),
        writing_prompts: PropTypes.arrayOf(PropTypes.string),
    }),
};

export default OrganizedThoughts;
