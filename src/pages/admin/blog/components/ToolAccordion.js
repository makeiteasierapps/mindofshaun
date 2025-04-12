import {
    Typography,
    List,
    ListItem,
    ListItemText,
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Box,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const ToolAccordion = ({ title, content, onItemSelect = null }) => {
    return (
        <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Typography variant="subtitle2" color="text.secondary">
                        {title}
                    </Typography>
                </Box>
            </AccordionSummary>
            <AccordionDetails>
                <List dense disablePadding>
                    {content.map((item, index) => (
                        <ListItem
                            key={index}
                            disableGutters
                            onClick={
                                onItemSelect ? () => onItemSelect(item) : null
                            }
                        >
                            <ListItemText
                                primary={item}
                                typography="body2"
                                sx={{
                                    color: 'text.secondary',
                                    cursor: onItemSelect
                                        ? 'pointer'
                                        : 'default',
                                    '&:hover': {
                                        color: onItemSelect
                                            ? 'text.primary'
                                            : null,
                                    },
                                }}
                            />
                        </ListItem>
                    ))}
                </List>
            </AccordionDetails>
        </Accordion>
    );
};

export default ToolAccordion;
