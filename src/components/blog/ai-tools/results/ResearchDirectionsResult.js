import React from 'react';
import PropTypes from 'prop-types';
import {
    Typography,
    Box,
    List,
    ListItem,
    ListItemText,
    ListItemIcon,
    Accordion,
    AccordionSummary,
    AccordionDetails,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import SearchIcon from '@mui/icons-material/Search';
import QueryStatsIcon from '@mui/icons-material/QueryStats';
import PersonIcon from '@mui/icons-material/Person';
import CompareArrowsIcon from '@mui/icons-material/CompareArrows';
import { SectionPaper } from './styles';

const ResearchDirectionsResult = ({ data }) => {
    if (!data) return null;

    const {
        research_areas,
        statistics_needed,
        expert_perspectives,
        counter_arguments,
    } = data;

    return (
        <Box>
            <SectionPaper elevation={0}>
                <Typography
                    variant="subtitle2"
                    color="primary.main"
                    gutterBottom
                >
                    Research Areas
                </Typography>
                <List dense disablePadding>
                    {research_areas
                        .split('\n')
                        .filter((item) => item.trim())
                        .map((area, index) => (
                            <ListItem
                                key={index}
                                disableGutters
                                alignItems="flex-start"
                            >
                                <ListItemIcon sx={{ minWidth: 36 }}>
                                    <SearchIcon
                                        color="primary"
                                        fontSize="small"
                                    />
                                </ListItemIcon>
                                <ListItemText
                                    primary={area}
                                    primaryTypographyProps={{
                                        variant: 'body2',
                                    }}
                                />
                            </ListItem>
                        ))}
                </List>
            </SectionPaper>

            <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography variant="subtitle2" color="primary.main">
                        Statistics Needed
                    </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <List dense disablePadding>
                        {statistics_needed
                            .split('\n')
                            .filter((item) => item.trim())
                            .map((stat, index) => (
                                <ListItem
                                    key={index}
                                    disableGutters
                                    alignItems="flex-start"
                                >
                                    <ListItemIcon sx={{ minWidth: 36 }}>
                                        <QueryStatsIcon
                                            color="primary"
                                            fontSize="small"
                                        />
                                    </ListItemIcon>
                                    <ListItemText
                                        primary={stat}
                                        primaryTypographyProps={{
                                            variant: 'body2',
                                        }}
                                    />
                                </ListItem>
                            ))}
                    </List>
                </AccordionDetails>
            </Accordion>

            <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography variant="subtitle2" color="primary.main">
                        Expert Perspectives
                    </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <List dense disablePadding>
                        {expert_perspectives
                            .split('\n')
                            .filter((item) => item.trim())
                            .map((expert, index) => (
                                <ListItem
                                    key={index}
                                    disableGutters
                                    alignItems="flex-start"
                                >
                                    <ListItemIcon sx={{ minWidth: 36 }}>
                                        <PersonIcon
                                            color="primary"
                                            fontSize="small"
                                        />
                                    </ListItemIcon>
                                    <ListItemText
                                        primary={expert}
                                        primaryTypographyProps={{
                                            variant: 'body2',
                                        }}
                                    />
                                </ListItem>
                            ))}
                    </List>
                </AccordionDetails>
            </Accordion>

            <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography variant="subtitle2" color="primary.main">
                        Counter Arguments
                    </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <List dense disablePadding>
                        {counter_arguments
                            .split('\n')
                            .filter((item) => item.trim())
                            .map((counter, index) => (
                                <ListItem
                                    key={index}
                                    disableGutters
                                    alignItems="flex-start"
                                >
                                    <ListItemIcon sx={{ minWidth: 36 }}>
                                        <CompareArrowsIcon
                                            color="primary"
                                            fontSize="small"
                                        />
                                    </ListItemIcon>
                                    <ListItemText
                                        primary={counter}
                                        primaryTypographyProps={{
                                            variant: 'body2',
                                        }}
                                    />
                                </ListItem>
                            ))}
                    </List>
                </AccordionDetails>
            </Accordion>
        </Box>
    );
};

ResearchDirectionsResult.propTypes = {
    data: PropTypes.shape({
        research_areas: PropTypes.string.isRequired,
        statistics_needed: PropTypes.string.isRequired,
        expert_perspectives: PropTypes.string.isRequired,
        counter_arguments: PropTypes.string.isRequired,
    }),
};

export default ResearchDirectionsResult;
