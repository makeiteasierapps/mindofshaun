import PropTypes from 'prop-types';
import ToolAccordion from '../../components/ToolAccordion';

const ResearchDirections = ({ content }) => {
    // Handle null or undefined data with defaults
    const {
        research_areas = [],
        statistics_needed = [],
        expert_perspectives = [],
        counter_arguments = [],
    } = content || {};

    return (
        <>
            <ToolAccordion title="Research Areas" content={research_areas} />
            <ToolAccordion title="Statistics Needed" content={statistics_needed} />
            <ToolAccordion title="Expert Perspectives" content={expert_perspectives} />
            <ToolAccordion title="Counter Arguments" content={counter_arguments} />
        </>
    )
};

ResearchDirections.propTypes = {
    data: PropTypes.shape({
        research_areas: PropTypes.arrayOf(PropTypes.string),
        statistics_needed: PropTypes.arrayOf(PropTypes.string),
        expert_perspectives: PropTypes.arrayOf(PropTypes.string),
        counter_arguments: PropTypes.arrayOf(PropTypes.string),
    }).isRequired,
};

export default ResearchDirections;
