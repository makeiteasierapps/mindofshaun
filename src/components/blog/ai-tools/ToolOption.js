import React from 'react';
import { Typography, AccordionSummary, AccordionDetails } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {
    AiToolsAccordion,
    AiToolsButton,
    AiToolsPreview,
    AiToolsResultContainer,
} from '../../styles/BlogAiTools.styles';

/**
 * Tool option component for AI writing tools
 * @param {Object} props - Component props
 * @param {string} props.title - The title of the tool
 * @param {Function} props.onExecute - Function to execute when the tool is run
 * @param {string} props.resultKey - The key for the result in the results object
 * @param {Object} props.result - The result of the tool execution
 * @param {Function} props.onApply - Function to apply the result
 * @returns {JSX.Element} - The rendered component
 */
const ToolOption = ({ title, onExecute, resultKey, result, onApply }) => {
    return (
        <AiToolsAccordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography>{title}</Typography>
            </AccordionSummary>
            <AccordionDetails>
                <AiToolsButton
                    variant="contained"
                    onClick={onExecute}
                    fullWidth
                >
                    Execute
                </AiToolsButton>
                {result && (
                    <AiToolsResultContainer>
                        <Typography variant="h6" gutterBottom>
                            Results
                        </Typography>
                        <AiToolsPreview>
                            <pre>{JSON.stringify(result, null, 2)}</pre>
                        </AiToolsPreview>
                        <AiToolsButton
                            variant="contained"
                            color="primary"
                            onClick={() => onApply(result)}
                            sx={{ mt: 2 }}
                        >
                            Apply Changes
                        </AiToolsButton>
                    </AiToolsResultContainer>
                )}
            </AccordionDetails>
        </AiToolsAccordion>
    );
};

export default ToolOption;
