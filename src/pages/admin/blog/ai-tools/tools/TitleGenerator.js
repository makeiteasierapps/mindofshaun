import React, { useState } from 'react';
import PropTypes from 'prop-types';
import ToolAccordion from '../../components/ToolAccordion';
const TitleGenerator = ({ content, onSelectTitle }) => {

    const { attention_grabbing_titles, seo_friendly_titles } = content;

    return (
        <>
            <ToolAccordion
                title="Attention Grabbing Titles"
                content={attention_grabbing_titles}
                onItemSelect={onSelectTitle}
            />
            <ToolAccordion
                title="SEO Friendly Titles"
                content={seo_friendly_titles}
                onItemSelect={onSelectTitle}
            />
        </>
    );
};

TitleGenerator.propTypes = {
    content: PropTypes.shape({
        attention_grabbing_titles: PropTypes.arrayOf(PropTypes.string)
            .isRequired,
        seo_friendly_titles: PropTypes.arrayOf(PropTypes.string).isRequired,
    }),
    onSelectTitle: PropTypes.func,
};

export default TitleGenerator;
