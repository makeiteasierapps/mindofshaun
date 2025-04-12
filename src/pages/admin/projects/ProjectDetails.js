import React from 'react';
import { Grid2 } from '@mui/material';
import { StyledTextField } from './styles/ProjectForm.styles';

const ProjectDetails = ({ formData, handleChange }) => {
    return (
        <Grid2 container spacing={3}>
            <Grid2 size={{ xs: 12, md: 6 }}>
                <StyledTextField
                    fullWidth
                    label="Project Title"
                    name="project_details.title"
                    value={formData?.project_details?.title || ''}
                    onChange={handleChange}
                />
            </Grid2>
            <Grid2 size={{ xs: 12, md: 6 }}>
                <StyledTextField
                    fullWidth
                    multiline
                    rows={4}
                    label="Project Description"
                    name="project_details.description"
                    value={formData?.project_details?.description || ''}
                    onChange={handleChange}
                />
            </Grid2>
            <Grid2 size={{ xs: 12, md: 6 }}>
                <StyledTextField
                    fullWidth
                    label="Client Code URL"
                    name="project_details.clientCode"
                    value={formData?.project_details?.clientCode || ''}
                    onChange={handleChange}
                />
            </Grid2>
            <Grid2 size={{ xs: 12, md: 6 }}>
                <StyledTextField
                    fullWidth
                    label="Server Code URL"
                    name="project_details.serverCode"
                    value={formData?.project_details?.serverCode || ''}
                    onChange={handleChange}
                />
            </Grid2>
        </Grid2>
    );
};

export default ProjectDetails;
