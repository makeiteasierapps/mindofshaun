import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
    Typography,
    Box,
    Tabs,
    Tab,
    List,
    ListItem,
    ListItemText,
    Divider,
} from '@mui/material';
import { SectionPaper, TitleOption } from './styles';

const TitleGeneratorResult = ({ data, onSelectTitle }) => {
    const [tabValue, setTabValue] = useState(0);
    const [selectedTitle, setSelectedTitle] = useState(null);

    if (!data) return null;

    const { clickable_titles, seo_friendly_titles, title_analysis } = data;

    const handleTabChange = (event, newValue) => {
        setTabValue(newValue);
    };

    const handleTitleSelect = (title) => {
        setSelectedTitle(title);
        if (onSelectTitle) {
            onSelectTitle(title);
        }
    };

    const currentTitles =
        tabValue === 0 ? clickable_titles : seo_friendly_titles;

    return (
        <Box>
            <Tabs
                value={tabValue}
                onChange={handleTabChange}
                variant="fullWidth"
                sx={{ mb: 2 }}
            >
                <Tab label="Attention-Grabbing" />
                <Tab label="SEO-Friendly" />
            </Tabs>

            <List disablePadding>
                {currentTitles.map((title, index) => (
                    <TitleOption
                        key={index}
                        selected={selectedTitle === title}
                        onClick={() => handleTitleSelect(title)}
                        component={Box}
                    >
                        <Typography
                            variant="body1"
                            fontWeight={
                                selectedTitle === title ? 'bold' : 'normal'
                            }
                        >
                            {title}
                        </Typography>
                    </TitleOption>
                ))}
            </List>

            <Divider sx={{ my: 2 }} />

            <SectionPaper elevation={0}>
                <Typography
                    variant="subtitle2"
                    color="primary.main"
                    gutterBottom
                >
                    Title Analysis
                </Typography>
                <List dense disablePadding>
                    {title_analysis.map((analysis, index) => (
                        <ListItem key={index} disableGutters>
                            <ListItemText
                                primary={analysis}
                                primaryTypographyProps={{ variant: 'body2' }}
                            />
                        </ListItem>
                    ))}
                </List>
            </SectionPaper>
        </Box>
    );
};

TitleGeneratorResult.propTypes = {
    data: PropTypes.shape({
        clickable_titles: PropTypes.arrayOf(PropTypes.string).isRequired,
        seo_friendly_titles: PropTypes.arrayOf(PropTypes.string).isRequired,
        title_analysis: PropTypes.arrayOf(PropTypes.string).isRequired,
    }),
    onSelectTitle: PropTypes.func,
};

export default TitleGeneratorResult;
