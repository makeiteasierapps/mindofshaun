import React from 'react';
import PropTypes from 'prop-types';
import ToolAccordion from '../../components/ToolAccordion';
const Conclusion = ({ content }) => {
    // Handle null or undefined data with defaults
    const {
        conclusion_paragraph = '',
        key_takeaways = [],
        call_to_action = '',
    } = content || {};

    return (
        <>
            <ToolAccordion
                title="Conclusion Paragraph"
                content={[conclusion_paragraph]}
            />

            <ToolAccordion title="Key Takeaways" content={key_takeaways} />

            <ToolAccordion title="Call to Action" content={[call_to_action]} />
        </>
    );
};

Conclusion.propTypes = {
    data: PropTypes.shape({
        conclusion_paragraph: PropTypes.string,
        key_takeaways: PropTypes.string,
        call_to_action: PropTypes.string,
    }).isRequired,
};

export default Conclusion;
